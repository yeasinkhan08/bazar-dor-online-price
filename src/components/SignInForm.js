"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

// Only allow redirects to pages inside our own site (a safety check)
function safePath(path) {
  if (path && path.startsWith("/") && !path.startsWith("//")) return path;
  return "/";
}

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Set by the protected product page, e.g. ?redirect=/product/alu
  const redirectParam = searchParams.get("redirect");
  const redirectTo = safePath(redirectParam);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Sent here from a protected page? Tell the user why.
  useEffect(() => {
    if (redirectParam) {
      toast("এই পেজ দেখতে আগে সাইন ইন করুন।", {
        id: "login-required", // same id = never shown twice
        icon: "🔒",
      });
    }
  }, [redirectParam]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
      return;
    }

    // Success: go back to where the user wanted to go (or Home)
    toast.success("সাইন ইন সফল হয়েছে!");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body gap-4">
        <h1 className="text-2xl font-bold">সাইন ইন</h1>
        <p className="text-sm text-base-content/60">
          আপনার অ্যাকাউন্টে ঢুকে পণ্যের বিস্তারিত দাম দেখুন।
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-semibold">
              ইমেইল
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="input w-full"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-semibold">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="আপনার পাসওয়ার্ড"
              autoComplete="current-password"
              className="input w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
            সাইন ইন
          </button>
        </form>

        <div className="divider my-0 text-xs">অথবা</div>

        <SocialButtons callbackURL={redirectTo} />

        <p className="text-sm text-center">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="link link-primary font-semibold">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
}

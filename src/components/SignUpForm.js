"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      const message = error.message || "";
      if (message.toLowerCase().includes("exist")) {
        toast.error("এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।");
      } else {
        toast.error(message || "সাইন আপ করা যায়নি। আবার চেষ্টা করুন।");
      }
      return;
    }

    // Success: go to the sign in page
    toast.success("সাইন আপ সফল হয়েছে! এখন সাইন ইন করুন।");
    router.push("/signin");
  }

  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body gap-4">
        <h1 className="text-2xl font-bold">সাইন আপ</h1>
        <p className="text-sm text-base-content/60">
          নতুন অ্যাকাউন্ট খুলুন এবং পণ্যের বিস্তারিত দাম দেখুন।
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-semibold">
              নাম
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="আপনার নাম"
              autoComplete="name"
              className="input w-full"
            />
          </div>

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
              placeholder="কমপক্ষে ৮ অক্ষর"
              autoComplete="new-password"
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
            সাইন আপ করুন
          </button>
        </form>

        <div className="divider my-0 text-xs">অথবা</div>

        <SocialButtons />

        <p className="text-sm text-center">
          আগেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="link link-primary font-semibold">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}

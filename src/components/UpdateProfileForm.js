"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ currentName }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const newName = name.trim();
    if (!newName) {
      toast.error("নাম খালি রাখা যাবে না।");
      return;
    }

    setLoading(true);
    // BetterAuth's update-user method
    const { error } = await authClient.updateUser({ name: newName });
    setLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি।");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="card bg-base-100 border border-base-300">
      <form onSubmit={handleSubmit} className="card-body gap-4">
        <h1 className="text-2xl font-bold">তথ্য আপডেট</h1>
        <p className="text-sm text-base-content/60">
          আপনার প্রোফাইলের নাম পরিবর্তন করুন।
        </p>

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

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          তথ্য আপডেট করুন
        </button>

        <Link href="/profile" className="btn btn-ghost w-full">
          বাতিল করুন
        </Link>
      </form>
    </div>
  );
}

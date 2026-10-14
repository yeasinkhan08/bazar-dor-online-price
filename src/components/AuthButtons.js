"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();

  // Who is logged in? (session is empty when nobody is)
  const { data: session, isPending } = authClient.useSession();

  // After coming back from Google/GitHub, show a welcome toast
  useEffect(() => {
    if (session && sessionStorage.getItem("justSignedIn")) {
      sessionStorage.removeItem("justSignedIn");
      toast.success(`স্বাগতম, ${session.user.name}!`);
    }
  }, [session]);

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সাইন আউট সফল হয়েছে।");
    router.push("/");
    router.refresh();
  }

  // Closes the dropdown after a click
  function closeMenu() {
    document.activeElement?.blur();
  }

  // 1. Still checking: show a skeleton
  if (isPending) {
    return <div className="skeleton h-9 w-28"></div>;
  }

  // 2. Logged out: show the two buttons
  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
          সাইন আপ
        </Link>
      </div>
    );
  }

  // 3. Logged in: avatar with a dropdown menu
  const user = session.user;

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost h-auto min-h-0 gap-2 rounded-full px-2 py-1"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="h-9 w-9 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-content">
            {user.name?.charAt(0).toUpperCase()}
          </span>
        )}

        {/* Name beside the picture (hidden on very small screens) */}
        <span className="hidden max-w-[10rem] truncate text-sm font-semibold sm:inline">
          {user.name}
        </span>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu z-50 mt-2 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
      >
        <li className="px-3 py-2">
          <div className="pointer-events-none flex flex-col items-start gap-0 p-0">
            <span className="font-semibold">{user.name}</span>
            <span className="text-xs text-base-content/60 break-all">
              {user.email}
            </span>
          </div>
        </li>
        <li>
          <Link href="/profile" onClick={closeMenu}>
            👤 আমার প্রোফাইল
          </Link>
        </li>
        <li>
          <button type="button" onClick={handleSignOut} className="text-error">
            সাইন আউট
          </button>
        </li>
      </ul>
    </div>
  );
}

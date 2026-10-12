"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29A11.86 11.86 0 0 0 0 12c0 1.92.46 3.73 1.29 5.38l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

// callbackURL = the page to open after a successful login (default: Home)
export default function SocialButtons({ callbackURL = "/" }) {
  const [loading, setLoading] = useState("");

  async function handleSocial(provider) {
    setLoading(provider);

    // The page leaves for Google/GitHub and comes back, so we leave a note.
    // The navbar reads it and shows a welcome toast when we return.
    sessionStorage.setItem("justSignedIn", "1");

    const { error } = await authClient.signIn.social({
      provider,
      callbackURL,
    });

    // If we are still here, something went wrong
    if (error) {
      sessionStorage.removeItem("justSignedIn");
      setLoading("");
      toast.error("লগইন করা যায়নি। আবার চেষ্টা করুন।");
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => handleSocial("google")}
        disabled={loading !== ""}
        className="btn w-full"
      >
        {loading === "google" ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <GoogleIcon />
        )}
        Google দিয়ে চালিয়ে যান
      </button>

      <button
        type="button"
        onClick={() => handleSocial("github")}
        disabled={loading !== ""}
        className="btn w-full"
      >
        {loading === "github" ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <GitHubIcon />
        )}
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}

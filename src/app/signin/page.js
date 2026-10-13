import { Suspense } from "react";
import SignInForm from "@/components/SignInForm";

export const metadata = { title: "সাইন ইন — বাজার দর" };

export default function SignInPage() {
  return (
    <main className="max-w-md mx-auto px-4 py-12">
      {/* SignInForm reads the URL, so it needs a Suspense wrapper */}
      <Suspense fallback={<div className="skeleton h-96 w-full"></div>}>
        <SignInForm />
      </Suspense>
    </main>
  );
}

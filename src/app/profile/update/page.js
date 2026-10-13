import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export const metadata = { title: "তথ্য আপডেট — বাজার দর" };

function UpdateSkeleton() {
  return (
    <section className="max-w-md mx-auto px-4 py-12">
      <div className="skeleton h-64 w-full"></div>
    </section>
  );
}

async function UpdateContent() {
  // PROTECTED ROUTE: only logged-in users can see this page
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/signin?redirect=%2Fprofile%2Fupdate");
  }

  return (
    <section className="max-w-md mx-auto px-4 py-12">
      <UpdateProfileForm currentName={session.user.name} />
    </section>
  );
}

export default function UpdateProfilePage() {
  return (
    <main>
      <Suspense fallback={<UpdateSkeleton />}>
        <UpdateContent />
      </Suspense>
    </main>
  );
}

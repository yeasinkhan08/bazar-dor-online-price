import { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { formatBanglaDate } from "@/lib/format";

export const metadata = { title: "আমার প্রোফাইল — বাজার দর" };

// Gray placeholder shown while the profile is loading
function ProfileSkeleton() {
  return (
    <section className="max-w-md mx-auto px-4 py-12">
      <div className="skeleton h-72 w-full"></div>
    </section>
  );
}

async function ProfileContent() {
  // PROTECTED ROUTE: only logged-in users can see this page
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/signin?redirect=%2Fprofile");
  }

  const user = session.user;

  return (
    <section className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body items-center gap-3 text-center">
          {/* Avatar: the user's photo, or the first letter of the name */}
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-content">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          )}

          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-base-content/70 break-all">{user.email}</p>
          <p className="text-sm text-base-content/60">
            সদস্য হয়েছেন: {formatBanglaDate(new Date(user.createdAt))}
          </p>

          {/* Update button: opens the update page */}
          <Link href="/profile/update" className="btn btn-primary mt-2">
            ✏️ তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ProfilePage() {
  return (
    <main>
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </main>
  );
}

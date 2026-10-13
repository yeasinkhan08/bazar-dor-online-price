import Link from "next/link";

export default function EmptyState({ icon = "🔍", title, message }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 text-center space-y-4">
      <div className="text-6xl">{icon}</div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-base-content/60 max-w-md mx-auto">{message}</p>
      <Link href="/" className="btn btn-primary">
        হোম পেজে ফিরে যান
      </Link>
    </section>
  );
}

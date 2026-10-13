import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <main>
      <EmptyState
        icon="🧭"
        title="৪০৪ — পেজটি খুঁজে পাওয়া যায়নি"
        message="আপনি যে ঠিকানাটি খুঁজছেন সেটি ভুল বা সরিয়ে ফেলা হয়েছে।"
      />
    </main>
  );
}

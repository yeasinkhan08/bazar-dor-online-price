export default function Footer() {
  return (
    <footer className="mt-auto bg-secondary text-secondary-content">
      {/* Stacked on mobile, left and right sides on larger screens */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-2 text-sm md:flex-row md:items-center md:justify-between">
        <p className="font-semibold">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="opacity-80 md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}

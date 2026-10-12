import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-base-200">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 items-center gap-8">
        {/* Left: text */}
        <div className="space-y-4 text-center md:text-left">
          {/* Eyebrow (small text above the heading) */}
          <p className="text-sm font-semibold text-primary">
            🛒 প্রতিদিনের বাজার দর
          </p>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="text-base-content/70 max-w-md mx-auto md:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলা — নিত্যদিনের
            প্রয়োজনীয় পণ্যের সর্বশেষ দাম ও দামের পরিবর্তন দেখুন।
          </p>

          {/* CTA: scrolls down to the "সব পণ্য" section on the same page */}
          <a href="#সব-পণ্য" className="btn btn-primary btn-sm sm:btn-md">
            সব পণ্য দেখুন ↓
          </a>
        </div>

        {/* Right: banner image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="ফল ও সবজিতে ভরা বাজারের ঝুড়ি"
            width={315}
            height={263}
            priority
            className="w-full max-w-xs sm:max-w-sm h-auto"
          />
        </div>
      </div>
    </section>
  );
}

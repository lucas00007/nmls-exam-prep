"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    q: "Is this the official NMLS study material?",
    a: "No. This is an independent prep system created by a licensed mortgage professional. It is not affiliated with the NMLS, CSBS, or any testing provider. It is designed to complement your exam preparation, not replace official materials.",
  },
  {
    q: "How long does my access last?",
    a: "Your access never expires. Pay once, study forever. All future updates to the question bank and lessons are included at no extra charge.",
  },
  {
    q: "What topics does this cover?",
    a: "All major NMLS exam topics: federal mortgage laws (TILA, RESPA, ECOA, HMDA), the SAFE Act, loan origination, mortgage products, underwriting, mortgage math, privacy laws, ethics, and the Texas Uniform State Content (USC).",
  },
  {
    q: "Is this for first-time test takers or people retaking the exam?",
    a: "Both. First-time candidates get a structured path from the ground up. Retakers get targeted quizzes to pinpoint and close the gaps that caused them to fail.",
  },
  {
    q: "Do I need anything else to study?",
    a: "Many candidates pass using only this system. We also recommend reviewing the official NMLS Study Guide, available free on the NMLS website, for the most complete preparation.",
  },
  {
    q: "What if I don't pass after using this?",
    a: "We stand behind the quality of this material. Candidates who complete every lesson and question consistently pass on their next attempt. Reach out if you need additional support — we will work with you.",
  },
];

const features = [
  {
    icon: "📚",
    title: "10 Interactive Lessons",
    desc: "Deep-dive lessons covering federal law, mortgage math, loan origination, underwriting, and everything in between.",
  },
  {
    icon: "❓",
    title: "660+ Practice Questions",
    desc: "Every question organized by topic with full answer explanations. Study smarter, not just longer.",
  },
  {
    icon: "📝",
    title: "125Q Mock Exam",
    desc: "A full-length timed exam that mirrors the real NMLS test format exactly. Know what to expect on exam day.",
  },
  {
    icon: "🏠",
    title: "Texas USC Deep Dive",
    desc: "Complete Texas Uniform State Content coverage — the section most candidates underestimate and fail on.",
  },
  {
    icon: "🧮",
    title: "Mortgage Math Calculators",
    desc: "Interactive calculators for LTV, DTI, ARM payment caps, points, and more. Master the math before test day.",
  },
  {
    icon: "🎥",
    title: "10 Video Lessons",
    desc: "Visual walkthroughs of the most-tested concepts. Great for auditory and visual learners.",
  },
];

const steps = [
  {
    num: "01",
    title: "Get Instant Access",
    desc: "Complete checkout in under 60 seconds with a secure, one-time $30 payment.",
  },
  {
    num: "02",
    title: "Set Up Your Account",
    desc: "You'll receive a secure link by email to create your password.",
  },
  {
    num: "03",
    title: "Study at Your Pace",
    desc: "Work through lessons, questions, and quizzes on any device, any time.",
  },
  {
    num: "04",
    title: "Pass Your Exam",
    desc: "Take the full mock exam to simulate test day. Walk in confident.",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  async function handleCheckout() {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
    }
    setCheckoutLoading(false);
  }

  return (
    <div className="min-h-screen">
      {/* ── Navbar (dark navy) ── */}
      <nav className="sticky top-0 z-50 bg-[#1e2d3d] border-b border-[#2a3a4e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="font-serif text-xl font-bold text-[#c9a84c] tracking-wide">
            NMLS PREP
          </span>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/free"
              className="text-sm text-[#a0b4c4] hover:text-white transition-colors hidden sm:block"
            >
              Free Resources
            </Link>
            <Link
              href="/login"
              className="text-sm text-[#a0b4c4] hover:text-white transition-colors"
            >
              Log In
            </Link>
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="bg-[#c9a84c] text-[#1e2d3d] text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#e0c068] transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {checkoutLoading ? "Loading…" : "Get Access $30"}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero (dark navy) ── */}
      <section className="relative overflow-hidden bg-[#1e2d3d] pt-24 pb-20 px-4 sm:px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#c9a84c]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[#c9a84c]/30 text-[#c9a84c] text-sm font-medium">
            <span className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full" />
            Trusted by MLO candidates across Texas and beyond
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6 tracking-tight">
            Pass Your MLO Exam{" "}
            <span className="text-[#c9a84c]">on Your Next Try</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#a0b4c4] max-w-2xl mx-auto mb-10 leading-relaxed">
            The most complete NMLS self-study system — built from scratch by
            someone who failed and rebuilt from zero.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 mb-12">
            {[
              { num: "660+", label: "Practice Questions" },
              { num: "10", label: "Interactive Lessons" },
              { num: "125Q", label: "Mock Exam" },
              { num: "EN / ES", label: "English & Spanish" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#c9a84c] font-serif">
                  {stat.num}
                </div>
                <div className="text-sm text-[#a0b4c4] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="bg-[#c9a84c] text-[#1e2d3d] font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#e0c068] transition-all shadow-lg shadow-[#c9a84c]/20 disabled:opacity-60"
            >
              {checkoutLoading
                ? "Redirecting…"
                : "Get Full Access — $30 One-Time"}
            </button>
            <Link
              href="/free"
              className="border border-white/20 text-[#a0b4c4] font-semibold text-lg px-8 py-4 rounded-xl hover:border-white/40 hover:text-white transition-all"
            >
              Browse Free Resources →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Story (white) ── */}
      <section className="py-20 px-4 sm:px-6 bg-white border-b border-[#e0e8f0]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[#c9a84c] text-6xl font-serif leading-none mb-4">
            &ldquo;
          </div>
          <blockquote className="font-serif text-xl sm:text-2xl text-[#374151] italic leading-relaxed">
            I failed the NMLS exam on my first attempt. I thought I&apos;d studied
            enough — but the test asked things no prep course had covered. So I
            built my own system from scratch. I collected every question I could
            find, organized them by topic, and wrote the study guide I wished
            had existed. Now candidates use it to pass on their next try.
          </blockquote>
          <div className="mt-6 text-[#a0b4c4] text-sm tracking-wide uppercase">
            — Licensed Mortgage Loan Originator
          </div>
        </div>
      </section>

      {/* ── Features (light) ── */}
      <section className="py-20 px-4 sm:px-6 bg-[#f0f4f8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1e2d3d] mb-4">
              Everything You Need to Pass
            </h2>
            <p className="text-[#4a5568] max-w-lg mx-auto">
              One system. One payment. No subscriptions. No upsells.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-[#e0e8f0] rounded-2xl p-6 hover:border-[#c9a84c]/50 hover:shadow-md transition-all group"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-serif text-xl font-bold text-[#1e2d3d] mb-2 group-hover:text-[#c9a84c] transition-colors">
                  {f.title}
                </h3>
                <p className="text-[#4a5568] text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works (white) ── */}
      <section className="py-20 px-4 sm:px-6 bg-white border-y border-[#e0e8f0]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1e2d3d] mb-4">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="text-[#c9a84c] font-serif text-5xl font-bold mb-3 leading-none">
                  {step.num}
                </div>
                <h3 className="font-bold text-[#1e2d3d] mb-2">{step.title}</h3>
                <p className="text-[#4a5568] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing (light) ── */}
      <section id="pricing" className="py-20 px-4 sm:px-6 bg-[#f0f4f8]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1e2d3d] mb-4">
              Simple, One-Time Pricing
            </h2>
            <p className="text-[#4a5568]">
              No subscriptions. No monthly fees. Access that never expires.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Free */}
            <div className="bg-white border border-[#e0e8f0] rounded-2xl p-8 flex flex-col">
              <div className="text-[#4a5568] text-xs font-black uppercase tracking-widest mb-3">
                Free
              </div>
              <div className="font-serif text-5xl font-bold text-[#1e2d3d] mb-1">
                $0
              </div>
              <div className="text-[#a0b4c4] text-sm mb-7">Always free</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "2 intro lessons",
                  "50 sample questions",
                  "Study tip guides",
                  "Exam day checklist",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-[#4a5568]"
                  >
                    <span className="text-[#c9a84c] mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/free"
                className="block text-center border border-[#e0e8f0] text-[#4a5568] font-semibold py-3 rounded-xl hover:border-[#c9a84c]/50 hover:text-[#1e2d3d] transition-colors"
              >
                Browse Free Resources
              </Link>
            </div>

            {/* Full Access */}
            <div className="bg-white border-2 border-[#c9a84c] rounded-2xl p-8 relative shadow-xl shadow-[#c9a84c]/10 flex flex-col md:-mt-4 md:-mb-4">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-[#1e2d3d] text-xs font-black px-5 py-1 rounded-full tracking-widest uppercase whitespace-nowrap">
                Most Popular
              </div>
              <div className="text-[#c9a84c] text-xs font-black uppercase tracking-widest mb-3">
                Full Access
              </div>
              <div className="font-serif text-5xl font-bold text-[#1e2d3d] mb-1">
                $30
              </div>
              <div className="text-[#a0b4c4] text-sm mb-7">One-time payment</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "All 10 lessons + video",
                  "660+ practice questions",
                  "125Q mock exam",
                  "Texas USC deep dive",
                  "Mortgage math calculators",
                  "Lifetime access + updates",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-[#1e2d3d]"
                  >
                    <span className="text-[#c9a84c] mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full bg-[#c9a84c] text-[#1e2d3d] font-bold py-3.5 rounded-xl hover:bg-[#e0c068] transition-colors disabled:opacity-60"
              >
                {checkoutLoading ? "Loading…" : "Get Access Now"}
              </button>
            </div>

            {/* Spanish Bundle */}
            <div className="bg-white border border-[#e0e8f0] rounded-2xl p-8 flex flex-col opacity-60">
              <div className="text-[#4a5568] text-xs font-black uppercase tracking-widest mb-3">
                Spanish Bundle
              </div>
              <div className="font-serif text-5xl font-bold text-[#1e2d3d] mb-1">
                $47
              </div>
              <div className="text-[#a0b4c4] text-sm mb-7">Coming soon</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Everything in Full Access",
                  "Spanish translations",
                  "Bilingual lesson guides",
                  "Spanish practice questions",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-[#4a5568]"
                  >
                    <span className="text-[#a0b4c4] mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                disabled
                className="w-full border border-[#e0e8f0] text-[#a0b4c4] font-semibold py-3.5 rounded-xl cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ (white) ── */}
      <section className="py-20 px-4 sm:px-6 bg-white border-y border-[#e0e8f0]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1e2d3d] mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-[#e0e8f0] rounded-xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-[#f8fafc] transition-colors"
                >
                  <span className="font-medium text-[#1e2d3d] pr-4">
                    {faq.q}
                  </span>
                  <span className="text-[#c9a84c] text-2xl font-light flex-shrink-0 leading-none">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 pt-4 text-[#4a5568] text-sm leading-relaxed border-t border-[#e0e8f0]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA (light) ── */}
      <section className="py-24 px-4 sm:px-6 bg-[#f0f4f8]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1e2d3d] mb-6 leading-tight">
            Your license is one exam away.
          </h2>
          <p className="text-[#4a5568] text-lg mb-10 leading-relaxed">
            Join the candidates who studied smarter and passed with confidence.
          </p>
          <button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="bg-[#c9a84c] text-[#1e2d3d] font-bold text-xl px-12 py-5 rounded-2xl hover:bg-[#e0c068] transition-all shadow-xl shadow-[#c9a84c]/20 disabled:opacity-60"
          >
            {checkoutLoading ? "Loading…" : "Get Full Access — $30"}
          </button>
          <div className="mt-4 text-[#a0b4c4] text-sm">
            One-time payment · Access never expires · Instant delivery
          </div>
        </div>
      </section>

      {/* ── Footer (light) ── */}
      <footer className="border-t border-[#e0e8f0] bg-[#f0f4f8] py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-serif text-lg font-bold text-[#c9a84c]">
            NMLS PREP
          </span>
          <div className="flex gap-8 text-sm text-[#4a5568]">
            <Link
              href="/free"
              className="hover:text-[#1e2d3d] transition-colors"
            >
              Free Resources
            </Link>
            <Link
              href="/login"
              className="hover:text-[#1e2d3d] transition-colors"
            >
              Log In
            </Link>
          </div>
          <div className="text-[#a0b4c4] text-sm text-center md:text-right">
            © {new Date().getFullYear()} NMLS Prep. Not affiliated with NMLS or
            CSBS.
          </div>
        </div>
      </footer>
    </div>
  );
}

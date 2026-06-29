"use client";

import { useState } from "react";
import Link from "next/link";

const guides = [
  { title: "SAFE Act Overview", desc: "A complete breakdown of the SAFE Act — the foundation of every MLO license.", meta: "8 pages", tag: "Federal Law", file: "/lessons/free_safe_act_overview.html" },
  { title: "Federal Mortgage Laws Summary", desc: "Quick-reference cheat sheet covering TILA, RESPA, ECOA, HMDA, and key provisions.", meta: "12 pages", tag: "Federal Law", file: "/lessons/free_federal_laws_summary.html" },
  { title: "Mortgage Math Cheat Sheet", desc: "All the formulas: LTV, DTI, points, APR, TRID math, Texas 50(a)(6) — with worked examples.", meta: "6 pages", tag: "Math", file: "/lessons/free_mortgage_math.html" },
  { title: "50 Sample Practice Questions", desc: "A representative sample from the full 660+ question bank with detailed explanations.", meta: "50 questions", tag: "Practice", file: "/lessons/free_sample_questions.html" },
  { title: "Exam Day Checklist", desc: "NMLS exam format, scoring, what to bring, strategy tips, and key numbers final drill.", meta: "2 pages", tag: "Strategy", file: "/lessons/free_exam_checklist.html" },
  { title: "Key Terms Glossary", desc: "Over 50 mortgage and lending terms defined in plain language.", meta: "50+ terms", tag: "Reference", file: "/lessons/free_glossary.html" },
];

const tagColors: Record<string, string> = {
  "Federal Law": "text-blue-700 bg-blue-100",
  Math: "text-purple-700 bg-purple-100",
  Practice: "text-green-700 bg-green-100",
  Strategy: "text-orange-700 bg-orange-100",
  Reference: "text-[#a8893e] bg-[#c9a84c]/15",
};

export default function FreePage() {
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
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* ── Navbar (dark navy) ── */}
      <nav className="sticky top-0 z-50 bg-[#1e2d3d] border-b border-[#2a3a4e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-xl font-bold text-[#c9a84c] tracking-wide"
          >
            NMLS PREP
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-sm text-white font-medium hidden sm:block">
              Free Resources
            </span>
            <Link
              href="/dashboard"
              className="text-sm text-[#a0b4c4] hover:text-white transition-colors hidden sm:block"
            >
              Dashboard
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

      {/* ── Page Header (dark navy) ── */}
      <div className="bg-[#1e2d3d] py-16 px-4 sm:px-6 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
          Free Study Resources
        </h1>
        <p className="text-[#a0b4c4] text-lg max-w-xl mx-auto">
          No account required. Download, study, and see what the full course
          looks like before you buy.
        </p>
      </div>

      {/* ── Resource Grid (light) ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {guides.map((guide) => (
            <div
              key={guide.title}
              className="bg-white border border-[#e0e8f0] rounded-2xl p-6 flex flex-col hover:border-[#c9a84c]/50 hover:shadow-md transition-all group"
            >
              <div className="mb-3">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[guide.tag] || "text-[#4a5568] bg-[#e0e8f0]"}`}
                >
                  {guide.tag}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1e2d3d] mb-2 group-hover:text-[#c9a84c] transition-colors">
                {guide.title}
              </h3>
              <p className="text-[#4a5568] text-sm leading-relaxed flex-1">
                {guide.desc}
              </p>
              <div className="mt-5 pt-4 border-t border-[#e0e8f0] flex items-center justify-between">
                <span className="text-xs text-[#a0b4c4]">{guide.meta}</span>
                <a href={guide.file} target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] text-sm font-semibold hover:underline">View →</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Free Interactive Lesson ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-4">
        <h2 className="font-serif text-2xl font-bold text-[#1e2d3d] mb-4">Free Interactive Lesson</h2>
        <a
          href="/lessons/respa_interactive_lesson.html"
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-white border border-[#e0e8f0] rounded-2xl p-6 hover:border-[#c9a84c]/50 hover:shadow-md transition-all"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-blue-700 bg-blue-100 inline-block mb-3">
                Federal Law
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1e2d3d] group-hover:text-[#c9a84c] transition-colors mb-1">
                RESPA Interactive Lesson
              </h3>
              <p className="text-[#4a5568] text-sm leading-relaxed max-w-xl">
                A full interactive walkthrough of the Real Estate Settlement Procedures Act — kickbacks, referral fees, disclosures, and HUD-1 rules tested on the NMLS exam.
              </p>
            </div>
            <div className="flex-shrink-0 text-[#c9a84c] font-semibold text-sm whitespace-nowrap">
              Open Lesson →
            </div>
          </div>
        </a>
      </div>

      {/* ── Upgrade CTA (light) ── */}
      <div className="border-t border-[#e0e8f0] py-20 px-4 sm:px-6 bg-[#f0f4f8]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-[#c9a84c] text-sm font-bold uppercase tracking-widest mb-4">
            Ready for more?
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e2d3d] mb-5">
            Unlock the full course for $30.
          </h2>
          <p className="text-[#4a5568] mb-8 leading-relaxed max-w-lg mx-auto">
            All 10 lessons, 660+ practice questions, 7 quizzes, and the
            125-question mock exam. One payment, lifetime access.
          </p>
          <button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="bg-[#c9a84c] text-[#1e2d3d] font-bold text-lg px-10 py-4 rounded-xl hover:bg-[#e0c068] transition-all shadow-lg shadow-[#c9a84c]/15 disabled:opacity-60"
          >
            {checkoutLoading
              ? "Loading…"
              : "Get Full Access — $30 One-Time"}
          </button>
          <div className="mt-3 text-[#a0b4c4] text-sm">
            Instant access · Never expires
          </div>
        </div>
      </div>

      {/* ── Footer (light) ── */}
      <footer className="border-t border-[#e0e8f0] py-8 px-4 sm:px-6 bg-[#f0f4f8]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-serif text-lg font-bold text-[#c9a84c]">
            NMLS PREP
          </Link>
          <div className="text-[#a0b4c4] text-sm">
            © {new Date().getFullYear()} NMLS Prep. Not affiliated with NMLS or
            CSBS.
          </div>
        </div>
      </footer>
    </div>
  );
}

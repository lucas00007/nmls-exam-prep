"use client";

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

const lessons: { id: number; title: string; subtitle: string; file: string; icon: string; video?: string }[] = [
  { id: 1,  title: "RESPA",               subtitle: "Real Estate Settlement Procedures Act",  file: "/lessons/respa_interactive_lesson.html",           icon: "⚖️", video: "https://youtu.be/icNYZb2MPVA" },
  { id: 2,  title: "TILA",                subtitle: "Truth in Lending Act · Regulation Z",    file: "/lessons/tila_interactive_lesson.html",            icon: "📜", video: "https://youtu.be/FcVWdXdZhDE" },
  { id: 3,  title: "TRID",                subtitle: "Integrated Disclosure Rule",              file: "/lessons/trid_interactive_lesson.html",            icon: "📑", video: "https://youtu.be/T49XRWzV4eE" },
  { id: 4,  title: "ECOA",                subtitle: "Equal Credit Opportunity Act",            file: "/lessons/ecoa_interactive_lesson.html",            icon: "🏛️", video: "https://youtu.be/JdorLbFjpoY" },
  { id: 5,  title: "HMDA & Fair Housing", subtitle: "Data Reporting · Discrimination",         file: "/lessons/hmda_fairhousing_interactive_lesson.html", icon: "🗂️", video: "https://youtu.be/-qqRGqMB0XE" },
  { id: 6,  title: "HOEPA · SCRA · BSA", subtitle: "High Cost · Military · AML",              file: "/lessons/hoepa_scra_bsa_interactive_lesson.html",  icon: "🛡️", video: "https://youtu.be/xSA5TaRNK8c" },
  { id: 7,  title: "Conforming Loans",    subtitle: "Fannie · Freddie · PMI · Limits",        file: "/lessons/conforming_loans_interactive_lesson.html", icon: "🏠", video: "https://youtu.be/a4tcKjrMPok" },
  { id: 8,  title: "Advertising Rules",   subtitle: "Triggers · NMLS Numbers · UDAP",         file: "/lessons/advertising_rules_interactive_lesson.html", icon: "📢", video: "https://youtu.be/NRT-fNaEyD0" },
  { id: 9,  title: "Texas USC",           subtitle: "50(a)(6) · TDSML · Foreclosure",         file: "/lessons/texas_usc_interactive_lesson.html",       icon: "🤠", video: "https://youtu.be/UwChQ2F5h9c" },
  { id: 10, title: "Ethics & UDAP",       subtitle: "Professional Conduct · LO Comp",         file: "/lessons/ethics_udap_interactive_lesson.html",     icon: "🎯", video: "https://youtu.be/6nSBgA4aRAs" },
];

const quizzes = [
  { id: 1, title: "RESPA + TILA Scenarios",  questions: 69,  file: "/lessons/quiz1a_respa_tila.html",       icon: "📝" },
  { id: 2, title: "TRID + ECOA Scenarios",   questions: 78,  file: "/lessons/quiz1b_trid_ecoa.html",        icon: "📝" },
  { id: 3, title: "HMDA + Fair Housing",     questions: 71,  file: "/lessons/quiz1c_hmda_fairhousing.html", icon: "📝" },
  { id: 4, title: "HOEPA + SCRA + BSA",      questions: 80,  file: "/lessons/quiz1d_hoepa_scra_glba.html",  icon: "📝" },
  { id: 5, title: "Full 8-Topic Drill",      questions: 360, file: "/lessons/mlo_quiz_45.html",             icon: "🔥" },
  { id: 6, title: "Weak Areas Focus Quiz",   questions: 121, file: "/lessons/mlo_focus_quiz.html",          icon: "🎯" },
  { id: 7, title: "Texas USC Quiz",          questions: 81,  file: "/lessons/quiz2_texas_usc.html",         icon: "🤠" },
];

const guides = [
  { title: "RESPA Study Guide",          file: "/lessons/guide_respa.html",        icon: "⚖️" },
  { title: "TILA Study Guide",           file: "/lessons/guide_tila.html",         icon: "📜" },
  { title: "TRID Study Guide",           file: "/lessons/guide_trid.html",         icon: "📑" },
  { title: "ECOA Study Guide",           file: "/lessons/guide_ecoa.html",         icon: "🏛️" },
  { title: "HMDA & Fair Housing Guide",  file: "/lessons/guide_hmda.html",         icon: "🗂️" },
  { title: "HOEPA · SCRA · BSA Guide",   file: "/lessons/guide_hoepa.html",        icon: "🛡️" },
  { title: "Conforming Loans Guide",     file: "/lessons/guide_conforming.html",   icon: "🏠" },
  { title: "Advertising Rules Guide",    file: "/lessons/guide_advertising.html",  icon: "📢" },
  { title: "Texas USC Study Guide",      file: "/lessons/guide_texas_usc.html",    icon: "🤠" },
  { title: "Ethics & UDAP Guide",        file: "/lessons/guide_ethics.html",       icon: "🎯" },
];

const tools = [
  {
    title: "Key Numbers Flashcard Deck",
    desc: "50 flashcards covering all major topics. Tap to flip, filter by topic, shuffle, track progress.",
    file: "/lessons/tool_flashcards.html",
    icon: "🃏",
    tag: "50 Cards",
  },
  {
    title: "Texas Numbers Cheat Sheet",
    desc: "Every Texas-specific number on one printable page. 50(a)(6), foreclosure, TDSML, SAFE Act.",
    file: "/lessons/tool_texas_cheat_sheet.html",
    icon: "📋",
    tag: "Printable",
  },
  {
    title: "Score Tracker",
    desc: "Log every quiz and mock exam score. Visual chart, stats, and tells you when you are ready.",
    file: "/lessons/tool_score_tracker.html",
    icon: "📊",
    tag: "Interactive",
  },
];

type Tab = "lessons" | "guides" | "quizzes" | "tools";

const TABS: { key: Tab; label: string }[] = [
  { key: "lessons", label: "Interactive Lessons" },
  { key: "guides",  label: "Study Guides" },
  { key: "quizzes", label: "Quizzes & Exams" },
  { key: "tools",   label: "Tools" },
];

export default function DashboardContent({ email }: { email: string }) {
  const [tab, setTab] = useState<Tab>("lessons");

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#1e2d3d] border-b border-[#2a3a4e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-bold text-[#c9a84c] tracking-wide">
            NMLS PREP
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#a0b4c4] hidden sm:block">{email}</span>
            <LogoutButton />
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* ── Page Header ── */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-[#1e2d3d] mb-2">
            Your Study Dashboard
          </h1>
          <p className="text-[#4a5568]">Full access — all materials unlocked.</p>
        </div>

        {/* ── Mock Exam Banner (always visible) ── */}
        <a
          href="/lessons/quiz3_mock_exam.html"
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-white border border-[#c9a84c]/30 rounded-2xl p-6 mb-10 hover:border-[#c9a84c]/60 hover:shadow-md transition-all shadow-sm"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <div className="text-[#c9a84c] text-xs font-black uppercase tracking-widest mb-2">
                Full Length · Timed
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#1e2d3d] group-hover:text-[#c9a84c] transition-colors">
                125-Question Mock Exam
              </h2>
              <p className="text-[#4a5568] text-sm mt-1.5">
                Simulate the real NMLS test. Same format, same time limit, same topics.
              </p>
            </div>
            <div className="bg-[#c9a84c] text-[#1e2d3d] font-bold px-7 py-3.5 rounded-xl group-hover:bg-[#e0c068] transition-colors flex-shrink-0 text-sm whitespace-nowrap">
              Start Mock Exam →
            </div>
          </div>
        </a>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-white border border-[#e0e8f0] rounded-xl p-1 mb-8 w-fit">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                tab === key
                  ? "bg-[#c9a84c] text-[#1e2d3d]"
                  : "text-[#4a5568] hover:text-[#1e2d3d]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Tab: Interactive Lessons ── */}
        {tab === "lessons" && (
          <div>
            <div className="flex items-baseline gap-3 mb-6">
              <h2 className="font-serif text-2xl font-bold text-[#1e2d3d]">
                10 Interactive Lessons
              </h2>
              <span className="text-sm text-[#a0b4c4]">+ video included</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white border border-[#e0e8f0] rounded-xl p-5 hover:border-[#c9a84c]/50 hover:shadow-md transition-all group"
                >
                  <a
                    href={lesson.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4"
                  >
                    <div className="text-2xl flex-shrink-0 leading-none pt-0.5">{lesson.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#1e2d3d] group-hover:text-[#c9a84c] transition-colors leading-snug">
                        {lesson.title}
                      </div>
                      <div className="text-xs text-[#a0b4c4] mt-1">{lesson.subtitle}</div>
                    </div>
                    <span className="text-[#a0b4c4] group-hover:text-[#c9a84c] transition-colors text-lg flex-shrink-0">
                      →
                    </span>
                  </a>
                  {lesson.video && (
                    <a
                      href={lesson.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 ml-10 text-xs font-semibold text-[#cc0000] hover:text-[#ff0000] transition-colors"
                    >
                      🎥 Watch Video
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: Study Guides ── */}
        {tab === "guides" && (
          <div>
            <div className="flex items-baseline gap-3 mb-6">
              <h2 className="font-serif text-2xl font-bold text-[#1e2d3d]">
                10 Study Guides
              </h2>
              <span className="text-sm text-[#a0b4c4]">reference sheets</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guides.map((guide) => (
                <a
                  key={guide.title}
                  href={guide.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-[#e0e8f0] rounded-xl p-5 hover:border-[#c9a84c]/50 hover:shadow-md transition-all group flex items-center gap-4"
                >
                  <div className="text-2xl flex-shrink-0">{guide.icon}</div>
                  <div className="flex-1 font-semibold text-[#1e2d3d] group-hover:text-[#c9a84c] transition-colors">
                    {guide.title}
                  </div>
                  <span className="text-[#a0b4c4] group-hover:text-[#c9a84c] transition-colors text-lg flex-shrink-0">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: Quizzes & Exams ── */}
        {tab === "quizzes" && (
          <div>
            <div className="flex items-baseline gap-3 mb-6">
              <h2 className="font-serif text-2xl font-bold text-[#1e2d3d]">
                7 Practice Quizzes
              </h2>
              <span className="text-sm text-[#a0b4c4]">660+ questions total</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quizzes.map((quiz) => (
                <a
                  key={quiz.id}
                  href={quiz.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-[#e0e8f0] rounded-xl p-5 hover:border-[#c9a84c]/50 hover:shadow-md transition-all group flex flex-col"
                >
                  <div className="text-2xl mb-3">{quiz.icon}</div>
                  <h3 className="font-semibold text-[#1e2d3d] group-hover:text-[#c9a84c] transition-colors mb-2 leading-snug flex-1">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-[#a0b4c4] mb-4">{quiz.questions} questions</p>
                  <div className="text-[#c9a84c] text-sm font-semibold group-hover:underline">
                    Start Quiz →
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: Tools ── */}
        {tab === "tools" && (
          <div>
            <div className="flex items-baseline gap-3 mb-6">
              <h2 className="font-serif text-2xl font-bold text-[#1e2d3d]">Tools</h2>
              <span className="text-sm text-[#a0b4c4]">flashcards, cheat sheets, tracker</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <a
                  key={tool.title}
                  href={tool.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-[#e0e8f0] rounded-xl p-5 hover:border-[#c9a84c]/50 hover:shadow-md transition-all group flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{tool.icon}</div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-[#a8893e] bg-[#c9a84c]/15">
                      {tool.tag}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#1e2d3d] group-hover:text-[#c9a84c] transition-colors mb-2 leading-snug">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-[#4a5568] leading-relaxed flex-1">{tool.desc}</p>
                  <div className="mt-4 text-[#c9a84c] text-sm font-semibold group-hover:underline">
                    Open →
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

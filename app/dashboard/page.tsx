import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

const lessons = [
  {
    id: 1,
    title: "SAFE Act & Licensing Requirements",
    duration: "45 min",
    questions: 55,
  },
  {
    id: 2,
    title: "Federal Mortgage Laws — TILA & RESPA",
    duration: "50 min",
    questions: 72,
  },
  {
    id: 3,
    title: "Fair Lending Laws — ECOA, FHA & CRA",
    duration: "40 min",
    questions: 60,
  },
  {
    id: 4,
    title: "Privacy Laws & Consumer Protection",
    duration: "35 min",
    questions: 48,
  },
  {
    id: 5,
    title: "Loan Origination & Processing",
    duration: "55 min",
    questions: 68,
  },
  {
    id: 6,
    title: "Mortgage Products & Programs",
    duration: "45 min",
    questions: 75,
  },
  {
    id: 7,
    title: "Mortgage Math & Calculations",
    duration: "60 min",
    questions: 80,
  },
  {
    id: 8,
    title: "Underwriting Guidelines",
    duration: "50 min",
    questions: 70,
  },
  {
    id: 9,
    title: "Texas Uniform State Content (USC)",
    duration: "55 min",
    questions: 85,
  },
  {
    id: 10,
    title: "Ethics & Professional Conduct",
    duration: "30 min",
    questions: 47,
  },
];

const quizzes = [
  { id: 1, title: "Federal Laws Quiz", questions: 30 },
  { id: 2, title: "Fair Lending & Consumer Protection Quiz", questions: 25 },
  { id: 3, title: "Loan Origination Quiz", questions: 30 },
  { id: 4, title: "Mortgage Products Quiz", questions: 35 },
  { id: 5, title: "Mortgage Math Quiz", questions: 40 },
  { id: 6, title: "Underwriting & Texas USC Quiz", questions: 35 },
  { id: 7, title: "Ethics & Final Review Quiz", questions: 30 },
];

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) redirect("/login");

  const payload = verifyToken(token);
  if (!payload) redirect("/login");

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* ── Navbar (dark navy) ── */}
      <nav className="sticky top-0 z-50 bg-[#1e2d3d] border-b border-[#2a3a4e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="font-serif text-xl font-bold text-[#c9a84c] tracking-wide">
            NMLS PREP
          </span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#a0b4c4] hidden sm:block">
              {payload.email}
            </span>
            <LogoutButton />
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl font-bold text-[#1e2d3d] mb-2">
            Your Study Dashboard
          </h1>
          <p className="text-[#4a5568]">Full access — all materials unlocked.</p>
        </div>

        {/* Mock Exam Banner */}
        <div className="bg-white border border-[#c9a84c]/30 rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm">
          <div>
            <div className="text-[#c9a84c] text-xs font-black uppercase tracking-widest mb-2">
              Full Length · Timed
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1e2d3d]">
              125-Question Mock Exam
            </h2>
            <p className="text-[#4a5568] text-sm mt-1.5">
              Simulate the real NMLS test. Same format, same time limit, same
              topics.
            </p>
          </div>
          <button className="bg-[#c9a84c] text-[#1e2d3d] font-bold px-7 py-3.5 rounded-xl hover:bg-[#e0c068] transition-colors flex-shrink-0 text-sm">
            Start Mock Exam →
          </button>
        </div>

        {/* Lessons */}
        <div className="mb-14">
          <div className="flex items-baseline gap-3 mb-7">
            <h2 className="font-serif text-2xl font-bold text-[#1e2d3d]">
              10 Interactive Lessons
            </h2>
            <span className="text-sm text-[#a0b4c4]">+ video included</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white border border-[#e0e8f0] rounded-xl p-5 hover:border-[#c9a84c]/50 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="text-[#c9a84c] font-serif text-2xl font-bold w-9 flex-shrink-0 leading-none pt-0.5">
                    {String(lesson.id).padStart(2, "0")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[#1e2d3d] group-hover:text-[#c9a84c] transition-colors leading-snug">
                      {lesson.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-[#a0b4c4]">
                      <span>⏱ {lesson.duration}</span>
                      <span>❓ {lesson.questions} questions</span>
                      <span>🎥 Video</span>
                    </div>
                  </div>
                  <span className="text-[#a0b4c4] group-hover:text-[#c9a84c] transition-colors text-lg">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quizzes */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1e2d3d] mb-7">
            7 Practice Quizzes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white border border-[#e0e8f0] rounded-xl p-5 hover:border-[#c9a84c]/50 hover:shadow-md transition-all group cursor-pointer"
              >
                <h3 className="font-medium text-[#1e2d3d] group-hover:text-[#c9a84c] transition-colors mb-2">
                  {quiz.title}
                </h3>
                <p className="text-xs text-[#a0b4c4] mb-4">
                  {quiz.questions} questions
                </p>
                <div className="text-[#c9a84c] text-sm font-semibold group-hover:underline">
                  Start Quiz →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setup = searchParams.get("setup");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Login failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <>
      {setup && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm leading-relaxed">
          <strong>Payment received!</strong> Check your email for a link to set
          up your account. It may take a minute to arrive.
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#4a5568] mb-2">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full bg-white border border-[#e0e8f0] rounded-xl px-4 py-3 text-[#1e2d3d] placeholder-[#a0b4c4] focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]/30 transition-colors"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4a5568] mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full bg-white border border-[#e0e8f0] rounded-xl px-4 py-3 text-[#1e2d3d] placeholder-[#a0b4c4] focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]/30 transition-colors"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#c9a84c] text-[#1e2d3d] font-bold py-3.5 rounded-xl hover:bg-[#e0c068] transition-colors disabled:opacity-60 mt-2"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col">
      {/* ── Navbar (dark navy) ── */}
      <nav className="bg-[#1e2d3d] border-b border-[#2a3a4e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link
            href="/"
            className="font-serif text-xl font-bold text-[#c9a84c] tracking-wide"
          >
            NMLS PREP
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl font-bold text-[#1e2d3d] mb-2">
              Welcome back
            </h1>
            <p className="text-[#4a5568]">
              Sign in to access your study materials.
            </p>
          </div>

          <div className="bg-white border border-[#e0e8f0] rounded-2xl p-8 shadow-sm">
            <Suspense fallback={null}>
              <LoginForm />
            </Suspense>

            <div className="mt-7 pt-6 border-t border-[#e0e8f0] text-center">
              <p className="text-[#4a5568] text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/#pricing"
                  className="text-[#c9a84c] font-medium hover:underline"
                >
                  Get access for $30
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

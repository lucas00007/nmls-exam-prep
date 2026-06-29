"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SetupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className="text-center py-4">
        <p className="text-red-600 mb-4 text-sm">
          This link is invalid or missing a token. Please check your email for
          the correct link.
        </p>
        <Link href="/" className="text-[#c9a84c] font-medium hover:underline text-sm">
          Return to home →
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Setup failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[#4a5568] mb-2">
          Create a password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full bg-white border border-[#e0e8f0] rounded-xl px-4 py-3 text-[#1e2d3d] placeholder-[#a0b4c4] focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]/30 transition-colors"
          placeholder="At least 8 characters"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4a5568] mb-2">
          Confirm password
        </label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          autoComplete="new-password"
          className="w-full bg-white border border-[#e0e8f0] rounded-xl px-4 py-3 text-[#1e2d3d] placeholder-[#a0b4c4] focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]/30 transition-colors"
          placeholder="Repeat your password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#c9a84c] text-[#1e2d3d] font-bold py-3.5 rounded-xl hover:bg-[#e0c068] transition-colors disabled:opacity-60 mt-2"
      >
        {loading ? "Setting up…" : "Create Account & Continue →"}
      </button>
    </form>
  );
}

export default function SetupPasswordPage() {
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
            <div className="text-5xl mb-5">🎉</div>
            <h1 className="font-serif text-3xl font-bold text-[#1e2d3d] mb-3">
              You&apos;re almost in.
            </h1>
            <p className="text-[#4a5568] leading-relaxed">
              Create a password to access your NMLS Prep account and unlock all
              your study materials.
            </p>
          </div>

          <div className="bg-white border border-[#e0e8f0] rounded-2xl p-8 shadow-sm">
            <Suspense
              fallback={
                <div className="text-[#a0b4c4] text-center py-6">
                  Loading…
                </div>
              }
            >
              <SetupForm />
            </Suspense>
          </div>

          <p className="text-[#a0b4c4] text-xs text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#4a5568] hover:text-[#1e2d3d]">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// app/admin/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        router.push('/admin/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgb(245, 245, 220) 1px, transparent 1px), linear-gradient(90deg, rgb(245, 245, 220) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Back to Home Button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-foreground opacity-40 hover:opacity-70 transition-opacity group"
      >
        <div className="w-6 h-[1px] bg-foreground transition-all group-hover:w-8" />
        <span className="text-xs tracking-[0.2em] font-mono">BACK TO HOME</span>
      </button>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-foreground opacity-30" />
            <span className="text-foreground text-xs tracking-[0.3em] opacity-40 font-mono">
              ADMIN ACCESS
            </span>
            <div className="w-12 h-[1px] bg-foreground opacity-30" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            PORTFOLIO
            <br />
            <span className="text-2xl md:text-3xl opacity-60">ADMIN</span>
          </h1>
        </div>

        {/* Login Form */}
        <div className="border border-foreground border-opacity-10 p-8 md:p-10 relative">
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-foreground opacity-30" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-foreground opacity-30" />

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-3">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-transparent border border-foreground border-opacity-20 text-foreground placeholder-foreground placeholder-opacity-30 focus:border-opacity-50 focus:outline-none transition-all"
                placeholder="admin@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-foreground text-xs tracking-[0.2em] opacity-40 font-mono mb-3">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-transparent border border-foreground border-opacity-20 text-foreground placeholder-foreground placeholder-opacity-30 focus:border-opacity-50 focus:outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="px-4 py-3 border border-red-500 border-opacity-30 bg-red-500 bg-opacity-5">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-foreground text-background font-bold text-sm tracking-[0.2em] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  AUTHENTICATING...
                </span>
              ) : (
                'LOGIN'
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-6 pt-6 border-t border-foreground border-opacity-10">
            <p className="text-foreground text-xs opacity-40 text-center font-mono">
              Secure admin access only
            </p>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-8 flex items-center justify-center gap-4 opacity-20">
          <div className="w-2 h-2 border border-foreground" />
          <div className="w-16 h-[1px] bg-foreground" />
          <div className="w-2 h-2 bg-foreground" />
          <div className="w-16 h-[1px] bg-foreground" />
          <div className="w-2 h-2 border border-foreground" />
        </div>
      </div>
    </div>
  );
}
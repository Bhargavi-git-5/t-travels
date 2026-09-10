"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/vehicles", label: "Browse fleet" },
    { href: "/#how-it-works", label: "How it works" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-concrete/95 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-2.5 h-6 bg-signal" />
          <span className="font-display text-xl tracking-tight text-ink">T-TRAVELS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-ink/80 hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                href={user.role === "driver" ? "/driver/dashboard" : "/dashboard"}
                className="text-sm text-ink/80 hover:text-ink"
              >
                {user.name.split(" ")[0]}&apos;s dashboard
              </Link>
              <Button variant="ghost" onClick={logout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" href="/login">
                Log in
              </Button>
              <Button variant="primary" href="/signup">
                Sign up
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-ink"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-concrete px-5 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-ink/80" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-ink/10">
            {user ? (
              <>
                <Link
                  href={user.role === "driver" ? "/driver/dashboard" : "/dashboard"}
                  className="text-sm text-ink/80"
                  onClick={() => setOpen(false)}
                >
                  My dashboard
                </Link>
                <Button variant="outline" onClick={logout}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" href="/login">
                  Log in
                </Button>
                <Button variant="primary" href="/signup">
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

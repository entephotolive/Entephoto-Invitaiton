"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

type ComingSoonProps = {
  title?: string;
  description?: string;
};

export default function ComingSoon({
  title = "Coming Soon",
  description = "We're working on this feature and it will be available soon.",
}: ComingSoonProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>

        <span className="mt-6 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          🚀 Under Development
        </span>

        <h1 className="mt-5 text-3xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="mt-3 text-muted-foreground">
          {description}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 transition hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Home className="h-4 w-4" />
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
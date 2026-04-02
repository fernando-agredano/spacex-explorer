"use client";

export default function LaunchSkeleton() {
  return (
    <article className="relative overflow-hidden rounded-[28px] border border-white/5 bg-[#14171a] p-6 shadow-sm">
      <div className="absolute right-4 top-4 h-10 w-10 animate-pulse rounded-full bg-white/5" />

      <div className="pr-12">
        <div className="h-8 w-3/4 animate-pulse rounded-lg bg-white/10" />

        <div className="mt-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 animate-pulse rounded-full bg-white/5" />
            <div className="h-4 w-32 animate-pulse rounded-md bg-white/5" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-4 w-4 animate-pulse rounded-full bg-white/5" />
            <div className="h-4 w-24 animate-pulse rounded-md bg-white/5" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-4 w-4 animate-pulse rounded-full bg-white/5" />
            <div className="h-4 w-48 animate-pulse rounded-md bg-white/5" />
          </div>
        </div>

        <div className="mt-6">
          <div className="h-6 w-16 animate-pulse rounded-full bg-white/5" />
        </div>
      </div>
    </article>
  );
}

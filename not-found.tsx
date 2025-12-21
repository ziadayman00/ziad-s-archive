// not-found.tsx (in root, not in app folder)
import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `linear-gradient(rgb(245, 245, 220) 1px, transparent 1px), linear-gradient(90deg, rgb(245, 245, 220) 1px, transparent 1px)`,
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          {/* Corner Markers */}
          <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-foreground opacity-10" />
          <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-foreground opacity-10" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-foreground opacity-10" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-foreground opacity-10" />

          {/* Error Label */}
          <div className="absolute top-12 right-12 text-foreground text-[10px] tracking-[0.3em] font-mono text-right opacity-20">
            <div>ERROR</div>
            <div className="mt-1 text-[8px]">————</div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center space-y-8 max-w-2xl">
            {/* 404 Number */}
            <div className="space-y-4">
              <h1 className="text-[clamp(8rem,20vw,16rem)] font-black text-foreground leading-none tracking-tight opacity-90">
                404
              </h1>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-24 bg-foreground opacity-30" />
                <span className="text-foreground text-xs tracking-[0.3em] font-mono opacity-40">
                  ERROR
                </span>
                <div className="h-[1px] w-24 bg-foreground opacity-30" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                PAGE NOT FOUND
              </h2>
              <p className="text-foreground opacity-60 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                The page you're looking for doesn't exist or has been moved to another location.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-4 bg-foreground text-background text-center text-xs font-bold tracking-[0.2em] hover:opacity-90 transition-opacity"
              >
                RETURN HOME
              </Link>
              <Link
                href="/#projects"
                className="w-full sm:w-auto px-8 py-4 border border-foreground border-opacity-30 text-foreground text-center text-xs font-bold tracking-[0.2em] hover:bg-foreground hover:text-background transition-all"
              >
                VIEW PROJECTS
              </Link>
            </div>

            {/* Additional Info */}
            <div className="pt-8">
              <p className="text-foreground opacity-30 text-[10px] tracking-[0.25em] font-mono">
                ERROR CODE: 404 • PAGE NOT FOUND
              </p>
            </div>
          </div>

          {/* Glitch Effect Lines (Optional) */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-foreground" />
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-foreground" />
            <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-foreground" />
          </div>
        </div>
      </body>
    </html>
  );
}
export default function TeletalkLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 select-none ${className}`}>
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1">
          <span className="text-xl font-extrabold tracking-tight text-[#43a047] font-sans leading-none lowercase">
            teletalk
          </span>
          {/* Authentic Teletalk Green Leaf / Network Signal Arc Logo Emblem */}
          <svg className="w-7 h-6 text-[#43a047] shrink-0" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 28C10 24 22 16 38 4C28 14 18 22 8 28Z"
              fill="url(#leaf-grad-1)"
            />
            <path
              d="M6 30C16 26 28 16 38 10C28 18 16 26 8 30Z"
              fill="url(#leaf-grad-2)"
            />
            <path
              d="M10 31C20 28 30 20 38 16C28 22 18 28 12 31Z"
              fill="#2e7d32"
            />
            <defs>
              <linearGradient id="leaf-grad-1" x1="0" y1="0" x2="40" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#66bb6a" />
                <stop offset="1" stopColor="#2e7d32" />
              </linearGradient>
              <linearGradient id="leaf-grad-2" x1="0" y1="0" x2="40" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a5d6a7" />
                <stop offset="1" stopColor="#43a047" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="text-[8px] text-[#2e7d32] font-semibold tracking-wider uppercase -mt-0.5">
          আমাদের ফোন
        </span>
      </div>
    </div>
  );
}

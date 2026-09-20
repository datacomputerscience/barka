import { cn } from "@/lib/utils"

export function BarkaLogo({ size = 'default', variant = 'full', className }: { size?: 'sm' | 'default' | 'lg', variant?: 'full' | 'icon', className?: string }) {
  const sizes = {
    sm: { icon: 24, text: 'text-[18px]' },
    default: { icon: 32, text: 'text-[22px]' },
    lg: { icon: 44, text: 'text-[28px]' },
  }
  const s = sizes[size]

  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <div className="relative flex items-center justify-center rounded-xl barka-gradient shadow-sm" style={{ width: s.icon, height: s.icon }}>
        {/* Abstract Barka mark: stylized package / growth */}
        <svg width={s.icon * 0.6} height={s.icon * 0.6} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" fillOpacity="0.95"/>
          <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="7" r="1.5" fill="#0a7a38"/>
        </svg>
      </div>
      {variant === 'full' && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-display font-bold tracking-tight text-ink-900", s.text)}>Barka</span>
          {size !== 'sm' && <span className="text-[10px] font-medium tracking-widest text-barka-600 uppercase -mt-0.5">Commerce Tunisien</span>}
        </div>
      )}
    </div>
  )
}

export function BarkaIcon({ className, size = 32 }: { className?: string, size?: number }) {
  return (
    <div className={cn("rounded-xl barka-gradient flex items-center justify-center shadow-sm", className)} style={{ width: size, height: size }}>
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" fillOpacity="0.95"/>
        <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

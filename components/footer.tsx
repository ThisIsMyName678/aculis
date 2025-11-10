import Image from "next/image"

interface FooterProps {
  onRequestAccess: () => void
}

export function Footer({ onRequestAccess }: FooterProps) {
  return (
    <footer className="relative border-t border-[#e9eaf2] py-10 pb-[calc(72px+env(safe-area-inset-bottom))] sm:pb-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="/" className="flex items-center shrink-0" aria-label="ACULIS.IO Home">
            <Image
              src="https://framerusercontent.com/images/g2wdryUFG21TyXhGWmtSmjyS68.svg?scale-down-to=512"
              alt="ACULIS.IO"
              width={112}
              height={22}
              className="h-[18px] sm:h-[20px] w-auto transition-opacity hover:opacity-70 leading-10 md:h-11"
            />
          </a>
          {/* </CHANGE> */}

          <div className="flex items-center text-sm">
            <a href="mailto:noa@aculis.io" className="text-slate-600 hover:text-slate-800 transition-colors">
              noa@aculis.io
            </a>
          </div>

          <div className="text-sm text-center md:text-right">
            <div className="text-slate-600">© 2025 Aculis</div>
            <div className="block text-sm text-slate-500/80 italic mt-1 pb-2">
              Empowering institutional intelligence worldwide.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

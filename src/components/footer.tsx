import { TextLoop } from '@/components/ui/text-loop'
import { NAME } from '@/data'

export function Footer() {
  return (
    <footer className="safe-b mt-16 border-t border-line px-0 pt-4 sm:mt-24">
      <TextLoop className="text-xs text-faint">
        <span>© 2026 {NAME}.</span>
        <span>Built with TanStack Start.</span>
      </TextLoop>
    </footer>
  )
}

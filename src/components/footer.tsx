import { TextLoop } from '@/components/ui/text-loop'
import { NAME } from '@/data'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line px-0 py-4">
      <TextLoop className="text-xs text-faint">
        <span>© 2026 {NAME}.</span>
        <span>Built with TanStack Start.</span>
      </TextLoop>
    </footer>
  )
}

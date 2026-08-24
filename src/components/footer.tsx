import { useIntl } from 'react-intl'
import { TextLoop } from '@/components/ui/text-loop'
import { NAME } from '@/data'

export function Footer() {
  const intl = useIntl()

  return (
    <footer className="safe-b mt-16 border-t border-line px-0 pt-4 sm:mt-24">
      <TextLoop className="text-xs text-faint">
        {/* `year` as a string: a bare `{year}` argument holding a number would
            be run through number formatting and render as "2 026" in French. */}
        <span>{intl.formatMessage({ id: 'footer.rights' }, { year: '2026', name: NAME })}</span>
        <span>{intl.formatMessage({ id: 'footer.builtWith' })}</span>
      </TextLoop>
    </footer>
  )
}

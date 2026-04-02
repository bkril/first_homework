'use client'

import { Globe } from 'lucide-react'
import { useLocale } from 'next-intl'

import { Button } from '@/app/shared/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/shared/ui/dropdown-menu'
import { usePathname, useRouter } from '@/config/i18n/navigation'

const LOCALES = [
  { value: 'en', label: 'EN' },
  { value: 'de', label: 'DE' },
] as const

type Locale = (typeof LOCALES)[number]['value']

function LanguageSwitcherComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const handleLocaleChange = (locale: Locale) => {
    router.replace(pathname, { locale })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' aria-label='Switch language'>
          <Globe className='size-4' />
          <span className='sr-only'>{currentLocale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        {LOCALES.map(({ value, label }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => handleLocaleChange(value)}
            className={currentLocale === value ? 'bg-accent text-accent-foreground' : ''}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { LanguageSwitcherComponent }
export default LanguageSwitcherComponent

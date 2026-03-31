'use client'

import { LogOut, User } from 'lucide-react'
import Link from 'next/link'

import { useAuthStore } from '@/app/shared/store'
import { Avatar, AvatarFallback } from '@/app/shared/ui/avatar'
import { Button } from '@/app/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/shared/ui/dropdown-menu'
import { LanguageSwitcher } from '@/app/features/language'

function getInitials(email: string, name?: string): string {
  if (name) {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  return email.slice(0, 2).toUpperCase()
}

export function Header() {
  const { user, logout } = useAuthStore()

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? ''
  const initials = user ? getInitials(user.email ?? '', user.user_metadata?.full_name) : ''

  return (
    <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='container mx-auto flex h-14 items-center justify-between px-4'>
        <Link href='/' className='text-lg font-bold tracking-tight transition-opacity hover:opacity-80'>
          EPL Stats
        </Link>

        <div className='flex items-center gap-4'>
          <LanguageSwitcher />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='relative size-8 rounded-full p-0' aria-label='User menu'>
                  <Avatar className='size-8'>
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuLabel className='font-normal'>
                  <div className='flex flex-col gap-1'>
                    {user.user_metadata?.full_name && (
                      <p className='text-sm leading-none font-medium'>{user.user_metadata.full_name}</p>
                    )}
                    <p className='text-muted-foreground text-xs leading-none'>{user.email}</p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className='text-destructive focus:text-destructive cursor-pointer'
                  onClick={() => logout()}
                >
                  <LogOut className='mr-2 size-4' />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant='ghost' size='icon' aria-label='Profile'>
              <User className='size-4' />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

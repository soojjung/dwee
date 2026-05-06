'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useT } from '@/i18n/useT';

type Tab = { href: string; key: 'home' | 'log' | 'calendar' | 'insights' | 'settings' };

const TABS: Tab[] = [
  { href: '/', key: 'home' },
  { href: '/log', key: 'log' },
  { href: '/calendar', key: 'calendar' },
  { href: '/insights', key: 'insights' },
  { href: '/settings', key: 'settings' },
];

export function BottomTabNav() {
  const t = useT();
  const pathname = usePathname();

  return (
    <nav
      aria-label="primary"
      className="fixed inset-x-0 bottom-0 z-10 border-t border-neutral-200/70 bg-white/95 backdrop-blur"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
        {TABS.map((tab) => {
          const active = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
          return (
            <li key={tab.key} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center justify-center gap-1 rounded-md py-1 text-xs ${
                  active ? 'font-medium text-neutral-900' : 'text-neutral-400'
                }`}
              >
                <span aria-hidden className="text-base">
                  {tabIcon(tab.key, active)}
                </span>
                <span>{t.nav[tab.key]}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function tabIcon(key: Tab['key'], active: boolean): string {
  const filled = active;
  switch (key) {
    case 'home':
      return filled ? '●' : '○';
    case 'log':
      return filled ? '✎' : '✎';
    case 'calendar':
      return filled ? '▦' : '▢';
    case 'insights':
      return filled ? '✦' : '✧';
    case 'settings':
      return filled ? '⚙' : '⚙';
  }
}

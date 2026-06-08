import type { ReactNode } from 'react';

export default function FullscreenLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh">{children}</div>;
}

'use client';
import { useT } from '@/i18n/useT';
import { PageContainer } from '@/components/ui/PageContainer';

export default function HomePage() {
  const t = useT();
  return (
    <PageContainer>
      <h1 className="text-xl font-medium text-neutral-900">{t.app.name}</h1>
      <p className="text-sm text-neutral-500">{t.app.tagline}</p>
      <p className="mt-6 text-sm text-neutral-500">{t.home.insufficientData}</p>
    </PageContainer>
  );
}

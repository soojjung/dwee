'use client';
import { useT } from '@/i18n/useT';
import { PageContainer } from '@/components/ui/PageContainer';

export default function InsightsPage() {
  const t = useT();
  return (
    <PageContainer>
      <h1 className="text-xl font-medium text-neutral-900">{t.nav.insights}</h1>
      <p className="text-sm text-neutral-500">{t.placeholder.insights}</p>
    </PageContainer>
  );
}

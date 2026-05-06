'use client';
import { useT } from '@/i18n/useT';
import { LinkButton } from '@/components/ui/Button';
import { PageContainer } from '@/components/ui/PageContainer';

export default function OnboardingPage() {
  const t = useT();
  return (
    <PageContainer className="min-h-dvh items-center justify-center gap-6 pt-0">
      <h1 className="text-xl font-medium text-neutral-900">{t.app.name}</h1>
      <p className="text-center text-sm text-neutral-500">{t.placeholder.onboarding}</p>
      <LinkButton href="/" variant="secondary" size="md">
        {t.nav.home}
      </LinkButton>
    </PageContainer>
  );
}

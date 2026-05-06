import { cn } from '@/lib/cn';

interface ToastProps {
  message: string | null;
  className?: string;
}

export function Toast({ message, className }: ToastProps) {
  if (!message) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'pointer-events-none fixed inset-x-0 bottom-24 mx-auto max-w-md px-5',
        className,
      )}
    >
      <p className="rounded-full bg-auth-button/90 px-4 py-2 text-center text-sm text-auth-buttonText">
        {message}
      </p>
    </div>
  );
}

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CalloutType = 'info' | 'warning' | 'tip' | 'error';

interface CalloutProps {
  type?: CalloutType;
  children: ReactNode;
  title?: string;
}

const typeStyles: Record<CalloutType, { bg: string; border: string; icon: string }> = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'ℹ️',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-950/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: '⚠️',
  },
  tip: {
    bg: 'bg-green-50 dark:bg-green-950/20',
    border: 'border-green-200 dark:border-green-800',
    icon: '💡',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-950/20',
    border: 'border-red-200 dark:border-red-800',
    icon: '❌',
  },
};

const typeLabels: Record<CalloutType, string> = {
  info: '정보',
  warning: '경고',
  tip: '팁',
  error: '오류',
};

export function Callout({ type = 'info', children, title }: CalloutProps) {
  const styles = typeStyles[type];
  const label = typeLabels[type];

  return (
    <div
      className={cn(
        'my-6 rounded-lg border p-4',
        styles.bg,
        styles.border
      )}
      role="alert"
      aria-label={title || `${label} 알림`}
    >
      <div className="flex items-start gap-3">
        <span
          className="text-xl flex-shrink-0"
          aria-hidden="true"
          role="img"
        >
          {styles.icon}
        </span>
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-2 text-foreground">{title}</h4>
          )}
          <div className="text-sm text-foreground/80 [&>p]:mb-2 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}



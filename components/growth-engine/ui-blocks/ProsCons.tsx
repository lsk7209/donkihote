import { ReactNode } from 'react';

interface ProsConsProps {
  pros: string[];
  cons: string[];
  prosTitle?: string;
  consTitle?: string;
}

export function ProsCons({
  pros,
  cons,
  prosTitle = '장점',
  consTitle = '단점',
}: ProsConsProps) {
  return (
    <div className="my-8 grid gap-6 md:grid-cols-2" role="region" aria-label="장단점 비교">
      <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-6">
        <h3 className="font-semibold text-lg mb-4 text-green-900 dark:text-green-100 flex items-center gap-2">
          <span aria-hidden="true" role="img">✅</span>
          {prosTitle}
        </h3>
        <ul className="space-y-2" aria-label={prosTitle}>
          {pros.map((pro, index) => (
            <li
              key={index}
              className="text-sm text-foreground/80 flex items-start gap-2"
            >
              <span className="text-green-600 dark:text-green-400 mt-1" aria-hidden="true">•</span>
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-6">
        <h3 className="font-semibold text-lg mb-4 text-red-900 dark:text-red-100 flex items-center gap-2">
          <span aria-hidden="true" role="img">❌</span>
          {consTitle}
        </h3>
        <ul className="space-y-2" aria-label={consTitle}>
          {cons.map((con, index) => (
            <li
              key={index}
              className="text-sm text-foreground/80 flex items-start gap-2"
            >
              <span className="text-red-600 dark:text-red-400 mt-1" aria-hidden="true">•</span>
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



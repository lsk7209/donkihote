import { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className = '' }: TableProps) {
  return (
    <div className="my-6 overflow-x-auto" role="region" aria-label="표" tabIndex={0}>
      <table
        className={`min-w-full border-collapse border border-gray-300 dark:border-gray-700 ${className}`}
        role="table"
      >
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }: { children: ReactNode }) {
  return <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>;
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }: { children: ReactNode }) {
  return <tr className="border-b border-gray-200 dark:border-gray-700">{children}</tr>;
}

export function TableHeader({ children }: { children: ReactNode }) {
  return (
    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold text-foreground">
      {children}
    </th>
  );
}

export function TableCell({ children }: { children: ReactNode }) {
  return (
    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-foreground/80">
      {children}
    </td>
  );
}



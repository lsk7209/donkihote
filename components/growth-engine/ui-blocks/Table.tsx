import { ReactNode, ComponentProps } from 'react';

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

export function TableHead(props: ComponentProps<'thead'>) {
  return <thead className="bg-gray-100 dark:bg-gray-800" {...props} />;
}

export function TableBody(props: ComponentProps<'tbody'>) {
  return <tbody {...props} />;
}

export function TableRow(props: ComponentProps<'tr'>) {
  return <tr className="border-b border-gray-200 dark:border-gray-700" {...props} />;
}

export function TableHeader(props: ComponentProps<'th'>) {
  return (
    <th
      className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold text-foreground"
      {...props}
    />
  );
}

export function TableCell(props: ComponentProps<'td'>) {
  return (
    <td
      className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-foreground/80"
      {...props}
    />
  );
}



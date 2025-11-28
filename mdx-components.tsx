import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';
import { Callout } from '@/components/growth-engine/ui-blocks/Callout';
import { ProsCons } from '@/components/growth-engine/ui-blocks/ProsCons';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from '@/components/growth-engine/ui-blocks/Table';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    ProsCons,
    Table,
    thead: (props: ComponentProps<'thead'>) => <TableHead {...props} />,
    tbody: (props: ComponentProps<'tbody'>) => <TableBody {...props} />,
    tr: (props: ComponentProps<'tr'>) => <TableRow {...props} />,
    th: (props: ComponentProps<'th'>) => <TableHeader {...props} />,
    td: (props: ComponentProps<'td'>) => <TableCell {...props} />,
    ...components,
  };
}



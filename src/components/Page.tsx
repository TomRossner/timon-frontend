'use client';

import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from './ui/breadcrumb';

type Props = {
  id: string;
  title: string | ReactNode;
  className?: string;
  children: ReactNode;
  withBreadcrumbs?: boolean;
  titleClassname?: string;
}

const friendlyNames: Record<string, string> = {
  teams: 'Teams',
  new: 'Create team',
  edit: 'Edit team',
  signin: 'Sign in',
}

const Page = ({ id, title, className, children, withBreadcrumbs = true, titleClassname }: Props) => {
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter((segment) => segment);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = friendlyNames[segment] || decodeURIComponent(segment.charAt(0).toUpperCase() + segment.slice(1));

    return (
      <React.Fragment key={href}>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={href}>{label}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
      </React.Fragment>
    );
  });

  return (
    <main
      id={id}
      className={cn('sm:w-full md:w-3/4 lg:w-2/3 bg-stone-50 h-screen mx-auto p-4', className)}
    >
      {withBreadcrumbs && (
        <section className='mb-4'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {pathSegments.length > 0 && <BreadcrumbSeparator />}
              {breadcrumbs}
            </BreadcrumbList>
          </Breadcrumb>
        </section>
      )}

      <h1 className={cn("font-bold text-4xl p-2 mb-4", titleClassname)}>{title}</h1>

      {children}
    </main>
  );
}

export default Page;
'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export function BreadcrumbNav({ pathname }: { pathname: string }) {
  // Skip rendering breadcrumbs on home page
  if (pathname === '/') {
    return <h1 className="text-xl font-semibold">Dashboard</h1>;
  }

  const segments = pathname.split('/').filter(Boolean);
  
  // Convert paths to readable titles
  const getTitle = (path: string) => {
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 text-sm">
        <li>
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;
          
          return (
            <li key={segment} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
              {isLast ? (
                <span className="font-medium">{getTitle(segment)}</span>
              ) : (
                <Link
                  href={href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {getTitle(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
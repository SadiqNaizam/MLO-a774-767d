import React from 'react';
import Sidebar from './Sidebar'; // Path relative to MainAppLayout.tsx within src/components/layout
import Header from './Header';   // Path relative to MainAppLayout.tsx within src/components/layout
import { cn } from '@/lib/utils'; // Standard import for cn utility

interface MainAppLayoutProps {
  children: React.ReactNode; // Content to be rendered within the main layout area
  className?: string;         // Optional className for the <main> HTML element
  contentWrapperClassName?: string; // Optional className for the direct child wrapper of 'children'
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({
  children,
  className,
  contentWrapperClassName,
}) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar /> {/* Renders SidebarNav, which is fixed */}
      <Header />  {/* Renders TopHeader, which is fixed */}

      {/*
        The <main> element is styled to appear below the fixed Header and to the right of the fixed Sidebar.
        - `ml-0 md:ml-64`: Sidebar is w-64. `md:ml-64` aligns with TopHeader's `md:left-64` for responsiveness.
          On small screens (non-md), main content starts at `ml-0`, assuming sidebar might be hidden or overlaid.
        - `mt-[70px]`: Header is h-[70px].
        - `p-6`: Internal padding for the main content area, as per layout requirements.
        - `min-w-0`: Prevents content overflow issues when using flexbox or grid children.
        - `h-[calc(100vh-70px)]`: Sets the main area's height to fill the viewport below the header.
                                   This is crucial for `overflow-y-auto` to work correctly on this specific area.
        - `overflow-y-auto`: Enables scrolling within the main content area if its content exceeds its height.
      */}
      <main
        className={cn(
          'ml-0 md:ml-64',
          'mt-[70px]',
          'p-6',
          'min-w-0',
          'h-[calc(100vh-70px)]',
          'overflow-y-auto',
          className // Apply user-provided className to the <main> element
        )}
      >
        {/*
          An inner div to apply flex layout (flex-col, gap-6) to the children,
          as specified in `Layout Requirements.mainContent.layout`.
        */}
        <div className={cn('flex flex-col gap-6', contentWrapperClassName)}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;

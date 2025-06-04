import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard, BarChart2, Target, ShoppingCart, Bitcoin, Briefcase, Layers, UserCircle2, Newspaper, AppWindow, LayoutGrid, ShieldCheck, FileText, Rocket, Box, Puzzle, LayoutTemplate, SlidersHorizontal, ChevronDown, ChevronRight, HelpCircle
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: 'New' | 'Hot';
  children?: NavItem[];
  active?: boolean;
}

const initialNavItems: NavItem[] = [
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: HelpCircle, // Changed from LayoutDashboard to match image's question mark icon
    href: '#',
    active: true,
    children: [
      { id: 'analytics', label: 'Analytics', icon: BarChart2, href: '#' },
      { id: 'crm', label: 'CRM', icon: Target, href: '#', active: true },
      { id: 'ecommerce', label: 'Ecommerce', icon: ShoppingCart, href: '#' },
    ],
  },
  { id: 'crypto', label: 'Crypto', icon: Bitcoin, href: '#' },
  { id: 'projects', label: 'Projects', icon: Briefcase, href: '#' },
  { id: 'nft', label: 'NFT', icon: Layers, href: '#' },
  { id: 'job', label: 'Job', icon: UserCircle2, href: '#', badge: 'New' },
  { id: 'blog', label: 'Blog', icon: Newspaper, href: '#' }, 
  { 
    id: 'apps', 
    label: 'Apps', 
    icon: AppWindow, 
    href: '#',
    children: [] // Example, can be populated
  },
  { 
    id: 'layouts', 
    label: 'Layouts', 
    icon: LayoutGrid, 
    href: '#',
    badge: 'Hot',
    children: [] // Example, can be populated
  },
  {
    id: 'pages',
    label: 'PAGES',
    icon: FileText, // This is a heading, not a link
    href: '#',
    isHeading: true,
  } as NavItem & { isHeading?: boolean },
  {
    id: 'authentication',
    label: 'Authentication',
    icon: ShieldCheck,
    href: '#',
    children: [] // Example, can be populated
  },
  {
    id: 'pages_sub',
    label: 'Pages',
    icon: FileText,
    href: '#',
    children: [] // Example, can be populated
  },
  {
    id: 'landing',
    label: 'Landing',
    icon: Rocket,
    href: '#',
    children: [] // Example, can be populated
  },
  {
    id: 'components_heading',
    label: 'COMPONENTS',
    icon: Box, // This is a heading, not a link
    href: '#',
    isHeading: true,
  } as NavItem & { isHeading?: boolean },
  { id: 'base_ui', label: 'Base UI', icon: Box, href: '#', children: [] },
  { id: 'advance_ui', label: 'Advance UI', icon: Puzzle, href: '#', children: [] },
  { id: 'widgets', label: 'Widgets', icon: LayoutTemplate, href: '#', children: [] },
  { id: 'forms', label: 'Forms', icon: SlidersHorizontal, href: '#', children: [] },
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [navItems, setNavItems] = useState<NavItem[]>(initialNavItems);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    dashboards: true, // Default open as per image
  });

  const toggleMenu = (id: string) => {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const setActiveItem = (path: string) => {
    // This would typically involve router integration
    // For demo, we'll just log it and manually set active states in initialNavItems
    console.log('Navigating to:', path);
  };

  const renderNavItem = (item: NavItem, isSubmenu = false) => {
    const Icon = item.icon;
    const isOpen = openMenus[item.id] || false;
    const isActive = item.active || false;

    if ((item as NavItem & { isHeading?: boolean }).isHeading) {
      return (
        <li key={item.id} className="px-4 pt-4 pb-2 text-xs uppercase text-primary-foreground/60 tracking-wider">
          {item.label}
        </li>
      );
    }

    return (
      <li key={item.id} className={cn(isSubmenu ? 'pl-4' : '')}>
        <a
          href={item.href}
          onClick={(e) => {
            e.preventDefault();
            if (item.children && item.children.length > 0) {
              toggleMenu(item.id);
            }
            setActiveItem(item.href);
          }}
          className={cn(
            'flex items-center justify-between py-2.5 px-4 rounded-md hover:bg-primary-foreground/10 transition-colors',
            isActive ? 'bg-primary-foreground/10 text-white font-medium' : 'text-primary-foreground/80 hover:text-white',
            isSubmenu && (isActive ? 'text-white' : 'text-primary-foreground/70 hover:text-primary-foreground/90')
          )}
        >
          <div className="flex items-center space-x-3">
            <Icon className={cn('h-5 w-5', isActive && !isSubmenu ? 'text-sky-400' : '')} />
            <span>{item.label}</span>
          </div>
          <div className="flex items-center space-x-2">
            {item.badge && (
              <Badge 
                variant={item.badge === 'Hot' ? 'destructive' : 'default'}
                className={cn(
                  item.badge === 'Hot' ? 'bg-red-500/80 text-white' : 'bg-green-500/80 text-white',
                  'text-xs px-1.5 py-0.5 h-fit'
                )}
              >
                {item.badge}
              </Badge>
            )}
            {item.children && item.children.length > 0 && (
              isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            )}
          </div>
        </a>
        {item.children && item.children.length > 0 && isOpen && (
          <ul className="pt-1 space-y-0.5">
            {item.children.map(child => renderNavItem(child, true))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className={cn('fixed top-0 left-0 h-screen w-64 bg-primary text-primary-foreground flex flex-col', className)}>
      <div className="h-[70px] flex items-center justify-center px-6 border-b border-primary-foreground/10">
        <h1 className="text-2xl font-bold text-white">VELZON</h1>
      </div>
      <div className="p-4 flex items-center space-x-3 border-b border-primary-foreground/10 mb-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://i.pravatar.cc/40?u=annaadame" alt="Anna Adame" />
          <AvatarFallback>AA</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm text-white">Anna Adame</p>
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 bg-green-400 rounded-full"></span>
            <p className="text-xs text-primary-foreground/70">Online</p>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1 px-2">
        <nav className="py-2">
          <ul className="space-y-1">
            {navItems.map(item => renderNavItem(item))}
          </ul>
        </nav>
      </ScrollArea>
    </div>
  );
};

export default SidebarNav;

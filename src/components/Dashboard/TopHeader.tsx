import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search, Bell, LayoutGrid, Maximize, Moon, Sun, User, LogOut, Settings, ChevronDown, Flag
} from 'lucide-react';

interface TopHeaderProps {
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className }) => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullScreen(true)).catch(err => console.error(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullScreen(false)).catch(err => console.error(err));
      }
    }
  };

  return (
    <header className={cn('fixed top-0 left-0 md:left-64 right-0 h-[70px] bg-card border-b border-border flex items-center justify-between px-6 z-40', className)}>
      <div className="flex items-center space-x-4">
        {/* Hamburger for mobile - Assuming it would toggle sidebar visibility, not part of this component's direct output but for layout context */}
        {/* <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button> */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-10 w-64" />
        </div>
        <div className="text-sm text-foreground hidden lg:block">
          <span className="text-muted-foreground">Dashboards</span> / CRM
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Flag className="h-5 w-5" /> {/* Placeholder for actual flag icon */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Spanish</DropdownMenuItem>
            <DropdownMenuItem>French</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <LayoutGrid className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground rounded-full">5</Badge>
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleFullScreen} className="relative h-9 w-9">
          {isFullScreen ? <Maximize className="h-5 w-5 rotate-180" /> : <Maximize className="h-5 w-5" />}
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="relative h-9 w-9">
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='flex items-center'>
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/32?u=annaadame" alt="Anna Adame" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <div className='ml-2 text-left hidden md:block'>
                <p className='text-sm font-medium text-foreground'>Anna Adame</p>
                <p className='text-xs text-muted-foreground'>Founder</p>
              </div>
              <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground hidden md:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;

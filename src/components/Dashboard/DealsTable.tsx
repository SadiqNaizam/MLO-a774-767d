import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';

interface Deal {
  id: string;
  name: string;
  lastContacted: string;
  salesRep: {
    name: string;
    avatarUrl: string;
    fallback: string;
  };
  status: 'Deal Won' | 'Intro Call' | 'Stuck' | 'New Lead';
  dealValue: string;
}

const dealsData: Deal[] = [
  {
    id: '1',
    name: 'Absternet LLC',
    lastContacted: 'Sep 20, 2021',
    salesRep: { name: 'Donald Risher', avatarUrl: 'https://i.pravatar.cc/32?u=donald', fallback: 'DR' },
    status: 'Deal Won' as const,
    dealValue: '$100.1K',
  },
  {
    id: '2',
    name: 'Raitech Soft',
    lastContacted: 'Sep 23, 2021',
    salesRep: { name: 'Sofia Cunha', avatarUrl: 'https://i.pravatar.cc/32?u=sofia', fallback: 'SC' },
    status: 'Intro Call' as const,
    dealValue: '$150K',
  },
  {
    id: '3',
    name: 'William PVT',
    lastContacted: 'Sep 27, 2021',
    salesRep: { name: 'Luis Rocha', avatarUrl: 'https://i.pravatar.cc/32?u=luis', fallback: 'LR' },
    status: 'Stuck' as const,
    dealValue: '$78.18K',
  },
  {
    id: '4',
    name: 'Loiusee LLP',
    lastContacted: 'Sep 30, 2021',
    salesRep: { name: 'Vitoria Rodrigues', avatarUrl: 'https://i.pravatar.cc/32?u=vitoria', fallback: 'VR' },
    status: 'Deal Won' as const,
    dealValue: '$180K',
  },
  {
    id: '5',
    name: 'Velzon Technologies',
    lastContacted: 'Oct 02, 2021',
    salesRep: { name: 'Praharsh Patel', avatarUrl: 'https://i.pravatar.cc/32?u=praharsh', fallback: 'PP' },
    status: 'New Lead' as const,
    dealValue: '$210K',
  },
];

const getStatusBadgeClass = (status: Deal['status']) => {
  switch (status) {
    case 'Deal Won':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'Intro Call':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Stuck':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'New Lead':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

interface DealsTableProps {
  className?: string;
}

const DealsTable: React.FC<DealsTableProps> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Deals Status</CardTitle>
        <Select defaultValue="nov-2021-dec-2021">
          <SelectTrigger className="w-[220px] text-xs">
            <SelectValue placeholder="Select Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nov-2021-dec-2021">02 Nov 2021 to 31 Dec 2021</SelectItem>
            <SelectItem value="oct-2021">October 2021</SelectItem>
            <SelectItem value="last-quarter">Last Quarter</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="pl-6 py-3 text-xs text-muted-foreground uppercase tracking-wider">Name</TableHead>
              <TableHead className="text-xs text-muted-foreground uppercase tracking-wider">Last Contacted</TableHead>
              <TableHead className="text-xs text-muted-foreground uppercase tracking-wider">Sales Representative</TableHead>
              <TableHead className="text-xs text-muted-foreground uppercase tracking-wider">Status</TableHead>
              <TableHead className="text-xs text-muted-foreground uppercase tracking-wider">Deal Value</TableHead>
              <TableHead className="pr-6 text-xs text-muted-foreground uppercase tracking-wider text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealsData.map((deal) => (
              <TableRow key={deal.id} className="hover:bg-muted/30">
                <TableCell className="pl-6 py-3.5 font-medium text-foreground">{deal.name}</TableCell>
                <TableCell className="text-muted-foreground">{deal.lastContacted}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={deal.salesRep.avatarUrl} alt={deal.salesRep.name} />
                      <AvatarFallback>{deal.salesRep.fallback}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-foreground">{deal.salesRep.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn('font-normal py-1 px-2 text-xs', getStatusBadgeClass(deal.status))}>
                    {deal.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground font-medium">{deal.dealValue}</TableCell>
                <TableCell className="pr-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Deal</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete Deal</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DealsTable;

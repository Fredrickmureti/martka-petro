
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Tables } from '@/integrations/supabase/types';

const fetchSupportTickets = async (): Promise<Tables<'support_tickets'>[]> => {
  const { data, error } = await supabase
    .from('support_tickets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const AdminSupport = () => {
  const { data: tickets, isLoading, error } = useQuery({
    queryKey: ['supportTickets'],
    queryFn: fetchSupportTickets,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Support Tickets</h1>
      <p className="text-muted-foreground mb-8">Manage and respond to user support requests.</p>
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>All received support tickets are listed here.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {error instanceof Error && <p className="text-red-500 text-center py-16">Error: {error.message}</p>}
          {tickets && (
            <div className="border rounded-md">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[250px]">From</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[180px]">Received</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tickets.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                        No support tickets found.
                        </TableCell>
                    </TableRow>
                    ) : (
                    tickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                        <TableCell>
                            <div className="font-medium">{ticket.name}</div>
                            <div className="text-sm text-muted-foreground">{ticket.email}</div>
                        </TableCell>
                        <TableCell className="font-medium">{ticket.subject}</TableCell>
                        <TableCell>
                            <Badge variant={ticket.status === 'open' ? 'destructive' : 'secondary'}>{ticket.status}</Badge>
                        </TableCell>
                        <TableCell>{format(new Date(ticket.created_at), 'PPp')}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="icon" disabled>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View ticket</span>
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))
                    )}
                </TableBody>
                </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSupport;

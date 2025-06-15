
import { useAdminMessages, useUpdateMessageStatus, useDeleteMessage } from '@/hooks/useAdminMessages';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2, CheckCircle, Mail, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const AdminMessages = () => {
  const { data: messages, isLoading, error } = useAdminMessages();
  const updateStatusMutation = useUpdateMessageStatus();
  const deleteMessageMutation = useDeleteMessage();

  const handleToggleRead = (id: number, is_read: boolean) => {
    updateStatusMutation.mutate({ id, is_read: !is_read });
  };

  const handleDelete = (id: number) => {
    deleteMessageMutation.mutate(id);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Messages</CardTitle>
        <CardDescription>View and manage messages from the contact form.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        )}
        {error && <p className="text-red-500">{error.message}</p>}
        {!isLoading && !error && (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="w-[180px]">Received</TableHead>
                  <TableHead className="w-[50px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">No messages yet.</TableCell>
                  </TableRow>
                )}
                {messages?.map((message) => (
                  <TableRow key={message.id} data-state={!message.is_read ? 'selected' : ''}>
                    <TableCell>
                      <Badge variant={message.is_read ? 'secondary' : 'default'}>
                        {message.is_read ? 'Read' : 'Unread'}
                      </Badge>
                    </TableCell>
                    <TableCell className={!message.is_read ? 'font-medium' : ''}>
                      <div>{message.name}</div>
                      <div className="text-xs text-muted-foreground">{message.email}</div>
                    </TableCell>
                    <TableCell>
                      <div className={!message.is_read ? 'font-medium' : ''}>{message.message?.substring(0, 60)}{message.message && message.message.length > 60 ? '...' : ''}</div>
                      <div className="text-xs text-muted-foreground">
                        {message.company && `From: ${message.company} `}
                        {/* @ts-ignore */}
                        {message.services?.name && `| Service: ${message.services.name}`}
                      </div>
                    </TableCell>
                    <TableCell>{format(new Date(message.created_at), 'MMM d, yyyy h:mm a')}</TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleToggleRead(message.id, !!message.is_read)} disabled={updateStatusMutation.isPending}>
                              {updateStatusMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (message.is_read ? <Mail className="mr-2 h-4 w-4" /> : <CheckCircle className="mr-2 h-4 w-4" />)}
                              <span>{message.is_read ? 'Mark as Unread' : 'Mark as Read'}</span>
                            </DropdownMenuItem>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem className="text-red-500" onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the message.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(message.id)}
                              disabled={deleteMessageMutation.isPending}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              {deleteMessageMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminMessages;


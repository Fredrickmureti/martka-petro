
import { useAdminMessages, useUpdateMessageStatus, useDeleteMessage } from '@/hooks/useAdminMessages';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2, CheckCircle, Mail, Loader2, Phone, Building, User, MessageSquare } from 'lucide-react';
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
import { useState } from 'react';
import { useServicesList } from '@/hooks/useContactPage';

const AdminMessages = () => {
  const { data: messages, isLoading, error } = useAdminMessages();
  const updateStatusMutation = useUpdateMessageStatus();
  const deleteMessageMutation = useDeleteMessage();
  const { data: services } = useServicesList();
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null);

  const handleToggleRead = (id: number, is_read: boolean) => {
    updateStatusMutation.mutate({ id, is_read: !is_read });
  };

  const handleDelete = () => {
    if (messageToDelete) {
      deleteMessageMutation.mutate(messageToDelete);
      setMessageToDelete(null);
    }
  };

  const getServiceName = (serviceId: number | null) => {
    if (!serviceId || !services) return null;
    const service = services.find(s => s.id === serviceId);
    return service?.name || null;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Message Inbox
          </h1>
          <p className="text-muted-foreground">Manage customer inquiries and contact form submissions</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-sm">
            {messages?.filter(m => !m.is_read).length || 0} Unread
          </Badge>
          <Badge variant="secondary" className="text-sm">
            {messages?.length || 0} Total
          </Badge>
        </div>
      </div>

      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-b">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Contact Messages
          </CardTitle>
          <CardDescription>View and manage messages from the contact form</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading && (
            <div className="space-y-2 p-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
          {error && <p className="text-red-500 p-6">{error.message}</p>}
          {!isLoading && !error && (
            <div className="rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[100px] font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Contact Info</TableHead>
                    <TableHead className="font-semibold">Details</TableHead>
                    <TableHead className="font-semibold">Message Preview</TableHead>
                    <TableHead className="w-[180px] font-semibold">Received</TableHead>
                    <TableHead className="w-[50px] text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <MessageSquare className="h-8 w-8 text-muted-foreground" />
                          <p className="text-muted-foreground">No messages yet</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  {messages?.map((message) => (
                    <TableRow 
                      key={message.id} 
                      className={`border-b transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                        !message.is_read ? 'bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <TableCell>
                        <Badge 
                          variant={message.is_read ? 'secondary' : 'default'}
                          className={message.is_read ? '' : 'bg-blue-600 hover:bg-blue-700'}
                        >
                          {message.is_read ? 'Read' : 'Unread'}
                        </Badge>
                      </TableCell>
                      <TableCell className={!message.is_read ? 'font-medium' : ''}>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{message.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span>{message.email}</span>
                          </div>
                          {message.phone && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              <span>{message.phone}</span>
                            </div>
                          )}
                          {message.company && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Building className="h-3 w-3" />
                              <span>{message.company}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {getServiceName(message.service_id) && (
                            <Badge variant="outline" className="text-xs">
                              Interested in: {getServiceName(message.service_id)}
                            </Badge>
                          )}
                          {message.subject && (
                            <div className="text-sm text-muted-foreground">
                              Subject: {message.subject}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`${!message.is_read ? 'font-medium' : ''} max-w-xs`}>
                          <p className="truncate">
                            {message.message?.substring(0, 80)}{message.message && message.message.length > 80 ? '...' : ''}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {format(new Date(message.created_at), 'MMM d, yyyy')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(message.created_at), 'h:mm a')}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-700">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem 
                              onClick={() => handleToggleRead(message.id, !!message.is_read)} 
                              disabled={updateStatusMutation.isPending}
                              className="cursor-pointer"
                            >
                              {updateStatusMutation.isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                message.is_read ? <Mail className="mr-2 h-4 w-4" /> : <CheckCircle className="mr-2 h-4 w-4" />
                              )}
                              <span>{message.is_read ? 'Mark as Unread' : 'Mark as Read'}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-500 cursor-pointer focus:text-red-500" 
                              onClick={() => setMessageToDelete(message.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!messageToDelete} onOpenChange={() => setMessageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteMessageMutation.isPending}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleteMessageMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminMessages;

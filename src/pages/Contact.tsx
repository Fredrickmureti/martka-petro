import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Phone, Mail, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { Skeleton } from '@/components/ui/skeleton';
import { useContactPageContent, useContactItems, useLocations, useServicesList, useSubmitContactMessage } from '@/hooks/useContactPage';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const formSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service_id: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

type ContactFormValues = z.infer<typeof formSchema>;

const iconMap: { [key: string]: React.ElementType } = {
  Phone,
  Mail,
  Clock,
};

const Contact = () => {
  const { data: content, isLoading: isLoadingContent } = useContactPageContent();
  const { data: contactItems, isLoading: isLoadingItems } = useContactItems();
  const { data: locations, isLoading: isLoadingLocations } = useLocations();
  const { data: services, isLoading: isLoadingServices } = useServicesList();
  const { mutate: submitMessage, isPending: isSubmitting } = useSubmitContactMessage();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      company: '',
      service_id: '',
      message: '',
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    submitMessage({
      name: `${values.first_name} ${values.last_name}`,
      email: values.email,
      phone: values.phone || '',
      company: values.company || '',
      service_id: values.service_id ? parseInt(values.service_id, 10) : null,
      message: values.message,
    }, {
      onSuccess: () => form.reset(),
    });
  };

  const isLoading = isLoadingContent || isLoadingItems || isLoadingLocations;

  const renderContactItem = (info: any, index: number) => {
    const IconComponent = info.icon ? iconMap[info.icon] || Mail : Mail;
    return (
      <Card key={index} className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
              <IconComponent size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">{info.title}</h3>
              {(info.details as string[])?.map((detail: string, detailIndex: number) => (
                <p key={detailIndex} className="text-muted-foreground">
                  {detail}
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const headquarters = locations?.find(l => l.is_headquarters);
  const locationsWithMap = locations?.filter(l => l.map_embed_url) || [];
  const defaultMapLocation = headquarters && headquarters.map_embed_url 
    ? headquarters 
    : (locationsWithMap.length > 0 ? locationsWithMap[0] : null);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {isLoading ? (
              <>
                <Skeleton className="h-16 w-3/4 mx-auto mb-6 bg-slate-700" />
                <Skeleton className="h-6 w-full mx-auto bg-slate-700" />
                <Skeleton className="h-6 w-5/6 mx-auto mt-2 bg-slate-700" />
              </>
            ) : (
              <>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  {content?.hero?.title_part1}
                  <span className="block text-blue-400">{content?.hero?.title_part2}</span>
                </h1>
                <p className="text-xl text-slate-300 mb-8">
                  {content?.hero?.description}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">{isLoading ? <Skeleton className="h-9 w-72" /> : content?.form_title?.text}</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="first_name" render={({ field }) => (<FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="last_name" render={({ field }) => (<FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="john@company.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" placeholder="+1 (555) 123-4567" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="company" render={({ field }) => (<FormItem><FormLabel>Company</FormLabel><FormControl><Input placeholder="Your Company Name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="service_id" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Interest</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingServices ? <SelectItem value="loading" disabled>Loading...</SelectItem> : services?.map(service => <SelectItem key={service.id} value={String(service.id)}>{service.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormLabel>Message</FormLabel><FormControl><Textarea className="h-32 resize-none" placeholder="Tell us about your project requirements..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-8">{isLoading ? <Skeleton className="h-9 w-80" /> : content?.info_title?.text}</h2>
              <div className="space-y-6">
                {isLoadingLocations && Array.from({ length: 2 }).map((_, i) => <Card key={i}><CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent></Card>)}
                
                {locations?.map(location => (
                   <Card key={location.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2 flex items-center">
                            {location.name}
                            {location.is_headquarters && <Badge variant="secondary" className="ml-2">Headquarters</Badge>}
                          </h3>
                          <p className="text-muted-foreground">{location.address}</p>
                          <p className="text-muted-foreground">{location.city}, {location.country}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {isLoadingItems ? Array.from({ length: 3 }).map((_, i) => <Card key={i}><CardContent className="p-6"><Skeleton className="h-12 w-full" /></CardContent></Card>) : contactItems?.map(renderContactItem)}
              </div>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <CardHeader>
                  <CardTitle>{isLoadingContent ? <Skeleton className="h-7 w-64 bg-blue-500" /> : content?.immediate_assistance?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingContent ? <Skeleton className="h-10 w-full bg-blue-500" /> : <p className="text-blue-100 mb-4">{content?.immediate_assistance?.description}</p>}
                  <div className="space-y-3">
                    <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">Call Emergency Line</Button>
                    <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600">Schedule Consultation</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{isLoadingContent ? <Skeleton className="h-9 w-96 mx-auto" /> : content?.map_title?.title || "Visit Our Locations"}</h2>
            <p className="text-muted-foreground">{isLoadingContent ? <Skeleton className="h-6 w-80 mx-auto" /> : content?.map_title?.description || "Find us at any of our locations."}</p>
          </div>
            {isLoadingLocations ? (
                <Card className="overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-slate-400" /></div>
                </Card>
            ) : locationsWithMap.length > 0 && defaultMapLocation ? (
            <Tabs defaultValue={defaultMapLocation.id.toString()} className="w-full">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                {locationsWithMap.map(location => (
                  <TabsTrigger key={location.id} value={location.id.toString()}>{location.name}</TabsTrigger>
                ))}
              </TabsList>
              {locationsWithMap.map(location => (
                <TabsContent key={location.id} value={location.id.toString()}>
                  <Card className="overflow-hidden">
                    <div className="aspect-video"><iframe src={location.map_embed_url!} width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
             <Card className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"><div className="text-center"><MapPin size={48} className="text-slate-400 mx-auto mb-4" /><h3 className="text-xl font-bold text-slate-600 mb-2">No Location Maps Available</h3><p className="text-slate-500">Map data has not been configured for our locations.</p></div></div>
            </Card>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

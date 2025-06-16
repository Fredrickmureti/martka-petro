
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
      <Card key={index} 
            className="hover-3d-gentle group transform-gpu"
            style={{ 
              animation: `fadeInUp 0.6s ease-out ${0.1 * index}s both`,
              transformStyle: 'preserve-3d'
            }}>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center flex-shrink-0 transform group-hover:translateZ-20 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-500/25 transition-all duration-500">
              <IconComponent size={24} className="text-white" />
            </div>
            <div className="transform group-hover:translateZ-10 transition-transform duration-300">
              <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">{info.title}</h3>
              {(info.details as string[])?.map((detail: string, detailIndex: number) => (
                <p key={detailIndex} className="text-muted-foreground transform group-hover:translateZ-5 transition-transform duration-300">
                  {detail}
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const headquartersList = locations?.filter(l => l.is_headquarters) || [];
  const locationsWithMap = locations?.filter(l => l.map_embed_url) || [];
  
  const defaultHqWithMap = headquartersList.find(l => l.map_embed_url);

  const defaultMapLocation = defaultHqWithMap 
    ? defaultHqWithMap 
    : (locationsWithMap.length > 0 ? locationsWithMap[0] : null);

  return (
    <Layout>
      {/* Enhanced Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden perspective-1500">
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-24 h-24 bg-blue-400/10 rounded-full blur-xl animate-float-gentle stagger-1"></div>
          <div className="absolute top-40 right-20 w-20 h-20 bg-cyan-400/10 rounded-lg blur-lg animate-pulse-3d stagger-2"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-blue-300/10 rounded-full blur-lg animate-float-slow stagger-3"></div>
          <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-violet-400/10 rounded-lg blur-md animate-float stagger-4"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center transform-gpu">
            {isLoading ? (
              <>
                <Skeleton className="h-16 w-3/4 mx-auto mb-6 bg-slate-700" />
                <Skeleton className="h-6 w-full mx-auto bg-slate-700" />
                <Skeleton className="h-6 w-5/6 mx-auto mt-2 bg-slate-700" />
              </>
            ) : (
              <>
                <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight transform hover:scale-105 transition-all duration-700 animate-fade-in-down" 
                    style={{ 
                      animation: 'fadeInDown 1s ease-out, float 8s ease-in-out infinite',
                      transform: 'translateZ(50px)'
                    }}>
                  {content?.hero?.title_part1}
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent transform hover:scale-110 transition-transform duration-500" 
                        style={{ transform: 'translateZ(80px)' }}>
                    {content?.hero?.title_part2}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed transform hover:scale-105 transition-all duration-500"
                   style={{ 
                     animation: 'fadeInUp 1s ease-out 0.3s both, floatGentle 6s ease-in-out infinite',
                     transform: 'translateZ(30px)'
                   }}>
                  {content?.hero?.description}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form & Info Section */}
      <section className="py-24 bg-background perspective-1200">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Enhanced Contact Form */}
            <div className="transform hover:scale-[1.02] transition-all duration-700" style={{ animation: 'fadeInLeft 0.8s ease-out' }}>
              <div className="glass-card p-8 rounded-2xl backdrop-blur-sm border border-blue-100">
                <h2 className="text-3xl font-bold mb-8 transform hover:translateZ-10 transition-transform duration-300">
                  {isLoading ? <Skeleton className="h-9 w-72" /> : content?.form_title?.text}
                </h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="transform hover:translateZ-5 transition-transform duration-300">
                        <FormField control={form.control} name="first_name" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} className="transition-all duration-300 focus:scale-105" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <div className="transform hover:translateZ-5 transition-transform duration-300">
                        <FormField control={form.control} name="last_name" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} className="transition-all duration-300 focus:scale-105" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    </div>
                    
                    <div className="transform hover:translateZ-5 transition-transform duration-300">
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@company.com" {...field} className="transition-all duration-300 focus:scale-105" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="transform hover:translateZ-5 transition-transform duration-300">
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Phone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+1 (555) 123-4567" {...field} className="transition-all duration-300 focus:scale-105" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="transform hover:translateZ-5 transition-transform duration-300">
                      <FormField control={form.control} name="company" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Company Name" {...field} className="transition-all duration-300 focus:scale-105" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="transform hover:translateZ-5 transition-transform duration-300">
                      <FormField control={form.control} name="service_id" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Service Interest</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="transition-all duration-300 focus:scale-105">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {isLoadingServices ? <SelectItem value="loading" disabled>Loading...</SelectItem> : services?.map(service => <SelectItem key={service.id} value={String(service.id)}>{service.name}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="transform hover:translateZ-5 transition-transform duration-300">
                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Message</FormLabel>
                          <FormControl>
                            <Textarea className="h-32 resize-none transition-all duration-300 focus:scale-105" placeholder="Tell us about your project requirements..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    
                    <Button type="submit" disabled={isSubmitting} 
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 hover:translateZ-10 hover:shadow-2xl transition-all duration-300">
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Send Message
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Enhanced Contact Information */}
            <div className="space-y-8 transform hover:scale-[1.02] transition-all duration-700" style={{ animation: 'fadeInRight 0.8s ease-out' }}>
              <h2 className="text-3xl font-bold mb-8 transform hover:translateZ-10 transition-transform duration-300">
                {isLoading ? <Skeleton className="h-9 w-80" /> : content?.info_title?.text}
              </h2>
              
              <div className="space-y-6">
                {isLoadingLocations && Array.from({ length: 2 }).map((_, i) => 
                  <Card key={i} className="hover-3d-gentle">
                    <CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent>
                  </Card>
                )}
                
                {locations?.map((location, index) => (
                   <Card key={location.id} 
                         className="hover-3d-gentle group transform-gpu"
                         style={{ 
                           animation: `fadeInUp 0.6s ease-out ${0.1 * index}s both`,
                           transformStyle: 'preserve-3d'
                         }}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center flex-shrink-0 transform group-hover:translateZ-20 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-500/25 transition-all duration-500">
                          <MapPin size={24} className="text-white" />
                        </div>
                        <div className="transform group-hover:translateZ-10 transition-transform duration-300">
                          <h3 className="font-bold text-lg mb-2 flex items-center group-hover:text-blue-600 transition-colors duration-300">
                            {location.name}
                            {location.is_headquarters && <Badge variant="secondary" className="ml-2 transform group-hover:scale-110 transition-transform duration-300">Headquarters</Badge>}
                          </h3>
                          <p className="text-muted-foreground">{location.address}</p>
                          <p className="text-muted-foreground">{location.city}, {location.country}</p>
                          {location.business_hours && (
                            <div className="flex items-center text-sm text-muted-foreground mt-2 transform group-hover:translateZ-5 transition-transform duration-300">
                                <Clock className="mr-2 h-4 w-4" />
                                <span>{location.business_hours}</span>
                            </div>
                           )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {isLoadingItems ? Array.from({ length: 3 }).map((_, i) => 
                  <Card key={i} className="hover-3d-gentle">
                    <CardContent className="p-6"><Skeleton className="h-12 w-full" /></CardContent>
                  </Card>
                ) : contactItems?.map(renderContactItem)}
              </div>

              {/* Enhanced Quick Actions */}
              <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white hover-3d-gentle group transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
                <CardHeader className="transform group-hover:translateZ-10 transition-transform duration-300">
                  <CardTitle>{isLoadingContent ? <Skeleton className="h-7 w-64 bg-blue-500" /> : content?.immediate_assistance?.title}</CardTitle>
                </CardHeader>
                <CardContent className="transform group-hover:translateZ-5 transition-transform duration-300">
                  {isLoadingContent ? <Skeleton className="h-10 w-full bg-blue-500" /> : <p className="text-blue-100 mb-4">{content?.immediate_assistance?.description}</p>}
                  <div className="space-y-3">
                    <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 transform hover:scale-105 hover:translateZ-10 transition-all duration-300">Call Emergency Line</Button>
                    <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 hover:translateZ-10 transition-all duration-300">Schedule Consultation</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Map Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 perspective-1000">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
            <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">{isLoadingContent ? <Skeleton className="h-9 w-96 mx-auto" /> : content?.map_title?.title || "Visit Our Locations"}</h2>
            <p className="text-xl text-muted-foreground animate-fade-in-up stagger-1">{isLoadingContent ? <Skeleton className="h-6 w-80 mx-auto" /> : content?.map_title?.description || "Find us at any of our locations."}</p>
          </div>
            {isLoadingLocations ? (
                <Card className="overflow-hidden hover-3d-gentle transform transition-all duration-500">
                    <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                      <Loader2 className="h-12 w-12 animate-spin text-slate-400" />
                    </div>
                </Card>
            ) : locationsWithMap.length > 0 && defaultMapLocation ? (
            <div className="transform hover:scale-[1.02] transition-all duration-700" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
              <Tabs defaultValue={defaultMapLocation.id.toString()} className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6 bg-white/50 backdrop-blur-sm">
                  {locationsWithMap.map((location, index) => (
                    <TabsTrigger key={location.id} value={location.id.toString()} 
                                className="transform hover:scale-105 transition-all duration-300"
                                style={{ animation: `fadeInDown 0.6s ease-out ${0.1 * index}s both` }}>
                      {location.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {locationsWithMap.map(location => (
                  <TabsContent key={location.id} value={location.id.toString()}>
                    <Card className="overflow-hidden hover-3d-gentle transform-gpu group" style={{ transformStyle: 'preserve-3d' }}>
                      <div className="aspect-video transform group-hover:translateZ-10 transition-transform duration-500">
                        <iframe src={location.map_embed_url!} width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg"></iframe>
                      </div>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          ) : (
             <Card className="overflow-hidden hover-3d-gentle transform transition-all duration-500" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
                <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <div className="text-center transform hover:scale-105 transition-transform duration-300">
                    <MapPin size={48} className="text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-600 mb-2">No Location Maps Available</h3>
                    <p className="text-slate-500">Map data has not been configured for our locations.</p>
                  </div>
                </div>
            </Card>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Layout from '@/components/layout/Layout';
import { useContactPageContent, useContactItems, useHeadquarters, useServicesList, useSubmitContactMessage } from '@/hooks/useContactPage';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(5, 'Please enter a valid phone number'),
  company: z.string().optional(),
  service_id: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: pageContent, isLoading: isLoadingPageContent } = useContactPageContent();
  const { data: contactItems, isLoading: isLoadingContactItems } = useContactItems();
  const { data: headquarters, isLoading: isLoadingHeadquarters } = useHeadquarters();
  const { data: services, isLoading: isLoadingServices } = useServicesList();
  const submitContactMessage = useSubmitContactMessage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service_id: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await submitContactMessage.mutateAsync({
        ...values,
        service_id: values.service_id ? parseInt(values.service_id) : null,
      });
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const heroContent = pageContent?.hero || {};
  const formContent = pageContent?.form || {};
  const headquartersContent = pageContent?.headquarters || {};

  return (
    <Layout>
      {/* Hero Section with Background Image */}
      <section 
        className="pt-32 pb-20 text-white overflow-hidden perspective-1000 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(30, 64, 175, 0.8)), url("https://images.unsplash.com/photo-1527576539890-dfa815648363")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            {isLoadingPageContent ? (
              <>
                <Skeleton className="h-16 w-3/4 mx-auto mb-6 bg-slate-700" />
                <Skeleton className="h-6 w-full mx-auto bg-slate-700" />
              </>
            ) : (
              <>
                <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight animate-fade-in-down">
                  {heroContent.title || 'Get in Touch'}
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed animate-fade-in-up">
                  {heroContent.subtitle || 'Ready to discuss your petroleum infrastructure needs? Contact our expert team today.'}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

      {/* Contact Information Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Contact Information</h2>
            <p className="text-xl text-muted-foreground">Multiple ways to reach our team</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {isLoadingContactItems ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="hover-3d-gentle">
                <CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent>
              </Card>
            )) : (contactItems || []).map((item, index) => (
              <Card key={item.id} className="hover-3d-gentle group transform-gpu cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {item.icon === 'MapPin' && <MapPin size={32} className="text-white" />}
                    {item.icon === 'Phone' && <Phone size={32} className="text-white" />}
                    {item.icon === 'Mail' && <Mail size={32} className="text-white" />}
                    {item.icon === 'Clock' && <Clock size={32} className="text-white" />}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">{item.title}</h3>
                  <div className="text-muted-foreground space-y-1">
                    {item.details && typeof item.details === 'object' && (
                      Object.entries(item.details as Record<string, any>).map(([key, value]) => (
                        <p key={key} className="text-sm">{String(value)}</p>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

      {/* Contact Form and Map Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="hover-3d-gentle">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {formContent.title || 'Send us a message'}
                </CardTitle>
                <p className="text-muted-foreground">
                  {formContent.subtitle || 'Fill out the form below and we\'ll get back to you shortly.'}
                </p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Company" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="service_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interested In</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services?.map((service) => (
                                <SelectItem key={service.id} value={String(service.id)}>
                                  {service.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us more about your project"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="hover-3d-gentle">
              <CardContent className="p-0">
                <div className="h-full min-h-[400px] bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={48} className="mx-auto mb-4 text-slate-500" />
                    <p className="text-slate-600 dark:text-slate-400">Interactive Map Coming Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

      {/* Headquarters Section with Enhanced Styling */}
      <section 
        className="py-20 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.95)), url("https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-background/80 dark:bg-background/90"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              {headquartersContent.title || 'Visit Our Headquarters'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {headquartersContent.subtitle || 'Our main offices and facilities around the world'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {isLoadingHeadquarters ? Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="hover-3d-gentle">
                <CardContent className="p-6"><Skeleton className="h-40 w-full" /></CardContent>
              </Card>
            )) : (headquarters || []).map((location) => (
              <Card key={location.id} className="hover-3d-gentle group transform-gpu border-2 border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                    {location.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={16} />
                    <p className="text-sm text-muted-foreground">
                      {location.address}, {location.city}, {location.country}
                    </p>
                  </div>
                  {location.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="text-blue-600 flex-shrink-0" size={16} />
                      <p className="text-sm text-muted-foreground">{location.phone}</p>
                    </div>
                  )}
                  {location.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="text-blue-600 flex-shrink-0" size={16} />
                      <p className="text-sm text-muted-foreground">{location.email}</p>
                    </div>
                  )}
                  {location.business_hours && (
                    <div className="flex items-start space-x-3">
                      <Clock className="text-blue-600 mt-1 flex-shrink-0" size={16} />
                      <p className="text-sm text-muted-foreground">{location.business_hours}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

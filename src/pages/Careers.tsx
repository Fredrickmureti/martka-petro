
import React from 'react';
import { MapPin, Clock, DollarSign, Users, Award, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { useCareers } from '@/hooks/useCareers';

const Careers = () => {
  const { data: jobs = [], isLoading } = useCareers();

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Compensation',
      description: 'Market-leading salaries with performance bonuses and profit sharing opportunities.',
    },
    {
      icon: Award,
      title: 'Comprehensive Benefits',
      description: 'Full health, dental, vision insurance plus 401(k) matching and life insurance.',
    },
    {
      icon: Clock,
      title: 'Work-Life Balance',
      description: 'Flexible schedules, remote work options, and generous PTO policy.',
    },
    {
      icon: Users,
      title: 'Professional Development',
      description: 'Ongoing training, certification support, and career advancement opportunities.',
    },
  ];

  const culture = [
    'Innovation-driven environment with cutting-edge technology',
    'Collaborative team culture with open communication',
    'Commitment to safety and environmental responsibility',
    'Opportunities to work on industry-leading projects',
    'Diverse and inclusive workplace',
    'Strong community involvement and volunteer programs',
  ];

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-32 pb-16 text-center">
          <div className="text-xl">Loading careers...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Join Our
              <span className="block text-blue-400">Team</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Build your career with the industry leader in petroleum infrastructure. 
              We're looking for passionate professionals to join our growing team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View Open Positions
              </Button>
              <Button size="lg" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                Learn About Culture
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
            <p className="text-muted-foreground">Competitive benefits and a culture that values your growth</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-muted-foreground">Find your next opportunity with our growing team</p>
          </div>
          
          <div className="space-y-6 max-w-5xl mx-auto">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        {job.department && <Badge variant="outline">{job.department}</Badge>}
                        {job.location && (
                          <Badge variant="outline" className="text-blue-600">
                            <MapPin size={12} className="mr-1" />
                            {job.location}
                          </Badge>
                        )}
                        {job.type && (
                          <Badge variant="outline">
                            <Clock size={12} className="mr-1" />
                            {job.type}
                          </Badge>
                        )}
                        {job.experience_required && (
                          <Badge variant="outline">
                            <Briefcase size={12} className="mr-1" />
                            {job.experience_required}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {job.salary_range && (
                        <div className="text-lg font-bold text-blue-600 mb-2">{job.salary_range}</div>
                      )}
                      <Button className="bg-gradient-to-r from-blue-600 to-blue-700">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {job.description && (
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                  )}
                  {job.requirements && (
                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {(job.requirements as string[]).map((req, reqIndex) => (
                          <li key={reqIndex} className="text-sm text-muted-foreground flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Culture & Values</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                At Martka Petroleum, we believe our people are our greatest asset. We foster 
                an environment where innovation thrives, collaboration is valued, and every 
                team member has the opportunity to grow and succeed.
              </p>
              
              <div className="space-y-3">
                {culture.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white flex flex-col justify-center text-center">
                  <div className="text-3xl font-bold mb-2">25+</div>
                  <div className="text-blue-100 text-sm">Years in Business</div>
                </div>
                <div className="aspect-square bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-6 text-white flex flex-col justify-center text-center">
                  <div className="text-3xl font-bold mb-2">150+</div>
                  <div className="text-green-100 text-sm">Team Members</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-white flex flex-col justify-center text-center">
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <div className="text-purple-100 text-sm">Employee Satisfaction</div>
                </div>
                <div className="aspect-square bg-gradient-to-br from-orange-600 to-orange-800 rounded-2xl p-6 text-white flex flex-col justify-center text-center">
                  <div className="text-3xl font-bold mb-2">4.8</div>
                  <div className="text-orange-100 text-sm">Glassdoor Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Career?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Don't see the perfect position? We're always looking for talented individuals 
            to join our team. Send us your resume and let's talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Submit General Application
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Contact HR Team
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;

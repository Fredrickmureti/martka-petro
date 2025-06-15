
import React from 'react';
import { MapPin, Clock, DollarSign, Users, Award, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';

const Careers = () => {
  const jobs = [
    {
      title: 'Senior Petroleum Engineer',
      department: 'Engineering',
      location: 'Houston, TX',
      type: 'Full-time',
      salary: '$95,000 - $120,000',
      experience: '5+ years',
      description: 'Lead complex fuel infrastructure projects and provide technical expertise for advanced petroleum systems.',
      requirements: ['Bachelor\'s in Petroleum/Chemical Engineering', '5+ years fuel infrastructure experience', 'Professional Engineering license preferred', 'Project management skills'],
    },
    {
      title: 'Field Service Technician',
      department: 'Operations',
      location: 'Dallas, TX',
      type: 'Full-time',
      salary: '$55,000 - $70,000',
      experience: '2+ years',
      description: 'Perform installation, maintenance, and repair of fuel dispensers and related equipment.',
      requirements: ['Technical certification or equivalent experience', 'Experience with fuel equipment', 'Valid driver\'s license', 'Ability to work in various weather conditions'],
    },
    {
      title: 'Project Manager',
      department: 'Project Management',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$80,000 - $100,000',
      experience: '3+ years',
      description: 'Oversee fuel station construction projects from planning through completion, ensuring quality and timeline adherence.',
      requirements: ['Bachelor\'s degree preferred', 'PMP certification a plus', '3+ years construction project management', 'Strong communication skills'],
    },
    {
      title: 'Sales Representative',
      department: 'Sales',
      location: 'San Antonio, TX',
      type: 'Full-time',
      salary: '$60,000 - $90,000 + Commission',
      experience: '2+ years',
      description: 'Develop new business relationships and manage existing accounts in the petroleum industry.',
      requirements: ['Sales experience in B2B environment', 'Knowledge of petroleum industry preferred', 'Strong relationship building skills', 'Travel required'],
    },
    {
      title: 'Environmental Compliance Specialist',
      department: 'Compliance',
      location: 'Houston, TX',
      type: 'Full-time',
      salary: '$65,000 - $85,000',
      experience: '3+ years',
      description: 'Ensure all projects meet environmental regulations and maintain compliance documentation.',
      requirements: ['Environmental Science or related degree', 'Knowledge of EPA regulations', 'Experience with environmental compliance', 'Attention to detail'],
    },
    {
      title: 'Software Developer',
      department: 'Technology',
      location: 'Remote',
      type: 'Full-time',
      salary: '$75,000 - $95,000',
      experience: '3+ years',
      description: 'Develop and maintain fuel management software systems and IoT solutions.',
      requirements: ['Computer Science degree or equivalent', 'Experience with React/Node.js', 'IoT/embedded systems knowledge a plus', 'Problem-solving skills'],
    },
  ];

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
            {jobs.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{job.department}</Badge>
                        <Badge variant="outline" className="text-blue-600">
                          <MapPin size={12} className="mr-1" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline">
                          <Clock size={12} className="mr-1" />
                          {job.type}
                        </Badge>
                        <Badge variant="outline">
                          <Briefcase size={12} className="mr-1" />
                          {job.experience}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600 mb-2">{job.salary}</div>
                      <Button className="bg-gradient-to-r from-blue-600 to-blue-700">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="text-sm text-muted-foreground flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
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

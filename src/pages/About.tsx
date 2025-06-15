
import React from 'react';
import { Award, Users, Globe, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';

const About = () => {
  const timeline = [
    {
      year: '1999',
      title: 'Company Founded',
      description: 'Martka Petroleum established with a vision to revolutionize fuel infrastructure.',
    },
    {
      year: '2005',
      title: 'Regional Expansion',
      description: 'Expanded operations across Texas and neighboring states.',
    },
    {
      year: '2010',
      title: 'Technology Integration',
      description: 'Pioneered advanced fuel management and monitoring systems.',
    },
    {
      year: '2015',
      title: 'Environmental Leadership',
      description: 'Launched eco-friendly construction and sustainable practices program.',
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Implemented cutting-edge IoT and cloud-based solutions.',
    },
    {
      year: '2024',
      title: 'Industry Recognition',
      description: 'Received multiple awards for innovation and environmental stewardship.',
    },
  ];

  const team = [
    {
      name: 'John Martinez',
      position: 'CEO & Founder',
      experience: '25+ years',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    },
    {
      name: 'Sarah Chen',
      position: 'Chief Technology Officer',
      experience: '15+ years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop&crop=face',
    },
    {
      name: 'Michael Rodriguez',
      position: 'VP of Operations',
      experience: '20+ years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    },
    {
      name: 'Emily Thompson',
      position: 'Head of Engineering',
      experience: '12+ years',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Uncompromising commitment to safety in all our operations and installations.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Delivering superior quality and exceeding client expectations in every project.',
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Environmental responsibility and sustainable practices in all our solutions.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Building lasting partnerships with clients, suppliers, and communities.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About
              <span className="block text-blue-400">Martka Petroleum</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Leading the petroleum infrastructure industry for over 25 years with innovation, 
              expertise, and unwavering commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                To provide world-class fuel infrastructure solutions that empower businesses 
                to operate efficiently, safely, and sustainably. We leverage cutting-edge 
                technology and deep industry expertise to deliver exceptional value to our clients.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span>Innovative fuel management solutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span>Uncompromising safety standards</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span>Environmental stewardship</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span>Exceptional customer service</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white">
              <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
              <p className="text-blue-100 mb-6 leading-relaxed">
                To be the global leader in petroleum infrastructure, setting new standards 
                for innovation, sustainability, and operational excellence in the energy sector.
              </p>
              <div className="bg-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">By 2030, we aim to:</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• Expand to 10+ international markets</li>
                  <li>• Achieve carbon-neutral operations</li>
                  <li>• Lead in smart fuel technology</li>
                  <li>• Serve 1000+ satisfied clients</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide every decision we make and every project we undertake.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              25 years of growth, innovation, and industry leadership.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200" />
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className="relative flex items-start space-x-8">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold">
                      {item.year}
                    </div>
                    <div className="flex-1 min-w-0 pb-8">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the experienced professionals leading Martka Petroleum into the future.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                  <Badge variant="outline" className="text-xs">
                    {member.experience} experience
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

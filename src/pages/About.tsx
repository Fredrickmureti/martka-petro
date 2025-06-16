
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
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight transform hover:scale-105 transition-all duration-700 animate-fade-in-down" 
                style={{ 
                  animation: 'fadeInDown 1s ease-out, float 8s ease-in-out infinite',
                  transform: 'translateZ(50px)'
                }}>
              About
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent transform hover:scale-110 transition-transform duration-500" 
                    style={{ transform: 'translateZ(80px)' }}>
                Martka Petroleum
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed transform hover:scale-105 transition-all duration-500"
               style={{ 
                 animation: 'fadeInUp 1s ease-out 0.3s both, floatGentle 6s ease-in-out infinite',
                 transform: 'translateZ(30px)'
               }}>
              Leading the petroleum infrastructure industry for over 25 years with innovation, 
              expertise, and unwavering commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Mission & Vision */}
      <section className="py-24 bg-background perspective-1200">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="transform hover:scale-[1.02] transition-all duration-700" style={{ animation: 'fadeInLeft 0.8s ease-out' }}>
              <div className="glass-card p-8 rounded-2xl">
                <h2 className="text-4xl font-bold mb-6 transform hover:translateZ-10 transition-transform duration-300">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed transform hover:translateZ-5 transition-transform duration-300">
                  To provide world-class fuel infrastructure solutions that empower businesses 
                  to operate efficiently, safely, and sustainably. We leverage cutting-edge 
                  technology and deep industry expertise to deliver exceptional value to our clients.
                </p>
                <div className="space-y-4">
                  {[
                    "Innovative fuel management solutions",
                    "Uncompromising safety standards", 
                    "Environmental stewardship",
                    "Exceptional customer service"
                  ].map((item, index) => (
                    <div key={index} 
                         className="flex items-center space-x-3 transform hover:translateX-4 hover:translateZ-5 transition-all duration-300"
                         style={{ animation: `fadeInLeft 0.6s ease-out ${0.1 * index}s both` }}>
                      <div className="w-2 h-2 bg-blue-600 rounded-full transform hover:scale-150 transition-transform duration-300" />
                      <span className="transform hover:text-blue-600 transition-colors duration-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="transform hover:scale-[1.02] transition-all duration-700" style={{ animation: 'fadeInRight 0.8s ease-out' }}>
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white hover-3d-gentle group transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
                <h2 className="text-4xl font-bold mb-6 transform group-hover:translateZ-20 transition-transform duration-300">Our Vision</h2>
                <p className="text-blue-100 mb-6 leading-relaxed transform group-hover:translateZ-10 transition-transform duration-300">
                  To be the global leader in petroleum infrastructure, setting new standards 
                  for innovation, sustainability, and operational excellence in the energy sector.
                </p>
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm transform group-hover:translateZ-15 group-hover:scale-105 transition-all duration-500">
                  <h3 className="text-xl font-bold mb-4 transform group-hover:translateZ-5 transition-transform duration-300">By 2030, we aim to:</h3>
                  <ul className="space-y-2 text-blue-100">
                    {[
                      "Expand to 10+ international markets",
                      "Achieve carbon-neutral operations",
                      "Lead in smart fuel technology", 
                      "Serve 1000+ satisfied clients"
                    ].map((goal, index) => (
                      <li key={index} 
                          className="transform hover:translateX-2 hover:translateZ-5 transition-all duration-300"
                          style={{ animation: `fadeInUp 0.6s ease-out ${0.1 * index}s both` }}>
                        • {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 perspective-1000">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
            <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up stagger-1">
              These principles guide every decision we make and every project we undertake.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} 
                    className="text-center interactive-card hover-3d-gentle group transform-gpu"
                    style={{ 
                      animation: `fadeInUp 0.8s ease-out ${0.1 * index}s both`,
                      transformStyle: 'preserve-3d'
                    }}>
                <CardContent className="p-8 card-content">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 card-icon group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-500">
                    <value.icon size={32} className="text-white transform group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 card-title group-hover:text-blue-600 transition-colors duration-300">{value.title}</h3>
                  <p className="text-muted-foreground transform group-hover:translateZ-5 transition-transform duration-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Timeline */}
      <section className="py-24 bg-background perspective-1200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
            <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up stagger-1">
              25 years of growth, innovation, and industry leadership.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600" />
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} 
                       className="relative flex items-start space-x-8 group transform hover:scale-[1.02] transition-all duration-500"
                       style={{ animation: `fadeInRight 0.8s ease-out ${0.1 * index}s both` }}>
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold transform group-hover:scale-110 group-hover:translateZ-10 group-hover:shadow-xl group-hover:shadow-blue-500/25 transition-all duration-500 z-10">
                      {item.year}
                    </div>
                    <div className="flex-1 min-w-0 pb-8 glass-card p-6 rounded-xl transform group-hover:translateZ-5 group-hover:shadow-lg transition-all duration-500">
                      <h3 className="text-xl font-bold mb-2 transform group-hover:text-blue-600 transition-colors duration-300">{item.title}</h3>
                      <p className="text-muted-foreground transform group-hover:translateZ-5 transition-transform duration-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Leadership Team */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 perspective-1000">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
            <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up stagger-1">
              Meet the experienced professionals leading Martka Petroleum into the future.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} 
                    className="text-center overflow-hidden interactive-card hover-3d-gentle group transform-gpu"
                    style={{ 
                      animation: `fadeInUp 0.8s ease-out ${0.1 * index}s both`,
                      transformStyle: 'preserve-3d'
                    }}>
                <div className="aspect-square overflow-hidden transform group-hover:translateZ-10 transition-transform duration-500">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6 card-content">
                  <h3 className="text-xl font-bold mb-2 card-title group-hover:text-blue-600 transition-colors duration-300">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2 transform group-hover:translateZ-5 transition-transform duration-300">{member.position}</p>
                  <Badge variant="outline" className="text-xs transform group-hover:translateZ-10 group-hover:scale-110 transition-all duration-300">
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

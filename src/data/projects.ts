
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Metro City Fuel Complex',
    slug: 'metro-city-fuel-complex',
    category: 'construction',
    location: 'Houston, TX',
    status: 'Completed',
    year: 2024,
    description: 'Complete fuel station construction with 12 dispensers and modern convenience store.',
    longDescription: 'A comprehensive fuel complex project featuring state-of-the-art dispensing technology, environmental safety systems, and a modern convenience store. This project showcases our expertise in large-scale fuel infrastructure development with a focus on efficiency and environmental compliance.',
    client: 'Metro Energy Corp',
    budget: '$2.5M',
    area: '3.2 acres',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop',
        alt: 'Completed fuel complex with 12 dispensers',
        type: 'hero'
      },
      {
        url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
        alt: 'Modern convenience store interior',
        type: 'gallery'
      },
      {
        url: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop',
        alt: 'Underground storage tank installation',
        type: 'technical'
      }
    ],
    tags: ['Construction', 'POS Systems', 'Environmental Compliance'],
    specifications: [
      { name: 'Dispensers', value: '12 Multi-Product Dispensers' },
      { name: 'Storage Capacity', value: '30,000 gallons' },
      { name: 'Fuel Types', value: 'Regular, Premium, Diesel' },
      { name: 'Payment Systems', value: 'EMV, NFC, Mobile Pay' },
      { name: 'Monitoring', value: 'Real-time leak detection' },
      { name: 'POS System', value: 'Cloud-based management' }
    ],
    timeline: [
      {
        date: '2024-02-28',
        description: 'Site survey, permits, and detailed engineering',
        status: 'completed'
      },
      {
        date: '2024-05-15',
        description: 'Site preparation and infrastructure installation',
        status: 'completed'
      },
      {
        date: '2024-06-01',
        description: 'System testing and final inspection',
        status: 'completed'
      }
    ],
    teamMembers: [
      { name: 'John Rodriguez', role: 'Project Manager' },
      { name: 'Sarah Chen', role: 'Lead Engineer' },
      { name: 'Mike Thompson', role: 'Construction Supervisor' }
    ],
    challenges: [
      'Complex underground utility network required careful coordination',
      'Environmental compliance in urban setting',
      'Maintaining traffic flow during construction'
    ],
    solutions: [
      'Advanced 3D mapping and coordination with utility companies',
      'Implementation of enhanced environmental monitoring systems',
      'Phased construction approach to minimize disruption'
    ],
    results: [
      'Project completed 2 weeks ahead of schedule',
      '100% environmental compliance maintained',
      'Customer satisfaction rating: 98%',
      'Zero safety incidents during construction'
    ],
    testimonial: {
      quote: 'Martka Engineering exceeded our expectations in every aspect of this project. Their attention to detail and commitment to environmental safety was outstanding.',
      author: 'David Martinez',
      position: 'Operations Director',
      company: 'Metro Energy Corp'
    }
  },
  {
    id: 2,
    title: 'Highway Express Station',
    slug: 'highway-express-station',
    category: 'installation',
    location: 'Dallas, TX',
    status: 'Completed',
    year: 2024,
    description: 'Advanced dispenser installation with EMV payment systems and real-time monitoring.',
    longDescription: 'A high-tech fuel dispensing installation featuring the latest in payment technology and monitoring systems. This project demonstrates our capability to integrate cutting-edge technology with reliable fuel dispensing infrastructure.',
    client: 'Express Fuel Networks',
    budget: '$850K',
    area: '1.8 acres',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        alt: 'Modern fuel dispensers with EMV technology',
        type: 'hero'
      },
      {
        url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop',
        alt: 'Installation process documentation',
        type: 'gallery'
      }
    ],
    tags: ['Installation', 'EMV Systems', 'Monitoring'],
    specifications: [
      { name: 'Units', value: '8 High-Speed Dispensers' },
      { name: 'Flow Rate', value: '10 GPM per nozzle' },
      { name: 'Technology', value: 'EMV Level 3 Certified' }
    ],
    timeline: [
      {
        date: '2024-03-15',
        description: 'Dispenser and system installation',
        status: 'completed'
      }
    ],
    teamMembers: [
      { name: 'Alex Johnson', role: 'Installation Lead' },
      { name: 'Maria Garcia', role: 'Technical Specialist' }
    ],
    challenges: [
      'Integration with existing fuel management systems',
      'EMV compliance requirements'
    ],
    solutions: [
      'Custom API development for seamless integration',
      'Comprehensive EMV certification process'
    ],
    results: [
      'Successful EMV Level 3 certification',
      '25% increase in transaction processing speed',
      'Zero downtime during installation'
    ]
  },
  {
    id: 3,
    title: 'Green Valley Infrastructure',
    slug: 'green-valley-infrastructure',
    category: 'infrastructure',
    location: 'Austin, TX',
    status: 'In Progress',
    year: 2024,
    description: 'Custom fuel infrastructure design for environmentally sensitive location.',
    longDescription: 'An innovative infrastructure project focused on environmental sustainability and protection. This project showcases our commitment to eco-friendly fuel infrastructure solutions.',
    client: 'Green Valley Development',
    budget: '$1.8M',
    area: '2.5 acres',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=600&fit=crop',
        alt: 'Environmental protection systems installation',
        type: 'hero'
      }
    ],
    tags: ['Infrastructure', 'Environmental', 'Custom Design'],
    specifications: [
      { name: 'Containment', value: 'Double-wall construction' },
      { name: 'Monitoring', value: 'Continuous leak detection' },
      { name: 'Compliance', value: 'EPA Tier 3 standards' }
    ],
    timeline: [
      {
        date: '2024-03-31',
        description: 'Environmental impact assessment and design',
        status: 'completed'
      },
      {
        date: '2024-06-30',
        description: 'Site preparation and foundation work',
        status: 'in_progress'
      }
    ],
    teamMembers: [
      { name: 'Dr. Emily Watson', role: 'Environmental Engineer' },
      { name: 'Robert Kim', role: 'Project Coordinator' }
    ],
    challenges: [
      'Sensitive environmental location',
      'Strict regulatory requirements'
    ],
    solutions: [
      'Advanced environmental monitoring systems',
      'Collaborative approach with regulatory agencies'
    ],
    results: [
      'Environmental impact assessment approved',
      'All permits obtained ahead of schedule'
    ]
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  color: string;
  tags: string[];
  caseStudy?: {
    overview: string;
    problem: string;
    solution: string;
    process: string[];
    results: string[];
    mockups: string[];
  };
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'fintech-app-redesign',
    title: 'FinTech App Redesign',
    category: 'Mobile App',
    description:
      'Reimagining the banking experience with a focus on simplicity and trust. A complete overhaul of a financial app serving 2M+ users.',
    thumbnail: '/projects/fintech-thumb.jpg',
    color: 'from-[var(--pastel-lavender)] to-[var(--pastel-pink)]',
    tags: ['Mobile', 'Fintech', 'UX Research'],
    caseStudy: {
      overview:
        'A comprehensive redesign of a mobile banking application focusing on improving user trust, simplifying complex financial operations, and creating a more intuitive navigation system.',
      problem:
        'Users reported feeling overwhelmed by the existing interface. Key pain points included confusing navigation, unclear transaction statuses, and lack of trust indicators.',
      solution:
        'We implemented a clean, card-based interface with progressive disclosure, added real-time transaction updates, and introduced visual trust elements like security badges and confirmation animations.',
      process: [
        'Conducted user interviews with 50+ active users',
        'Created journey maps and identified pain points',
        'Designed wireframes and interactive prototypes',
        'Ran A/B tests on key user flows',
        'Iterated based on usability testing feedback',
      ],
      results: [
        '40% increase in user satisfaction scores',
        '25% reduction in support tickets',
        '60% faster task completion for key flows',
      ],
      mockups: [],
    },
  },
  {
    id: '2',
    slug: 'health-wellness-platform',
    title: 'Health & Wellness Platform',
    category: 'Web Application',
    description:
      'A holistic health tracking platform that empowers users to take control of their wellbeing through personalized insights.',
    thumbnail: '/projects/health-thumb.jpg',
    color: 'from-[var(--pastel-mint)] to-[var(--pastel-sky)]',
    tags: ['Web', 'Healthcare', 'Dashboard'],
    caseStudy: {
      overview:
        'Designed a comprehensive health platform that integrates fitness tracking, nutrition planning, and mental wellness features into one cohesive experience.',
      problem:
        "Users struggled with fragmented health apps that didn't communicate with each other. They wanted a unified view of their health data.",
      solution:
        'Created an integrated dashboard that pulls data from multiple sources and presents actionable insights in an easy-to-understand format.',
      process: [
        'Competitive analysis of 15+ health apps',
        'User persona development',
        'Information architecture mapping',
        'Design system creation',
        'Accessibility audit and improvements',
      ],
      results: [
        '4.8 star rating on app stores',
        '150% increase in daily active users',
        '35% improvement in user retention',
      ],
      mockups: [],
    },
  },
  {
    id: '3',
    slug: 'ecommerce-experience',
    title: 'E-Commerce Experience',
    category: 'E-Commerce',
    description:
      'Transforming online shopping with an immersive, personalized experience that increased conversions by 35%.',
    thumbnail: '/projects/ecommerce-thumb.jpg',
    color: 'from-[var(--pastel-peach)] to-[var(--pastel-cream)]',
    tags: ['Web', 'E-commerce', 'Conversion'],
    caseStudy: {
      overview:
        'A complete UX overhaul of an e-commerce platform focusing on reducing cart abandonment and improving product discovery.',
      problem:
        'High cart abandonment rates and low product discovery were hurting business metrics. Users found the checkout process cumbersome.',
      solution:
        'Simplified the checkout to 3 steps, added AI-powered recommendations, and implemented a visual search feature.',
      process: [
        'Analyzed user behavior through heatmaps',
        'Simplified checkout from 7 to 3 steps',
        'Implemented quick-view product cards',
        'Added wishlist and comparison features',
        'Conducted multivariate testing',
      ],
      results: [
        '35% increase in conversion rate',
        '50% reduction in cart abandonment',
        '28% increase in average order value',
      ],
      mockups: [],
    },
  },
  {
    id: '4',
    slug: 'saas-dashboard',
    title: 'SaaS Analytics Dashboard',
    category: 'Dashboard',
    description:
      'Simplifying complex data into actionable insights for business teams with an intuitive analytics platform.',
    thumbnail: '/projects/saas-thumb.jpg',
    color: 'from-[var(--pastel-sky)] to-[var(--pastel-lavender)]',
    tags: ['SaaS', 'Dashboard', 'Data Viz'],
    caseStudy: {
      overview:
        'Designed an analytics dashboard that transforms complex data into visual stories, enabling teams to make data-driven decisions faster.',
      problem:
        'Teams spent hours creating reports manually. The existing tool was powerful but had a steep learning curve.',
      solution:
        'Created a drag-and-drop report builder with smart suggestions and pre-built templates for common use cases.',
      process: [
        'Stakeholder interviews and requirements gathering',
        'Created user flow diagrams',
        'Designed component library',
        'Built interactive prototypes',
        'Conducted usability testing with 20 users',
      ],
      results: [
        '70% reduction in report creation time',
        '95% user adoption within first month',
        'NPS score improved from 32 to 67',
      ],
      mockups: [],
    },
  },
];

/**
 * Projects data and detailed case studies for Darshan Saravari.
 * Strict adherence to documented facts; TODO placeholders for live demo URLs.
 */

export const PROJECTS = [
  {
    slug: 'electronic-gadget-ecommerce',
    title: 'Full-Stack Electronic Gadget E-Commerce Platform',
    subtitle: 'Flagship MERN Platform with Razorpay Payment Integration & JWT Auth',
    category: 'Full-Stack Web Application',
    isFlagship: true,
    featured: true,
    fileExtension: '.jsx',
    status: 'Completed',
    overview:
      'A full-stack, responsive electronic gadget e-commerce platform built with React.js, Node.js, Express, and MongoDB. Features secure RESTful APIs, scalable CRUD operations for inventory and categories, JWT + Bcrypt authentication, and Razorpay payment gateway integration.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Bcrypt', 'Razorpay', 'Tailwind CSS'],
    // TODO: Replace with live deployed link once hosted
    liveUrl: 'https://electronic-shop-front-end-darshan.vercel.app',
    githubUrl: 'https://github.com/DarshanS04',
    // TODO: Add project screenshots in /public/images/projects/
    heroImage: '/images/projects/gadget-hero.webp',
    stats: [
      { label: 'Architecture', value: 'MERN Stack' },
      { label: 'Auth', value: 'JWT + Bcrypt' },
      { label: 'Payments', value: 'Razorpay API' },
      { label: 'Storage', value: 'MongoDB Atlas' },
    ],
    caseStudy: {
      problem:
        'Online electronics retail demands sub-second catalogue browsing, responsive multi-device layouts, secure stateful checkout sessions, and tamper-resistant payment verification. The challenge was building an end-to-end shopping experience from product filtering and inventory management to transactional integrity without relying on heavy third-party monolithic platforms.',
      architecture: [
        'Client-Tier: React.js SPA utilizing component-driven architecture, custom hooks for cart management, and client-side routing.',
        'API-Tier: Express.js RESTful service implementing modular route controllers, validation middleware, and JWT authentication guards.',
        'Data-Tier: MongoDB document model with optimized schemas for products, user credentials, orders, and nested category hierarchies.',
        'Payment-Gateway: Server-orchestrated Razorpay order creation and HMAC SHA256 cryptographic signature verification on webhook/callback.',
      ],
      keyFeatures: [
        'Scalable CRUD operations for products, categories, reviews, and stock inventory levels.',
        'Secure authentication pipeline utilizing Bcrypt password hashing (salted rounds) and stateless JSON Web Tokens (JWT).',
        'Real-time reactive cart and checkout drawer with localized persistence and price recalculation.',
        'Razorpay checkout integration with server-side order receipt generation and payment signature verification.',
        'Responsive layout adapted for mobile, tablet, and desktop viewports.',
      ],
      challenges: [
        'Secure Payment Verification: Preventing client-side payload tampering during checkout by computing server-side HMAC-SHA256 signatures over Razorpay order and payment IDs before fulfilling orders.',
        'Inventory Concurrency: Ensuring inventory deductions reflect accurately without race conditions during simultaneous user checkouts.',
      ],
      learnings: [
        'Deepened understanding of full-stack data contracts, REST API design principles, and HTTP status handling.',
        'Gained hands-on expertise in payment gateway webhook lifecycles and cryptographic signature validation.',
        'Mastered state synchronization between React local state and persistent server-side MongoDB documents.',
      ],
    },
  },
  {
    slug: 'bake-track',
    title: 'Bake Track - Smart Bakery Management App',
    subtitle: 'Real-Time Hybrid Android & Web Management System with Live Notifications',
    category: 'Android & Web Ecosystem',
    isFlagship: false,
    featured: true,
    fileExtension: '.java',
    status: 'Completed',
    overview:
      'A real-time hybrid management ecosystem built using Android (Java), Web (HTML/CSS/JS), and Firebase. Tailored for bakery operations across Managers, Distributors, and Customers with live inventory, billing, analytics, and stock expiry notifications built following Agile (Scrum).',
    techStack: ['Android (Java)', 'Firebase Realtime DB', 'Firebase Cloud Messaging', 'JavaScript', 'HTML5/CSS3', 'Agile (Scrum)'],
    // TODO: Replace with live demo / APK release link
    liveUrl: 'https://TODO-baketrack-demo.app',
    githubUrl: 'https://github.com/DarshanS04',
    heroImage: '/images/projects/baketrack-hero.webp',
    stats: [
      { label: 'Platforms', value: 'Android & Web' },
      { label: 'Database', value: 'Firebase Realtime' },
      { label: 'Role Access', value: '3 Portals' },
      { label: 'Methodology', value: 'Agile (Scrum)' },
    ],
    caseStudy: {
      problem:
        'Small-to-medium bakeries experience high inventory shrinkage from perishable goods, fragmented communication between distribution trucks and the central shop, and manual paper-based billing. A unified, synchronized platform was required to track batch shelf-life and coordinate three distinct user roles in real-time.',
      architecture: [
        'Mobile Client: Native Android application written in Java featuring role-based dashboards, background service workers, and Firebase SDK bindings.',
        'Web Portal: Responsive lightweight web console for managers to monitor billing reports and distribution manifests.',
        'Cloud Database & Sync: Firebase Realtime Database for instantaneous bi-directional synchronization of stock counts, ledger entries, and delivery statuses.',
        'Push Notifications: Firebase Cloud Messaging dispatching automated alerts upon low stock thresholds, upcoming product expiry, and confirmed invoice receipts.',
      ],
      keyFeatures: [
        'Tri-role access control for Managers, Distributors, and Customers with isolated permission gates.',
        'Dynamic inventory tracker logging product batches, production timestamps, and shelf-life expiry dates.',
        'Real-time automated push notifications when inventory drops below safety buffers or perishable items near expiration.',
        'Built-in billing and invoicing module calculating orders, customer tabs, and settlement summaries.',
        'Built following Agile (Scrum) iterations with continuous sprint reviews and backlog refinement.',
      ],
      challenges: [
        'Real-Time Offline Resilience: Handling fluctuating mobile network connectivity in delivery environments by configuring Firebase local disk persistence and synchronization queues.',
        'Role-Based Data Security: Authoring granular Firebase Security Rules to strictly isolate managerial financial reports from customer-facing menus and delivery driver routes.',
      ],
      learnings: [
        'Mastered native Android lifecycle management, asynchronous threading, and UI binding with Java.',
        'Practiced real-world Agile methodologies, sprint planning, and backlog velocity management.',
        'Learned real-time database schema structuring for document-less, hierarchical JSON trees.',
      ],
    },
  },
  {
    slug: 'minor-it-sphere',
    title: 'Minor IT Sphere App',
    subtitle: 'Collaborative Academic Resource & Quiz Platform for IT Students',
    category: 'Native Android Application',
    isFlagship: false,
    featured: true,
    fileExtension: '.apk',
    status: 'Completed',
    overview:
      'A native Android application developed with Java and Firebase designed for academic collaboration among students. Enables real-time sharing of academic resources, department event updates, interactive knowledge quizzes, and collaborative study groups.',
    techStack: ['Android (Java)', 'Firebase Realtime DB', 'Firebase Storage', 'Android Studio', 'Git'],
    // TODO: Replace with live APK link
    liveUrl: 'https://TODO-minorit-sphere-demo.app',
    githubUrl: 'https://github.com/DarshanS04',
    heroImage: '/images/projects/minorit-hero.webp',
    stats: [
      { label: 'Platform', value: 'Native Android' },
      { label: 'Language', value: 'Java' },
      { label: 'Backend', value: 'Firebase' },
      { label: 'Collab', value: 'Git Version Control' },
    ],
    caseStudy: {
      problem:
        'Engineering students often rely on disjointed messaging channels for syllabus notes, semester exam updates, event announcements, and peer study quizzes, resulting in lost materials and missed departmental deadlines.',
      architecture: [
        'Android Architecture: Native Activities and Fragments utilizing clean MVC separation with custom RecyclerView adapters.',
        'Cloud Storage & Database: Firebase Realtime Database for discussions and quiz metadata; Firebase Storage for academic lecture notes and PDFs.',
        'Notification Engine: Real-time listeners alerting enrolled students to upcoming department seminars and newly uploaded study guides.',
        'Version Control: Team-based Git workflow with branch protections, pull request reviews, and issue tracking.',
      ],
      keyFeatures: [
        'Academic Resource Hub: Centralized repository for lecture slides, previous year question papers, and lab manuals.',
        'Interactive Quiz Engine: Timed knowledge-check quizzes with immediate score calculation and review keys.',
        'Department Event Bulletin: Synchronized calendar of tech talks, hackathons, and academic milestone deadlines.',
        'Real-time push notifications alerting students to urgent schedule updates and newly added course modules.',
      ],
      challenges: [
        'Efficient PDF & Media Caching: Preventing unnecessary memory consumption when loading large academic PDFs on memory-constrained mobile devices.',
        'Concurrent Quiz Submissions: Designing atomic database increments for quiz scores and leaderboard standings.',
      ],
      learnings: [
        'Strengthened core Java programming paradigms and Android SDK fundamentals.',
        'Gained team collaboration experience using Git feature branches and resolving merge conflicts.',
        'Improved understanding of user-centered UI/UX design patterns tailored for academic workflows.',
      ],
    },
  },
];


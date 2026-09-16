export const skills = {
  Backend: ['Node.js','NestJS','Express','Hapi','Java','Spring Boot','REST','gRPC','Microservices','Modular Monolith'],
   DataBase: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'MySQL', 'MsSQL'],
  'Cloud & Infra': ['AWS','Docker','Kubernetes','Jenkins','API Gateway','Azure'],
  Messaging: ['Kafka','RabbitMQ','Redis Pub/Sub'],
  Frontend: ['React', 'Redux', 'TypeScript', 'Next.js', 'JavaScript', 'HTML', 'CSS'],
  'AI / LLM': ['LLM / RAG', 'LangChain', 'GenAI', 'Kiro', 'Claude', 'OpenAI', 'langchain.js']
} as const

export const projects = [
 {id:'neo',title:'Neo for Corporates',subtitle:'Axis Bank',desc:'Secure authentication. Optimized APIs. High availability.',tags:['Node.js','NestJS','Redis','Jest'],flow:['Mobile Client','Authentication','MPIN / TOTP','API Gateway','Microservices','Cache','Database'],detail:'Authentication, API integration, caching, correlation-ID logging, audit trails, testing and database partitioning.'},
 {id:'moxy',title:'Moxy',subtitle:'Payments & events',desc:'Payment ecosystem with events, webhooks and notifications.',tags:['MongoDB','Kafka','Stripe','Redis'],flow:['User','Payment','Stripe / iOS IAP','Webhook','Database','Kafka','Notifications'],detail:'Payment architecture combining transactions, subscriptions, webhooks, ranking/cache flows and event-driven notifications.'},
 {id:'bajaj',title:'Bajaj FinServ',subtitle:'Microservices platform',desc:'Microservices with RBAC and client-specific messaging.',tags:['Node.js','Docker','Kubernetes','AWS'],flow:['Admin','RBAC','Services','Messaging'],detail:'Decomposed backend services with controlled access and client messaging patterns.'},
 {id:'id',title:'micro-id-generator',subtitle:'Open-source utility',desc:'Timestamp-based Base62 ID generator for distributed systems.',tags:['TypeScript','Node.js','Base62','NPM'],flow:['Machine','Timestamp','Custom Epoch','Base62','Unique ID'],detail:'A compact distributed-ID utility designed around time ordering and collision-resistant encoding.'}
]

export const experience = [
 {year:'2018–2019',company:'Code Brew Labs',role:'Software Engineer',city:'Chandigarh'},
 {year:'2019–2021',company:'Appinventiv',role:'Software Engineer',city:'Noida'},
 {year:'2021–2023',company:'Deloitte',role:'Consultant',city:'Gurugram'},
 {year:'2023–Present',company:'Deloitte',role:'Senior Consultant',city:'Gurugram'}
]

export const certifications = [
 ['Claude Certified Developer – Foundations','Anthropic','Issued Sep 06, 2026 · Expires Sep 06, 2027'],
 ['Building RAG Applications','MongoDB','2026'],
 ['Sharding Strategies','MongoDB','2025'],
 ['MongoDB Developer Toolkit','GeeksforGeeks','2025'],
 ['React JS','GeeksforGeeks','2025'],
 ['Generative AI for Beginners','Udemy','2024'],
 ['gRPC Node.js','Udemy','2024'],
 ['JavaScript / Problem Solving','HackerRank','2023']
]

export const social = {
 linkedin:'https://www.linkedin.com/in/luvdeep-katyal-62724a12a/',
 github:'https://github.com/LuvdeepKatyal',
 medium:'https://luvdeepkatyal.medium.com/',
 email:'luvdeep0702@gmail.com',
 claude: 'https://www.credly.com/badges/82f325cd-1231-439c-9eaf-d4b353251b9d/linked_in_profile'
}

export const contact = {
  heading: "Let's build something reliable.",
  sub: "Open to senior and lead engineering roles where systems need to be both fast and correct.",
};

export const profile = {
  name: "Luvdeep Katyal",
  role: "Senior Software Engineer",
  location: "Gurugram, India",
  email: "luvdeep0702@gmail.com",
  links: {
    linkedin: "https://linkedin.com/in/luvdeep-katyal-62724a12a",
    github: "https://github.com/luvdeepkatyal",
    medium: "https://luvdeepkatyal.medium.com",
  },
  // Put your resume PDF in /public/resume.pdf and this button will link to it.
  resumeFile: "/resume.pdf",

  heroHeadline: "I build backend systems the rest of the stack can depend on.",
  heroSub:
    "Senior Software Engineer with 8+ years shipping secure microservices and APIs — currently leading backend architecture at Deloitte for banking platforms including Axis Bank and Bajaj Finserv.",

  credentials: [
    { label: "8+ yrs experience" },
    { label: "Deloitte — Senior Consultant" },
    { label: "Gurugram, India" },
  ],

  bio: "Over eight years, I've moved from writing individual API endpoints to leading the architecture decisions behind them. At Deloitte, Appinventiv, and CodeBrewLabs, I've built authentication systems handling large-scale banking logins, event-driven services processing real-time payments, and the database structures that keep it all consistent under load. I care about systems that stay correct when things go wrong — good logging, sane rollbacks, and APIs that fail loudly instead of silently.",

  education: {
    degree: "B.Tech, Computer Science Engineering",
    school: "Punjab Technical University",
    dates: "Aug 2013 – Mar 2017",
  },

  languages: ["English", "Hindi", "Punjabi"],
};

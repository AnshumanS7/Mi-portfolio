export const resume = {
  name: 'Anshuman Singh',
  title: 'Full Stack Developer',
  // TODO: Place your profile photo in src/assets and set the path below, e.g. '/src/assets/profile.jpg'
  avatar: 'myavatar.png',
  avatarPleads: 'myavatarpleads.png',
  contact: {
    phone: '+91 8957997664',
    email: 'theanshumansingh7@gmail.com',
    links: {
      linkedin: 'https://www.linkedin.com/in/anshuman-singh-054bb5237/',
      github: 'https://github.com/AnshumanS7',
      leetcode: 'https://leetcode.com/anshumans7/',
      oldPortfolio: 'https://anshumans7.github.io/',
      resume: 'https://drive.google.com/file/d/1AXagkfNVODaUcZdWfsiYh3UaIap9Fi4g/view?usp=sharing'
    },
  },
  education: [
    { school: 'Bennett University', degree: 'B.Tech CSE (Cloud Computing)', meta: 'CGPA 8.53 (2021–2025)' },
    { school: 'The Chintels School', degree: 'Class 12 PCM', meta: '82.5% (2019-2020)' },
  ],
  experience: [
    {
      role: 'Software Developer Intern',
      company: 'Times Network',
      period: 'Apr 2025 – Jul 2025',
      bullets: [
        'Built frontend for Socio Ed, an AI-driven lecture analysis platform.',
        'Resolved layout bugs in Article2Video, including element positioning and resizing to enhance UI consistency.',
        'Resolved backend API issues in Class Prep AI, an AI-based student material provider.',
      ],
    },
  ],
  projects: [
    {
      name: 'Real-Time Device Tracker',
      stack: ['Real-Time'],
      desc: 'Real-time tracking application.',
      url: 'https://github.com/AnshumanS7/Real-Time-Device-Tracker.git',
      img: 'tracker_cover.svg'
    },
    {
      name: '2048 App Deployment',
      stack: ['AWS EKS', 'Ingress', 'ALB Controller', 'Helm Charts'],
      desc: 'Scalable deployment on AWS EKS. Optimized Fargate profiles (-30% resource overhead) and automated ALB provisioning with Helm.',
      url: 'https://github.com/AnshumanS7/2048-app-ingress-deployment.git',
      img: '2048_cover.svg'
    },
    {
      name: 'HazyProductions',
      stack: ['Next.js 14', 'TypeScript', 'MongoDB', 'AWS S3', 'Dodo Payments'],
      desc: 'High-performance digital marketplace using Server Actions. Features secure asset delivery via AWS S3 Presigned URLs and automated order lifecycle with Dodo Payments.',
      url: 'https://hazy-productions.vercel.app/',
      img: 'hazy_cover.png'
    },
    {
      name: 'Debatify',
      stack: ['React', 'Node', 'AI'],
      desc: 'Gamified debates and AI-generated quizzes on news articles. (Currently Working update on News Portal)',
      url: 'https://debatify-xi.vercel.app/',
      img: 'Debatify_cover.png'
    },
  ],
  skills: {
    languages: ['Java', 'SQL', 'JavaScript', 'Python', 'HTML5', 'CSS3', 'Tailwind CSS'],
    frameworks: ['React.js', 'Node.js', 'Express', 'Next.js 14'],
    devops: ['Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'AWS', 'Networking'],
    databases: ['MongoDB', 'Firebase'],
    tools: ['Git', 'VS Code', 'Cursor', 'Google AntiGravity', 'Claude', 'Postman'],
    styling: ['TailwindCSS', 'Framer Motion'],
  },
  certs: [
    { title: 'AWS Solutions Architect – Associate (Certified)', url: 'https://www.credly.com/badges/d8118798-5c5d-4f4a-9f2b-c921e7d6294b/public_url' },
    { title: 'Top 15 in Bennett Hackathon (Comp-a-thon 2022)', url: 'https://drive.google.com/file/d/1SYGJvBcEmldUEu_R3XFWFLCmRsd5aoCU/view?usp=drivesdk' },
    { title: 'AWS Cloud Quest: Cloud Practitioner', url: 'https://www.credly.com/badges/23ef08e9-26b0-4b65-a82b-48fa7d2a165d/public_url' },
  ],
  extracurricular: [
    'Technical Member, Bennett Cloud Society — Led planning and execution of cloud events, increasing participation by 20% year-over-year.',
    'Orchestrated "Cloudify" sessions with 100+ attendees and 90% positive feedback.'
  ],
}

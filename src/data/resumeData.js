export const resume = {
  name: 'Anshuman Singh',
  title: 'Full Stack Developer',
  // TODO: Place your profile photo in src/assets and set the path below, e.g. '/src/assets/profile.jpg'
  avatar: 'anshuman image.jpg',
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
    { school: 'The Chintels School', degree: 'Class 12 PCM', meta: '82.5%' },
  ],
  experience: [
    {
      role: 'Software Developer Intern',
      company: 'Times Network',
      period: 'Apr–Jul 2025',
      bullets: [
        'Built frontend for Socio Ed (AI lecture analysis platform)',
        'Fixed layout bugs and backend API issues in Article2Video and ClassPrep AI projects',
      ],
    },
  ],
  projects: [
    {
      name: 'News Portal with Admin Dashboard',
      stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Redux'],
      desc: 'Role-based auth, admin dashboard, reduced API latency by 35%.',
      url: 'https://github.com/AnshumanS7/News-Portal.git'
    },
    {
      name: 'E-Commerce App',
      stack: ['MERN', 'Redux', 'Cloudinary', 'JWT'],
      desc: 'Secure JWT auth, fast search, 30% improved responsiveness.',
      url: 'https://github.com/AnshumanS7/E-Commerce.git'
    },
    {
      name: '2048 App Deployment',
      stack: ['AWS EKS', 'ALB Controller', 'Helm'],
      desc: 'Deployed scalable 2048 app with 50% reduced latency.',
      url: 'https://github.com/AnshumanS7/2048-app-ingress-deployment.git'
    },
    {
      name: 'Debatify',
      stack: ['React', 'Node', 'AI'],
      desc: 'Gamified debates and AI-generated quizzes.',
      url: 'https://github.com/AnshumanS7/Debatify.git'
    },
    { name: 'Real Time Device Tracker', stack: ['Real-Time'], desc: 'Real-time tracking application.', url: 'https://github.com/AnshumanS7/Real-Time-Device-Tracker.git' },
  ],
  skills: {
    languages: ['Java', 'SQL', 'JavaScript', 'Python'],
    frameworks: ['React.js', 'Node.js', 'Express'],
    devops: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'CI/CD'],
    databases: ['MongoDB', 'Firebase'],
    tools: ['Git', 'VS Code', 'IntelliJ', 'Postman'],
    styling: ['HTML5', 'CSS3', 'TailwindCSS'],
  },
  certs: [
    { title: 'AWS Solutions Architect – Associate (Certified)', url: 'https://www.credly.com/badges/d8118798-5c5d-4f4a-9f2b-c921e7d6294b/public_url' },
    { title: 'Top 15 in Bennett Hackathon (Comp-a-thon 2022)', url: 'https://drive.google.com/file/d/1SYGJvBcEmldUEu_R3XFWFLCmRsd5aoCU/view?usp=drivesdk' },
    { title: 'AWS Cloud Quest: Cloud Practitioner', url: 'https://www.credly.com/badges/23ef08e9-26b0-4b65-a82b-48fa7d2a165d/public_url' },
  ],
  extracurricular: [
    'Technical Member, Bennett Cloud Society — Led “Cloudify” sessions, boosted participation by 20%'
  ],
}

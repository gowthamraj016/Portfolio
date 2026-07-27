// ==========================================
// PORTFOLIO DATA
// ==========================================

export const personalInfo = {
  name: 'D. Naga Gowtham Raj',
  shortName: 'Gowtham Raj',
  initials: 'GR',
  headline: 'Computer Science (AI) Student',
  taglines: [
    'Software Developer',
    'AI & ML Enthusiast',
    'Full Stack Developer',
    'Cloud Computing Explorer',
    'Open Source Contributor',
  ],
  about: `I'm a passionate B.Tech Computer Science and Engineering (Artificial Intelligence) student at Amrita Vishwa Vidyapeetham, Bengaluru, driven by a deep curiosity for building intelligent systems and scalable software solutions. My interests span across software engineering, artificial intelligence, machine learning, cloud computing, and full-stack development.

I enjoy turning complex problems into elegant, efficient solutions — whether it's training ML models for real-world applications, building full-stack web applications, or exploring cloud-native architectures. I'm constantly learning, contributing to projects, and preparing to make a meaningful impact in the tech industry.`,
  email: 'gowthamraj4633@gmail.com',
  github: 'https://github.com/gowthamraj016',
  githubUsername: 'gowthamraj016',
  linkedin: 'https://linkedin.com/in/d-naga-gowtham-raj-a0a7132b2',
  phone: '+91 XXXXX XXXXX',
  location: 'Bengaluru, Karnataka, India',
  resumeLink: '#',
  availability: 'Open to Internships & Full-Time Roles',
}

export const skills = [
  {
    category: 'Languages',
    icon: '💻',
    color: '#6366f1',
    items: ['Java', 'Python', 'SQL', 'JavaScript'],
  },
  {
    category: 'Web Development',
    icon: '🌐',
    color: '#06b6d4',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Django', 'REST APIs'],
  },
  {
    category: 'AI / ML',
    icon: '🤖',
    color: '#8b5cf6',
    items: ['TensorFlow', 'Scikit-learn', 'OpenCV', 'Pandas', 'NumPy', 'Matplotlib'],
  },
  {
    category: 'Cloud / DevOps',
    icon: '☁️',
    color: '#10b981',
    items: ['AWS Cloud Foundations', 'Docker', 'Kubernetes'],
  },
  {
    category: 'Tools',
    icon: '🛠️',
    color: '#f59e0b',
    items: ['Git', 'GitHub', 'VS Code', 'Postman'],
  },
  {
    category: 'Software Engineering',
    icon: '⚙️',
    color: '#ec4899',
    items: ['OOP', 'Data Structures & Algorithms', 'REST APIs', 'System Design'],
  },
]

export const featuredProjects = [
  {
    id: 1,
    title: 'Paddy Leaf Disease Classification',
    description:
      'A deep learning-based system that classifies paddy leaf diseases using convolutional neural networks. Helps farmers identify crop diseases early for timely treatment and yield optimization.',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'Scikit-learn', 'Matplotlib'],
    github: 'https://github.com/gowthamraj016',
    demo: null,
    icon: '🌾',
    color: '#10b981',
    category: 'AI / ML',
  },
  {
    id: 2,
    title: 'Energy-Aware & Interference-Aware Kubernetes Scheduler',
    description:
      'A custom Kubernetes scheduler that optimizes pod placement by considering energy consumption and workload interference, improving cluster efficiency and reducing carbon footprint.',
    tech: ['Python', 'Kubernetes', 'Docker', 'Go', 'Prometheus'],
    github: 'https://github.com/gowthamraj016',
    demo: null,
    icon: '⚡',
    color: '#6366f1',
    category: 'Cloud / DevOps',
  },
  {
    id: 3,
    title: 'Sign Language Converter',
    description:
      'A real-time sign language recognition system using computer vision and deep learning to convert hand gestures into text, bridging the communication gap for the hearing impaired.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'MediaPipe', 'NumPy'],
    github: 'https://github.com/gowthamraj016',
    demo: null,
    icon: '🤟',
    color: '#8b5cf6',
    category: 'AI / ML',
  },
  {
    id: 4,
    title: 'AnnaDaan – AI-Powered Smart Food Donation Management System',
    description:
      'An intelligent platform connecting food donors with NGOs and beneficiaries using AI-based demand prediction and route optimization, reducing food waste and fighting hunger.',
    tech: ['React.js', 'Django', 'Python', 'Machine Learning', 'SQL', 'REST APIs'],
    github: 'https://github.com/gowthamraj016',
    demo: null,
    icon: '🍱',
    color: '#f59e0b',
    category: 'Full Stack',
  },
]

export const experience = [
  {
    id: 1,
    role: 'Artificial Intelligence Project Intern',
    company: 'AVA Intern Edutech Pvt. Ltd.',
    type: 'Remote Internship',
    duration: 'Feb 2024 – Jun 2024',
    period: '4 Months',
    description: [
      'Completed a four-month AI project-based internship focusing on real-world machine learning applications.',
      'Performed data preprocessing, feature engineering, and exploratory data analysis on structured datasets.',
      'Developed and evaluated machine learning models for classification and prediction tasks.',
      'Conducted testing, performance tuning, and documentation of AI/ML pipelines.',
      'Contributed to the team under mentor guidance and received recognition for outstanding performance and dedication.',
    ],
    skills: ['Python', 'Machine Learning', 'Data Preprocessing', 'TensorFlow', 'Scikit-learn'],
    icon: '🤖',
    color: '#6366f1',
  },
]

export const certifications = [
  {
    id: 1,
    title: 'AI Project Based Internship',
    issuer: 'AVA Intern Edutech Pvt. Ltd.',
    date: 'Jun 2024',
    icon: '🎓',
    color: '#6366f1',
    category: 'Internship',
  },
  {
    id: 2,
    title: 'Software Engineering Job Simulation',
    issuer: 'JPMorgan Chase & Co. (Forage)',
    date: '2024',
    icon: '🏦',
    color: '#10b981',
    category: 'Simulation',
  },
  {
    id: 3,
    title: 'Cyber Security Job Simulation',
    issuer: 'Deloitte (Forage)',
    date: '2024',
    icon: '🔐',
    color: '#ef4444',
    category: 'Simulation',
  },
  {
    id: 4,
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte (Forage)',
    date: '2024',
    icon: '📊',
    color: '#f59e0b',
    category: 'Simulation',
  },
  {
    id: 5,
    title: 'Technology Job Simulation',
    issuer: 'Deloitte (Forage)',
    date: '2024',
    icon: '💡',
    color: '#8b5cf6',
    category: 'Simulation',
  },
]

export const education = [
  {
    id: 1,
    degree: 'B.Tech in Computer Science and Engineering',
    specialization: '(Artificial Intelligence)',
    institution: 'Amrita Vishwa Vidyapeetham',
    location: 'Bengaluru, Karnataka',
    duration: '2022 – 2026',
    grade: 'CGPA: 7.37 / 10',
    icon: '🎓',
    color: '#6366f1',
    type: 'University',
  },
  {
    id: 2,
    degree: 'Intermediate (12th Grade)',
    specialization: 'Science – MPC',
    institution: 'FIITJEE',
    location: 'Vijayawada, Andhra Pradesh',
    duration: '2020 – 2022',
    grade: '',
    icon: '📚',
    color: '#06b6d4',
    type: 'College',
  },
  {
    id: 3,
    degree: 'Secondary School (10th Grade)',
    specialization: '',
    institution: 'Dr KKR Gowtham High School',
    location: 'Tenali, Andhra Pradesh',
    duration: '– 2020',
    grade: '',
    icon: '🏫',
    color: '#10b981',
    type: 'School',
  },
]

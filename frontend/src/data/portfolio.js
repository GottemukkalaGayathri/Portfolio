export const profile = {
  name: 'Gayathri Gottemukkala',
  role: 'Full Stack Developer',
  email: 'gayathrigottemukkala@gmail.com',
  phone: '8309601886',
  github: 'https://github.com/GayathriGottemukkala',
  portfolio: 'https://portfoliogaye.vercel.app/',
  linkedin: import.meta.env.VITE_LINKEDIN_URL || '',
  resume: import.meta.env.VITE_RESUME_URL || '/resume.pdf',
  customResume: import.meta.env.VITE_CUSTOM_RESUME_URL || '',
  summary: 'Full Stack Developer with 1+ year of experience building responsive web applications using React.js, Node.js, Express.js, and MongoDB. Experienced in developing ATS and CRM platforms, REST APIs, authentication systems, role-based access control, dashboards, and database-driven applications. Familiar with deployment using AWS EC2, Nginx, PM2, Hostinger, Render, and Vercel.',
}

export const skills = [
  { title: 'Frontend', icon: 'PanelsTopLeft', accent: 'sage', size: 'large', items: ['React.js', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'] },
  { title: 'Backend', icon: 'Server', accent: 'blue', size: 'small', items: ['Node.js', 'Express.js', 'REST APIs'] },
  { title: 'State & access', icon: 'Braces', accent: 'lilac', size: 'small', items: ['Redux', 'Context API', 'React Hooks', 'JWT Authentication', 'Role-Based Access Control'] },
  { title: 'Database', icon: 'Database', accent: 'amber', size: 'small', items: ['MongoDB', 'SQL'] },
  { title: 'Programming languages', icon: 'Braces', accent: 'lilac', size: 'small', items: ['JavaScript', 'Python'] },
  { title: 'Tools & deployment', icon: 'Cloud', accent: 'sage', size: 'small', items: ['Git', 'GitHub', 'AWS EC2', 'Nginx', 'PM2', 'Hostinger', 'Render', 'Vercel'] },
]

export const experience = [
  { company: 'Jobs Territory', role: 'Full Stack Developer', period: 'June 2025 — Present', location: 'Full-time', bullets: ['Developing and maintaining full-stack web applications.', 'Working on Applicant Tracking System (ATS) modules.', 'Implementing role-based access for Admin, Manager, Mentor, and Recruiter.', 'Developing recruitment workflows, candidate management, and dashboards.', 'Integrating REST APIs and MongoDB databases; building responsive React.js interfaces.'] },
  { company: 'Neuzen AI', role: 'Full Stack Developer', period: 'July 2024 — November 2024', location: 'Project · JioMatrimony', bullets: ['Developed frontend and backend application features.', 'Implemented profile filtering and data management.', 'Worked with React.js, Node.js, Express.js, and MongoDB.', 'Used MongoDB GridFS for image storage.'] },
  { company: 'CodeGene Software Solutions', role: 'Frontend Developer', period: 'October 2023 — January 2024', location: 'Project · KYC Platform', bullets: ['Developed responsive user interfaces using React.js.', 'Implemented frontend components and form workflows.', 'Worked with HTML, CSS, JavaScript, and React.js.'] },
]

export const projects = [
  { number: '01', name: 'Jobs Territory', type: 'Recruitment platform', url: 'https://jobsterritory.com', image: '/projects/jobs-territory.png', description: 'Responsive features for a recruitment platform, including authentication, profile management, and multi-step registration, with backend integration and deployment.', tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'], mark: 'JT', visual: 'project-a' },
  { number: '02', name: 'Applicant Tracking System', type: 'Recruitment operations', url: 'https://jobsterritory.co.in', image: '/projects/ats.png', description: 'Recruitment workflows for requirements, candidates, recruiter assignments, and application statuses, supported by role-based access and REST APIs.', tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'], mark: 'ATS', visual: 'project-b' },
  { number: '03', name: 'Jobs Territory CRM', type: 'Customer relationship management', url: 'https://jtcrm.in', image: '/projects/jtcrm.png', description: 'CRM modules for company, job, candidate, and business activity management, with role-based dashboards, search, filtering, and API integration.', tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'], mark: 'CRM', visual: 'project-c' },
  { number: '04', name: 'JioMatrimony', type: 'Profile platform', url: 'https://portfoliogaye.vercel.app/jiomatrimony/', image: '/projects/jiomatrimony.png', description: 'Profile management and filtering with Context API for state management and MongoDB GridFS for image storage.', tags: ['React.js', 'Context API', 'Node.js', 'Express.js', 'MongoDB GridFS'], mark: 'JM', visual: 'project-d' },
]

export const education = [
  { degree: 'B.Tech · Agricultural Engineering', school: 'Kakinada Institute of Technology and Science, JNTU-K', period: '2020 — 2023', score: 'CGPA 7.76' },
  { degree: 'Diploma · Agricultural Engineering', school: 'Nova Group of Colleges', period: '2017 — 2020', score: 'CGPA 8.51' },
]

export const certifications = [
  { title: 'IBM Data Science Badge', image: '/certificates/badge.png', mark: 'IBM' },
  { title: 'IBM Data Science Certificate', image: '/certificates/ibm.png', mark: 'IBM' },
  { title: 'HTML, CSS, JavaScript Certification', image: '/certificates/javascript.jpg', mark: 'HTML' },
  { title: 'React.js Certification', image: '/certificates/react.jpg', mark: 'React' },
  { title: 'Node.js & Express.js Certification', image: '/certificates/node.jpg', mark: 'Node' },
  { title: 'SQL & MongoDB Certification', image: '/certificates/db.jpg', mark: 'DB' },
  { title: 'Flexbox', image: '/certificates/flexbox.jpg', mark: 'CSS' },
  { title: 'Operating System Certificate', image: '/certificates/os.jpg', mark: 'OS' },
  { title: 'Python Certification', image: '/certificates/python.jpg', mark: 'Py' },
  { title: 'Responsive Website Certification', image: '/certificates/responsive.jpg', mark: 'RWD' },
  { title: 'Static Website Certification', image: '/certificates/static.jpg', mark: 'WEB' },
  { title: 'NxtWave Full Stack Development Certification', image: '', mark: 'NX' },
  { title: 'HackerRank 4-Star JavaScript', image: '', mark: 'JS' },
  { title: '30-Day Coding Challenge', image: '', mark: '30' },
]

export const personalProjects = [
  { name: 'Gaming Cart', type: 'Personal project', url: 'https://gammingcart.vercel.app/', image: '/projects/gaming-cart.png', mark: 'GC' },
  { name: 'Weather App', type: 'Personal project', url: 'https://firefly-s1gh-gayathris-projects-d17c1cfd.vercel.app/', image: '/projects/weather-app.png', mark: 'WX' },
  { name: 'Unstop Blog App', type: 'Personal project', url: 'https://unstop-blog-app.vercel.app/', image: '/projects/blogs.png', mark: 'UB' },
  { name: 'StreeLancer', type: 'Personal project', url: 'https://streelancer.com', image: '/projects/streelancer.png', mark: 'SL' },
  { name: 'Book Finder', type: 'Personal project', url: 'https://book-finder-beta-seven.vercel.app/', image: '/projects/bookfind.png', mark: 'BF' },
  { name: 'JioMatrimony Dashboard', type: 'Personal project', url: 'https://jiomatrimony.com/dashboard', image: '/projects/jiomatrimony.png', mark: 'JM' },
  { name: 'Jobs Territory', type: 'Personal project', url: 'https://www.jobsterritory.com/', image: '/projects/jobs-territory.png', mark: 'JT' },
  { name: 'E-learning / Gaming', type: 'Personal project', url: 'https://gammingcart.vercel.app/gaming', image: '/projects/elearning-gaming.png', mark: 'EL' },
  { name: 'IPL Dashboard', type: 'Personal project', url: 'https://ipldashboard-pink.vercel.app/', image: '/projects/ipl-dashboard.png', mark: 'IPL' },
  { name: 'Bookstore', type: 'Personal project', url: 'https://firefly-nine-opal.vercel.app/', image: '/projects/bookstore.png', mark: 'BK' },
  { name: 'Personal Portfolio', type: 'Personal project', url: 'https://myportfolio2-chi.vercel.app/', image: '', mark: 'P' },
].map((project) => ({ ...project, description: 'Personal project. Open the live build to explore.', tags: ['Personal project'], visual: 'project-a' }))

const normalizeProjectUrl = (value) => {
  const url = new URL(value)
  const hostname = url.hostname.replace(/^www\./, '')
  const pathname = url.pathname.replace(/\/$/, '')
  return `${hostname}${pathname}`.toLowerCase()
}

export const allProjects = [...projects, ...personalProjects].filter((project, index, collection) => collection.findIndex((item) => normalizeProjectUrl(item.url) === normalizeProjectUrl(project.url)) === index)

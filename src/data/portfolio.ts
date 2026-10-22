export type ExperienceGroup = 'work' | 'education' | 'volunteer';

export interface ExperienceItem {
  group: ExperienceGroup;
  kind?: string;
  date: string;
  role: string;
  org: string;
  desc: string;
}

export interface Project {
  fig: string;
  title: string;
  code: string;
  kind: string;
  years: string;
  desc: string;
  tags: string[];
  img?: string;
  links: { label: string; href: string }[];
}

export const CONTACT = {
  email: 'xander.ras001@gmail.com',
  github: 'https://github.com/Xanderras',
  linkedin: 'https://www.linkedin.com/in/xander-rasschaert-06673223a/',
  cv: '/assets/documents/CV-XanderRasschaert.pdf',
};

// Most recent first. Add new entries at the top.
export const EXPERIENCE: ExperienceItem[] = [
  { group: 'work', date: 'Jun 2025 – now', role: 'Student Software Engineer', org: 'LegalFly', desc: 'Bug fixing, small features and platform improvements for a legal-AI platform: analyse, reproduce and fix bugs, ship features from idea to release. Started as data engineer, building analyses and dashboards in PostHog.' },
  { group: 'education', date: '2025 – Jan 2027', role: 'Bachelor Electronics-ICT: IoT Developer', org: 'Odisee, Ghent', desc: 'Focus on PCB design, microcontrollers and embedded systems.' },
  { group: 'volunteer', date: '2017 – now', role: 'Animator, head animator & instructor', org: 'Kazou Land van Aalst', desc: 'Lead holiday camps and train new animators.' },
  { group: 'volunteer', date: 'Jun 2024 – Jun 2026', role: 'Webmaster', org: 'Student club MEGA', desc: 'Built and maintained the club platform and ran its digital communication.' },
  { group: 'education', date: '2023 – 2025', role: 'Bridging programme Master Industrial Engineering: Electronics-ICT', org: 'KU Leuven, Ghent', desc: 'Theoretical foundations of electronics and signal processing.' },
  { group: 'work', date: 'Oct 2023 – Jun 2025', role: 'Waiter & bar staff', org: "O'Learys Ghent", desc: 'Student job alongside my studies.' },
  { group: 'work', kind: 'Internship', date: 'Feb – Jun 2023', role: 'Software intern', org: 'Swift for Arduino', desc: 'Worked on an IDE with its own compiler for programming microcontrollers in Swift: moved the Arduino IDE compiler to a Swift compiler and wrote firmware and low-level code.' },
  { group: 'education', date: '2020 – 2023', role: 'Bachelor Applied Computer Science: Web & App Development', org: 'HOGENT', desc: 'Graduated. Software architecture, mobile development and full-stack web.' },
  { group: 'volunteer', date: '2022 – 2024', role: 'Co-founder & board member', org: 'Youth centre SOCK, Wetteren', desc: 'Helped start and run a new youth centre.' },
  { group: 'volunteer', date: '2019 – 2023', role: 'Scout leader', org: 'Scouts Prins Boudewijn', desc: 'Leader at the local scout group.' },
  { group: 'education', date: '2018 – 2020', role: 'IT & Networks', org: 'Sint-Lievenscollege Business, Ghent', desc: '' },
  { group: 'work', date: '2017 – 2022', role: 'Cashier & kitchen crew', org: "McDonald's Wetteren", desc: '' },
  { group: 'work', kind: 'Internship', date: 'May – Jun 2019', role: 'Helpdesk intern', org: 'Recticel, Wetteren', desc: '' },
  { group: 'education', date: '2013 – 2018', role: 'Industrial Sciences', org: 'Scheppers-instituut Wetteren', desc: '' },
];

export const GROUP_LABEL: Record<ExperienceGroup, string> = {
  work: 'Work',
  education: 'Education',
  volunteer: 'Volunteer',
};

// Add your hardware project here once it exists; the placeholder card disappears
// automatically when a project with kind 'Hardware' is in this list.
export const PROJECTS: Project[] = [
  { fig: 'FIG. 3', title: 'MEGA student club platform', code: 'MEGA', kind: 'Web', years: '2024 – 2026', desc: 'The full platform for members, events and activities of student club MEGA. Built from scratch and maintained as webmaster.', tags: ['PHP', 'Vue.js', 'SQL'], img: '/assets/images/project-mega.jpg', links: [{ label: 'Live site', href: 'https://mega.skghendt.be/' }, { label: 'Source', href: 'https://github.com/MEGA-Odisee/website' }] },
  { fig: 'FIG. 4', title: 'Swift for Arduino IDE', code: 'S4A', kind: 'Embedded', years: '2023', desc: 'Internship work on an IDE with its own compiler that programs microcontrollers in Swift. Compiler port plus firmware and low-level code.', tags: ['Swift', 'Compilers', 'Firmware'], links: [{ label: 'Project site', href: 'https://www.swiftforarduino.com/' }] },
  { fig: 'FIG. 5', title: 'This portfolio', code: 'XR', kind: 'Web', years: '2025 – now', desc: 'Personal site with a datasheet look. React and TypeScript, static build deployed over FTP.', tags: ['React', 'TypeScript', 'Vite'], links: [{ label: 'Source', href: 'https://github.com/Xanderras/portfolio_website' }] },
];

export const SKILLS = [
  { group: 'Embedded & hardware', items: ['C', 'C++', 'VHDL', 'Python', 'PCB design (KiCad)', 'Microcontrollers', 'IoT'] },
  { group: 'Software & web', items: ['React', 'Node.js', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Java', 'C#', 'Kotlin', 'Swift'] },
  { group: 'Ways of working', items: ['Teamwork', 'Solution-oriented', 'Critical thinking', 'Fast learner', 'Adaptable', 'Persistent'] },
];

// `short` is shown on narrow screens so the chip keeps its pins on both sides.
export const PINS_LEFT = [
  { label: 'C / C++', short: 'C/C++' },
  { label: 'VHDL', short: 'VHDL' },
  { label: 'PCB (KiCad)', short: 'KiCad' },
  { label: 'Python', short: 'Python' },
];
export const PINS_RIGHT = [
  { label: 'React', short: 'React' },
  { label: 'Node.js', short: 'Node' },
  { label: 'TypeScript', short: 'TS' },
  { label: 'Microcontrollers', short: 'MCUs' },
];

export const LANGUAGES = [
  { name: 'Dutch', level: 'Fluent' },
  { name: 'English', level: 'Fluent' },
  { name: 'French', level: 'Basic' },
];

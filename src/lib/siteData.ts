// ─────────────────────────────────────────────────────────────
//  Central Site Data  (shared between public pages & admin)
//  In a real app this would be fetched from a DB / CMS.
//  Here we export mutable defaults so the admin can update them
//  at runtime (state is kept in React context / localStorage).
// ─────────────────────────────────────────────────────────────

export type HeroData = {
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  badge: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type ExperienceItem = {
  id: number;
  year: string;
  role: string;
  department: string;
  description: string;
};

export type StoryData = {
  heading: string;
  headingHighlight: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  cardTitle: string;
  cardSubtitle: string;
  quote: string;
};

export type ContactData = {
  phone: string;
  email: string;
  location: string;
};
export type Message = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
};
export type Message = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
};

export type BlogPost = {
  id: number;
  slug?: string; // SEO-friendly URL slug (optional for backward compatibility)
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
  color: string;
  icon: string;
  published: boolean;
  image?: string; // optional image URL or base64
  content?: string;
  images?: string[];
};

// ── Defaults ──────────────────────────────────────────────────

export const defaultHero: HeroData = {
  name: 'Dipti Marandi',
  subtitle: 'Dedicated to Healthcare',
  tagline: 'A Passion for Care',
  description:
    'Senior Staff Nurse, Dhaka Medical College & Hospital. Committed to providing advanced and compassionate patient care for over a decade.',
  badge: 'A Passion for Care',
  ctaPrimary: 'My Experience',
  ctaSecondary: 'Read My Story',
};

export const defaultExperiences: ExperienceItem[] = [
  {
    id: 1,
    year: '2014 - Present',
    role: 'Senior Staff Nurse',
    department: 'Intensive Care Unit (ICU)',
    description:
      'Played a vital role in the intensive care of critically ill patients and the operation of life-saving equipment at Dhaka Medical College Hospital.',
  },
  {
    id: 2,
    year: '2010 - 2014',
    role: 'Staff Nurse',
    department: 'Emergency Department',
    description:
      'Demonstrated expertise in providing rapid primary care and managing critical situations for sudden and severely injured patients.',
  },
  {
    id: 3,
    year: '2008 - 2010',
    role: 'Trainee Nurse',
    department: 'General Ward',
    description:
      "Gained comprehensive experience in regular patient care, medication administration, and strict adherence to doctors' protocols.",
  },
];

export const defaultStory: StoryData = {
  heading: 'Beyond the',
  headingHighlight: 'Uniform',
  paragraph1:
    "My journey into nursing wasn't just a career choice; it was a calling. From a young age, I was drawn to helping others in their most vulnerable moments.",
  paragraph2:
    'Over the past decade at Dhaka Medical College & Hospital, I have witnessed miracles, held hands through hardships, and learned that true healing goes far beyond medicine—it requires empathy, patience, and unwavering dedication.',
  paragraph3:
    'Every patient has a story, and as a Senior Staff Nurse, my role is to ensure their story continues with dignity and the highest standard of medical care.',
  cardTitle: 'Compassionate Care',
  cardSubtitle: 'Treating patients like family.',
  quote:
    '"Nursing is an art: and if it is to be made an art, it requires an exclusive devotion."',
};

export const defaultContact: ContactData = {
  phone: '+880 17XX XXXXXX',
  email: 'contact@dipticare.com',
  location: 'Dhaka Medical College & Hospital, Dhaka, Bangladesh',
};

export const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'the-importance-of-regular-checkups',
    title: 'The Importance of Regular Checkups',
    category: 'Health Advice',
    date: 'Oct 12, 2026',
    excerpt:
      'Preventative care is the cornerstone of long-term health. Discover why scheduling your annual physical can save your life.',
    readTime: '5 min read',
    color: 'from-teal-100 to-cyan-50',
    icon: '🩺',
    published: true,
  },
  {
    id: 2,
    slug: 'managing-stress-in-high-pressure-environments',
    title: 'Managing Stress in High-Pressure Environments',
    category: 'Mental Wellness',
    date: 'Oct 05, 2026',
    excerpt:
      'Stress can take a significant toll on your physical health. Learn proven techniques to maintain calm during chaotic times.',
    readTime: '8 min read',
    color: 'from-violet-100 to-purple-50',
    icon: '🧘',
    published: true,
  },
  {
    id: 3,
    slug: 'nutrition-tips-for-a-healthy-heart',
    title: 'Nutrition Tips for a Healthy Heart',
    category: 'Diet & Lifestyle',
    date: 'Sep 28, 2026',
    excerpt:
      'Your heart works hard for you. Give it the nutrients it needs with these simple, everyday dietary adjustments.',
    readTime: '6 min read',
    color: 'from-rose-100 to-pink-50',
    icon: '🥗',
    published: true,
  },
  {
    id: 4,
    slug: 'understanding-blood-pressure-a-complete-guide',
    title: 'Understanding Blood Pressure: A Complete Guide',
    category: 'Health Advice',
    date: 'Sep 20, 2026',
    excerpt:
      'High blood pressure is a silent killer. This guide breaks down everything you need to know about monitoring and managing it.',
    readTime: '10 min read',
    color: 'from-blue-100 to-sky-50',
    icon: '💉',
    published: true,
  },
  {
    id: 5,
    slug: 'the-role-of-sleep-in-patient-recovery',
    title: 'The Role of Sleep in Patient Recovery',
    category: 'Clinical Insights',
    date: 'Sep 14, 2026',
    excerpt:
      'Sleep is not a luxury — it is a critical component of the healing process. Explore the science behind restorative sleep.',
    readTime: '7 min read',
    color: 'from-indigo-100 to-blue-50',
    icon: '😴',
    published: false,
  },
  {
    id: 6,
    slug: 'building-resilience-as-a-healthcare-professional',
    title: 'Building Resilience as a Healthcare Professional',
    category: 'Mental Wellness',
    date: 'Sep 07, 2026',
    excerpt:
      'Burnout is rampant in healthcare. Discover practical strategies to build emotional resilience and thrive in your career.',
    readTime: '9 min read',
    color: 'from-amber-100 to-yellow-50',
    icon: '💪',
    published: true,
  },
];

export const categories = ['Health Advice', 'Mental Wellness', 'Diet & Lifestyle', 'Clinical Insights'];

export const iconOptions = ['🩺', '🧘', '🥗', '💉', '😴', '💪', '🩹', '💧', '🗣️', '❤️', '🧬', '🏥'];
export const colorOptions = [
  { label: 'Teal', value: 'from-teal-100 to-cyan-50' },
  { label: 'Violet', value: 'from-violet-100 to-purple-50' },
  { label: 'Rose', value: 'from-rose-100 to-pink-50' },
  { label: 'Blue', value: 'from-blue-100 to-sky-50' },
  { label: 'Indigo', value: 'from-indigo-100 to-blue-50' },
  { label: 'Amber', value: 'from-amber-100 to-yellow-50' },
  { label: 'Green', value: 'from-green-100 to-emerald-50' },
  { label: 'Orange', value: 'from-orange-100 to-red-50' },
];

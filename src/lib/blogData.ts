export type BlogPost = {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
  color: string; // gradient accent color for the card header
  icon: string;  // emoji icon for the card
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Importance of Regular Checkups',
    category: 'Health Advice',
    date: 'Oct 12, 2026',
    excerpt:
      'Preventative care is the cornerstone of long-term health. Discover why scheduling your annual physical can save your life and catch silent conditions before they become serious.',
    readTime: '5 min read',
    color: 'from-teal-100 to-cyan-50',
    icon: '🩺',
  },
  {
    id: 2,
    title: 'Managing Stress in High-Pressure Environments',
    category: 'Mental Wellness',
    date: 'Oct 05, 2026',
    excerpt:
      'Stress can take a significant toll on your physical and emotional health. Learn proven, evidence-based techniques to maintain calm during chaotic and demanding times.',
    readTime: '8 min read',
    color: 'from-violet-100 to-purple-50',
    icon: '🧘',
  },
  {
    id: 3,
    title: 'Nutrition Tips for a Healthy Heart',
    category: 'Diet & Lifestyle',
    date: 'Sep 28, 2026',
    excerpt:
      'Your heart works hard for you every single day. Give it the nutrients it needs with these simple, everyday dietary adjustments that cardiologists recommend.',
    readTime: '6 min read',
    color: 'from-rose-100 to-pink-50',
    icon: '🥗',
  },
  {
    id: 4,
    title: 'Understanding Blood Pressure: A Complete Guide',
    category: 'Health Advice',
    date: 'Sep 20, 2026',
    excerpt:
      'High blood pressure is a silent killer. This comprehensive guide breaks down everything you need to know about monitoring, managing, and improving your blood pressure.',
    readTime: '10 min read',
    color: 'from-blue-100 to-sky-50',
    icon: '💉',
  },
  {
    id: 5,
    title: 'The Role of Sleep in Patient Recovery',
    category: 'Clinical Insights',
    date: 'Sep 14, 2026',
    excerpt:
      'Sleep is not a luxury — it is a critical component of the healing process. Explore the science behind restorative sleep and how nurses can support better patient outcomes.',
    readTime: '7 min read',
    color: 'from-indigo-100 to-blue-50',
    icon: '😴',
  },
  {
    id: 6,
    title: 'Building Resilience as a Healthcare Professional',
    category: 'Mental Wellness',
    date: 'Sep 07, 2026',
    excerpt:
      'Burnout is rampant in the healthcare industry. Discover practical strategies to build emotional resilience, prevent compassion fatigue, and thrive in your nursing career.',
    readTime: '9 min read',
    color: 'from-amber-100 to-yellow-50',
    icon: '💪',
  },
  {
    id: 7,
    title: 'Wound Care: Best Practices for Faster Healing',
    category: 'Clinical Insights',
    date: 'Aug 30, 2026',
    excerpt:
      'Proper wound care is essential to preventing infection and promoting healing. This guide covers modern dressing techniques, infection signs, and patient education tips.',
    readTime: '6 min read',
    color: 'from-green-100 to-emerald-50',
    icon: '🩹',
  },
  {
    id: 8,
    title: 'Hydration & Health: How Much Water Do You Really Need?',
    category: 'Diet & Lifestyle',
    date: 'Aug 22, 2026',
    excerpt:
      'Water is life. But myths about hydration abound. Get evidence-based answers to your most common hydration questions from a clinical nursing perspective.',
    readTime: '4 min read',
    color: 'from-cyan-100 to-teal-50',
    icon: '💧',
  },
  {
    id: 9,
    title: 'Effective Communication with Patients & Families',
    category: 'Clinical Insights',
    date: 'Aug 15, 2026',
    excerpt:
      'Great nursing goes beyond clinical skills. Clear, compassionate communication with patients and their families is one of the most powerful tools in your care arsenal.',
    readTime: '7 min read',
    color: 'from-orange-100 to-red-50',
    icon: '🗣️',
  },
];

export const categories = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))];

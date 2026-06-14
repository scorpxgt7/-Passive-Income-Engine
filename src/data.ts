import { Product, Task, Transaction, WeeklyData, ProjectRecord, ContentRecord } from './types';
import { subDays, format, addDays } from 'date-fns';

const today = new Date();

export const mockProjects: ProjectRecord[] = [
  { id: '1', name: 'Freelancer Tax Tracker Custom', client: 'John D.', completionDate: format(today, 'yyyy-MM-15'), value: 15000, status: 'Ongoing' },
  { id: '2', name: 'Real Estate CRM Setup', client: 'Smith Realty', completionDate: format(new Date(today.getFullYear(), today.getMonth() + 1, 20), 'yyyy-MM-dd'), value: 45000, status: 'Ongoing' },
  { id: '3', name: 'Fitness App Wireframes', client: 'FitCo', completionDate: format(today, 'yyyy-MM-10'), value: 20000, status: 'Completed' },
  { id: '4', name: 'Content Strategy Guide', client: 'Jane A.', completionDate: format(new Date(today.getFullYear(), today.getMonth() + 2, 5), 'yyyy-MM-dd'), value: 10000, status: 'Ongoing' },
  { id: '5', name: 'E-commerce Audit', client: 'Store Ltd', completionDate: format(new Date(today.getFullYear(), today.getMonth() + 3, 12), 'yyyy-MM-dd'), value: 25000, status: 'Ongoing' }
];

export const initialTasks: Task[] = [
  { id: '1', day: 'Day 1', title: 'Choose a specific audience you understand well (e.g., real estate agents, freelancers, fitness coaches, online sellers).', completed: true },
  { id: '2', day: 'Day 2', title: 'Map out the exact spreadsheet or guide that solves their biggest headache.', completed: true },
  { id: '3', day: 'Day 3', title: 'Build the core logic of the template in Google Sheets.', completed: false },
  { id: '4', day: 'Day 4', title: 'Clean up the design. Use professional typography and a cohesive color palette.', completed: false },
  { id: '5', day: 'Day 5', title: 'Draft the product description and upload it to your chosen storefront platform.', completed: false },
  { id: '6', day: 'Weekly Milestone', title: 'Secure your first live product URL and run a simulated ₱0 purchase test to ensure the automated email delivery triggers flawlessly.', completed: false },
];

export const mockContent: ContentRecord[] = [
  { id: 'c1', topic: 'How to automate finances for freelancers', notebookLmStatus: 'Generated', videoStatus: 'Ready', youtubeStatus: 'Published', scheduledDate: format(subDays(today, 2), 'yyyy-MM-dd'), views: 1240 },
  { id: 'c2', topic: 'Top 5 Sheets formulas to save 10 hours a week', notebookLmStatus: 'Generated', videoStatus: 'Rendering', youtubeStatus: 'Scheduled', scheduledDate: format(addDays(today, 1), 'yyyy-MM-dd'), views: 0 },
  { id: 'c3', topic: 'Turn your Google Drive into a CRM system', notebookLmStatus: 'Pending', videoStatus: 'Pending', youtubeStatus: 'Draft', scheduledDate: format(addDays(today, 4), 'yyyy-MM-dd'), views: 0 },
  { id: 'c4', topic: 'Passive income with digital products the right way', notebookLmStatus: 'Generated', videoStatus: 'Ready', youtubeStatus: 'Published', scheduledDate: format(subDays(today, 7), 'yyyy-MM-dd'), views: 3512 },
  { id: 'c5', topic: 'Budget USB Microphone - Clean Audio Setup', notebookLmStatus: 'Generated', videoStatus: 'Ready', youtubeStatus: 'Published', scheduledDate: format(subDays(today, 1), 'yyyy-MM-dd'), views: 820 },
  { id: 'c6', topic: 'Phone Tripod Stand for TikTok Creators', notebookLmStatus: 'Generated', videoStatus: 'Rendering', youtubeStatus: 'Scheduled', scheduledDate: format(addDays(today, 2), 'yyyy-MM-dd'), views: 0 },
];

export const mockProducts: Product[] = [
  { id: 'p1', name: 'Freelancer Tax & Invoice Tracker', price: 500, sales: 8, status: 'active' },
  { id: 'p2', name: 'Real Estate CRM Template', price: 999, sales: 0, status: 'planning' },
  { id: 'p3', name: 'Fitness Coach automated Diet Planner', price: 450, sales: 0, status: 'planning' },
  { id: 'p4', name: 'AI Deal Finder Starter Kit', price: 1500, sales: 3, status: 'active' },
  { id: 'p5', name: 'Budget USB Microphone Review', price: 800, sales: 12, status: 'active' },
  { id: 'p6', name: 'Phone Tripod Stand Deals', price: 300, sales: 5, status: 'active' },
];

export const mockTransactions: Transaction[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `t${i}`,
  date: format(subDays(today, i * 2), 'yyyy-MM-dd'),
  amount: i % 4 === 0 ? 150 : 500,
  type: i % 4 === 0 ? 'expense' : 'sale',
  description: i % 4 === 0 ? 'Facebook Ads Mini-test' : 'Freelancer Tax & Invoice Tracker'
}));

export const projectionData: WeeklyData[] = [
  { week: 'Week 1', revenue: 1500, target: 1000 },
  { week: 'Week 2', revenue: 2000, target: 1500 },
  { week: 'Week 3', revenue: 3500, target: 2000 },
  { week: 'Week 4', revenue: 4000, target: 3000 },
  { week: 'Week 8', revenue: 6500, target: 5000 },
  { week: 'Week 12', revenue: 8000, target: 7000 },
  { week: 'Week 16', revenue: 9500, target: 8500 },
  { week: 'Week 24', revenue: 11000, target: 10000 },
];

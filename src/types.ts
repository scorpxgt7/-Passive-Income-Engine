export type TransactionType = 'sale' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: TransactionType;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  sales: number;
  status: 'planning' | 'active' | 'retired';
}

export interface Task {
  id: string;
  day: string;
  title: string;
  completed: boolean;
}

export interface WeeklyData {
  week: string;
  revenue: number;
  target: number;
}

export interface ProjectRecord {
  id: string;
  name: string;
  client: string;
  completionDate: string;
  value: number;
  status: 'Ongoing' | 'Completed';
}

export interface ContentRecord {
  id: string;
  topic: string;
  notebookLmStatus: 'Pending' | 'Generated';
  videoStatus: 'Pending' | 'Rendering' | 'Ready';
  youtubeStatus: 'Scheduled' | 'Published' | 'Draft';
  scheduledDate: string;
  views: number;
}

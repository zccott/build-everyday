export interface User {
  id: number;
  email: string;
  full_name: string | null;
  salary: number;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string | null;
  color: string | null;
  user_id: number | null;
}

export interface Expense {
  id: number;
  name: string;
  amount: number;
  notes: string | null;
  date: string;
  category_id: number;
  user_id: number;
}

export interface Summary {
  total_expenses: number;
  monthly_expenses: number;
  weekly_expenses: number;
  remaining_balance: number;
  savings_percentage: number;
}

export interface Trend {
  month: string;
  amount: number;
}

export interface CategoryDistribution {
  name: string;
  color: string;
  amount: number;
}

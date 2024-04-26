export const TimeOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export enum Frequency {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Yearly = 'Yearly',
}

export interface Post {
  id: string;
  user_id: string;
  description: string;
  littlething: string;
  frequency: Frequency;
  occurrence: number;
  createdAt: string;
  updatedAt: string;
}

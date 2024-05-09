import { Post } from '@/types/LittleThingTypes';

const frequencyOrder: { [key: string]: number } = {
  Daily: 1,
  Weekly: 7,
  Monthly: 30,
  Yearly: 365,
};

// Helper functions to calculate time in milliseconds
const getCurrentTime = () => new Date().getTime();

const getEndOfDay = () => {
  const currentTime = new Date();
  currentTime.setHours(23, 59, 59, 999);
  return currentTime.getTime();
};

const getEndOfWeek = () => {
  const currentTime = new Date();
  const remainingDays = 6 - currentTime.getDay(); // Sunday
  currentTime.setDate(currentTime.getDate() + remainingDays);
  currentTime.setHours(23, 59, 59, 999);
  return currentTime.getTime();
};

const getEndOfMonth = () => {
  const currentTime = new Date();
  currentTime.setMonth(currentTime.getMonth() + 1, 0); // Last day of month
  currentTime.setHours(23, 59, 59, 999);
  return currentTime.getTime();
};

const getEndOfYear = () => {
  const currentTime = new Date();
  currentTime.setMonth(11, 31); // Last day of year
  currentTime.setHours(23, 59, 59, 999);
  return currentTime.getTime();
};

const getUrgencyScore = (littleThing: Post): number => {
  const remainingOccurrences =
    littleThing.occurrence - littleThing.completionCount;
  let deadline = 0;

  switch (littleThing.frequency) {
    case 'Daily':
      deadline = getEndOfDay();
      break;
    case 'Weekly':
      deadline = getEndOfWeek();
      break;
    case 'Monthly':
      deadline = getEndOfMonth();
      break;
    case 'Yearly':
      deadline = getEndOfYear();
      break;
    default:
      break;
  }

  const urgencyScore = (deadline - getCurrentTime()) / remainingOccurrences;
  return urgencyScore;
};

// Sorting functions

// Sorts LittleThings by frequency in ascending order.
// ie. [Daily, Weekly, Monthly, Yearly]
// If there is tie, occurrence is used as secondary sorting criterion.
// ie. Daily with occurrence = 1 will come before Daily with occurrence = 2.
const sortByFrequencyAscending = (littleThings: Post[]): Post[] => {
  return littleThings.sort((a, b) => {
    const aOrder = frequencyOrder[a.frequency];
    const bOrder = frequencyOrder[b.frequency];

    return aOrder === bOrder ? a.occurrence - b.occurrence : aOrder - bOrder;
  });
};

// Sorts LittleThings by frequency in descending order.
// ie. [Yearly, Monthly, Weekly, Daily]
// If there is tie, occurrence is used as secondary sorting criterion.
// ie. Daily with occurrence = 2 will come before Daily with occurrence = 1.
const sortByFrequencyDescending = (littleThings: Post[]): Post[] => {
  return littleThings.sort((a, b) => {
    const aOrder = frequencyOrder[a.frequency];
    const bOrder = frequencyOrder[b.frequency];

    return aOrder === bOrder ? b.occurrence - a.occurrence : bOrder - aOrder;
  });
};

// Sorts LittleThings by urgency in ascending order (least urgent to most ugrent).
// ie. LittleThing with Weekly frequency and 1 occurence will come before
// LittleThing with Daily frequency and 1 occurence, which will come before
// LittleThing with Daily frequency and 2 occurence
const sortByUrgencyAscending = (littleThings: Post[]): Post[] => {
  return littleThings.sort((a, b) => getUrgencyScore(b) - getUrgencyScore(a));
};

// Sorts LittleThings by urgency in descending order (most urgent to least ugrent).
// ie. LittleThing with Daily frequency and 2 occurence will come before
// LittleThing with Daily frequency and 1 occurence, which will come before
// LittleThing with Weekly frequency and 1 occurence
const sortByUrgencyDescending = (littleThings: Post[]): Post[] => {
  return littleThings.sort((a, b) => getUrgencyScore(a) - getUrgencyScore(b));
};

export {
  sortByFrequencyAscending,
  sortByFrequencyDescending,
  sortByUrgencyAscending,
  sortByUrgencyDescending,
};

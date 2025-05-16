import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for merging Tailwind classes conditionally
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
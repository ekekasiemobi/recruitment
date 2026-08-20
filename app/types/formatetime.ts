// utils/formatRelativeTime.ts

export function formatRelativeTime(dateString: string): string {
  const postDate = new Date(dateString);
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  // Future dates or invalid dates fallback
  if (secondsAgo < 0 || isNaN(secondsAgo)) return 'Just now';

  // Time calculations in seconds
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30; // Approximation
  const year = day * 365;

  if (secondsAgo < minute) {
    return 'Just now';
  } else if (secondsAgo < hour) {
    const minutes = Math.floor(secondsAgo / minute);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (secondsAgo < day) {
    const hours = Math.floor(secondsAgo / hour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (secondsAgo < week) {
    const days = Math.floor(secondsAgo / day);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (secondsAgo < month) {
    const weeks = Math.floor(secondsAgo / week);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (secondsAgo < year) {
    const months = Math.floor(secondsAgo / month);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(secondsAgo / year);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}
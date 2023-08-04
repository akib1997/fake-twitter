import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tweetTime',
  standalone: true,
})
export class TweetTimePipe implements PipeTransform {
  transform(value: Date | string): string {
    if (typeof value === 'string') {
      value = new Date(value);
    }

    const now = new Date().getTime();
    const timestamp = value.getTime();
    const timePassed = now - timestamp;

    if (isNaN(timestamp)) {
      return 'Invalid Date';
    }

    if (timePassed < 0) {
      return 'Just now';
    } else if (timePassed < 60000) {
      // Less than a minute
      return 'Just now';
    } else if (timePassed < 3600000) {
      // Less than an hour
      const minutes = Math.floor(timePassed / 60000);
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (timePassed < 604800000) {
      // Less than a week
      const hours = Math.floor(timePassed / 3600000);
      if (hours < 24) {
        return `${hours} hour${hours > 1 ? 's' : ''}`;
      } else {
        const days = Math.floor(timePassed / 86400000);
        return `${days} day${days > 1 ? 's' : ''}`;
      }
    } else {
      // More than a week
      const formattedDate = value.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return formattedDate;
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToDate',
  standalone: true
})
export class StringToDatePipe implements PipeTransform {
  transform(value: string): Date {
    // Assuming the string is in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss')
    return new Date(value);
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'removeWhiteSpace'
})
export class RemoveWhiteSpacePipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return value.replace(/\s/g, ''); // Using regular expression to remove all spaces
    }
    return value;
  }

}

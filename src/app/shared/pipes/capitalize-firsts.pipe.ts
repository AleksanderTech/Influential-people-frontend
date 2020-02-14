import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirsts'
})
export class CapitalizeFirstsPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
  
    value = value.toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ');
    return value;
  }

}

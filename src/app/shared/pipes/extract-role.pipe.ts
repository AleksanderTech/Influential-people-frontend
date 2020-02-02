import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractRole'
})
export class ExtractRolePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {

    return value.replace('ROLE_','').toLowerCase();
  }

}

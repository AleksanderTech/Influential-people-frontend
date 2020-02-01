import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any { 
    const limit = args[0].length > 0 ? parseInt(args[0][0], 10) : 20;
    const trail = args[0].length > 1 ? args[0][1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;  }
}

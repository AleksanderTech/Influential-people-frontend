import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {
    transform(value: any, search: string, name: string): any {
        console.log(value);
        console.log(search);
        
        if (!search) { return value; }
        let solution = value.filter(v => {
            if (!v) { return; }
            return v[name].toLowerCase().startsWith(search.toLowerCase());
        })
        return solution;
    }
}
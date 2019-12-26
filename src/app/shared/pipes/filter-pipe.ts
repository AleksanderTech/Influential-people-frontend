import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {
    transform(value: any, search: string, name: string): any {
        if (!search) { return value; }
        let solution = value.filter(v => {
            if (!v) { return; }
            console.log(name);

            return v[name].toLowerCase().startsWith(search.toLowerCase());
        })
        return solution;
    }
}
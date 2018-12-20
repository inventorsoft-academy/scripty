import {Pipe, PipeTransform} from '@angular/core';
import {Project} from '../models/Project';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: Project[], searchText: string): Project[] {
        if (!items) {
            return [];
        }
        searchText = searchText.toLowerCase();
        return items.filter((it: Project) => {
            return it.name.toLowerCase().includes(searchText);
        });
    }
}

import {Pipe, PipeTransform} from '@angular/core';
import {Project} from '../../../../models/Project';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: Project[], searchText: string, filterOptions: object): Project[] {
        if (!items) {
            return [];
        }
        const user = localStorage.getItem('user');
        searchText = searchText.toLowerCase();
        return items.filter((it: Project) => {
            if (!filterOptions['archived'] && it.archive) {
                return false;
            }
            if (filterOptions['onlyMy'] && (it.user.email !== user)) {
                return false;
            }
            return it.name.toLowerCase().includes(searchText);
        });
    }
}

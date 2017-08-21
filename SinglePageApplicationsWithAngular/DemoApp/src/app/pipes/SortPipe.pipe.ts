import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipePipe implements PipeTransform {

  transform(items: any[], ): void {
    items.sort();
  }

}

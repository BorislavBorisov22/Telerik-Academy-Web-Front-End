import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformCase'
})

export class MyUpperCasePipe implements PipeTransform {

  transform(str: string, isUpperCase: boolean = false): string {
    if (isUpperCase) {
      return str.toUpperCase();
    } else {
      return str.toLowerCase();
    }
  }
}

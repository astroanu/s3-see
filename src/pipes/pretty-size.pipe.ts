import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettySize'
})
export class PrettySizePipe implements PipeTransform {
  transform(bytes: any): any {
    const thresh = 1000;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
  }
}

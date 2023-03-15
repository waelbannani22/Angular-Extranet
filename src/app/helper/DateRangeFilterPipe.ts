import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRangeFilter'
})
export class DateRangeFilterPipe implements PipeTransform {

  transform(items: any[], startDate: Date, endDate: Date): any[] {
    if (!items) return [];
    if (!startDate || !endDate) return items;

    return items.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }

}

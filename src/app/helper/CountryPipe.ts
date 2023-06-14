import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../models/country/country.module';


@Pipe({ name: 'country' })
export class CountryPipe implements PipeTransform {
  
  transform(values: Country[], filter: string): Country[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: Country) => {
        const nameFound = value.capital.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const capitalFound = value.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      
        return nameFound || capitalFound;
      });
      
  }
}
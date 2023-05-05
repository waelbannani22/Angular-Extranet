import { Injectable, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LOCALE, DATE_FORMAT, CHAINE_VIDE, DATE_FORMAT_BACK } from 'src/app.constants';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
@NgModule({
  imports: [CommonModule],
 
 
})
export class PipeService {
  constructor(private currencyPipe: CurrencyPipe) {}

  // Format number with 3 digits before decimal point and 3 digits after decimal point
  transform( val: string | number): string {
    if (val !== null && val !== CHAINE_VIDE) {
      return this.currencyPipe.transform(val, 'code', '', '1.3-3')!
        .toString().replace(/,/g, '');
    }
    return '';
  }

  // Format date to 'dd/MM/yyyy' format
  transformDate(value: string): string {
    const datePipe = new DatePipe(LOCALE);
    return datePipe.transform(value, DATE_FORMAT)!;
  }

  // Format date to 'yyyy-MM-dd' format
  transformDateBack(value: string): string {
    const datePipe = new DatePipe(LOCALE);
    return datePipe.transform(value, DATE_FORMAT_BACK)!;
  }
}

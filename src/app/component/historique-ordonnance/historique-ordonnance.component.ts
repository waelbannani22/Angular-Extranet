import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Country, dataset } from 'src/app/models/country/country.module';
import {
  SortableHeaderDirective,
  SortEvent,
  compare,
} from '../../helper/sortable-header.directive';


@Component({
  selector: 'app-historique-ordonnance',
  templateUrl: './historique-ordonnance.component.html',
  styleUrls: ['./historique-ordonnance.component.css']
})

export class HistoriqueOrdonnanceComponent implements OnInit {

  isShowDivIf = true;
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }
  data: Array<Country> = dataset;
  countries: Array<Country> = dataset;
  filter: string="";
  @ViewChildren(SortableHeaderDirective)
  headers: QueryList<SortableHeaderDirective> | undefined;
  p: number = 1;
 
 
  
  constructor() {
  
    
    
   
   }

  ngOnInit(): void {
    
  }
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers!.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
  
    // sorting countries
    if (direction === '' || column === '') {
      this.countries = this.data;
    } else {
      this.countries = [...this.data].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
function MatPaginator(MatPaginator: any) {
  throw new Error('Function not implemented.');
}


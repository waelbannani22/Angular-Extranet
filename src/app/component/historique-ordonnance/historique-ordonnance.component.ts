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
  startDate!:Date;
  endDate!:Date;
  data: Array<Country> = dataset;
  countries: Array<Country> = dataset;
  filter: string="";
  @ViewChildren(SortableHeaderDirective)
  headers: QueryList<SortableHeaderDirective> | undefined;
  p: number = 1;

  selectedItems: any[] = [];
  /*
  startDatee = new Date('2022-04-01');
  endDatee = new Date('2022-12-31');
**/
 
 
  
  constructor() {
   
   
    
   
   }
   filterList(){
    console.log(new Date(this.startDate))
    console.log(this.endDate)
    this.countries = this.data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= new Date(this.startDate)  && itemDate <= new Date(this.endDate);
    });
    console.log(this.countries)
   }
   isSelected(item: any): boolean {
    return this.selectedItems.indexOf(item) !== -1;
  }
  onSelectItem(event: any, item: any) {
    if (event.target.checked) {
      this.selectedItems.push(item);
    } else {
      const index = this.selectedItems.indexOf(item);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
    }
  }
  onSubmit() {
    console.log(this.selectedItems);
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


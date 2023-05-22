import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CountryModule { 
  
}export interface Country {
  name: string;
  capital: string;
  alpha3Code: string;
  population: number;
  flag: string;
  date:string;
}

export const dataset: Array<Country> = [
  {
    name: 'Iran',
    capital: 'Tehran',
    alpha3Code: 'IRN',
    population: 79369900,
    flag: 'https://restcountries.eu/data/irn.svg',
    date: '2022-01-11'
  },
  {
    name: 'Turkey',
    capital: 'Ankara',
    alpha3Code: 'TUR',
    population: 78741053,
    flag: 'https://restcountries.eu/data/tur.svg',
    date: '2022-01-11'
  },
  {
    name: 'Germany',
    capital: 'Berlin',
    alpha3Code: 'DEU',
    population: 81770900,
    flag: 'https://restcountries.eu/data/deu.svg',
    date: '2022-12-01'
  },
  {
    name: 'France',
    capital: 'Paris',
    alpha3Code: 'FRA',
    population: 66710000,
    flag: 'https://restcountries.eu/data/fra.svg',
    date: '2022-11-01'
  },
  {
    name: 'Italy',
    capital: 'Rome',
    alpha3Code: 'ITA',
    population: 60665551,
    flag: 'https://restcountries.eu/data/ita.svg',
    date: '2022-10-01'
  },
  {
    name: 'Serbia',
    capital: 'Belgrade',
    alpha3Code: 'SRB',
    population: 7076372,
    flag: 'https://restcountries.eu/data/srb.svg',
    date: '2022-09-01'
  },
  {
    name: 'United Kingdom',
    capital: 'London',
    alpha3Code: 'GBR',
    population: 65110000,
    flag: 'https://restcountries.eu/data/gbr.svg',
    date: '2022-05-01'
  },
  {
    name: 'United States',
    capital: 'Washington D.C',
    alpha3Code: 'USA',
    population: 323947000,
    flag: 'https://restcountries.eu/data/usa.svg',
    date: '2022-08-01'
  },
  {
    name: 'Russia',
    capital: 'Moscow',
    alpha3Code: 'RUS',
    population: 146599183,
    flag: 'https://restcountries.eu/data/rus.svg',
    date: '2022-06-01'
  },
  {
    name: 'China',
    capital: 'Beijing',
    alpha3Code: 'CHN',
    population: 1377422166,
    flag: 'https://restcountries.eu/data/chn.svg',
    date: '2022-05-01'
  },
  {
    name: 'India',
    capital: 'New Delhi',
    alpha3Code: 'IND',
    population: 1295210000,
    flag: 'https://restcountries.eu/data/ind.svg',
    date: '2022-04-01'
  },
];

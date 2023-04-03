import { Injectable } from '@angular/core';
export class Employee {
  ID!: number;

  FirstName!: string;
  LastName!: string;
  Prefix!: string;
  Position!: string;
  BirthDate!: string;
  HireDate!: string;
  Notes!: string;
  Address!: string;
  StateID!: number;
}
export class State {
  ID!: number;
  Name!: string;
}
const employees: Employee[] = [
  {
    ID: 1,
    FirstName: 'John',
    LastName: 'Heart',
    Prefix: 'Mr.',
    Position: 'CEO',
    BirthDate: '1964/03/16',
    HireDate: '1995/01/15',
    Notes:
      'John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.',
    Address: '351 S Hill St.',
    StateID: 5,
  },
  {
    ID: 2,
    FirstName: 'Olivia',
    LastName: 'Peyton',
    Prefix: 'Mrs.',
    Position: 'Sales Assistant',
    BirthDate: '1981/06/03',
    HireDate: '2012/05/14',
    Notes:
      'Olivia loves to sell. She has been selling DevAV products since 2012. \r\n\r\nOlivia was homecoming queen in high school. She is expecting her first child in 6 months. Good Luck Olivia.',
    Address: '807 W Paseo Del Mar',
    StateID: 5,
  },
  {
    ID: 3,
    FirstName: 'Robert',
    LastName: 'Reagan',
    Prefix: 'Mr.',
    Position: 'CMO',
    BirthDate: '1974/09/07',
    HireDate: '2002/11/08',
    Notes:
      'Robert was recently voted the CMO of the year by CMO Magazine. He is a proud member of the DevAV Management Team.\r\n\r\nRobert is a championship BBQ chef, so when you get the chance ask him for his secret recipe.',
    Address: '4 Westmoreland Pl.',
    StateID: 4,
  },
 
  
  
 
];
const states: State[] = [
  {
    ID: 1,
    Name: 'Alabama',
  },
  {
    ID: 2,
    Name: 'Alaska',
  },
  {
    ID: 3,
    Name: 'Arizona',
  },
  {
    ID: 4,
    Name: 'Arkansas',
  },
  {
    ID: 5,
    Name: 'California',
  },
  {
    ID: 6,
    Name: 'Colorado',
  },
  {
    ID: 7,
    Name: 'Connecticut',
  },
  {
    ID: 8,
    Name: 'Delaware',
  },
  {
    ID: 9,
    Name: 'District of Columbia',
  },
  {
    ID: 10,
    Name: 'Florida',
  },
  {
    ID: 11,
    Name: 'Georgia',
  },
  {
    ID: 12,
    Name: 'Hawaii',
  },
  {
    ID: 13,
    Name: 'Idaho',
  },
  {
    ID: 14,
    Name: 'Illinois',
  },
  {
    ID: 15,
    Name: 'Indiana',
  },
  {
    ID: 16,
    Name: 'Iowa',
  },
  {
    ID: 17,
    Name: 'Kansas',
  },
  {
    ID: 18,
    Name: 'Kentucky',
  },
  {
    ID: 19,
    Name: 'Louisiana',
  },
  {
    ID: 20,
    Name: 'Maine',
  },
  {
    ID: 21,
    Name: 'Maryland',
  },
  {
    ID: 22,
    Name: 'Massachusetts',
  },
  {
    ID: 23,
    Name: 'Michigan',
  },
  {
    ID: 24,
    Name: 'Minnesota',
  },
  {
    ID: 25,
    Name: 'Mississippi',
  },
  {
    ID: 26,
    Name: 'Missouri',
  },
  {
    ID: 27,
    Name: 'Montana',
  },
  {
    ID: 28,
    Name: 'Nebraska',
  },
  {
    ID: 29,
    Name: 'Nevada',
  },
  {
    ID: 30,
    Name: 'New Hampshire',
  },
  {
    ID: 31,
    Name: 'New Jersey',
  },
  {
    ID: 32,
    Name: 'New Mexico',
  },
  {
    ID: 33,
    Name: 'New York',
  },
  {
    ID: 34,
    Name: 'North Carolina',
  },
  {
    ID: 35,
    Name: 'Ohio',
  },
  {
    ID: 36,
    Name: 'Oklahoma',
  },
  {
    ID: 37,
    Name: 'Oregon',
  },
  {
    ID: 38,
    Name: 'Pennsylvania',
  },
  {
    ID: 39,
    Name: 'Rhode Island',
  },
  {
    ID: 40,
    Name: 'South Carolina',
  },
  {
    ID: 41,
    Name: 'South Dakota',
  },
  {
    ID: 42,
    Name: 'Tennessee',
  },
  {
    ID: 43,
    Name: 'Texas',
  },
  {
    ID: 44,
    Name: 'Utah',
  },
  {
    ID: 45,
    Name: 'Vermont',
  },
  {
    ID: 46,
    Name: 'Virginia',
  },
  {
    ID: 47,
    Name: 'Washington',
  },
  {
    ID: 48,
    Name: 'West Virginia',
  },
  {
    ID: 49,
    Name: 'Wisconsin',
  },
  {
    ID: 50,
    Name: 'Wyoming',
  },
  {
    ID: 51,
    Name: 'North Dakota',
  },
];
@Injectable({ providedIn: 'root' })
export class ServiceFetchDATA {
  getEmployees() {
    return employees;
  }
  getStates() {
    return states;
  }
}

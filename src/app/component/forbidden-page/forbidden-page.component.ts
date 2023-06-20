import { Component, OnInit } from '@angular/core';
interface Lock {
  top: string;
  left: string;
}
@Component({
  selector: 'app-forbidden-page',
  templateUrl: './forbidden-page.component.html',
  styleUrls: ['./forbidden-page.component.css']
})

export class ForbiddenPageComponent implements OnInit {

  interval = 500;
  locks: Lock[] = [];

  constructor() { }

  ngOnInit() {
    this.generateLocks();
    setInterval(() => {
      this.generateLocks();
    }, this.interval);
  }

  generateLocks() {
    const lock: Lock = {
      top: this.generateRandomPosition(),
      left: this.generateRandomPosition()
    };
    this.locks.push(lock);

    setTimeout(() => {
      const index = this.locks.indexOf(lock);
      if (index !== -1) {
        this.locks.splice(index, 1);
      }
    }, 2000);
  }

  generateRandomPosition(): string {
    const position = Math.round(Math.random() * 100 - 10) + '%';
    return position;
  }


}

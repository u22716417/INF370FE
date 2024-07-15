import { Component } from '@angular/core';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent {

  inputValue: string = '';
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  appendNumber(num: number) {
    this.inputValue += num;
  }

  clearInput() {
    this.inputValue = '';
  }
  
}

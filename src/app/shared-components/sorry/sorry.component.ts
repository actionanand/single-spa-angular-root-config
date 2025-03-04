import { Component } from '@angular/core';

@Component({
  selector: 'app-sorry',
  standalone: true,
  imports: [],
  templateUrl: './sorry.component.html',
  styleUrl: './sorry.component.scss',
})
export class SorryComponent {
  title = "We're Sorry";
  message = 'Your request could not be completed at this time, Please try again later!';
}

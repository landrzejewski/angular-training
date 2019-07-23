import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input()
  rating = 0;
  @Input()
  maxRating = 5;
  values: boolean[] = [];

  ngOnInit() {
    for (let index = 1; index <= this.maxRating; index++) {
      this.values.push(index <= this.rating);
    }
  }

}

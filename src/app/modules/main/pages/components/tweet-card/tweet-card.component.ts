import { Component, Input, OnInit } from '@angular/core';
import { ITimeline } from '@models/timeline.model';

@Component({
  selector: 'tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {
  @Input({required: true}) tweet: ITimeline;

  constructor() { }

  ngOnInit() {
  }

}

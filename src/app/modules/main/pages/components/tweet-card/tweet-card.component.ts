import { Component, Input, OnInit } from '@angular/core';
import { ITimeline } from '@models/timeline.model';

@Component({
  selector: 'tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss'],
})
export class TweetCardComponent  {
  @Input({ required: true }) tweet: ITimeline;

  constructor() {}



  get isUserActive(): boolean {
    return this.tweet.user.active;
  }
}

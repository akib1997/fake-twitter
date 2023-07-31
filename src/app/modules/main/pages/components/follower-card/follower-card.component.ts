import { Component, Input, OnInit } from '@angular/core';
import { IFollower } from '@app/models/follower.model';

@Component({
  selector: 'follower-card',
  templateUrl: './follower-card.component.html',
  styleUrls: ['./follower-card.component.scss'],
})
export class FollowerCardComponent implements OnInit {
  @Input({ required: true }) follower: IFollower;
  constructor() {}

  ngOnInit() {}
}

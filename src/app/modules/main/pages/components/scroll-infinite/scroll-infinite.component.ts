import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'scroll-infinite',
  templateUrl: './scroll-infinite.component.html',
  styleUrls: ['./scroll-infinite.component.scss'],
})
export class ScrollInfiniteComponent implements OnInit {
  @Input({ required: true }) onScroll: void;

  constructor() {}

  ngOnInit() {}
}

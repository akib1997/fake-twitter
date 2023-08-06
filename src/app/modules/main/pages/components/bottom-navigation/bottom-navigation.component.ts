import { Component, OnInit } from '@angular/core';
import { appNaigations } from '@config/router.config';

@Component({
  selector: 'bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss'],
})
export class BottomNavigationComponent implements OnInit {
  navigations = appNaigations

  activeLink = this.navigations[0].link;

  constructor() {}

  ngOnInit() {}
}

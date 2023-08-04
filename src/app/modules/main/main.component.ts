import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  title: string;
  constructor(
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.title = this.route.snapshot.data['title']
    // console.log(this.route.snapshot.data, 'dddd')
  }

}

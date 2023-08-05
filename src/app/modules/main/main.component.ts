import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageTitleService } from './pages/services/page-title/page-title.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private pageTitleService: PageTitleService
  ) { }

  ngOnInit() {}

}

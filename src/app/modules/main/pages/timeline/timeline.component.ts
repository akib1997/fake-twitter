import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ITimeline } from '@app/models/timeline.model';
import { TimelineService } from '@app/services/timeline/timeline.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  pageLoading = false;
  timelines: ITimeline[];

  constructor(private timelineService: TimelineService) {}

  ngOnInit() {
    this.getTimeline();
  }

  getTimeline(): void {
    this.pageLoading = true;

    this.timelineService.getTimeline().subscribe({
      next: (data) => {
        this.timelines = data.timeline;
      },
      error: (error) => {
        console.warn(error);
      },
    }).add(() =>     this.pageLoading = false);
  }
}

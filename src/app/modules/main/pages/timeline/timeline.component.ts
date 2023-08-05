import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { IFollowing } from '@models/following.model';
import { ITimeline, ITimelineParams } from '@app/models/timeline.model';
import { AutoUnsubscribe } from '@utilities/autoUnsubscribe';
import { fadeInAnimation } from '@utilities/fadeInAnimation';
import { FollowingsService } from '@modules/main/pages/services/followings/followings.service';
import { TimelineService } from '@modules/main/pages/services/timeline/timeline.service';
@AutoUnsubscribe()
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  animations: [fadeInAnimation],
})
export class TimelineComponent implements OnInit {
  pageLoading = false;
  timelines: ITimeline[] = [];
  followings: IFollowing[];
  params: ITimelineParams = {
    page: 1,
    size: 20
  }
  isEndOfList: boolean = false;

  constructor(
    private timelineService: TimelineService,
    private followingService: FollowingsService
  ) {}

  ngOnInit() {
    this.getTimeline();
  }

  onScroll = () => {
    this.moreTweet();
  };

  getTimeline(): void {
    this.pageLoading = true;
    this.timelineService
      .getTimeline(this.params)
      .subscribe({
        next: ({ timeline, count }) => {
          // timeline.forEach((data, idx): ITimeline => {
          //   if (idx % 2 !== 0) {
          //     data.user.active = true;
          //   } else {
          //     data.user.active = false;
          //   }
          //   return data;
          // });
          this.isEndOfList = count === 0;
          this.timelines = [...this.timelines, ...timeline];
        },
        error: (error) => {
          console.warn(error);
        },
      })
      .add(() => (this.pageLoading = false));
  }

  moreTweet(): void {
    if (this.isEndOfList) return;
    this.params.page++
    this.params.size = this.params.size + 20
    this.getTimeline();
  }

  tabChange(change: MatTabChangeEvent): void {
    let label = change.tab.textLabel;
    if (label === 'Followings') {
      // this.getFollowingUsers();
    }
  }

  // getFollowingUsers(): void {
  //   this.pageLoading = true;

  //   this.followingService
  //     .getFollowingUsers()
  //     .subscribe({
  //       next: ({ followings }) => {
  //         this.followings = followings;
  //       },
  //       error: (error) => {
  //         console.warn(error);
  //       },
  //     })
  //     .add(() => (this.pageLoading = false));
  // }
}

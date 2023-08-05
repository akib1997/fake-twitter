import { Component, OnInit } from '@angular/core';
import { IFollowing, IFollowingParams } from '@app/models/following.model';
import { AutoUnsubscribe } from '@app/utilities/autoUnsubscribe';
import { FollowingsService } from '@modules/main/pages/services/followings/followings.service';
@AutoUnsubscribe()
@Component({
  selector: 'following-users',
  templateUrl: './following-users.component.html',
  styleUrls: ['./following-users.component.scss'],
})
export class FollowingUsersComponent implements OnInit {
  pageLoading = false;
  followings: IFollowing[] =[];
  params: IFollowingParams = {
    page: 1,
    size: 20,
  };
  totalTweets = 0;
  isEndOfList: boolean = false;

  constructor(private followingService: FollowingsService) {}

  ngOnInit() {
    this.getFollowingUsers();
  }

  onScroll = () => {
    this.moreData();
  };

  moreData(): void {
    if (this.isEndOfList) return;
    this.params.page++;
    this.getFollowingUsers();
  }

  getFollowingUsers(): void {
    this.pageLoading = true;

    this.followingService
      .getFollowingUsers(this.params)
      .subscribe({
        next: ({ followings, count }) => {
          this.isEndOfList = count === 0;
          this.followings =[...this.followings, ...followings];
        },
        error: (error) => {
          console.warn(error);
        },
      })
      .add(() => (this.pageLoading = false));
  }
}

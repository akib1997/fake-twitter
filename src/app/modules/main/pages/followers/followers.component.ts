import { Component, OnInit } from '@angular/core';
import { IFollower, IFollowerParams } from '@app/models/follower.model';
import { FollowersService } from '@modules/main/pages/services/followers/followers.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  pageLoading = false;
  followers: IFollower[] = [];
  params: IFollowerParams = {
    page: 1,
    size: 20,
  };
  totalTweets = 0;
  isEndOfList: boolean = false;

  constructor(private followersService: FollowersService) {}

  ngOnInit() {
    this.getFollowers();
  }

  onScroll = () => {
    this.more();
  };

  more(): void {
    if (this.isEndOfList) return;
    this.params.page++
    this.params.size = this.params.size + 20
    this.getFollowers();
  }

  getFollowers(): void {
    this.pageLoading = true;

    this.followersService
      .getFollowers(this.params)
      .subscribe({
        next: ({followers, count}) => {
          this.isEndOfList = count === 0;
          this.followers = [...this.followers, ...followers];
        },
        error: (error) => {
          console.warn(error);
        },
      })
      .add(() => (this.pageLoading = false));
  }

}

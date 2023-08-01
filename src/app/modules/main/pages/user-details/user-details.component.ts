import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { IFollower } from '@app/models/follower.model';
import { IFollowing } from '@app/models/following.model';
import { ITweet } from '@app/models/tweet.model';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  pageLoading = false;
  userId: number;
  username: string;
  tabLabels = TabLabels;
  tweets: ITweet[];
  followers: IFollower[];
  followings: IFollowing[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
  }

  tabChange(change: MatTabChangeEvent): void {
    let label = change.tab.textLabel;

    if (label == TabLabels.Tweets) {
      this.getTweets(this.userId);
    } else if (label == TabLabels['Followers']) {
      this.getFollowers(this.userId);
    } else if (label == TabLabels['Followings']) {
      this.getFollowings(this.userId);
    }
  }

  getTweets(id: number): void {
    this.pageLoading = true;
    this.userService
      .getTweets(id)
      .subscribe((followers) => {
        this.tweets = followers.tweets;
      })
      .add(() => (this.pageLoading = false));
  }

  getFollowers(id: number): void {
    this.pageLoading = true;
    this.userService
      .getFollowers(id)
      .subscribe((followers) => {
        this.followers = followers.followers;
      })
      .add(() => (this.pageLoading = false));
  }

  getFollowings(id: number): void {
    this.pageLoading = true;
    this.userService
      .getFollowings(id)
      .subscribe((followers) => {
        this.followings = followers.followings;
      })
      .add(() => (this.pageLoading = false));
  }
}

enum TabLabels {
  'Followings' = 'Followings',
  'Followers' = 'Followers',
  'Tweets' = 'Tweets',
}

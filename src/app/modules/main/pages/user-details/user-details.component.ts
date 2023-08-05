import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { IFollower } from '@app/models/follower.model';
import { IFollowing } from '@app/models/following.model';
import { ITweet } from '@app/models/tweet.model';
import { UserService } from '@modules/main/pages/services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  pageLoading = false;
  userId: number;
  username: string;
  tabLabels = TabLabels;
  tweets: ITweet[];
  followers: IFollower[];
  followings: IFollowing[];
  notFound = {
    tweetsNotFound: false,
    followersNotFound: false,
    followingsNotFound: false
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
    this.route.queryParams.subscribe((params) => {
      this.username = params['userName'];
    });

    this.userId && this.getTweets(this.userId);
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
      .subscribe(({ tweets, count }) => {
        this.notFound.tweetsNotFound = count === 0;
        this.tweets = tweets;
      })
      .add(() => (this.pageLoading = false));
  }

  getFollowers(id: number): void {
    this.pageLoading = true;
    this.userService
      .getFollowers(id)
      .subscribe(({ followers, count }) => {
        this.notFound.followersNotFound = count === 0;
        this.followers = followers;
      })
      .add(() => (this.pageLoading = false));
  }

  getFollowings(id: number): void {
    this.pageLoading = true;
    this.userService
      .getFollowings(id)
      .subscribe(({ followings, count }) => {
        this.notFound.followingsNotFound = count === 0;
        this.followings = followings;
      })
      .add(() => (this.pageLoading = false));
  }
}

enum TabLabels {
  'Followings' = 'Followings',
  'Followers' = 'Followers',
  'Tweets' = 'Tweets',
}

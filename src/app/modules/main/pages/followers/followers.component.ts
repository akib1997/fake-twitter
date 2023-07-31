import { Component, OnInit } from '@angular/core';
import { IFollower } from '@app/models/follower.model';
import { FollowersService } from '@app/services/followers/followers.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  pageLoading = false;
  followers: IFollower[];

  constructor(private followersService: FollowersService) {}

  ngOnInit() {
    this.getFollowers();
  }

  getFollowers(): void {
    this.pageLoading = true;

    this.followersService
      .getFollowers()
      .subscribe({
        next: (data) => {
          this.followers = data.followers;
        },
        error: (error) => {
          console.warn(error);
        },
      })
      .add(() => (this.pageLoading = false));
  }

}

import { Component, OnInit } from '@angular/core';
import { IFollowing } from '@app/models/following.model';
import { FollowingsService } from '@app/services/followings/followings.service';

@Component({
  selector: 'app-following-users',
  templateUrl: './following-users.component.html',
  styleUrls: ['./following-users.component.scss']
})
export class FollowingUsersComponent implements OnInit {
  pageLoading = false;
  followers: IFollowing[];

  constructor(private followingService: FollowingsService) {}

  ngOnInit() {
    this.getFollowingUsers();
  }

  getFollowingUsers(): void {
    this.pageLoading = true;

    this.followingService
      .getFollowingUsers()
      .subscribe({
        next: (data) => {
          this.followers = data.followings;
          console.log(data.followings, 'd')
        },
        error: (error) => {
          console.warn(error);
        },
      })
      .add(() => (this.pageLoading = false));
  }

}

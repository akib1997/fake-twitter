import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFolllowParams, IFollower, IUnFolllowParams } from '@app/models/follower.model';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'follower-card',
  templateUrl: './follower-card.component.html',
  styleUrls: ['./follower-card.component.scss'],
})
export class FollowerCardComponent implements OnInit {
  @Input({ required: true }) follower: IFollower;
  isFollowed: boolean;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  get isFollowerActive(): boolean {
    return this.follower.active;
  }



  unFollow(userId: number) {
    const params: IUnFolllowParams = {user_id: userId}
    this.userService.unfollowUser(params).subscribe(res => {
      this.isFollowed = true
      this.snackBar.open(res?.resp, 'Dismiss', {
        duration: 2000,
        panelClass: ['success-toast'],
      });
    })
  }
}

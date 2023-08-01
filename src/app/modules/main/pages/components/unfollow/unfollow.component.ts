import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFolllowParams, IUnFolllowParams } from '@app/models/follower.model';
import { UserService } from '@app/services/user/user.service';

@Component({
  standalone: true,
  selector: 'unfollow',
  templateUrl: './unfollow.component.html',
  styleUrls: ['./unfollow.component.css'],
  imports: [MatButtonModule]
})
export class UnfollowComponent {
  isUnFollowed: boolean;
  @Input({required: true}) userId: number;
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  unfollowUser(userId: number) {
    const params: IUnFolllowParams = {user_id: userId}
    this.userService.unfollowUser(params).subscribe(res => {
      this.isUnFollowed = true
      this.snackBar.open(res?.resp, 'Dismiss', {
        duration: 2000,
        panelClass: ['success-toast'],
      });
    })
  }

}

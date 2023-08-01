import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFolllowParams } from '@app/models/follower.model';
import { UserService } from '@app/services/user/user.service';

@Component({
  standalone: true,
  selector: 'follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss'],
  imports: [MatButtonModule]
})
export class FollowComponent {
  isFollowed: boolean;
  @Input({required: true}) userId: number;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  follow(userId: number) {
    const params: IFolllowParams = {user_id: userId}
    this.userService.followUser(params).subscribe(res => {
      this.isFollowed = true
      this.snackBar.open(res?.resp, 'Dismiss', {
        duration: 2000,
        panelClass: ['success-toast'],
      });
    })
  }

}

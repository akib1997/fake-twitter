import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFolllowParams } from '@app/models/follower.model';
import { SnackbarService } from '@app/services/snackbar/snackbar.service';
import { UserService } from '@modules/main/pages/services/user/user.service';
import { MatSharedModule } from '@shared/mat-shared.module';

@Component({
  standalone: true,
  selector: 'follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss'],
  imports: [MatSharedModule]
})
export class FollowComponent {
  @Input({required: true}) userId: number;
  isFollowed = false;
  isButtonSubmitting = false;

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService
  ) { }

  follow(userId: number) {
    const params: IFolllowParams = {user_id: userId}
    this.isButtonSubmitting = true;
    this.userService.followUser(params).subscribe(res => {
      this.isFollowed = true
      this.snackbarService.showSuccess(res?.resp, 'Dismiss', {
        duration: 1000,
        panelClass: ['success-toast'],
      });
    }).add(() => {
      this.isButtonSubmitting = false;
    })
  }

}

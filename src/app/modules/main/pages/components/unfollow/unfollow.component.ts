import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFolllowParams, IUnFolllowParams } from '@app/models/follower.model';
import { SnackbarService } from '@app/services/snackbar/snackbar.service';
import { UserService } from '@modules/main/pages/services/user/user.service';
import { MatSharedModule } from '@shared/mat-shared.module';

@Component({
  standalone: true,
  selector: 'unfollow',
  templateUrl: './unfollow.component.html',
  styleUrls: ['./unfollow.component.scss'],
  imports: [ MatSharedModule]
})
export class UnfollowComponent {
  @Input({required: true}) userId: number;

  isButtonSubmitting = false
  isUnFollowed = false;

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService
  ) { }

  unfollowUser(userId: number) {
    const params: IUnFolllowParams = {user_id: userId};
    this.isButtonSubmitting = true
    this.userService.unfollowUser(params).subscribe({
      next: (res) => {
        this.isUnFollowed = true
        this.snackbarService.showSuccess(res?.resp);
      },
      error: (err) => {
        this.snackbarService.showSuccess('Error');
      }
    }).add(() => {
    this.isButtonSubmitting = false

    })
  }

}

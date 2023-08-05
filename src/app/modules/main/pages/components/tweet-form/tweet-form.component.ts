import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ITeweetRequest } from '@app/models/user.model';
import { SnackbarService } from '@app/services/snackbar/snackbar.service';
import { SpinnerService } from '@app/services/spinner/spinner.service';
import { markAllControlsAsDirty } from '@app/utilities/markAllControlsAsDirty';
import { TweetService } from '@modules/main/pages/services/tweet/tweet.service';

@Component({
  selector: 'tweet-form',
  templateUrl: './tweet-form.component.html',
  styleUrls: ['./tweet-form.component.scss'],
})
export class TweetFormComponent implements OnInit {
  remainingChars = 160;
  tweetForm: FormGroup<TTweetForm>;

  constructor(
    private fb: FormBuilder,
    private tweetService: TweetService,
    private dialogRef: MatDialogRef<TweetFormComponent>,
    private spinnerService: SpinnerService,
    private snackBar: SnackbarService,
  ) {}

  ngOnInit() {
    this.formInitialization();
  }

  tweet() {
    if (this.tweetForm.invalid) {
      markAllControlsAsDirty([this.tweetForm]);
      return;
    }
    const payload = this.tweetForm.value as ITeweetRequest;
    this.spinnerService.show()
    this.tweetService
      .tweet(payload)
      .subscribe({
        next: (res) => {
          this.snackBar.showSuccess(res.message, 'Dismiss', {
            duration: 1000,
          });
        },
        error: (err) => {
          this.snackBar.showError(err, 'Dismiss', {
            duration: 1000,
          });
        },
      })
      .add(() => {
        this.dialogRef.close();
        this.spinnerService.hide()

      });
  }

  formInitialization(): void {
    this.tweetForm = this.fb.group<TTweetForm>({
      content: this.fb.control(null, [
        Validators.required,
        Validators.maxLength(160),
        Validators.minLength(10),
      ]),
    });

    this.tweetForm.get('content')?.valueChanges.subscribe((data: string | null) => {
      this.remainingChars = 160 - (data as string).length;
    })
  }

  cancel() {
    this.dialogRef.close();
  }
}

type TTweetForm = {
  [key in keyof ITeweetRequest]: FormControl<ITeweetRequest[key] | null>;
};

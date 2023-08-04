import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ITeweetRequest } from '@app/models/user.model';
import { MatDialogRef } from '@angular/material/dialog';
import { TweetService } from '@modules/main/pages/services/tweet/tweet.service';
import { markAllControlsAsDirty } from '@app/utilities/markAllControlsAsDirty';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tweet-form',
  templateUrl: './tweet-form.component.html',
  styleUrls: ['./tweet-form.component.css'],
})
export class TweetFormComponent implements OnInit {
  tweetForm: FormGroup<TTweetForm>;
  constructor(
    private fb: FormBuilder,
    private tweetService: TweetService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<TweetFormComponent>
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
    this.tweetService
      .tweet(payload)
      .subscribe(
        (res) => {
          this.snackBar.open(res.message, 'Dismiss', {
            duration: 2000,
            panelClass: ['success-toast'],
          });
          this.dialogRef.close();
        },
        (err) => {
          this.dialogRef.close();
        }
      )
      .add(() => {
        this.dialogRef.close();
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
  }

  cancel() {
    this.dialogRef.close();
  }
}

type TTweetForm = {
  [key in keyof ITeweetRequest]: FormControl<ITeweetRequest[key] | null>;
};

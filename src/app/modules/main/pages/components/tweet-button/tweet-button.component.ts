import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TweetFormComponent } from '../tweet-form/tweet-form.component';

@Component({
  selector: 'tweet-button',
  templateUrl: './tweet-button.component.html',
  styleUrls: ['./tweet-button.component.css']
})
export class TweetButtonComponent {

  constructor(
    private dialog: MatDialog
  ) { }


  openTweetDialog() {
    const dialogRef = this.dialog.open(TweetFormComponent, {
      width: '400px',
    });
  }

}

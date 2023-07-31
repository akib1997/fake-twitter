import { Component, OnInit } from '@angular/core';
import { ITweet } from '@app/models/tweet.model';
import { TweetService } from '@app/services/tweet/tweet.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss'],
})
export class TweetsComponent implements OnInit {
  pageLoading = false;
  tweets: ITweet[];

  constructor(private tweetService: TweetService) {}

  ngOnInit() {
    this.getTweets();
  }

  getTweets(): void {
    this.pageLoading = true;

    this.tweetService
      .getTweets()
      .subscribe({
        next: (data) => {
          this.tweets = data.my_tweets;
        },
        error: (error) => {
          console.warn(error);
        },
      })
      .add(() => (this.pageLoading = false));
  }
}

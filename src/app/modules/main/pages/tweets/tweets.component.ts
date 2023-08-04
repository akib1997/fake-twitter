import { Component, OnInit } from '@angular/core';
import { ITweet, ITweetParams } from '@app/models/tweet.model';
import { TweetService } from '@modules/main/pages/services/tweet/tweet.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss'],
})
export class TweetsComponent implements OnInit {
  pageLoading = false;
  tweets: ITweet[] = [];
  params: ITweetParams = {
    page: 1,
    size: 20,
  };
  totalTweets = 0;
  isEndOfList: boolean = false;

  constructor(private tweetService: TweetService) {}

  ngOnInit() {
    this.getTweets();
  }

  onScroll = () => {
    this.moreTweet();
  };

  moreTweet(): void {
    if (this.isEndOfList) return;
    this.params.page++
    this.params.size = this.params.size + 20
    this.getTweets();
  }

  getTweets(): void {
    this.pageLoading = true;

    this.tweetService
      .getTweets(this.params)
      .subscribe({
        next: ({my_tweets, count}) => {
          this.isEndOfList = count === 0;
          this.tweets = [...this.tweets, ...my_tweets];
        },
        error: (error) => {
          console.warn(error);
        },
      })
      .add(() => (this.pageLoading = false));
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { TweetCardComponent } from './pages/components/tweet-card/tweet-card.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './pages/components/navigation/navigation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TweetsComponent } from './pages/tweets/tweets.component';
import { FollowersComponent } from './pages/followers/followers.component';
import { FollowerCardComponent } from './pages/components/follower-card/follower-card.component';
import { FollowingUsersComponent } from './pages/following-users/following-users.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    // RouterModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  declarations: [MainComponent, TimelineComponent, TweetCardComponent, NavigationComponent, TweetsComponent, FollowersComponent, FollowerCardComponent, FollowingUsersComponent]
})
export class MainModule { }

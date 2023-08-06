import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { TweetCardComponent } from './pages/components/tweet-card/tweet-card.component';

import { NavigationComponent } from './pages/components/navigation/navigation.component';

import { TweetsComponent } from './pages/tweets/tweets.component';
import { FollowersComponent } from './pages/followers/followers.component';
import { FollowerCardComponent } from './pages/components/follower-card/follower-card.component';
import { FollowingUsersComponent } from './pages/following-users/following-users.component';

import { FollowComponent } from './pages/components/follow/follow.component';
import { UnfollowComponent } from './pages/components/unfollow/unfollow.component';
import { UsersComponent } from './pages/users/users.component';
import { UserCardComponent } from './pages/components/user-card/user-card.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

import { SearchComponent } from './pages/components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TweetFormComponent } from './pages/components/tweet-form/tweet-form.component';
import { TweetButtonComponent } from './pages/components/tweet-button/tweet-button.component';
import { MatSharedModule } from '@shared/mat-shared.module';
import { HeaderComponent } from './pages/components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './pages/components/sidebar/sidebar.component';
import { SharedModule } from '@shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrollInfiniteComponent } from './pages/components/scroll-infinite/scroll-infinite.component';
import { SkeletonComponent } from './pages/components/skeleton/skeleton.component';
import { AvatarComponent } from './pages/components/avatar/avatar.component';
import { BottomNavigationComponent } from './pages/components/bottom-navigation/bottom-navigation.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSharedModule,
    SharedModule,
    MatSidenavModule,
    InfiniteScrollModule,

    // Components
    FollowComponent,
    UnfollowComponent,
    AvatarComponent
  ],
  declarations: [
    MainComponent,
    TimelineComponent,
    TweetCardComponent,
    NavigationComponent,
    TweetsComponent,
    FollowersComponent,
    FollowerCardComponent,
    FollowingUsersComponent,
    UsersComponent,
    UserCardComponent,
    UserDetailsComponent,
    SearchComponent,
    TweetFormComponent,
    TweetButtonComponent,
    HeaderComponent,
    SidebarComponent,
    ScrollInfiniteComponent,
    SkeletonComponent,
    BottomNavigationComponent
  ],
})
export class MainModule {}

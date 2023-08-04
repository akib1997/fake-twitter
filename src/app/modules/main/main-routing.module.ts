import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth.guard';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { TweetsComponent } from './pages/tweets/tweets.component';
import { FollowersComponent } from './pages/followers/followers.component';
import { MainComponent } from './main.component';
import { FollowingUsersComponent } from './pages/following-users/following-users.component';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home',
    },
    children: [
      {
        path: '',
        component: TimelineComponent,
        data: {
          title: 'Home',
        },
      },
      {
        path: 'tweets',
        component: TweetsComponent,
      },
      {
        path: 'followers',
        component: FollowersComponent,
        data: {
          title: 'followers',
        },
      },
      {
        path: 'followings',
        component: FollowingUsersComponent,
        data: {
          title: 'followings',
        },
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'users',
        },
      },
      {
        path: 'users/:id',
        component: UserDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

import { Component, OnInit } from '@angular/core';
import { IUser, IUsersParams } from '@app/models/user.model';
import { AutoUnsubscribe } from '@app/utilities/autoUnsubscribe';
import { UserService } from '@modules/main/pages/services/user/user.service';
@AutoUnsubscribe()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  pageLoading = false;
  users: IUser[] = [];
  params: IUsersParams = {
    page: 1,
    size: 20,
  };
  totalTweets = 0;
  isEndOfList: boolean = false;

  constructor(private userServices: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  onScroll = () => {
    this.more();
  };

  more(): void {
    if (this.isEndOfList) return;
    this.params.page++;
    this.getUsers();
  }

  getUsers(): void {
    this.pageLoading = true;
    this.userServices
      .getUsers(this.params)
      .subscribe(({ users, count }) => {
        this.isEndOfList = count === 0;
        this.users = [...this.users, ...users];
      })
      .add(() => (this.pageLoading = false));
  }
}

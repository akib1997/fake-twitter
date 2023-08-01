import { Component, OnInit } from '@angular/core';
import { IUser } from '@app/models/user.model';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  pageLoading = false;
  users: IUser[];
  constructor(private userServices: UserService) {}

  ngOnInit() {
    this.getUsre()
  }

  getUsre(): void {
    this.pageLoading = true;
    this.userServices
      .getUsers()
      .subscribe((res) => {
        this.users = res.users;
      })
      .add(() => (this.pageLoading = false));
  }
}

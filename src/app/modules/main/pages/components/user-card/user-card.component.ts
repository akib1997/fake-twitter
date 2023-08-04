import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@app/models/user.model';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  @Input({ required: true }) user: IUser;
  // isFollowed: boolean;

  constructor(
    private userService: UserService,
  ) {}

  get isUserActive(): boolean {
    return this.user.active;
  }

}

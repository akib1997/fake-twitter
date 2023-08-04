import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: true,
})
export class AvatarComponent {
  @Input({ required: true }) userName: string;
  constructor() {}
}

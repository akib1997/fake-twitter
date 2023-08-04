import { Component, OnInit } from '@angular/core';
import { IUser } from '@app/models/user.model';
import { AuthService } from '@app/services/auth/auth.service';
import { LocalStorageService } from '@services/local-store/local-storage.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userEmail: string

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userEmail = this.localStorageService.getItem('user')!
  }

  logout(): void {
    this.authService.logout()
  }

}

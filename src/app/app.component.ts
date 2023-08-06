import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from '@app/services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  preLoader = false
  constructor(
    private loadingService: LoadingService,
  ) {}
  ngOnInit(): void {

  }

  onActivate(): void {
    this.preLoader = true;
    setTimeout(() => {
      this.preLoader = false;
    }, 1000);
  }
}

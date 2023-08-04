import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from '@app/services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading = false;

  constructor(
    private loadingService: LoadingService,
  ) {}
  ngOnInit(): void {
    this.loadingService.loading$.subscribe((isLoading) => {
      this.loading = isLoading;
    });
  }
}

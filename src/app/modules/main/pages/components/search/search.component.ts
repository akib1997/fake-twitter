import { Component, HostListener, OnInit } from '@angular/core';
import { IUser } from '@app/models/user.model';
import { SearchService } from '@modules/main/pages/services/search/search.service';
import { Subject, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, height: 'auto', overflowY: 'auto', overflowX: 'visible'})),
      transition(':enter', [style({ opacity: 0, height: 0 }), animate('300ms ease-out')]),
      transition(':leave', animate('300ms ease-in', style({ opacity: 0, height: 0 }))),
    ]),
  ],
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  searchResults: IUser[] = [];
  showResults = false;
  loading = false;
  private searchSubject = new Subject<string>();


  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(500),
      filter((query) => query.length >= 3)
    ).subscribe((query) => {
      this.performSearch(query);
    });
  }

  onSearch(query: string) {
    // Emit the search query through the Subject after a delay
    this.searchSubject.next(query);
  }

  // search() {
  //   if (this.searchTerm?.length > 2) {
  //     this.performSearch();
  //   }
  // }


  onInputFocus() {
    this.showResults = true; // Show the data section when the input is focused.
  }


  onInputBlur() {
    this.showResults = false; // Hide the data section when the input is unfocused.
  }

   performSearch(query: string) {
    this.loading = true;
    this.searchService.search(query).subscribe({
      next: ({search_results}) => {
        this.searchResults = search_results;
        console.log(search_results, 'search_results')
        // this.showResults = true;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.searchResults = [];
      }
    }
    ).add(() => this.loading = false);
  }

}

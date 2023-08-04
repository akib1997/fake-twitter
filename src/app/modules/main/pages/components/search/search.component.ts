import { Component, HostListener, OnInit } from '@angular/core';
import { IUser } from '@app/models/user.model';
import { SearchService } from '@app/services/search/search.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, height: 'auto' })),
      transition(':enter', [style({ opacity: 0, height: 0 }), animate('300ms ease-out')]),
      transition(':leave', animate('300ms ease-in', style({ opacity: 0, height: 0 }))),
    ]),
  ],
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  searchResults: IUser[] = [];
  showResults = false
  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
  }

  search() {
    if (this.searchTerm?.length > 2) {
      this.performSearch();
    } else {
      this.searchResults = [];
    }
  }


  onInputFocus() {
    this.showResults = true; // Show the data section when the input is focused.
  }


  onInputBlur() {
    this.showResults = false; // Hide the data section when the input is unfocused.
  }

  private performSearch() {
    this.searchService.search(this.searchTerm).subscribe(
      (results) => {
        this.searchResults = results.search_results;
        console.log(results, 'res')
        // this.showResults = true;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.searchResults = [];
        // this.showResults = true;
      }
    );
  }

}

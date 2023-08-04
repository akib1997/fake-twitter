import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetTimePipe } from './pipes/tweet-time.pipe';
import { StringToDatePipe } from './pipes/string-to-date.pipe';
import { CutAfterAtPipe } from './pipes/cutAfterAt.pipe';
import { CustomForDirective } from './directive/customFor.directive';
import { NgForEmpty } from './directive/ngForEmpty.directive';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    TweetTimePipe,
    StringToDatePipe,
    CutAfterAtPipe,
    CustomForDirective,
    NgForEmpty,

    // Components
    NotFoundComponent
  ],
  exports: [
    CommonModule,
    TweetTimePipe,
    StringToDatePipe,
    CutAfterAtPipe,
    CustomForDirective,
    NgForEmpty
  ],
})
export class SharedModule {}

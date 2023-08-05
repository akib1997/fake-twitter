import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetTimePipe } from './pipes/tweet-time.pipe';
import { StringToDatePipe } from './pipes/string-to-date.pipe';
import { CutAfterAtPipe } from './pipes/cutAfterAt.pipe';
import { CustomForDirective } from './directive/customFor.directive';
import { NgForEmpty } from './directive/ngForEmpty.directive';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RemoveWhiteSpacePipe } from './pipes/removeWhiteSpace.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    CustomForDirective,
    NgForEmpty,

    // Components
    NotFoundComponent,

    // Pipes
    TweetTimePipe,
    StringToDatePipe,
    CutAfterAtPipe,
    RemoveWhiteSpacePipe,

  ],
  declarations: [SpinnerComponent],
  exports: [
    CommonModule,
    CustomForDirective,
    NgForEmpty,
    SpinnerComponent,

     // Pipes
     TweetTimePipe,
     StringToDatePipe,
     CutAfterAtPipe,
     RemoveWhiteSpacePipe,
  ],
})
export class SharedModule {}

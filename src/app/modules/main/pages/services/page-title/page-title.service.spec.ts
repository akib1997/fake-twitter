/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PageTitleService } from './page-title.service';

describe('Service: PageTitle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageTitleService]
    });
  });

  it('should ...', inject([PageTitleService], (service: PageTitleService) => {
    expect(service).toBeTruthy();
  }));
});

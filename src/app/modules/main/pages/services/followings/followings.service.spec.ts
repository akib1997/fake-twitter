/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FollowingsService } from './followings.service';

describe('Service: Followings', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FollowingsService]
    });
  });

  it('should ...', inject([FollowingsService], (service: FollowingsService) => {
    expect(service).toBeTruthy();
  }));
});

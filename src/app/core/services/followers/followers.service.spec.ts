/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FollowersService } from './followers.service';

describe('Service: Followers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FollowersService]
    });
  });

  it('should ...', inject([FollowersService], (service: FollowersService) => {
    expect(service).toBeTruthy();
  }));
});

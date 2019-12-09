import { TestBed } from '@angular/core/testing';

import { UpvoteServiceService } from './upvote-service.service';

describe('UpvoteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpvoteServiceService = TestBed.get(UpvoteServiceService);
    expect(service).toBeTruthy();
  });
});

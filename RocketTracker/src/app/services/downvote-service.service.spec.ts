import { TestBed } from '@angular/core/testing';

import { DownvoteServiceService } from './downvote-service.service';

describe('DownvoteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownvoteServiceService = TestBed.get(DownvoteServiceService);
    expect(service).toBeTruthy();
  });
});

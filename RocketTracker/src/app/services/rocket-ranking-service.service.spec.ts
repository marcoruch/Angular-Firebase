import { TestBed } from '@angular/core/testing';

import { RocketRankingService } from './rocket-ranking-service.service';

describe('RocketDailyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RocketRankingService = TestBed.get(RocketRankingService);
    expect(service).toBeTruthy();
  });
});

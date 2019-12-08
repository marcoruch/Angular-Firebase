import { TestBed, async, inject } from '@angular/core/testing';

import { FirebaseGuard } from './firebase-guard.guard';

describe('FirebaseGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseGuard]
    });
  });

  it('should ...', inject([FirebaseGuard], (guard: FirebaseGuard) => {
    expect(guard).toBeTruthy();
  }));
});

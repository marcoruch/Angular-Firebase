import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPlayerRankingComponent } from './daily-player-ranking.component';

describe('DailyPlayerRankingComponent', () => {
  let component: DailyPlayerRankingComponent;
  let fixture: ComponentFixture<DailyPlayerRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyPlayerRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyPlayerRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

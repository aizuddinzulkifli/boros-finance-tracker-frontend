import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsInsightComponent } from './reports-insight.component';

describe('ReportsInsight', () => {
  let component: ReportsInsightComponent;
  let fixture: ComponentFixture<ReportsInsightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsInsightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

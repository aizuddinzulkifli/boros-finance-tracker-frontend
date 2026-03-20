import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetManageComponent } from './budget-manage.component';

describe('BudgetManageComponent', () => {
  let component: BudgetManageComponent;
  let fixture: ComponentFixture<BudgetManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

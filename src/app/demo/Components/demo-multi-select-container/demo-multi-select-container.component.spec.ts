import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoMultiSelectContainerComponent } from './demo-multi-select-container.component';

describe('DemoMultiSelectContainerComponent', () => {
  let component: DemoMultiSelectContainerComponent;
  let fixture: ComponentFixture<DemoMultiSelectContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoMultiSelectContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoMultiSelectContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

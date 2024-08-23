import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationWrapperComponent } from './visualization-wrapper.component';

describe('VisualizationWrapperComponent', () => {
  let component: VisualizationWrapperComponent;
  let fixture: ComponentFixture<VisualizationWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizationWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizationWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

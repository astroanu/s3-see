import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

import { PrettySizePipe } from '../../pipes/pretty-size.pipe';
import { SlideShowComponent } from '../slide-show/slide-show.component';
import { ViewComponent } from './view.component';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrettySizePipe, ViewComponent, SlideShowComponent],
      imports: [FormsModule, SliderModule, ProgressSpinnerModule, ToolbarModule, TableModule, ButtonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

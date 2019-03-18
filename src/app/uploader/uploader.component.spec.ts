import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ElectronService } from 'ngx-electron';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

import { PrettySizePipe } from '../../pipes/pretty-size.pipe';
import { SlideShowComponent } from '../slide-show/slide-show.component';
import { ViewComponent } from '../view/view.component';
import { UploaderComponent } from './uploader.component';

describe('UploaderComponent', () => {
  let component: UploaderComponent;
  let fixture: ComponentFixture<UploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrettySizePipe, UploaderComponent, ViewComponent, SlideShowComponent],
      providers: [ElectronService],
      imports: [
        FormsModule,
        ButtonModule,
        DialogModule,
        TableModule,
        CheckboxModule,
        SliderModule,
        ToolbarModule,
        ProgressSpinnerModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

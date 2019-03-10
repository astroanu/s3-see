import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
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
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ButtonModule,
        DialogModule,
        PanelModule,
        ProgressSpinnerModule,
        SliderModule,
        TableModule,
        ToolbarModule,
        SidebarModule
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

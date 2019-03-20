import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElectronService } from 'ngx-electron';
import { MessageService } from 'primeng/components/common/messageservice';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';

import { PrettySizePipe } from '../pipes/pretty-size.pipe';
import { AppComponent } from './app.component';
import { DirTreeComponent } from './dir-tree/dir-tree.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ViewComponent } from './view/view.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, PrettySizePipe, DirTreeComponent, ViewComponent, UploaderComponent],
      providers: [MessageService, ElectronService],
      imports: [FormsModule, ReactiveFormsModule, DropdownModule, MenubarModule, ToastModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

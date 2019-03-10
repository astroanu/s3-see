import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'ngx-moment';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';

import { PrettySizePipe } from '../pipes/pretty-size.pipe';
import { ConfigService } from '../services/config/config.service';
import { FileService } from '../services/file/file.service';
import { TreeService } from '../services/tree/tree.service';
import { AppComponent } from './app.component';
import { DirTreeComponent } from './dir-tree/dir-tree.component';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [AppComponent, DirTreeComponent, ViewComponent, SlideShowComponent, PrettySizePipe, UploaderComponent],
  imports: [
    BrowserAnimationsModule,
    DialogModule,
    InputTextModule,
    CheckboxModule,
    BrowserModule,
    PanelModule,
    SidebarModule,
    ToolbarModule,
    SliderModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    ProgressSpinnerModule,
    TreeModule,
    TableModule,
    MomentModule,
    MenubarModule
  ],
  providers: [ConfigService, FileService, TreeService],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'ngx-moment';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';

import { PrettySizePipe } from '../pipes/pretty-size.pipe';
import { ConfigService } from '../services/config/config.service';
import { TreeService } from '../services/tree/tree.service';
import { FileService } from '../services/file/file.service';
import { AppComponent } from './app.component';
import { DirTreeComponent } from './dir-tree/dir-tree.component';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [AppComponent, DirTreeComponent, ViewComponent, SlideShowComponent, PrettySizePipe, UploaderComponent],
  imports: [
    BrowserModule,
    DialogModule,
    BrowserAnimationsModule,
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

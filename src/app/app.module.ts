import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';

import { PrettySizePipe } from '../pipes/pretty-size.pipe';
import { ConfigService } from '../services/config.service';
import { AppComponent } from './app.component';
import { DirTreeComponent } from './dir-tree/dir-tree.component';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { ViewComponent } from './view/view.component';

import { FileService } from '../services/file.service';

export const FileServiceSingleton = new FileService();

@NgModule({
  declarations: [AppComponent, DirTreeComponent, ViewComponent, SlideShowComponent, PrettySizePipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToolbarModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    ProgressSpinnerModule,
    TreeModule,
    TableModule,
    MenubarModule
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {}

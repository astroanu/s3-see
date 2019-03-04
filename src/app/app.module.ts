import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';

import { ConfigService } from '../services/config.service';
import { AppComponent } from './app.component';
import { DirTreeComponent } from './dir-tree/dir-tree.component';
import { ViewComponent } from './view/view.component';
import { SlideShowComponent } from './slide-show/slide-show.component';

@NgModule({
  declarations: [AppComponent, DirTreeComponent, ViewComponent, SlideShowComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToolbarModule,
    ButtonModule,
    FormsModule,
    ProgressSpinnerModule,
    TreeModule,
    TableModule,
    MenubarModule
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {}

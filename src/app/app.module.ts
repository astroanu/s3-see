import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { AppComponent } from './app.component';
import { DirTreeComponent } from './dir-tree/dir-tree.component';
import { ViewComponent } from './view/view.component';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [AppComponent, DirTreeComponent, ViewComponent],
  imports: [
    AmplifyAngularModule,
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
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule {}

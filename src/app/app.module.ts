import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxElectronModule } from "ngx-electron";
import { MomentModule } from "ngx-moment";
import { NgxPicaModule } from "@digitalascetic/ngx-pica";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { CheckboxModule } from "primeng/checkbox";
import { MessageService } from "primeng/api";
import { ContextMenuModule } from "primeng/contextmenu";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { MenubarModule } from "primeng/menubar";
import { ProgressBarModule } from "primeng/progressbar";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { SidebarModule } from "primeng/sidebar";
import { SliderModule } from "primeng/slider";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { TreeModule } from "primeng/tree";

import { PrettySizePipe } from "../pipes/pretty-size.pipe";
import { ConfigService } from "../services/config/config.service";
import { FileService } from "../services/file/file.service";
import { TreeService } from "../services/tree/tree.service";
import { JobFactoryService } from "../services/uploader/job.factory.service";
import { UploaderService } from "../services/uploader/uploader.service";
import { AppComponent } from "./app.component";
import { BucketManageComponent } from "./bucket-manage/bucket-manage.component";
import { DirTreeComponent } from "./dir-tree/dir-tree.component";
import { QueueComponent } from "./queue/queue.component";
import { SlideShowComponent } from "./slide-show/slide-show.component";
import { StatusBarComponent } from "./status-bar/status-bar.component";
import { UploaderComponent } from "./uploader/uploader.component";
import { ViewComponent } from "./view/view.component";

@NgModule({
  declarations: [
    AppComponent,
    DirTreeComponent,
    ViewComponent,
    SlideShowComponent,
    PrettySizePipe,
    UploaderComponent,
    BucketManageComponent,
    QueueComponent,
    StatusBarComponent,
  ],
  imports: [
    NgxElectronModule,
    NgxPicaModule,
    BrowserModule,
    DialogModule,
    BrowserAnimationsModule,
    ToolbarModule,
    SliderModule,
    CheckboxModule,
    SidebarModule,
    CardModule,
    InputTextModule,
    ContextMenuModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule,
    DropdownModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    TreeModule,
    TableModule,
    MomentModule,
    MenubarModule,
  ],
  providers: [
    MessageService,
    ConfigService,
    FileService,
    TreeService,
    UploaderService,
    JobFactoryService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

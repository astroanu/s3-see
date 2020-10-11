import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { async, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ElectronService } from "ngx-electron";
import { NgxPicaModule } from "@digitalascetic/ngx-pica";
import { MessageService } from "primeng/api";
import { DropdownModule } from "primeng/dropdown";
import { MenubarModule } from "primeng/menubar";
import { SidebarModule } from "primeng/sidebar";
import { ToastModule } from "primeng/toast";

import { PrettySizePipe } from "../pipes/pretty-size.pipe";
import { AppComponent } from "./app.component";
import { BucketManageComponent } from "./bucket-manage/bucket-manage.component";
import { DirTreeComponent } from "./dir-tree/dir-tree.component";
import { QueueComponent } from "./queue/queue.component";
import { UploaderComponent } from "./uploader/uploader.component";
import { ViewComponent } from "./view/view.component";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PrettySizePipe,
        DirTreeComponent,
        BucketManageComponent,
        QueueComponent,
        ViewComponent,
        UploaderComponent,
      ],
      providers: [MessageService, ElectronService],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SidebarModule,
        NgxPicaModule,
        DropdownModule,
        MenubarModule,
        ToastModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

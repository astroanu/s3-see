import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { TreeModule } from "primeng/tree";

import { DirTreeComponent } from "./dir-tree.component";

describe("DirTreeComponent", () => {
  let component: DirTreeComponent;
  let fixture: ComponentFixture<DirTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirTreeComponent],
      imports: [FormsModule, TreeModule, ToastModule],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(DirTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create instance", () => {
    expect(component).toBeTruthy();
  });
});

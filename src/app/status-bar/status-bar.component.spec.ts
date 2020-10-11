import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ProgressBarModule } from "primeng/progressbar";

import { StatusBarComponent } from "./status-bar.component";

describe("StatusBarComponent", () => {
  let component: StatusBarComponent;
  let fixture: ComponentFixture<StatusBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatusBarComponent],
      imports: [ProgressBarModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

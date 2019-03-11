import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';

import { DirTreeComponent } from './dir-tree.component';

describe('DirTreeComponent', () => {
  let component: DirTreeComponent;
  let fixture: ComponentFixture<DirTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirTreeComponent],
      imports: [FormsModule, TreeModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

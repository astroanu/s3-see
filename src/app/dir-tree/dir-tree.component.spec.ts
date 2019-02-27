import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'karma-jasmine';

import { DirTreeComponent } from './dir-tree.component';

describe('DirTreeComponent', () => {
  let component: DirTreeComponent;
  let fixture: ComponentFixture<DirTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirTreeComponent]
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

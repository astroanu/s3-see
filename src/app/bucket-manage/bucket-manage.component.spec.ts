import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

import { BucketManageComponent } from './bucket-manage.component';

describe('BucketManageComponent', () => {
  let component: BucketManageComponent;
  let fixture: ComponentFixture<BucketManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BucketManageComponent],
      imports: [FormsModule, ReactiveFormsModule, DialogModule, CardModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BucketManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create instance', () => {
    expect(component).toBeTruthy();
  });
});

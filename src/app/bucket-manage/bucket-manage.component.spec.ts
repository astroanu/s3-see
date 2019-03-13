import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketManageComponent } from './bucket-manage.component';

describe('BucketManageComponent', () => {
  let component: BucketManageComponent;
  let fixture: ComponentFixture<BucketManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

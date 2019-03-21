import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ConfigService } from '../../services/config/config.service';

@Component({
  selector: 'app-bucket-manage',
  templateUrl: './bucket-manage.component.html',
  styleUrls: ['./bucket-manage.component.scss']
})
export class BucketManageComponent {
  @Output() bucketsUpdated = new EventEmitter<any>();

  public displayDialog: boolean = false;

  public displayForm: boolean = false;

  public buckets: Array<object> = [];

  public itemForm: FormGroup = new FormGroup({
    label: new FormControl(null, [Validators.required]),
    bucketName: new FormControl(null, [Validators.required]),
    accessKeyId: new FormControl(null, [Validators.required]),
    secretAccessKey: new FormControl(null, [Validators.required]),
    region: new FormControl(null, [Validators.required])
  });

  private editIndex = null;

  showDialog() {
    this.loadBuckets()
      .then(() => {
        this.displayDialog = true;
      })
      .catch(() => console.log('showDialog failed'));
  }

  hideDialog() {
    this.displayDialog = false;
  }

  showForm() {
    this.displayForm = true;
  }

  hideForm() {
    this.displayForm = false;
  }

  showAddBucketDialog() {
    this.editIndex = null;
    this.itemForm.reset();
    this.showForm();
  }

  editBucket(index) {
    this.editIndex = index;
    this.itemForm.reset(this.buckets[this.editIndex]);

    this.showForm();
  }

  deleteBucket(index) {
    this.buckets.splice(index, 1);
  }

  addBucket() {
    if (this.editIndex) {
      this.buckets[this.editIndex] = this.itemForm.value;
    } else {
      this.buckets.push(this.itemForm.value);
    }

    this.hideForm();
  }

  saveBuckets() {
    this.config
      .updateBucketConfig(this.buckets)
      .then(() => {
        this.bucketsUpdated.emit();
      })
      .catch(() => console.log('saveBuckets failed'));

    this.hideDialog();
  }

  loadBuckets() {
    return this.config
      .getBuckets()
      .then((buckets) => {
        this.buckets = buckets.map((bucket) => {
          return Object.assign(bucket.getCredentials(), {
            bucketName: bucket.bucketName,
            label: bucket.label
          });
        });
      })
      .catch(() => console.log('loadBuckets failed'));
  }

  get label() {
    return this.itemForm.get('label');
  }

  get bucketName() {
    return this.itemForm.get('bucketName');
  }

  get accessKeyId() {
    return this.itemForm.get('accessKeyId');
  }

  get secretAccessKey() {
    return this.itemForm.get('secretAccessKey');
  }

  get region() {
    return this.itemForm.get('region');
  }

  constructor(private config: ConfigService) {}
}

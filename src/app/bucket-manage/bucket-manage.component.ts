import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ConfigService } from '../../services/config/config.service';

@Component({
  selector: 'app-bucket-manage',
  templateUrl: './bucket-manage.component.html',
  styleUrls: ['./bucket-manage.component.scss']
})
export class BucketManageComponent {
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

  showDialog() {
    this.loadBuckets();
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }

  showForm() {
    this.displayForm = true;
  }

  hideForm() {
    this.displayForm = false;
    this.itemForm = null;
  }

  showAddBucketDialog() {
    this.itemForm.reset();
    this.showForm();
  }

  editBucket(bucket) {
    this.itemForm.reset(bucket);

    this.showForm();
  }

  addBucket() {
    this.buckets.push(this.itemForm.value);
    this.hideForm();
  }

  saveBuckets() {
    this.config.updateBucketConfig(this.buckets);
    this.hideDialog();
  }

  loadBuckets() {
    this.config.getBuckets().then((buckets) => {
      this.buckets = buckets.map((bucket) => {
        return Object.assign(bucket.getCredentials(), {
          bucketName: bucket.bucketName,
          label: bucket.label
        });
      });
    });
  }

  constructor(private config: ConfigService) {}
}

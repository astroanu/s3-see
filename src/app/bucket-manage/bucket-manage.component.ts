import { Component } from '@angular/core';

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
  public currentItem: any = {};

  showDialog() {
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
    this.currentItem = null;
  }

  showAddBucketDialog() {
    this.currentItem = {};
    this.showForm();
  }

  editBucket(bucket) {
    this.currentItem = Object.assign(bucket, {});
    this.showForm();
  }

  addBucket() {
    this.buckets.push(this.currentItem);
    this.hideForm();
  }

  saveBuckets() {
    this.config.updateBucketConfig(this.buckets);
    this.hideDialog();
  }

  constructor(private config: ConfigService) {
    this.config.getBuckets().then((buckets) => {
      this.buckets = buckets.map((bucket) => {
        return Object.assign(bucket.getCredentials(), {
          bucketName: bucket.bucketName,
          label: bucket.label
        });
      });
    });
  }
}

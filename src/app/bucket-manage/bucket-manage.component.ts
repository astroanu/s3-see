import { Component } from '@angular/core';

import { ConfigService } from '../../services/config/config.service';

@Component({
  selector: 'app-bucket-manage',
  templateUrl: './bucket-manage.component.html',
  styleUrls: ['./bucket-manage.component.scss']
})
export class BucketManageComponent {
  public displayDialog: boolean = false;

  public buckets: Array<object> = [];

  showDialog() {
    this.displayDialog = true;
  }

  addBucket() {
    this.buckets.push({});
  }

  saveBuckets() {
    this.config.updateBucketConfig(this.buckets);
  }

  constructor(private config: ConfigService) {
    this.config.getBuckets().then((buckets) => {
      this.buckets = buckets;
    });
  }
}

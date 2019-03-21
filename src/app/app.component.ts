import { Component, ViewChild } from '@angular/core';

import { ConfigService } from '../services/config/config.service';
import { BucketManageComponent } from './bucket-manage/bucket-manage.component';
import { DirTreeComponent } from './dir-tree/dir-tree.component';
import { QueueComponent } from './queue/queue.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ViewComponent } from './view/view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(DirTreeComponent) dirTree: DirTreeComponent;
  @ViewChild(ViewComponent) view: ViewComponent;
  @ViewChild(UploaderComponent) uploader: UploaderComponent;
  @ViewChild(BucketManageComponent) bucketManager: BucketManageComponent;
  @ViewChild(QueueComponent) queueComponent: QueueComponent;

  currentNode: DocumentEvent;
  currentBucket;
  buckets: Array<object>;

  menuItems = [
    {
      label: 'File',
      items: [
        {
          label: 'Upload',
          command: () => {
            this.uploader.showDialog();
          }
        },
        {
          label: 'Buckets',
          command: () => {
            this.bucketManager.showDialog();
          }
        }
      ]
    }
  ];

  uploadQueued(job: any) {
    this.queueComponent.addJob(job);
  }

  refreshTree() {
    this.view.resetFilesShown();
    this.dirTree.initializeDirPane();
  }

  onSelected(event: DocumentEvent) {
    this.currentNode = event;
  }

  initializeBucktesList() {
    return this.config
      .getBuckets()
      .then(
        (buckets) => {
          if (!buckets.length) {
            this.bucketManager.showDialog();
            return;
          }

          this.buckets = buckets.map((bucket) => {
            return {
              label: bucket.label,
              value: bucket.bucketName
            };
          });

          this.setDefaultBucket();
        },
        (e) => console.log(e)
      )
      .catch((e) => console.log(e));
  }

  private setDefaultBucket() {
    const firstBucket: any = this.buckets[0];
    this.currentBucket = firstBucket.value;
  }

  constructor(private config: ConfigService) {
    this.initializeBucktesList();
  }
}

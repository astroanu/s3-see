import { Component, ViewChild } from '@angular/core';

import { ConfigService } from '../services/config/config.service';
import { BucketManageComponent } from './bucket-manage/bucket-manage.component';
import { DirTreeComponent } from './dir-tree/dir-tree.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ViewComponent } from './view/view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentNode: DocumentEvent;
  currentBucket;
  buckets: Array<object>;

  @ViewChild(DirTreeComponent) dirTree: DirTreeComponent;
  @ViewChild(ViewComponent) view: ViewComponent;
  @ViewChild(UploaderComponent) uploader: UploaderComponent;
  @ViewChild(BucketManageComponent) bucketManager: BucketManageComponent;

  menuItems = [
    {
      label: this.config.appName,
      icon: 'pi pi-fw pi-eye',
      items: [
        {
          label: 'Upload',
          icon: 'pi pi-fw pi-cloud-upload',
          command: () => {
            this.uploader.showDialog();
          }
        },
        {
          label: 'Buckets',
          icon: 'pi pi-fw pi-folder',
          command: () => {
            this.bucketManager.showDialog();
          }
        }
      ]
    }
  ];

  refreshTree() {
    this.view.resetFilesShown();
    this.dirTree.initializeDirPane();
  }

  onSelected(event: DocumentEvent) {
    this.currentNode = event;
  }

  private initializeBucktesList() {
    this.config.getBuckets().then((buckets) => {
      if (!buckets.length) {
        this.bucketManager.showDialog();
      }

      this.buckets = buckets.map((bucket) => {
        return {
          label: bucket.label,
          value: bucket.bucketName
        };
      });
    });
  }

  private setDefaultBucket() {
    this.currentBucket = this.config.defaultBucket;
  }

  constructor(private config: ConfigService) {
    this.initializeBucktesList();
    this.setDefaultBucket();
  }
}

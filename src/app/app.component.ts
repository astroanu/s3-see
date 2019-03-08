import { Component, ViewChild } from '@angular/core';

import { ConfigService } from '../services/config.service';
import { DirTreeComponent } from './dir-tree/dir-tree.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ViewComponent } from './view/view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private currentNode: DocumentEvent;
  private currentBucket;
  private buckets: Array<object>;

  @ViewChild(DirTreeComponent) dirTree: DirTreeComponent;
  @ViewChild(ViewComponent) view: ViewComponent;
  @ViewChild(UploaderComponent) uploader: UploaderComponent;

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
    this.buckets = this.config.buckets.map((bucket) => {
      return {
        label: bucket.label,
        value: bucket.bucketName
      };
    });
  }

  private setDefaultBucket() {
    this.currentBucket = this.config.buckets[0].bucketName;
  }

  constructor(private config: ConfigService) {
    this.initializeBucktesList();
    this.setDefaultBucket();
  }
}

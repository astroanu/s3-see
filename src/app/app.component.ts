import { Component, ViewChild } from '@angular/core';

import { ConfigService } from '../services/config.service';
import { DirTreeComponent } from './dir-tree/dir-tree.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private currentFolder: DocumentEvent;
  private currentBucket;
  private buckets: Array<object>;

  menuItems = [
    {
      label: this.config.appName,
      icon: 'pi pi-fw pi-eye'
    }
  ];

  @ViewChild(DirTreeComponent) dirTree: DirTreeComponent;

  refreshTree() {
    this.dirTree.initializeDirPane();
  }

  onSelected(event: DocumentEvent) {
    this.currentFolder = event;
  }

  constructor(private config: ConfigService) {
    this.buckets = this.config.buckets.map((bucket) => {
      return {
        label: bucket.label,
        value: bucket.bucketName
      };
    });
    this.currentBucket = config.buckets[0].bucketName;
  }
}

import { Component, ViewChild } from "@angular/core";

import { ConfigService } from "../services/config/config.service";
import { BucketManageComponent } from "./bucket-manage/bucket-manage.component";
import { DirTreeComponent } from "./dir-tree/dir-tree.component";
import { QueueComponent } from "./queue/queue.component";
import { StatusBarComponent } from "./status-bar/status-bar.component";
import { UploaderComponent } from "./uploader/uploader.component";
import { ViewComponent } from "./view/view.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @ViewChild(DirTreeComponent, { static: false }) dirTree: DirTreeComponent;

  @ViewChild(ViewComponent, { static: false }) view: ViewComponent;

  @ViewChild(UploaderComponent, { static: false }) uploader: UploaderComponent;

  @ViewChild(BucketManageComponent, { static: false })
  bucketManager: BucketManageComponent;

  @ViewChild(QueueComponent, { static: false }) queueComponent: QueueComponent;

  @ViewChild(StatusBarComponent, { static: false })
  statusBarComponent: StatusBarComponent;

  public currentNode: DocumentEvent;

  public currentBucket: string;

  public buckets: Array<object>;

  public menuItems: Array<object> = [
    {
      label: "File",
      items: [
        {
          label: "Upload",
          command: () => {
            this.uploader.showDialog();
          },
        },
        {
          label: "Buckets",
          command: () => {
            this.bucketManager.showDialog();
          },
        },
      ],
    },
  ];

  public uploadQueued(job: any) {
    this.queueComponent.addJob(job);
  }

  public showQueue(value: boolean) {
    this.queueComponent.panelVisible = value;
  }

  public refreshTree() {
    this.view.resetFilesShown();
    this.dirTree.initializeDirPane();
  }

  public onSelected(event: DocumentEvent) {
    this.currentNode = event;
  }

  public initializeBucktesList() {
    return this.config.getBuckets().subscribe((buckets) => {
      if (!buckets.length) {
        this.bucketManager.showDialog();
        return;
      }

      this.buckets = buckets.map((bucket) => {
        return {
          label: bucket.label,
          value: bucket.bucketName,
        };
      });

      this.setDefaultBucket();
    });
  }

  public updateStatusBar(message) {
    this.statusBarComponent.statusMessage = message;
  }

  public updateTotalBytes(value) {
    this.statusBarComponent.totalBytes = value;
  }

  public updateTransferedBytes(value) {
    this.statusBarComponent.transferedBytes = value;
  }

  private setDefaultBucket() {
    const firstBucket: any = this.buckets[0];
    this.currentBucket = firstBucket.value;
  }

  constructor(private config: ConfigService) {
    this.initializeBucktesList();
  }
}

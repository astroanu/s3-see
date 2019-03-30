import { Component } from '@angular/core';

import { UploaderService } from '../../services/uploader/uploader.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent {
  public jobs: Array<UploaderService> = [];

  public panelVisible: boolean = false;

  public collapsePanel() {
    this.panelVisible = false;
  }

  public addJob(job: UploaderService) {
    this.jobs.push(job);
  }
}

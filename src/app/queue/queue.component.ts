import { Component } from '@angular/core';

import { Job, JOB_QUEUED } from '../../models/job/job';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent {
  public jobs: Array<Job> = [];

  public panelVisible: boolean = false;

  public collapsePanel() {
    this.panelVisible = false;
  }

  public addJob(job: Job) {
    this.jobs.push(job);
    this.startNextJob();
  }

  private startNextJob() {
    if (this.jobs[0] && this.jobs[0].state === JOB_QUEUED) {
      this.jobs[0].start();
    }
  }
}

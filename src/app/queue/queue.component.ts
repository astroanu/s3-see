import { Component, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

import { UploadJob } from '../../models/job/upload-job';
import { JOB_QUEUED } from '../../models/job/job';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent {
  @Output() totalBytesInQueueChanged = new EventEmitter<any>();

  @Output() totalBytesTransferedChanged = new EventEmitter<any>();

  public jobs: Array<UploadJob> = [];

  public panelVisible: boolean = false;

  public collapsePanel() {
    this.panelVisible = false;
  }

  private emitTotalBytesInQueue() {
    this.totalBytesInQueueChanged.emit(
      this.jobs
        .map((job) => {
          return job.bytesInQueue;
        })
        .reduce((a, b) => a + b)
    );
  }

  private emitTotalBytesTransfered() {
    const bytes = this.jobs.map((job) => {
      return job.bytesTransfered;
    });

    if (bytes.length) {
      this.totalBytesTransferedChanged.emit(bytes.reduce((a, b) => a + b));
    } else {
      this.totalBytesInQueueChanged.emit(0);
    }
  }

  public addJob(job: UploadJob) {
    this.jobs.push(job);
    this.startNextJob();
    this.emitTotalBytesInQueue();

    this.messageService.add({
      life: 3000,
      key: 'tc',
      severity: 'success',
      summary: 'Upload job has been queued.',
      detail: 'You can check the job progress on the status bar below.'
    });
  }

  private startNextJob() {
    setInterval(() => {
      this.emitTotalBytesTransfered();
    }, 1000);

    if (this.jobs[0] && this.jobs[0].state === JOB_QUEUED) {
      this.jobs[0]
        .start()
        .then(() => {
          this.jobs.splice(0, 1);
          this.startNextJob();
        })
        .catch((e) => {
          this.messageService.add({
            sticky: true,
            life: 10000,
            key: 'tc',
            severity: 'error',
            summary: 'Could not complete batch job successfully',
            detail: e.toString()
          });
        });
    }
  }

  constructor(private messageService: MessageService) {}
}

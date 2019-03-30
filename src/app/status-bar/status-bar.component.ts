import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent {
  @Output() showQueue = new EventEmitter<any>();

  public statusMessage: string = 'Loading...';

  public showQueuePanel() {
    this.showQueue.emit(true);
  }
}

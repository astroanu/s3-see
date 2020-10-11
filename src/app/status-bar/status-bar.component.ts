import { Component, EventEmitter, Output, Input } from "@angular/core";

@Component({
  selector: "app-status-bar",
  templateUrl: "./status-bar.component.html",
  styleUrls: ["./status-bar.component.scss"],
})
export class StatusBarComponent {
  @Output() showQueue = new EventEmitter<any>();

  public statusMessage: string = "Loading...";

  private progress: number = 0;

  public totalBytes: number = 0;

  public set transferedBytes(value) {
    this.progress = (100 / this.totalBytes) * value;
  }

  public showQueuePanel() {
    this.showQueue.emit(true);
  }
}

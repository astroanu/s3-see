import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent {
  public currentFile: object;
  public isLoading: boolean = false;

  @Input() set file(file: any) {
    this.currentFile = file;
  }

  @Output() closed = new EventEmitter<any>();

  public hideOverlay() {
    this.currentFile = null;
    this.closed.emit();
  }
}

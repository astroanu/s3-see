import { Component, Input } from '@angular/core';

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

  public hideOverlay() {
    this.currentFile = null;
  }
}

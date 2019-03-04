import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {
  private currentFile;
  isLoading: boolean = false;

  @Input() set file(file: any) {
    this.currentFile = file;
  }

  hideOverlay() {
    this.currentFile = null;
  }

  constructor() {}

  ngOnInit() {}
}

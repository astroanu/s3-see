import { Component } from '@angular/core';

import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private currentFolder: DocumentEvent;

  menuItems = [
    {
      label: this.config.appName
    }
  ];

  onSelected(event: DocumentEvent) {
    this.currentFolder = event;
  }

  constructor(private config: ConfigService) {
    this.config.currentBucket = config.buckets[0];
  }
}

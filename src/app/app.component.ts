import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentFolder;

  title = 'S3 See';

  items = [
    {
      label: this.title
    }
  ];

  onSelected(event: DocumentEvent) {
    this.currentFolder = event;
  }
}

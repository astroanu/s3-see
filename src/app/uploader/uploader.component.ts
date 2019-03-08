import { Component } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent {
  displayDialog: boolean = false;

  onDirectorySelect(event) {
    console.log(event.target.files);
  }

  showDialog() {
    this.displayDialog = true;
  }
}

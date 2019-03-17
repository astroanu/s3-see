import { Component } from '@angular/core';
import { remote } from 'electron';

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
    remote.dialog.showOpenDialog(
      {
        title: 'Select a folder',
        properties: ['openDirectory']
      },
      (folderPath) => {
        if (folderPath === undefined) {
          console.log("You didn't select a folder");
          return;
        }
        console.log(folderPath);
      }
    );

    this.displayDialog = true;
  }
}

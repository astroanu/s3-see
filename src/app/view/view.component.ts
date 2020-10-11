import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { MessageService } from "primeng/api";
import { ContextMenu } from "primeng/contextmenu";

import { DirectoryInterface } from "../../models/directory/directory.interface";
import { S3FileInterface } from "../../models/file/s3-file.interface";
import { FileService } from "../../services/file/file.service";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
})
export class ViewComponent {
  public columns: Array<object> = [
    {
      field: "fileName",
      header: "File",
    },
    {
      field: "sizePretty",
      header: "Size",
    },
    {
      field: "lastModified",
      header: "Last Modified",
    },
  ];

  public contextmenu = [
    {
      label: "Copy key",
      command: () => {
        this.copyFileKey();
      },
    },
    {
      label: "Create signed URL",
      command: () => {
        this.copySignedUrl();
      },
    },
    /*{
      label: 'Download',
      command: () => {
        this.downloadFile();
      }
    },
    {
      label: 'Regenerate thumbnail',
      command: () => {
        this.regenerateThumbnail();
      }
    },
    {
      separator: true
    },
    {
      label: 'Properties'
    }*/
  ];

  public thumbH: number = 200;

  public thumbW: number = 25;

  public thumbMultiplier: number = 7;

  public filesShown: Array<any> = [];

  public listView: boolean = false;

  public loading: boolean = false;

  public fullScreenFile: S3FileInterface = null;

  public selectedFile: S3FileInterface = null;

  public filesShownTotalSize = 0;

  public currentDirectory: DirectoryInterface;

  @ViewChild(ContextMenu, { static: false }) contextMenu: ContextMenu;

  @Input() set currentNode(node: DirectoryInterface) {
    if (node) {
      this.resetFilesShown();
      this.setThumbSize();

      this.currentDirectory = node;

      this.currentDirectory.loadFiles().subscribe(() => {
        this.filesShown = this.currentDirectory.files;
        const fileSizes = this.filesShown.map((file) => {
          return file.size;
        });

        this.filesShownTotalSize = fileSizes.length
          ? fileSizes.reduce((a, b) => a + b)
          : 0;
      });
    }
  }

  @Input() set files(files: any) {
    if (files) {
      this.resetFilesShown();
      this.setThumbSize();

      this.filesShown = files;
    }
  }

  public onZoomChange() {
    this.setThumbSize();
  }

  public showContectMenu(event, file) {
    this.selectedFile = file;
    this.contextMenu.position(event);
    this.contextMenu.show();
  }

  private regenerateThumbnail() {
    this.selectedFile.generateThumbnail();
  }

  public setSelectedFile(file) {
    this.selectedFile = file;
  }

  public openSlideShow(file) {
    this.fullScreenFile = file;
  }

  public clearSelectedFile() {
    this.selectedFile = null;
  }

  public get panelHeight() {
    const dataViewEl = this.el.nativeElement.querySelector(".ui-dataview");

    return window.innerHeight - dataViewEl.getBoundingClientRect().top - 85;
  }

  public setThumbSize() {
    let multiplierCorrected: number;

    const dataViewEl = this.el.nativeElement.querySelector(".ui-dataview");

    const containerWidth = dataViewEl.offsetWidth - 14;

    if (this.thumbMultiplier === 7) {
      multiplierCorrected = this.thumbMultiplier;
    } else if (this.thumbMultiplier > 7) {
      multiplierCorrected = 7 - this.thumbMultiplier + 7;
    } else if (this.thumbMultiplier < 7) {
      multiplierCorrected = 7 + 7 - this.thumbMultiplier;
    }

    this.thumbW = 100 / multiplierCorrected;
    this.thumbH = containerWidth / multiplierCorrected;
  }

  public resetFilesShown() {
    this.filesShownTotalSize = 0;
    this.filesShown = [];
  }

  private viewList() {
    this.listView = true;
  }

  private viewThumbs() {
    this.listView = false;
  }

  private downloadFile() {
    console.log("todo");
  }

  private copySignedUrl() {
    this.copyToClipboard(this.selectedFile.fullUrl);

    this.messageService.add({
      life: 3000,
      key: "tc",
      severity: "success",
      summary: "Copied.",
      detail: "A sgned URL has been copied to the clipboard.",
    });
  }

  private copyFileKey() {
    this.copyToClipboard(this.selectedFile.key);

    this.messageService.add({
      life: 3000,
      key: "tc",
      severity: "success",
      summary: "Copied.",
      detail: "Object key has been copied to the clipboard.",
    });
  }

  private copyToClipboard(text) {
    document.addEventListener("copy", (e: ClipboardEvent) => {
      e.clipboardData.setData("text/plain", text);
      e.preventDefault();
      document.removeEventListener("copy", null);
    });
    document.execCommand("copy");
  }

  constructor(
    private fileService: FileService,
    private messageService: MessageService,
    private el: ElementRef
  ) {}
}

import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

import { DirectoryInterface } from '../../models/directory/directory.interface';
import { FileListInterface } from '../../models/file-list/file-list.interface';
import { TreeService } from '../../services/tree/tree.service';

@Component({
  selector: 'app-dir-tree',
  templateUrl: './dir-tree.component.html',
  styleUrls: ['./dir-tree.component.scss']
})
export class DirTreeComponent {
  @Output() selected = new EventEmitter<any>();

  @Input() set bucket(bucketName: any) {
    if (bucketName) {
      this.treeService.fileService
        .setBucket(bucketName)
        .then(() => {
          this.initializeDirPane();
        })
        .catch(() => console.log('@Input() set bucket failed'));
    }
  }

  selectedFiles: Array<any> = [];

  fileCache: Array<object> = [];

  fileTree: Array<object> = [];

  folderStructor: Object = {};

  loading: boolean = true;

  initializeDirPane() {
    this.selectedFiles = [];
    this.fileTree = [];
    this.folderStructor = {};
    this.loading = true;

    this.getDirStructure()
      .then(
        () => {
          this.loading = false;
          console.info('Dir listing complete');
        },
        (e) => {
          this.messageService.add({
            sticky: true,
            life: 10000,
            key: 'tc',
            severity: 'error',
            summary: 'Could not load directory structure',
            detail: e.toString()
          });

          this.loading = false;
        }
      )
      .catch(() => console.log('initializeDirPane failed'));
  }

  selectNode(event) {
    const node: DirectoryInterface = event.node;

    node
      .loadSubdirectories()
      .then(() => {
        console.info('subdirectories loaded');
        this.selected.emit(node);
      })
      .catch(() => console.log('selectNode failed'));
  }

  get panelHeight() {
    const dataViewEl = this.el.nativeElement.querySelector('.tree-wrap');

    return window.innerHeight - dataViewEl.getBoundingClientRect().top - 10;
  }

  private getDirStructure(prefix = null, NextContinuationToken = null) {
    return new Promise((resolve, reject) => {
      return this.treeService
        .listDirectories(prefix, NextContinuationToken)
        .then(
          (list: FileListInterface) => {
            if (list.hasDirectories) {
              list.directories.forEach((directory: DirectoryInterface) => {
                this.fileTree.push(directory);
              });
            }

            if (list.hasMore) {
              return this.getDirStructure(prefix, list.nextContinuationToken);
            } else {
              resolve();
            }
          },
          () => reject()
        )
        .catch(() => reject());
    });
  }

  constructor(private treeService: TreeService, private messageService: MessageService, private el: ElementRef) {}
}

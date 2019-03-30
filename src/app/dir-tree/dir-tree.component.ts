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

  @Output() status = new EventEmitter<any>();

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

  public selectedFiles: Array<any> = [];

  public fileTree: Array<object> = [];

  public loading: boolean = true;

  private emitLoadingEvent() {
    this.status.emit('Loading directories...');
  }

  private emitLoadedEvent() {
    console.info('Dir listing complete');
    this.status.emit('Directory listing complete.');
  }

  private emitLoadErrorEvent() {
    this.status.emit('Failed to load directories...');
  }

  public initializeDirPane() {
    this.selectedFiles = [];
    this.fileTree = [];
    this.loading = true;

    this.emitLoadingEvent();

    this.getDirStructure()
      .then(
        () => {
          this.loading = false;
          this.emitLoadedEvent();
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
          this.emitLoadErrorEvent();
        }
      )
      .catch(() => console.log('initializeDirPane failed'));
  }

  public selectNode(event) {
    const node: DirectoryInterface = event.node;

    this.emitLoadingEvent();

    node
      .loadSubdirectories()
      .then(() => {
        this.emitLoadedEvent();
        this.selected.emit(node);
      })
      .catch(() => console.log('selectNode failed'));
  }

  public get panelHeight() {
    const dataViewEl = this.el.nativeElement.querySelector('.tree-wrap');

    return window.innerHeight - dataViewEl.getBoundingClientRect().top - 35;
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

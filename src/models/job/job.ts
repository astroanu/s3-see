import PromiseQueue from "easy-promise-queue";
import { FileService } from "../../services/file/file.service";
import { NgxPicaService } from "@digitalascetic/ngx-pica";
import { LocalFile } from "../file/local-file.model";
import { UploadOptions } from "../../services/uploader/uploader.service";

export const JOB_QUEUED = "queued";
export const JOB_STARTED = "started";
export const JOB_COMPLETE = "complete";

export const THUMB_SIZE = 200;

export class Job {
  public bytesTransfered: number = 0;

  public state: string = JOB_QUEUED;

  public status: string = "Waiting...";

  public promiseQueue: PromiseQueue;

  public fileService: FileService;

  public picaService: NgxPicaService;

  public itemStatusMap = {};

  public xhrProgress: number = 0;

  public get progress(): number {
    return (100 / this.bytesInQueue) * this.bytesTransfered;
  }

  public recordBytes(bytes: number): void {
    this.bytesTransfered += bytes;
  }

  public get bytesInQueue() {
    const bytes = this.files.map((file: LocalFile) => {
      return file.size;
    });

    return bytes.length ? bytes.reduce((a, b) => a + b) : 0;
  }

  constructor(
    public files: Array<LocalFile>,
    public options: UploadOptions,
    public bucketName: string
  ) {}
}

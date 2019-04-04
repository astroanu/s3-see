import { UploadJob } from './upload-job';

export interface JobInterface {
  bytesTransfered: number;

  state: string;

  status: string;

  progress: number;

  bytesInQueue: number;

  recordBytes(bytes: number): void;

  start(): Promise<any>;
}

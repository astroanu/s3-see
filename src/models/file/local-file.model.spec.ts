import { LocalFileInterface } from "./local-file.interface";
import { LocalFile } from "./local-file.model";

describe("File", () => {
  let localFile: LocalFileInterface;

  const relativePath = "etc/folder/file/filename.ext";
  const filePath = "d:/dir/etc/folder/file/filename.ext";

  beforeEach(() => {
    localFile = new LocalFile(relativePath, filePath);
  });
});

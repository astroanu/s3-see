import { S3 } from 'aws-sdk';
import { src } from 'gulp';
import { Gulpclass, Task } from 'gulpclass/Decorators';

const rename = require('gulp-rename');
const argv = require('yargs').argv;
const fs = require('fs-extra');
const through = require('through2');
const sharp = require('sharp');
const path = require('path');
const msg = require('gulp-msg');
const configuration = JSON.parse(fs.readFileSync('./config.json'));

class Config {
  public static get bucketName() {
    return argv.bucket;
  }

  public static getBucketConfig() {
    const bucketConfig = configuration.buckets.filter((bucketInfo) => {
      return bucketInfo.bucketName === this.bucketName;
    })[0];
    return {
      accessKeyId: bucketConfig.accessKeyId,
      secretAccessKey: bucketConfig.secretAccessKey,
      region: bucketConfig.region
    };
  }
}

@Gulpclass()
export class Gulpfile {
  private s3 = new S3(Config.getBucketConfig());
  private argv = argv;
  private extentions = ['jpg', 'jpeg', 'nef', 'png'];
  private tempDir = './tmp';

  @Task()
  upload() {
    fs.removeSync(this.tempDir);

    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir);
    }

    return src(this.globPattern)
      .pipe(rename(this.renamer))
      .pipe(
        through.obj((chunk, enc, cb) => {
          const filepath = chunk.path;

          const relativePath = path.dirname(filepath).replace(`${path.join(__dirname, this.dir)}\\`, '');

          const filename = path.basename(filepath);

          const ext = path.extname(filepath);

          const fileKey = this.normalizeKey([relativePath, filename].join('/'));

          const thumbKey = this.normalizeKey([relativePath, '_thumbs', filename].join('/').replace(ext, '.jpg'));

          const queue = [];

          const tempFileName = path.join(this.tempDir, `${Math.random()}-${filename}`);

          sharp(chunk.path)
            .rotate()
            .resize(200)
            .jpeg()
            .toFile(tempFileName, (err, info) => {
              queue.push(this.getFileUploadPromise(fileKey, filepath));
              queue.push(this.getFileUploadPromise(thumbKey, tempFileName));
            });

          Promise.all(queue).then(() => {
            cb();
          });
        })
      );
  }

  private getFileUploadPromise(fileKey, filepath) {
    return new Promise((resolve, rejecct) => {
      const fileStream = fs.createReadStream(filepath);

      fileStream.on('open', () => {
        this.uploadTos3(fileKey, fileStream)
          .promise()
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            rejecct(err);
          });
      });
    });
  }

  private normalizeKey(key) {
    return key
      .toLowerCase()
      .replace('\\', '/')
      .replace(' ', '_');
  }

  private uploadTos3(key, stream) {
    return this.s3.putObject(
      {
        Bucket: Config.bucketName,
        Key: key,
        Body: stream
      },
      (err, data) => {
        if (err) {
          console.log(`Failed : ${key}`);
        } else {
          console.log(`Uploaded : ${key}`);
        }
      }
    );
  }

  private renamer(filePath: any) {
    filePath.dirname = filePath.dirname.toLowerCase();
    filePath.basename = filePath.basename.toLowerCase();
    filePath.extname = filePath.extname.toLowerCase();

    return filePath;
  }

  private get globPattern() {
    return `${this.dir}/**/*.+(${this.supportedExtentions.join('|')})`;
  }

  private get supportedExtentions() {
    return this.extentions.concat(
      this.extentions.map((ext) => {
        return ext.toUpperCase();
      })
    );
  }

  private get dir() {
    return this.argv.dir;
  }

  constructor() {}
}

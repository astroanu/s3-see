const fs = require('fs');
const ts = require('typescript');

const tasksDir = './src/tasks';

const taskFiles = fs.readdirSync(tasksDir);

taskFiles
  .filter((filename) => {
    return filename.split('.').pop() == 'ts';
  })
  .forEach((filename) => {
    eval(ts.transpile(fs.readFileSync(`${tasksDir}\\${filename}`).toString()));
  });

/*const { src, dest } = require('gulp');
const argv = require('yargs').argv;

const fs = require('fs');
const rename = require('gulp-rename');
const through = require('through2');
const sharp = require('sharp');
const path = require('path');
const msg = require('gulp-msg');
const recursive = require('recursive-readdir');

const inPath = argv.path;*/
//const globPattern = `${inPath}/**/*.+(jpg|jpeg|NEF|png)`;
//const out = `${argv.out}/`;
/*
recursive(inPath, (err, files) => {
  msg.info('<%= length %> files found', {
    length: files.length
  });
});
exports.thumbs = () => {
  return src(globPattern)
    .pipe(
      rename((filePath) => {
        filePath.dirname = filePath.dirname.toLowerCase();
        filePath.basename = filePath.basename.toLowerCase();
        filePath.extname = filePath.extname.toLowerCase();
      })
    )
    .pipe(dest(out))
    .pipe(
      through.obj((chunk, enc, cb) => {
        const dirName = path.dirname(chunk.path);
        const thumbDirName = path.join(dirName, '_thumbs');
        const ext = path.extname(chunk.path);

        if (!fs.existsSync(thumbDirName)) {
          fs.mkdirSync(thumbDirName);
        }

        const thumbFile = chunk.path.replace(dirName, thumbDirName).replace(ext, '.jpg');

        return sharp(chunk.path)
          .rotate()
          .resize(200)
          .jpeg()
          .toFile(thumbFile, (err, info) => {
            msg.Info('Creating thumbnail: <%= thumbFile %>', {
              thumbFile: path.basename(thumbFile)
            });

            cb();
          });
      })
    );
};
*/

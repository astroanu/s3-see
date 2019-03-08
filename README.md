# S3See

S3See is a image browser for files stored on s3 buckets. It supports multiple buckets and multiple aws credentials.

### Requirements 

- Image folders should have a sub folder by the name `_thumbs`, and the key name of the files in the `_thumbs` folder needs to be lowercase
- Thumbnail files could be any size, the smaller the faster they will load in the viewer.

### How to use

- Clone repo
- `npm install`
- Copy `config.sample.json` to `config.json`
- Update `config.json` with bucket names and access key/secret pairs
- Run `npm start` to start the dev server

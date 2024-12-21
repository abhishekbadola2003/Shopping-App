import multer, { FileFilterCallback } from "multer";

export class Uploader {
  public FileFilter = (types?: Array<string>) => {
    return (req: Req, file: Express.Multer.File, cb: FileFilterCallback) => {
      const type = file.mimetype;
      if (!types) return cb(null, true);
      if (types.length === 0) return cb(null, true);

      if (types.some((accepted: string) => type === accepted)) {
        return cb(null, true);
      } else {
        req.uploaderError = new Error(`we only accept these types : ${types}`);
        return cb(null, false);
      }
    };
  };

  public storage = multer.diskStorage({
    destination: (erq, file, cb) => {
      //   cb(null, this.uploadDir || this.defaultUploadDir);
    },
  });
}

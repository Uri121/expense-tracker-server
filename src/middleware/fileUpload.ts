import path from 'path';
import multer from 'multer';

export const memoryLoader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2097152, // 2 MByte
  },
});

export const diskLoader = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, path.join(__dirname, '../tmp/upload'));
    },
  }),
  limits: {
    fileSize: 67108864, // 64 MByte
  },
});

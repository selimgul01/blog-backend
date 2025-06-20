const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // uploads/ klasörüne kaydet
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName); // Dosya adı: zamanDamgası-orijinalAd
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Sadece jpeg, jpg veya png dosyalarına izin verilir");
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5 MB
});

module.exports = upload;
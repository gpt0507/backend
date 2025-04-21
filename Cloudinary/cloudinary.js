const cloudinary = require('cloudinary').v2

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD,
//   api_key: process.env.CLOUDINARY_APIKEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

cloudinary.config({
  cloud_name: "dgglfopn6",
  api_key: "949836537994271",
  api_secret: "m6c7SinlGFpxxxn45gYp9oBEaQY"
});

module.exports = cloudinary;
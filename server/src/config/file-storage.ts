// import aws from "aws-sdk";
// import multer from "multer";
// import multerS3 from "multer-sharp-s3";

// console.log(process.env.AWS_SECRET_ACCESS_KEY);

// aws.config.update({
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   region: process.env.AWS_REGION,
// });

// const s3 = new aws.S3();

// const storage = multerS3({
//   s3,
//   Bucket: process.env.AWS_S3_BUCKET,
//   ACL: "public-read",
//   resize: {
//     width: 180,
//     height: 180,
//   },
// });

// const upload = multer({ storage });

// export default upload;

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

type File = {
  buffer: Buffer;
  name: string;
  mimetype: string;
};

export async function uploadFile({ buffer, name, mimetype }: File) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: name,
    Body: buffer,
    ContentType: mimetype,
  });

  return s3.send(command);
}

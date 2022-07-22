export default {
  port: process.env.PORT as string,
  dbUri: process.env.MONGO_URI as string,
  saltNum: Number(process.env.SALT as string),
  pubKey: process.env.PUBLIC_KEY as string,
  privateKey: process.env.PRIVATE_KEY as string,
  tokenTTL: process.env.TOKEN_TTL as string,
};

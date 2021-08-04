if (process.env.NODE_ENV != "production"){
    process.env.MONGODB_CNN = process.env.MONGODB_CNN_DEV;
    process.env.DISCORD_TOKEN = process.env.DISCORD_TOKEN_DEV;
    process.env.BASE_URL = process.env.BASE_URL_DEV;
}
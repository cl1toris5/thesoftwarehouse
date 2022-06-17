import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT,
    endpointPrefix: process.env.ENDPOINT_PREFIX
}

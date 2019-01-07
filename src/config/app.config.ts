export const app = {
    name: process.env.APP_NAME || "tgql-example",
    env: process.env.APP_ENV || "production",
    url: process.env.APP_URL || "http://localhost",
    port: process.env.APP_PORT || 4000,
    playground: !!(process.env.ENABLE_PLAYGROUND || false),
    tracing: !!(process.env.ENABLE_TRACING || false),
};

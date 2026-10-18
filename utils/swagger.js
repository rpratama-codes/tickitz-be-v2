let options = {
  swaggerDefinition: {
    info: {
      description: "This is a sample server",
      title: "Swagger",
      version: "1.0.0",
    },
    host: process.env.APP_URL
      ? process.env.APP_URL.replace(/^https?:\/\//, "")
      : "api.tickitz.rpratama.web.id",
    basePath: "/v1",
    schemes: ["https", "http"],
    produces: ["application/json", "application/xml"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
      },
    },
  },
  basedir: __dirname, //app absolute path
  files: ["../routes/**/*.js", "../controllers/**/*.js"], //Path to the API handle folder
};

module.exports = options;

 export const settings = {
   port: process.env.CURSO_NODEJS_SERVER_PORT || 3001,
   name: process.env.CURSO_NODEJS_SERVER_NAME || 'NodeJS API',
   version: process.env.CURSO_NODEJS_SERVER_VERSION || '1.0.2',
   security: {
     jwtSecret: process.env.CURSO_NODEJS_JWT_SECRET || 'curso-nodejs'
   },
   db: {
     url: process.env.CURSO_NODEJS_DB_URL || 'mongodb://localhost/curso-nodejs',
     user: "curso",
     password: "nodejs"
   }
 }
 export const settings = {
   port: process.env.CURSO_NODEJS_SERVER_PORT || 3000,
   name: process.env.CURSO_NODEJS_SERVER_NAME || 'NodeJS API',
   version: process.env.CURSO_NODEJS_SERVER_VERSION || '1.0.0',
   security: {
     jwtSecret: process.env.CURSO_NODEJS_JWT_SECRET || 'curso-nodejs'
   }
 }
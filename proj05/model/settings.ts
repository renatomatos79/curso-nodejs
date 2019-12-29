 export const settings = {
   port: process.env.SERVER_PORT || 3000,
   name: process.env.SERVER_NAME || 'NodeJS API',
   version: process.env.SERVER_VERSION || '1.0.0',
   security: {
     jwtSecret: process.env.JWT_SECRET || 'curso-nodejs'
   }
 }
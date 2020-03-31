// Unauthorized: quando não estou logado
// Forbiden: quando estou logado mas não tenho permissão
// Conflict: já existe
// NotFound: não existe
// BadRequest: falta preencher algo
// NoContent: deleted
enum HttpStatusCode { OK = 200, Created = 201, NoContent = 204, InternalError = 500, NotFound = 404, Unauthorized = 401, Forbiden = 403, Conflict = 409, BadRequest = 400 }

export {  HttpStatusCode }
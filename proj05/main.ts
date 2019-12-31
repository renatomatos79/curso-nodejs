import { AppServer } from './common/server'
import { GroupController } from './controller/groupController';
import { GroupService } from './service/groupService';
import { ProductService } from './service/productService';
import { UserService } from './service/userService';
import { ProductController } from './controller/productController';
import { UserController } from './controller/userController';

// services instances ...
const groupService = new GroupService();
const userService = new UserService();
const productService = new ProductService(groupService);
// controllers instances ...
const groupController = new GroupController(productService, groupService);
const productController = new ProductController(productService);
const userController = new UserController(userService);

const server = new AppServer();
// bootstrap significa setup nos registramos as nossas controllers
server.bootstrap([
    groupController,
    productController,
    userController
]).then(srv => {
  console.log('Server is listening on:', srv.server.address())
}).catch(error => {
  console.log('Server failed to start')
  console.log(error)
  process.exit(1)
});
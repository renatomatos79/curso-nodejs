import { AppServer } from './common/server'
import { GroupController } from './controller/groupController';
import { GroupService } from './service/groupService';
import { ProductService } from './service/productService';
import { UserService } from './service/userService';
import { ProductController } from './controller/productController';
import { UserController } from './controller/userController';

const groupService = new GroupService();
const productService = new ProductService(groupService);
const userService = new UserService();
const groupController = new GroupController(productService, groupService);
const productController = new ProductController(productService);
const userController = new UserController(userService);

const server = new AppServer();
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
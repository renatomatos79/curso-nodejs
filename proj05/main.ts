import { AppServer } from "./common/server"
import { Settings } from "./model/settings";
import { GroupController } from "./controller/groupController";
import { GroupService } from "./service/groupService";
import { ProductService } from "./service/productService";
import { ProductController } from "./controller/productController";

const settings = new Settings();
settings.name = 'Curso NodeJS';
settings.port = 3001;
settings.version = '1.0.0';

const groupService = new GroupService();
const productService = new ProductService(groupService);
const groupController = new GroupController(productService, groupService);
const productController = new ProductController(productService);

const server = new AppServer(settings);
server.bootstrap([
    groupController,
    productController
]).then(srv => {
  console.log('Server is listening on:', srv.server.address())
}).catch(error => {
  console.log('Server failed to start')
  console.log(error)
  process.exit(1)
});
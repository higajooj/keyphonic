import { AddressModule } from 'src/domains/address/address.module';
import { OrderModule } from 'src/domains/order/order.module';
import { ProductModule } from 'src/domains/product/product.module';
import { UserModule } from 'src/domains/user/user.module';

export const modules = [UserModule, ProductModule, AddressModule, OrderModule];

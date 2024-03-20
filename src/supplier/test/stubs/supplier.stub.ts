import { CreateSupplierDto } from '../../dto/supplier.dto';

export const supplierStub = (): CreateSupplierDto => {
  return {
    name: 'ahmad',
    phoneNumber: '123456789',
    cashBalance: 123.1,
    ramliBalance: 321.2,
    silverBalance: 58.3
  };
};

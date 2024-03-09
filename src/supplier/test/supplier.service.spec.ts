import { SupplierService } from '../services/supplier.service';
import { CreateSupplierDto } from '../dto/supplier.dto';
import { SupplierEntity } from '../../entites/supplier.entity';

//https://stackoverflow.com/questions/55366037/inject-typeorm-repository-into-nestjs-service-for-mock-data-testing

describe('Supplier Service', () => {
  let supplierService: SupplierService;

  beforeEach(() => {});

  describe('create supplier', () => {
    // it('create supplier successfully', async () => {
    //   const mockDataInput: CreateSupplierDto = {
    //     name: 'ahmad',
    //     phoneNumber: '81030223',
    //     ramliBalance: 0,
    //     cashBalance: 0,
    //   };
    //
    //   const res = await supplierService.createSupplier(mockDataInput);
    //
    //   console.log(res);
    //
    //   expect(res).toBe(mockDataInput);
    // });
    // it('create supplier failure', () => {});
  });
});

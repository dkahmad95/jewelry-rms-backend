import { SupplierService } from '../services/supplier.service';

import { Test, TestingModule } from '@nestjs/testing';
import { supplierStub } from './stubs/supplier.stub';
import { SupplierEntity } from '../../entites/supplierEntities/supplier.entity';

//https://stackoverflow.com/questions/55366037/inject-typeorm-repository-into-nestjs-service-for-mock-data-testing
jest.mock('../services/supplier.service');
describe('Supplier Service', () => {
  let supplierService: SupplierService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierService],
    }).compile();
    supplierService = module.get<SupplierService>(SupplierService);
    jest.clearAllMocks();
  });

  describe('create supplier', () => {
    it('create supplier successfully', async () => {
      const res: SupplierEntity =
        await supplierService.createSupplier(supplierStub());

      expect(res).toBe(supplierStub());
    });
    it('create supplier failure', () => {});
  });
});

// import { SupplierService } from '../services/supplier.service';
// import { supplierStub } from './stubs/supplier.stub';
//
// jest.mock('../services/supplier.service');
// describe('SupplierService', () => {
//   // Test case for findOne method
//   it('findOne should return a single supplier', async () => {
//     const service = SupplierService();
//     const result = await service.findOne();
//     expect(result).toEqual(supplierStub()); // Assert that the result matches the stub data
//   });
//
//   // Test case for findAll method
//   it('findAll should return an array of suppliers', async () => {
//     const service = SupplierService();
//     const result = await service.findAll();
//     expect(result).toEqual([supplierStub()]); // Assert that the result matches the stub data
//   });
//
//   // Test case for create method
//   it('create should return the created supplier', async () => {
//     const service = SupplierService();
//     const result = await service.create();
//     expect(result).toEqual(supplierStub()); // Assert that the result matches the stub data
//   });
//
//   // Test case for update method
//   it('update should return the updated supplier', async () => {
//     const service = SupplierService();
//     const result = await service.update();
//     expect(result).toEqual(supplierStub()); // Assert that the result matches the stub data
//   });
//
//   // Test case for delete method
//   it('delete should return the deleted supplier', async () => {
//     const service = SupplierService();
//     const result = await service.delete();
//     expect(result).toEqual(supplierStub()); // Assert that the result matches the stub data
//   });
// });

import { supplierStub } from 'src/supplier/test/stubs/supplier.stub';

export const SupplierService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(supplierStub()),
  findAll: jest.fn().mockResolvedValue([supplierStub()]),
  create: jest.fn().mockResolvedValue(supplierStub()),
  update: jest.fn().mockResolvedValue(supplierStub()),
  delete: jest.fn().mockResolvedValue(supplierStub()),
});

import { CreateCustomerInvoiceDto } from '../../dto/customerInvoice.dto';

export const CustomerInvoiceStub = (): CreateCustomerInvoiceDto => {
  return {
    name: 'ahmad',
    phoneNumber: '123456789',
    items: [],
    totalAmount: 123.1,
  };
};

import users from './users.js';
import { menuItems } from './menuItems.js';

const orders = [
  {
    userId: users[0]._id,
    orderItems: [
      {
        item: menuItems[0]._id,
        quantity: 2,
      },
      {
        item: menuItems[1]._id,
        quantity: 1,
      },
    ],
    deliveryAddress: users[0].addresses[0],
    paymentMethod: 'Debit Card',
    deliveryPrice: 5.99,
    taxPrice: 1.99,
    totalPrice: 27.97,
    isPaid: true,
    paidAt: new Date(),
    orderStatus: 'Delivered',
    deliveryDate: new Date(),
    deliveredAt: new Date(),
    deliveredBy: users[1]._id,
    isDelivered: true,
    qrCode: {
      trackingNumber: '1234567890',
      scanned: true,
    },
    note: 'Test order 1',
  },
  {
    userId: users[1]._id,
    orderItems: [
      {
        item: menuItems[2]._id,
        quantity: 1,
      },
      {
        item: menuItems[3]._id,
        quantity: 1,
      },
    ],
    deliveryAddress: users[1].addresses[0],
    paymentMethod: 'TNG eWallet',
    deliveryPrice: 5.99,
    taxPrice: 1.99,
    totalPrice: 27.97,
    isPaid: false,
    paidAt: new Date(),
    orderStatus: 'Pending',
    deliveryDate: new Date(),
    deliveredBy: users[0]._id,
    isDelivered: false,
    qrCode: {
      trackingNumber: '1234567890',
      scanned: false,
    },
    note: 'Test order 2',
  },
];

export default orders;

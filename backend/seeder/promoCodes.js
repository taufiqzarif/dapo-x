const promoCodes = [
  {
    code: 'NEWUSER',
    discount: 10,
    validFrom: '2021-09-01T00:00:00.000Z',
    validUntil: '9999-09-01T00:00:00.000Z',
    usageLimit: 1,
    newUsersOnly: true,
    active: true,
  },
  {
    code: 'TESTPROMO',
    discount: 5,
    validFrom: '2021-09-01T00:00:00.000Z',
    validUntil: '2024-12-31T23:59:59.999Z',
    usageLimit: 1,
    newUsersOnly: false,
    active: true,
  },
  {
    code: 'HOLIDAY25',
    discount: 25,
    validFrom: '2021-12-01T00:00:00.000Z',
    validUntil: '2021-12-31T23:59:59.999Z',
    usageLimit: 1,
    newUsersOnly: false,
    active: true,
  },
];

export default promoCodes;

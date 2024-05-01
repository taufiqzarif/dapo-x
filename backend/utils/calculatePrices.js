function addDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

export function calculatePrices(orderItems) {
  const totalItemsPrice = addDecimals(
    orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  const deliveryPrice = addDecimals(totalItemsPrice > 100 ? 0 : 5); // need to calculate delivery price based on location

  const totalPrice = (Number(totalItemsPrice) + Number(deliveryPrice)).toFixed(
    2
  );

  return {
    totalItemsPrice,
    deliveryPrice,
    totalPrice,
  };
}

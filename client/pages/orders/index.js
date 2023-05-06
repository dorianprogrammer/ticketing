import React from "react";

const OrderIndex = ({ orders }) => {
    console.log('orders', orders)
  return (
    <ul>
      {orders?.map((order) => {
        return (
          <li key={order.id}>
            {order.ticket.title} - {order.status}
          </li>
        );
      })}
    </ul>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders");

  return { orders: [] };
};

export default OrderIndex;

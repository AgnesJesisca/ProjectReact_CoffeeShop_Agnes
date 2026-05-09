import { useParams, Link } from "react-router-dom";
import orders from "../../data/orders.json";
import PageHeader from "../../components/PageHeader";

export default function OrderDetail() {

  const { id } = useParams();

  const order = orders.find(
    (o) => o.orderId === id
  );

  // TOTAL
  const total =
    order?.items.reduce(
      (a, b) => a + b.qty * b.price,
      0
    ) || 0;

  if (!order) {

    return (

      <div className="p-5">

        <div className="card-coffee text-center">

          <h2 className="text-2xl font-semibold text-primary">
            Order Not Found
          </h2>

          <Link
            to="/orders"
            className="btn-coffee inline-block mt-5"
          >
            Back
          </Link>

        </div>

      </div>

    );

  }

  return (

    <div className="flex-1 min-h-screen">

      <div className="p-5 space-y-5">

        {/* HEADER */}
        <PageHeader
          title="Order Detail"
          breadcrumb={`Dashboard / Orders / ${order.orderId}`}
        >

          <Link
            to="/orders"
            className="btn-coffee"
          >
            Back
          </Link>

        </PageHeader>

        {/* TOP INFO */}
        <div className="grid md:grid-cols-3 gap-5">

          {/* CUSTOMER */}
          <div className="card-coffee">

            <p className="text-sm text-muted mb-2">
              Customer
            </p>

            <h2 className="text-xl font-semibold text-primary">
              {order.customer}
            </h2>

            <p className="mt-2 text-sub">
              {order.customerPhone}
            </p>

          </div>

          {/* PAYMENT */}
          <div className="card-coffee">

            <p className="text-sm text-muted mb-2">
              Payment
            </p>

            <h2 className="text-xl font-semibold text-primary">
              {order.paymentMethod}
            </h2>

            <p className="mt-2 text-sub">
              {order.orderType}
            </p>

          </div>

          {/* STATUS */}
          <div className="card-coffee">

            <p className="text-sm text-muted mb-2">
              Status
            </p>

            <span
              className={`px-3 py-2 rounded-full text-sm font-medium
              ${
                order.status === "Completed"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {order.status}
            </span>

            <p className="mt-3 text-sub">
              {order.date}
            </p>

          </div>

        </div>

        {/* ITEMS */}
        <div className="card-coffee">

          <div className="flex justify-between items-center mb-5">

            <div>

              <h2 className="text-xl font-semibold text-primary">
                Order Items
              </h2>

              <p className="text-muted text-sm">
                Detail customer order
              </p>

            </div>

            <div className="text-right">

              <p className="text-sm text-muted">
                Total Payment
              </p>

              <h2 className="text-2xl font-bold text-primary">
                Rp {total.toLocaleString("id-ID")}
              </h2>

            </div>

          </div>

          {/* TABLE */}
          <table className="w-full">

            <thead className="bg-soft text-sub text-sm">

              <tr>

                <th className="p-4 text-left">
                  Menu
                </th>

                <th className="p-4 text-center">
                  Qty
                </th>

                <th className="p-4 text-right">
                  Price
                </th>

                <th className="p-4 text-right">
                  Subtotal
                </th>

              </tr>

            </thead>

            <tbody>

              {order.items.map((item, index) => (

                <tr
                  key={index}
                  className="border-t border-soft"
                >

                  <td className="p-4 font-medium">
                    {item.name}
                  </td>

                  <td className="p-4 text-center">
                    {item.qty}
                  </td>

                  <td className="p-4 text-right">

                    Rp{" "}

                    {item.price.toLocaleString(
                      "id-ID"
                    )}

                  </td>

                  <td className="p-4 text-right font-semibold text-primary">

                    Rp{" "}

                    {(item.qty * item.price)
                      .toLocaleString("id-ID")}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* EXTRA DETAIL */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* BARISTA */}
          <div className="card-coffee">

            <p className="text-sm text-muted mb-2">
              Barista
            </p>

            <h2 className="text-xl font-semibold text-primary">
              {order.barista}
            </h2>

          </div>

          {/* NOTES */}
          <div className="card-coffee">

            <p className="text-sm text-muted mb-2">
              Order Notes
            </p>

            <p className="text-sub">
              {order.notes || "-"}
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}
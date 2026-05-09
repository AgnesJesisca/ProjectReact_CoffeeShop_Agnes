// src/pages/main/CustomerDetail.jsx

import { useParams, Link } from "react-router-dom";

import customers from "../../data/customers.json";
import orders from "../../data/orders.json";

import PageHeader from "../../components/PageHeader";

export default function CustomerDetail() {

  const { id } = useParams();

  // FIND CUSTOMER
  const customer = customers.find(
    (c) => c.customerId === id
  );

  // CUSTOMER ORDERS
  const customerOrders = orders.filter(
    (o) =>
      o.customer
        .toLowerCase()
        .includes(
          customer?.customerName
            .split(" ")[0]
            .toLowerCase()
        )
  );

  // TOTAL REVENUE
  const totalRevenue = customerOrders.reduce(
    (a, b) =>
      a +
      b.items.reduce(
        (x, y) =>
          x + y.qty * y.price,
        0
      ),
    0
  );

  if (!customer) {

    return (

      <div className="p-5">

        <div className="card-coffee text-center">

          <h2 className="text-2xl font-semibold text-primary">
            Customer Not Found
          </h2>

          <Link
            to="/customers"
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
          title="Customer Detail"
          breadcrumb={`Dashboard / Customers / ${customer.customerName}`}
        >

          <Link
            to="/customers"
            className="btn-coffee"
          >
            Back
          </Link>

        </PageHeader>

        {/* PROFILE */}
        <div className="grid md:grid-cols-3 gap-5">

          {/* LEFT */}
          <div className="card-coffee text-center">

            <div className="w-24 h-24 rounded-full bg-soft mx-auto flex items-center justify-center text-3xl font-bold text-primary">

              {customer.customerName.charAt(0)}

            </div>

            <h2 className="text-2xl font-semibold text-primary mt-4">

              {customer.customerName}

            </h2>

            <p className="text-sub mt-1">
              {customer.email}
            </p>

            <p className="text-sub">
              {customer.phone}
            </p>

            <span
              className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-medium
              ${
                customer.loyalty === "Gold" &&
                "bg-yellow-100 text-yellow-700"
              }
              ${
                customer.loyalty === "Silver" &&
                "bg-gray-200 text-gray-700"
              }
              ${
                customer.loyalty === "Bronze" &&
                "bg-orange-100 text-orange-700"
              }`}
            >
              {customer.loyalty} Member
            </span>

          </div>

          {/* RIGHT */}
          <div className="md:col-span-2 grid md:grid-cols-2 gap-5">

            {/* TOTAL ORDERS */}
            <div className="card-coffee">

              <p className="text-sm text-muted">
                Total Orders
              </p>

              <h2 className="text-3xl font-bold text-primary mt-2">

                {customer.totalOrders}

              </h2>

            </div>

            {/* TOTAL SPENT */}
            <div className="card-coffee">

              <p className="text-sm text-muted">
                Total Spent
              </p>

              <h2 className="text-3xl font-bold text-primary mt-2">

                Rp{" "}

                {customer.totalSpent.toLocaleString(
                  "id-ID"
                )}

              </h2>

            </div>

            {/* FAVORITE MENU */}
            <div className="card-coffee">

              <p className="text-sm text-muted">
                Favorite Menu
              </p>

              <h2 className="text-xl font-semibold text-primary mt-2">

                {customer.favoriteMenu}

              </h2>

            </div>

            {/* MEMBER STATUS */}
            <div className="card-coffee">

              <p className="text-sm text-muted">
                Member Status
              </p>

              <h2 className="text-xl font-semibold text-primary mt-2">

                {customer.memberStatus}

              </h2>

            </div>

            {/* JOIN DATE */}
            <div className="card-coffee">

              <p className="text-sm text-muted">
                Join Date
              </p>

              <h2 className="text-xl font-semibold text-primary mt-2">

                {customer.joinDate}

              </h2>

            </div>

            {/* LAST ORDER */}
            <div className="card-coffee">

              <p className="text-sm text-muted">
                Last Order
              </p>

              <h2 className="text-xl font-semibold text-primary mt-2">

                {customer.lastOrder}

              </h2>

            </div>

          </div>

        </div>

        {/* NOTES */}
        <div className="card-coffee">

          <p className="text-sm text-muted mb-3">
            Customer Notes
          </p>

          <p className="text-sub">
            {customer.notes}
          </p>

        </div>

        {/* ORDER HISTORY */}
        <div className="card-coffee">

          <div className="flex justify-between items-center mb-5">

            <div>

              <h2 className="text-xl font-semibold text-primary">

                Order History

              </h2>

              <p className="text-muted text-sm">

                Customer transaction history

              </p>

            </div>

            <div className="text-right">

              <p className="text-sm text-muted">
                Revenue
              </p>

              <h2 className="text-2xl font-bold text-primary">

                Rp {totalRevenue.toLocaleString("id-ID")}

              </h2>

            </div>

          </div>

          {/* TABLE */}
          <table className="w-full">

            <thead className="bg-soft text-sub text-sm">

              <tr>

                <th className="p-4 text-left">
                  Order ID
                </th>

                <th className="p-4 text-left">
                  Items
                </th>

                <th className="p-4 text-center">
                  Payment
                </th>

                <th className="p-4 text-center">
                  Status
                </th>

                <th className="p-4 text-right">
                  Total
                </th>

              </tr>

            </thead>

            <tbody>

              {customerOrders.map((o) => (

                <tr
                  key={o.orderId}
                  className="border-t border-soft"
                >

                  {/* ORDER ID */}
                  <td className="p-4 font-medium">
                    {o.orderId}
                  </td>

                  {/* ITEMS */}
                  <td className="p-4 text-sm">

                    {o.items
                      .map(
                        (i) =>
                          `${i.name} x${i.qty}`
                      )
                      .join(", ")}

                  </td>

                  {/* PAYMENT */}
                  <td className="p-4 text-center">
                    {o.paymentMethod}
                  </td>

                  {/* STATUS */}
                  <td className="p-4 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        o.status ===
                          "Completed" &&
                        "bg-green-100 text-green-600"
                      }
                      ${
                        o.status ===
                          "Pending" &&
                        "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {o.status}
                    </span>

                  </td>

                  {/* TOTAL */}
                  <td className="p-4 text-right font-semibold text-primary">

                    Rp{" "}

                    {o.items
                      .reduce(
                        (a, b) =>
                          a +
                          b.qty * b.price,
                        0
                      )
                      .toLocaleString(
                        "id-ID"
                      )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}
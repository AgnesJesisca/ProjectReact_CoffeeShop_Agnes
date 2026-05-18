import { useParams, Link } from "react-router-dom";

import customers from "../../data/customers.json";
import orders from "../../data/orders.json";

import PageHeader from "../../components/PageHeader";
import ErrorPage from "./ErrorPage";

import Button from "../../components/Button";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Table from "../../components/Table";

export default function CustomerDetail() {

  const { id } = useParams();

  const customer = customers.find(
    (c) => c.customerId === id
  );

  if (!customer) {
    return (
      <ErrorPage
        code="404"
        message="Customer Not Found"
      />
    );
  }

  // CUSTOMER ORDERS
  const customerOrders = orders.filter(
    (o) =>
      o.customer
        .toLowerCase()
        .includes(
          customer.customerName
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

  return (

    <div className="flex-1 min-h-screen bg-[#F8F4EE]">

      <div className="p-6 space-y-6">

        {/* HEADER */}
        <PageHeader
          title="Customer Detail"
          breadcrumb={`Dashboard / Customers / ${customer.customerName}`}
        >

          <Link to="/customers">

            <Button variant="secondary">
              Back
            </Button>

          </Link>

        </PageHeader>

        {/* PROFILE */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT */}
          <Card>

            <div className="text-center">

              <div
                className="
                w-24 h-24
                rounded-full
                bg-[#FFF7ED]
                mx-auto
                flex items-center justify-center
                text-3xl
                font-bold
                text-[#D97706]
                "
              >

                {customer.customerName.charAt(0)}

              </div>

              <h2
                className="
                text-[28px]
                font-bold
                text-[#5B2E0F]
                mt-5
                "
              >
                {customer.customerName}
              </h2>

              <p className="text-[#A16207] mt-2">
                {customer.email}
              </p>

              <p className="text-[#A16207]">
                {customer.phone}
              </p>

              <div className="mt-5">

                <Badge
                  color={
                    customer.loyalty === "Gold"
                      ? "yellow"
                      : customer.loyalty === "Silver"
                      ? "blue"
                      : "red"
                  }
                >
                  {customer.loyalty} Member
                </Badge>

              </div>

            </div>

          </Card>

          {/* RIGHT */}
          <div className="md:col-span-2 grid md:grid-cols-2 gap-6">

            <Card>

              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <h2
                className="
                text-[34px]
                font-bold
                text-[#5B2E0F]
                mt-2
                "
              >
                {customer.totalOrders}
              </h2>

            </Card>

            <Card>

              <p className="text-sm text-gray-500">
                Total Spent
              </p>

              <h2
                className="
                text-[34px]
                font-bold
                text-[#5B2E0F]
                mt-2
                "
              >
                Rp{" "}
                {customer.totalSpent.toLocaleString(
                  "id-ID"
                )}
              </h2>

            </Card>

            <Card>

              <p className="text-sm text-gray-500">
                Favorite Menu
              </p>

              <h2
                className="
                text-[22px]
                font-semibold
                text-[#5B2E0F]
                mt-2
                "
              >
                {customer.favoriteMenu}
              </h2>

            </Card>

            <Card>

              <p className="text-sm text-gray-500">
                Member Status
              </p>

              <h2
                className="
                text-[22px]
                font-semibold
                text-[#5B2E0F]
                mt-2
                "
              >
                {customer.memberStatus}
              </h2>

            </Card>

            <Card>

              <p className="text-sm text-gray-500">
                Join Date
              </p>

              <h2
                className="
                text-[22px]
                font-semibold
                text-[#5B2E0F]
                mt-2
                "
              >
                {customer.joinDate}
              </h2>

            </Card>

            <Card>

              <p className="text-sm text-gray-500">
                Last Order
              </p>

              <h2
                className="
                text-[22px]
                font-semibold
                text-[#5B2E0F]
                mt-2
                "
              >
                {customer.lastOrder}
              </h2>

            </Card>

          </div>

        </div>

        {/* NOTES */}
        <Card>

          <p className="text-sm text-gray-500 mb-3">
            Customer Notes
          </p>

          <p className="text-[#6B4F3A] leading-relaxed">
            {customer.notes}
          </p>

        </Card>

        {/* ORDER HISTORY */}
        <Card>

          <div className="flex justify-between items-center mb-6">

            <div>

              <h2
                className="
                text-[24px]
                font-semibold
                text-[#5B2E0F]
                "
              >
                Order History
              </h2>

              <p className="text-sm text-[#A16207] mt-1">
                Customer transaction history
              </p>

            </div>

            <div className="text-right">

              <p className="text-sm text-gray-500">
                Revenue
              </p>

              <h2
                className="
                text-[28px]
                font-bold
                text-[#5B2E0F]
                "
              >
                Rp {totalRevenue.toLocaleString("id-ID")}
              </h2>

            </div>

          </div>

          <Table
            headers={[
              "Order ID",
              "Items",
              "Payment",
              "Status",
              "Total",
            ]}
          >

            {customerOrders.map((o) => (

              <tr
                key={o.orderId}
                className="
                border-t border-[#F5E7D4]
                hover:bg-[#FFFBF6]
                transition-all
                "
              >

                {/* ORDER ID */}
                <td className="p-5 font-medium text-[#5B2E0F]">
                  {o.orderId}
                </td>

                {/* ITEMS */}
                <td className="p-5 text-sm text-[#6B4F3A]">

                  {o.items
                    .map(
                      (i) =>
                        `${i.name} x${i.qty}`
                    )
                    .join(", ")}

                </td>

                {/* PAYMENT */}
                <td className="p-5 text-center text-[#6B4F3A]">
                  {o.paymentMethod}
                </td>

                {/* STATUS */}
                <td className="p-5 text-center">

                  <Badge
                    color={
                      o.status === "Completed"
                        ? "green"
                        : "yellow"
                    }
                  >
                    {o.status}
                  </Badge>

                </td>

                {/* TOTAL */}
                <td
                  className="
                  p-5
                  text-right
                  font-semibold
                  text-[#5B2E0F]
                  "
                >
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

          </Table>

        </Card>

      </div>

    </div>

  );
}
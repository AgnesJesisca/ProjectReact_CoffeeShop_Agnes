import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import ordersData from "../../data/orders.json";
import customers from "../../data/customers.json";
import menu from "../../data/menu.json";

import PageHeader from "../../components/PageHeader";

export default function Orders() {

  const [orders, setOrders] = useState(ordersData);

  const [showForm, setShowForm] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState("");

  const [customerType, setCustomerType] = useState("Member");

  const [guestName, setGuestName] = useState("");

  const [cart, setCart] = useState([]);

  const [search, setSearch] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [orderType, setOrderType] = useState("Dine In");

  const [notes, setNotes] = useState("");

  // ADD TO CART
  const addToCart = (item) => {

    const exist = cart.find((c) => c.name === item.name);

    if (exist) {

      setCart(
        cart.map((c) =>
          c.name === item.name
            ? { ...c, qty: c.qty + 1 }
            : c
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...item,
          qty: 1
        }
      ]);

    }
  };

  // CHANGE QTY
  const changeQty = (name, type) => {

    setCart(
      cart.map((c) => {

        if (c.name === name) {

          return {
            ...c,
            qty:
              type === "inc"
                ? c.qty + 1
                : Math.max(1, c.qty - 1)
          };

        }

        return c;

      })
    );

  };

  // TOTAL
  const total = cart.reduce(
    (a, b) => a + b.price * b.qty,
    0
  );

  // SUBMIT ORDER
  const handleSubmit = () => {

    const selectedData = customers.find(
      (c) => c.customerName === selectedCustomer
    );

    const newOrder = {

      orderId: "ORD-" + Date.now(),

      customer:
        customerType === "Member"
          ? selectedCustomer
          : guestName,

      customerPhone:
        customerType === "Member"
          ? selectedData?.phone || "-"
          : "-",

      customerType,

      items: cart,

      paymentMethod,

      orderType,

      tableNumber:
        orderType === "Dine In"
          ? Math.floor(Math.random() * 10) + 1
          : 0,

      barista: "Rina",

      total,

      status: "Pending",

      date: new Date()
        .toISOString()
        .slice(0, 10),

      notes

    };

    setOrders([newOrder, ...orders]);

    setCart([]);

    setSelectedCustomer("");

    setGuestName("");

    setPaymentMethod("Cash");

    setOrderType("Dine In");

    setNotes("");

    setShowForm(false);

  };

  // FILTER
  const filtered = orders.filter((o) =>
    o.customer
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="flex-1 min-h-screen">

      <div className="p-5 space-y-5">

        {/* HEADER */}
        <PageHeader
          title="Orders"
          breadcrumb="Dashboard / Orders"
        >

          <button
            onClick={() =>
              setShowForm(!showForm)
            }
            className="btn-coffee"
          >
            + Add Order
          </button>

        </PageHeader>

        {/* FORM */}
        {showForm && (

          <div className="card-coffee space-y-5">

            {/* CUSTOMER TYPE */}
            <select
              className="input-coffee"
              value={customerType}
              onChange={(e) =>
                setCustomerType(e.target.value)
              }
            >

              <option>
                Member
              </option>

              <option>
                Guest
              </option>

            </select>

            {/* CUSTOMER */}
            {customerType === "Member" ? (

              <select
                className="input-coffee"
                onChange={(e) =>
                  setSelectedCustomer(e.target.value)
                }
              >

                <option>
                  Select Customer
                </option>

                {customers.map((c) => (

                  <option
                    key={c.customerId}
                  >
                    {c.customerName}
                  </option>

                ))}

              </select>

            ) : (

              <input
                className="input-coffee"
                placeholder="Guest Name"
                onChange={(e) =>
                  setGuestName(e.target.value)
                }
              />

            )}

            {/* MENU */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {menu.map((m) => (

                <div
                  key={m.menuId}
                  className="border border-soft p-4 rounded-xl cursor-pointer hover:bg-soft transition"
                  onClick={() => addToCart(m)}
                >

                  <p className="font-medium">
                    {m.name}
                  </p>

                  <p className="text-sm text-muted">
                    Rp{" "}
                    {m.price.toLocaleString(
                      "id-ID"
                    )}
                  </p>

                </div>

              ))}

            </div>

            {/* PAYMENT + TYPE */}
            <div className="grid md:grid-cols-2 gap-4">

              <select
                className="input-coffee"
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              >

                <option>
                  Cash
                </option>

                <option>
                  QRIS
                </option>

                <option>
                  Debit
                </option>

              </select>

              <select
                className="input-coffee"
                onChange={(e) =>
                  setOrderType(
                    e.target.value
                  )
                }
              >

                <option>
                  Dine In
                </option>

                <option>
                  Take Away
                </option>

              </select>

            </div>

            {/* NOTES */}
            <textarea
              rows="3"
              placeholder="Order notes..."
              className="input-coffee"
              onChange={(e) =>
                setNotes(e.target.value)
              }
            />

            {/* CART */}
            <div className="space-y-3">

              {cart.map((c) => (

                <div
                  key={c.name}
                  className="flex justify-between items-center bg-soft p-3 rounded-xl"
                >

                  <div>

                    <p className="font-medium">
                      {c.name}
                    </p>

                    <p className="text-sm text-muted">
                      Rp{" "}
                      {c.price.toLocaleString(
                        "id-ID"
                      )}
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <button
                      onClick={() =>
                        changeQty(
                          c.name,
                          "dec"
                        )
                      }
                      className="bg-white px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span>
                      {c.qty}
                    </span>

                    <button
                      onClick={() =>
                        changeQty(
                          c.name,
                          "inc"
                        )
                      }
                      className="bg-white px-3 py-1 rounded"
                    >
                      +
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* TOTAL */}
            <div className="flex justify-between items-center">

              <p className="text-lg font-semibold text-primary">

                Total:
                Rp{" "}
                {total.toLocaleString(
                  "id-ID"
                )}

              </p>

              <button
                onClick={handleSubmit}
                className="btn-coffee"
              >
                Submit Order
              </button>

            </div>

          </div>

        )}

        {/* SEARCH */}
        <input
          placeholder="Search order..."
          className="input-coffee"
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* TABLE */}
        <div className="card-coffee overflow-hidden">

          <table className="w-full">

            {/* HEAD */}
            <thead className="bg-soft text-sub text-sm uppercase">

              <tr>

                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="p-4 text-center">
                  Type
                </th>

                <th className="p-4 text-left">
                  Items
                </th>

                <th className="p-4 text-right">
                  Total
                </th>

                <th className="p-4 text-center">
                  Payment
                </th>

                <th className="p-4 text-center">
                  Status
                </th>

                <th className="p-4 text-center">
                  Barista
                </th>

                <th className="p-4 text-center">
                  Date
                </th>

                <th className="p-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            {/* BODY */}
            <tbody>

              {filtered.map((o) => (

                <tr
                  key={o.orderId}
                  className="border-t border-soft hover:bg-[#FAF6F2] transition"
                >

                  {/* CUSTOMER */}
                  <td className="p-4">

                    <div>

                      <p className="font-medium">
                        {o.customer}
                      </p>

                      <p className="text-sm text-muted">
                        {o.customerPhone}
                      </p>

                    </div>

                  </td>

                  {/* TYPE */}
                  <td className="p-4 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        o.customerType === "Member"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {o.customerType}
                    </span>

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

                  {/* BARISTA */}
                  <td className="p-4 text-center">
                    {o.barista}
                  </td>

                  {/* DATE */}
                  <td className="p-4 text-center">
                    {o.date}
                  </td>

                  {/* ACTION */}
                  <td className="p-4 text-center">

                    <Link
                      to={`/orders/${o.orderId}`}
                      className="inline-flex items-center gap-2 bg-soft px-3 py-2 rounded-lg text-primary hover:bg-[#EADFD7] transition"
                    >

                      <FaEye />

                      Detail

                    </Link>

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
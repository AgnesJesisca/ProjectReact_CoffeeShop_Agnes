import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  QrCode,
} from "lucide-react";

import ordersData from "../../data/orders.json";
import customers from "../../data/customers.json";
import menu from "../../data/menu.json";

import PageHeader from "../../components/PageHeader";

export default function Orders() {

  const [orders, setOrders] = useState(ordersData);

  const [cart, setCart] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedCustomer, setSelectedCustomer] =
    useState("");

  const [customerType, setCustomerType] =
    useState("Member");

  const [guestName, setGuestName] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  const [orderType, setOrderType] =
    useState("Dine In");

  const [notes, setNotes] =
    useState("");

  // ADD TO CART
  const addToCart = (item) => {

    const exist = cart.find(
      (c) => c.name === item.name
    );

    if (exist) {

      setCart(
        cart.map((c) =>
          c.name === item.name
            ? {
                ...c,
                qty: c.qty + 1,
              }
            : c
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...item,
          qty: 1,
        },
      ]);
    }
  };

  // CHANGE QTY
  const changeQty = (
    name,
    type
  ) => {

    setCart(
      cart
        .map((c) => {

          if (c.name === name) {

            return {
              ...c,

              qty:
                type === "inc"
                  ? c.qty + 1
                  : c.qty - 1,
            };
          }

          return c;
        })

        .filter((c) => c.qty > 0)
    );
  };

  // REMOVE
  const removeItem = (name) => {

    setCart(
      cart.filter(
        (c) => c.name !== name
      )
    );
  };

  // TOTAL
  const total = cart.reduce(
    (a, b) =>
      a + b.qty * b.price,
    0
  );

  // SUBMIT
  const handleSubmit = () => {

    const selectedData =
      customers.find(
        (c) =>
          c.customerName ===
          selectedCustomer
      );

    const newOrder = {

      orderId:
        "ORD-" + Date.now(),

      customer:
        customerType ===
        "Member"
          ? selectedCustomer
          : guestName,

      customerPhone:
        customerType ===
        "Member"
          ? selectedData?.phone ||
            "-"
          : "-",

      customerType,

      items: cart,

      paymentMethod,

      orderType,

      total,

      status: "Pending",

      date: new Date()
        .toISOString()
        .slice(0, 10),

      notes,
    };

    setOrders([
      newOrder,
      ...orders,
    ]);

    setCart([]);

    setSelectedCustomer("");

    setGuestName("");

    setNotes("");
  };

  // FILTER ORDER
  const filteredOrders =
    orders.filter((o) =>
      o.customer
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="flex-1 min-h-screen bg-[#F8F4EE]">

      <div className="p-6 space-y-6">

        <PageHeader
          title="Orders Management"
          breadcrumb="Manage customer transactions"
        />

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* LEFT */}
          <div
            className="
            bg-white
            rounded-[30px]
            border border-[#F1DFC8]
            shadow-sm
            p-6
            "
          >

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2
                  className="
                  text-[22px]
                  font-semibold
                  text-[#5B2E0F]
                  "
                >
                  Create Order
                </h2>

                <p
                  className="
                  text-sm
                  text-[#A16207]
                  mt-1
                  "
                >
                  Add customer transaction
                </p>

              </div>

            </div>

            <div className="space-y-5">

              {/* CUSTOMER */}
              <select
                className="input-coffee"
                value={customerType}
                onChange={(e) =>
                  setCustomerType(
                    e.target.value
                  )
                }
              >
                <option>
                  Member
                </option>

                <option>
                  Guest
                </option>

              </select>

              {customerType ===
              "Member" ? (

                <select
                  className="input-coffee"
                  onChange={(e) =>
                    setSelectedCustomer(
                      e.target.value
                    )
                  }
                >

                  <option>
                    Select Customer
                  </option>

                  {customers.map((c) => (

                    <option
                      key={
                        c.customerId
                      }
                    >
                      {
                        c.customerName
                      }
                    </option>

                  ))}

                </select>

              ) : (

                <input
                  className="input-coffee"
                  placeholder="Guest Name"
                  onChange={(e) =>
                    setGuestName(
                      e.target.value
                    )
                  }
                />

              )}

              {/* MENU */}
              <div>

                <p
                  className="
                  text-sm
                  font-medium
                  text-[#6B4F3A]
                  mb-3
                  "
                >
                  Select Menu
                </p>

                <div className="grid grid-cols-2 gap-3">

                  {menu.map((m) => (

                    <button
                      key={m.menuId}
                      onClick={() =>
                        addToCart(m)
                      }
                      className="
                      border border-[#EADBC8]
                      rounded-2xl
                      p-4
                      text-left
                      hover:bg-[#FFF7ED]
                      transition-all
                      "
                    >

                      <p
                        className="
                        font-medium
                        text-[#5B2E0F]
                        "
                      >
                        {m.name}
                      </p>

                      <p
                        className="
                        text-sm
                        text-[#A16207]
                        mt-1
                        "
                      >
                        Rp{" "}
                        {m.price.toLocaleString(
                          "id-ID"
                        )}
                      </p>

                    </button>

                  ))}

                </div>

              </div>

              {/* OPTIONS */}
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
                  setNotes(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* RIGHT */}
          <div
            className="
            bg-white
            rounded-[30px]
            border border-[#F1DFC8]
            shadow-sm
            p-6
            "
          >

            <h2
              className="
              text-[22px]
              font-semibold
              text-[#5B2E0F]
              "
            >
              Current Order
            </h2>

            <p
              className="
              text-sm
              text-[#A16207]
              mt-1 mb-6
              "
            >
              Customer cart summary
            </p>

            {/* CART */}
            <div className="space-y-4 max-h-[420px] overflow-auto">

              {cart.length === 0 ? (

                <div
                  className="
                  text-center
                  text-[#A16207]
                  py-12
                  "
                >
                  No items added yet
                </div>

              ) : (

                cart.map((c) => (

                  <div
                    key={c.name}
                    className="
                    bg-[#FFF7ED]
                    rounded-2xl
                    p-4
                    "
                  >

                    <div className="flex justify-between items-start">

                      <div>

                        <h3
                          className="
                          font-semibold
                          text-[#5B2E0F]
                          "
                        >
                          {c.name}
                        </h3>

                        <p
                          className="
                          text-sm
                          text-[#A16207]
                          mt-1
                          "
                        >
                          Rp{" "}
                          {c.price.toLocaleString(
                            "id-ID"
                          )}
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          removeItem(
                            c.name
                          )
                        }
                      >
                        <Trash2 className="size-4 text-red-500" />
                      </button>

                    </div>

                    {/* QTY */}
                    <div className="flex items-center gap-3 mt-4">

                      <button
                        onClick={() =>
                          changeQty(
                            c.name,
                            "dec"
                          )
                        }
                        className="
                        w-9 h-9
                        rounded-xl
                        border border-[#EADBC8]
                        flex items-center justify-center
                        "
                      >
                        <Minus className="size-4" />
                      </button>

                      <span className="font-semibold">
                        {c.qty}
                      </span>

                      <button
                        onClick={() =>
                          changeQty(
                            c.name,
                            "inc"
                          )
                        }
                        className="
                        w-9 h-9
                        rounded-xl
                        border border-[#EADBC8]
                        flex items-center justify-center
                        "
                      >
                        <Plus className="size-4" />
                      </button>

                    </div>

                  </div>
                ))

              )}

            </div>

            {/* TOTAL */}
            <div
              className="
              border-t border-[#F5E7D4]
              mt-6 pt-6
              "
            >

              <div className="flex justify-between items-center">

                <span
                  className="
                  text-[#6B4F3A]
                  "
                >
                  Total
                </span>

                <h1
                  className="
                  text-[30px]
                  font-bold
                  text-[#5B2E0F]
                  "
                >
                  Rp{" "}
                  {total.toLocaleString(
                    "id-ID"
                  )}
                </h1>

              </div>

              {/* BUTTON */}
              {/* BUTTON */}
              <div className="space-y-3 mt-5">

                {/* CARD */}
                <button
                  onClick={() => {
                    setPaymentMethod("Debit");
                    handleSubmit();
                  }}
                  className="
                  w-full
                  flex items-center justify-center gap-2
                  bg-gradient-to-r
                  from-[#2563EB]
                  to-[#06B6D4]
                  text-white
                  py-3
                  rounded-2xl
                  font-medium
                  shadow-md
                  hover:scale-[1.01]
                  transition-all
                  "
                >
                  <CreditCard className="size-5" />
                  Pay with Card
                </button>

                {/* QRIS */}
                <button
                  onClick={() => {
                    setPaymentMethod("QRIS");
                    handleSubmit();
                  }}
                  className="
                  w-full
                  flex items-center justify-center gap-2
                  bg-gradient-to-r
                  from-[#7C3AED]
                  to-[#A855F7]
                  text-white
                  py-3
                  rounded-2xl
                  font-medium
                  shadow-md
                  hover:scale-[1.01]
                  transition-all
                  "
                >
                  <QrCode className="size-5" />
                  Pay with QRIS
                </button>

                {/* CASH */}
                <button
                  onClick={() => {
                    setPaymentMethod("Cash");
                    handleSubmit();
                  }}
                  className="
                  w-full
                  flex items-center justify-center gap-2
                  bg-gradient-to-r
                  from-[#16A34A]
                  to-[#10B981]
                  text-white
                  py-3
                  rounded-2xl
                  font-medium
                  shadow-md
                  hover:scale-[1.01]
                  transition-all
                  "
                >
                  <Banknote className="size-5" />
                  Pay with Cash
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* HISTORY */}
        <div
          className="
          bg-white
          rounded-[30px]
          border border-[#F1DFC8]
          shadow-sm
          overflow-hidden
          "
        >

          {/* TOP */}
          <div className="p-6 border-b border-[#F5E7D4]">

            <div className="flex items-center justify-between">

              <div>

                <h2
                  className="
                  text-[22px]
                  font-semibold
                  text-[#5B2E0F]
                  "
                >
                  Order History
                </h2>

                <p
                  className="
                  text-sm
                  text-[#A16207]
                  mt-1
                  "
                >
                  Recent customer orders
                </p>

              </div>

              <input
                placeholder="Search customer..."
                className="
                input-coffee
                w-[260px]
                "
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* TABLE */}
          <div className="overflow-auto">

            <table className="w-full">

              <thead
                className="
                bg-[#FFF7ED]
                text-[#A16207]
                text-sm
                "
              >

                <tr>

                  <th className="p-5 text-left">
                    Customer
                  </th>

                  <th className="p-5 text-left">
                    Items
                  </th>

                  <th className="p-5 text-center">
                    Payment
                  </th>

                  <th className="p-5 text-center">
                    Status
                  </th>

                  <th className="p-5 text-right">
                    Total
                  </th>

                  <th className="p-5 text-center">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredOrders.map((o) => (

                  <tr
                    key={o.orderId}
                    className="
                    border-t border-[#F5E7D4]
                    hover:bg-[#FFFBF6]
                    transition-all
                    "
                  >

                    <td className="p-5">

                      <div>

                        <p
                          className="
                          font-semibold
                          text-[#5B2E0F]
                          "
                        >
                          {o.customer}
                        </p>

                        <p
                          className="
                          text-sm
                          text-[#A16207]
                          mt-1
                          "
                        >
                          {o.date}
                        </p>

                      </div>

                    </td>

                    <td className="p-5 text-sm text-[#6B4F3A]">

                      {o.items
                        .map(
                          (i) =>
                            `${i.name} x${i.qty}`
                        )
                        .join(", ")}

                    </td>

                    <td className="p-5 text-center">
                      {o.paymentMethod}
                    </td>

                    <td className="p-5 text-center">

                      <span
                        className={`
                        px-3 py-1
                        rounded-full
                        text-xs
                        font-medium

                        ${
                          o.status ===
                          "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                      >
                        {o.status}
                      </span>

                    </td>

                    <td
                      className="
                      p-5
                      text-right
                      font-semibold
                      text-[#5B2E0F]
                      "
                    >
                      Rp{" "}
                      {(
                        o.total ||
                        o.items.reduce(
                          (a, b) =>
                            a +
                            b.qty * b.price,
                          0
                        )
                      ).toLocaleString(
                        "id-ID"
                      )}
                    </td>

                    <td className="p-5 text-center">

                      <Link
                        to={`/orders/${o.orderId}`}
                        className="
                        inline-flex items-center justify-center
                        px-4 py-2
                        rounded-xl
                        border border-[#EADBC8]
                        hover:bg-[#FFF7ED]
                        text-sm
                        text-[#6B4F3A]
                        transition-all
                        "
                      >
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

    </div>
  );
}
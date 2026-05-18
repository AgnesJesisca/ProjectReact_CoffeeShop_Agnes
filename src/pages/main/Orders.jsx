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
import menuData from "../../data/menu.json";

import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import SearchBar from "../../components/SearchBar";
import FilterSelect from "../../components/FilterSelect";
import Table from "../../components/Table";

export default function Orders() {

  const [orders, setOrders] = useState(
    ordersData.map((o) => ({
      ...o,
      total:
        o.total ??
        o.items.reduce(
          (sum, item) =>
            sum +
            Number(item.qty || 0) *
            Number(item.price || 0),
          0
        ),
    }))
  );

  const [showForm, setShowForm] = useState(false);

  const [cart, setCart] = useState([]);

  const [searchOrder, setSearchOrder] = useState("");
  const [searchMenu, setSearchMenu] = useState("");
  const [category, setCategory] = useState("All");

  const [customerType, setCustomerType] = useState("Member");

  const [selectedCustomer, setSelectedCustomer] = useState(
    customers[0]?.customerName || ""
  );

  const [guestName, setGuestName] = useState("");

  const [orderType, setOrderType] = useState("Dine In");

  const [notes, setNotes] = useState("");

  // FILTER MENU
  const filteredMenu = menuData.filter((m) => {

    const matchSearch =
      m.name.toLowerCase().includes(
        searchMenu.toLowerCase()
      );

    const matchCategory =
      category === "All"
        ? true
        : m.category === category;

    return matchSearch && matchCategory;
  });

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
          name: item.name,
          qty: 1,
          price: Number(item.price),
        },
      ]);
    }
  };

  // CHANGE QTY
  const changeQty = (name, type) => {

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

  // REMOVE ITEM
  const removeItem = (name) => {

    setCart(
      cart.filter(
        (c) => c.name !== name
      )
    );
  };

  // TOTAL
  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.qty) *
      Number(item.price),
    0
  );

  // SUBMIT ORDER
  const handleSubmit = (
    paymentMethod
  ) => {

    if (cart.length === 0) {

      alert(
        "Please add menu first"
      );

      return;
    }

    const customerName =
      customerType === "Member"
        ? selectedCustomer
        : guestName;

    if (!customerName) {

      alert(
        "Please input customer"
      );

      return;
    }

    const newOrder = {

      orderId:
        "ORD-" +
        Date.now(),

      customer: customerName,

      customerPhone:
        "08123456789",

      items: cart.map((i) => ({
        name: i.name,
        qty: Number(i.qty),
        price: Number(i.price),
      })),

      paymentMethod,

      orderType,

      tableNumber:
        orderType === "Dine In"
          ? Math.floor(
              Math.random() * 20
            ) + 1
          : 0,

      barista: "Admin",

      status: "Completed",

      date: new Date()
        .toISOString()
        .slice(0, 10),

      notes,

      total: Number(total),
    };

    setOrders((prev) => [
      newOrder,
      ...prev,
    ]);

    setCart([]);
    setGuestName("");
    setNotes("");
    setShowForm(false);

    alert(
      "Order successfully added!"
    );
  };

  // FILTER HISTORY
  const filteredOrders =
    orders.filter((o) =>
      o.customer
        .toLowerCase()
        .includes(
          searchOrder.toLowerCase()
        )
    );

  return (
    <div className="flex-1 min-h-screen bg-[#F8F4EE] overflow-x-hidden">

      <div className="p-6 space-y-6">

        <PageHeader
          title="Orders Management"
          breadcrumb="Manage customer transactions"
        />

        {/* BUTTON */}
        <div className="flex justify-end">

          <Button
            onClick={() =>
              setShowForm(
                !showForm
              )
            }
          >
            <Plus className="size-5" />

            {showForm
              ? "Close Form"
              : "Add Order"}

          </Button>

        </div>

        {/* FORM */}
        {showForm && (

          <Card className="space-y-6">

            {/* TOP */}
            <div>

              <h2 className="text-[24px] font-semibold text-[#5B2E0F]">
                Create New Order
              </h2>

              <p className="text-sm text-[#A16207] mt-1">
                Add customer transaction
              </p>

            </div>

            {/* CUSTOMER */}
            <div className="grid md:grid-cols-2 gap-4">

              <FilterSelect
                value={customerType}
                options={[
                  "Member",
                  "Guest",
                ]}
                onChange={(e) =>
                  setCustomerType(
                    e.target.value
                  )
                }
              />

              {customerType === "Member" ? (

                <FilterSelect
                  value={
                    selectedCustomer
                  }
                  options={customers.map(
                    (c) =>
                      c.customerName
                  )}
                  onChange={(e) =>
                    setSelectedCustomer(
                      e.target.value
                    )
                  }
                />

              ) : (

                <Input
                  placeholder="Guest Name"
                  value={guestName}
                  onChange={(e) =>
                    setGuestName(
                      e.target.value
                    )
                  }
                />

              )}

            </div>

            {/* SEARCH */}
            <div className="grid md:grid-cols-2 gap-4">

              <SearchBar
                placeholder="Search menu..."
                value={searchMenu}
                onChange={(e) =>
                  setSearchMenu(
                    e.target.value
                  )
                }
              />

              <FilterSelect
                value={category}
                options={[
                  "All",
                  "Coffee",
                  "Non-Coffee",
                  "Snack",
                ]}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
              />

            </div>

            {/* MENU */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

              {filteredMenu.map((m) => (

                <Card
                  key={m.menuId}
                  className="
                  cursor-pointer
                  hover:bg-[#FFF7ED]
                  transition-all
                  p-4
                  "
                  onClick={() =>
                    addToCart(m)
                  }
                >

                  <h3 className="font-semibold text-[#5B2E0F]">
                    {m.name}
                  </h3>

                  <p className="text-sm text-[#A16207] mt-1">
                    {m.category}
                  </p>

                  <p className="font-bold text-[#D97706] mt-3">
                    Rp{" "}
                    {Number(
                      m.price
                    ).toLocaleString(
                      "id-ID"
                    )}
                  </p>

                </Card>

              ))}

            </div>

            {/* CART */}
            <div className="border-t border-[#F5E7D4] pt-6">

              <h3 className="text-[20px] font-semibold text-[#5B2E0F] mb-5">
                Current Order
              </h3>

              {cart.length === 0 ? (

                <div className="text-center py-10 text-[#A16207]">
                  No items added yet
                </div>

              ) : (

                <div className="space-y-4">

                  {cart.map((c) => (

                    <div
                      key={c.name}
                      className="
                      border border-[#F5E7D4]
                      rounded-2xl
                      p-4
                      bg-[#FFF7ED]
                      "
                    >

                      <div className="flex justify-between items-start">

                        <div>

                          <h3 className="font-semibold text-[#5B2E0F]">
                            {c.name}
                          </h3>

                          <p className="text-sm text-[#A16207] mt-1">
                            Rp{" "}
                            {Number(
                              c.price
                            ).toLocaleString(
                              "id-ID"
                            )} x {c.qty}
                          </p>

                          <p className="font-semibold text-[#D97706] mt-2">
                            Rp{" "}
                            {(
                              Number(c.price) *
                              Number(c.qty)
                            ).toLocaleString(
                              "id-ID"
                            )}
                          </p>

                        </div>

                        <Button
                          variant="danger"
                          className="w-10 h-10 px-0"
                          onClick={() =>
                            removeItem(
                              c.name
                            )
                          }
                        >
                          <Trash2 className="size-4" />
                        </Button>

                      </div>

                      {/* QTY */}
                      <div className="flex items-center gap-3 mt-4">

                        <Button
                          variant="outline"
                          className="w-9 h-9 px-0"
                          onClick={() =>
                            changeQty(
                              c.name,
                              "dec"
                            )
                          }
                        >
                          <Minus className="size-4" />
                        </Button>

                        <span className="font-semibold min-w-[24px] text-center">
                          {c.qty}
                        </span>

                        <Button
                          variant="outline"
                          className="w-9 h-9 px-0"
                          onClick={() =>
                            changeQty(
                              c.name,
                              "inc"
                            )
                          }
                        >
                          <Plus className="size-4" />
                        </Button>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

            {/* OPTIONS */}
            <div className="grid md:grid-cols-2 gap-4">

              <FilterSelect
                value={orderType}
                options={[
                  "Dine In",
                  "Take Away",
                ]}
                onChange={(e) =>
                  setOrderType(
                    e.target.value
                  )
                }
              />

              <Input
                placeholder="Notes..."
                value={notes}
                onChange={(e) =>
                  setNotes(
                    e.target.value
                  )
                }
              />

            </div>

            {/* TOTAL */}
            <div className="border-t border-[#F5E7D4] pt-6">

              <div className="flex justify-between items-center mb-5">

                <span className="text-[#6B4F3A]">
                  Total
                </span>

                <h1 className="text-[34px] font-bold text-[#5B2E0F]">
                  Rp{" "}
                  {Number(total).toLocaleString(
                    "id-ID"
                  )}
                </h1>

              </div>

              {/* PAYMENT */}
              <div className="grid md:grid-cols-3 gap-4">

                <Button
                  variant="debit"
                  onClick={() =>
                    handleSubmit(
                      "Debit"
                    )
                  }
                >
                  <CreditCard className="size-5" />
                  Card
                </Button>

                <Button
                  variant="qris"
                  onClick={() =>
                    handleSubmit(
                      "QRIS"
                    )
                  }
                >
                  <QrCode className="size-5" />
                  QRIS
                </Button>

                <Button
                  variant="cash"
                  onClick={() =>
                    handleSubmit(
                      "Cash"
                    )
                  }
                >
                  <Banknote className="size-5" />
                  Cash
                </Button>

              </div>

            </div>

          </Card>

        )}

        {/* HISTORY */}
        <Card className="overflow-hidden p-0">

          <div className="p-6 border-b border-[#F5E7D4]">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>

                <h2 className="text-[22px] font-semibold text-[#5B2E0F]">
                  Order History
                </h2>

                <p className="text-sm text-[#A16207] mt-1">
                  Recent customer orders
                </p>

              </div>

              <SearchBar
                placeholder="Search customer..."
                className="w-full md:w-[260px]"
                value={searchOrder}
                onChange={(e) =>
                  setSearchOrder(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <Table
              headers={[
                "Customer",
                "Items",
                "Payment",
                "Status",
                "Total",
                "Action",
              ]}
            >

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

                    <p className="font-semibold text-[#5B2E0F]">
                      {o.customer}
                    </p>

                    <p className="text-sm text-[#A16207] mt-1">
                      {o.date}
                    </p>

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

                    <Badge color="green">
                      {o.status}
                    </Badge>

                  </td>

                  <td className="p-5 text-right font-semibold text-[#5B2E0F]">

                    Rp{" "}
                    {Number(
                      o.total
                    ).toLocaleString(
                      "id-ID"
                    )}

                  </td>

                  <td className="p-5 text-center">

                    <Link
                      to={`/orders/${o.orderId}`}
                    >

                      <Button
                        variant="outline"
                        className="h-[40px]"
                      >
                        Detail
                      </Button>

                    </Link>

                  </td>

                </tr>

              ))}

            </Table>

          </div>

        </Card>

      </div>

    </div>
  );
}
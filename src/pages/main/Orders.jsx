import { useState } from "react";
import ordersData from "../../data/orders.json";
import customers from "../../data/customers.json";
import menu from "../../data/menu.json";
import PageHeader from "../../components/PageHeader";

export default function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [showForm, setShowForm] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [cart, setCart] = useState([]);

  const [search, setSearch] = useState("");

  // ADD TO CART
  const addToCart = (item) => {
    const exist = cart.find((c) => c.name === item.name);

    if (exist) {
      setCart(
        cart.map((c) =>
          c.name === item.name ? { ...c, qty: c.qty + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  // CHANGE QTY
  const changeQty = (name, type) => {
    setCart(
      cart.map((c) => {
        if (c.name === name) {
          return {
            ...c,
            qty: type === "inc" ? c.qty + 1 : Math.max(1, c.qty - 1)
          };
        }
        return c;
      })
    );
  };

  // TOTAL
  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);

  // SUBMIT ORDER
  const handleSubmit = () => {
    const newOrder = {
      orderId: "ORD-" + Date.now(),
      customer: selectedCustomer,
      items: cart,
      total,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10)
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setSelectedCustomer("");
    setShowForm(false);
  };

  // FILTER
  const filtered = orders.filter((o) =>
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen">
      <div className="p-5 space-y-5">

        <PageHeader title="Orders" breadcrumb="Dashboard / Orders">
          <button onClick={() => setShowForm(!showForm)} className="btn-coffee">
            + Add Order
          </button>
        </PageHeader>

        {/* FORM */}
        {showForm && (
          <div className="card-coffee space-y-4">

            {/* CUSTOMER */}
            <select
              className="input-coffee"
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              <option>Select Customer</option>
              {customers.map((c) => (
                <option key={c.customerId}>{c.customerName}</option>
              ))}
            </select>

            {/* MENU */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {menu.map((m) => (
                <div
                  key={m.menuId}
                  className="border p-3 rounded cursor-pointer hover:bg-soft"
                  onClick={() => addToCart(m)}
                >
                  <p className="font-medium">{m.name}</p>
                  <p className="text-sm text-muted">
                    Rp {m.price.toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>

            {/* CART */}
            <div className="space-y-2">
              {cart.map((c) => (
                <div key={c.name} className="flex justify-between items-center">

                  <span>{c.name}</span>

                  <div className="flex items-center gap-2">
                    <button onClick={() => changeQty(c.name, "dec")}>-</button>
                    <span>{c.qty}</span>
                    <button onClick={() => changeQty(c.name, "inc")}>+</button>
                  </div>

                </div>
              ))}
            </div>

            <p className="font-semibold">
              Total: Rp {total.toLocaleString("id-ID")}
            </p>

            <button onClick={handleSubmit} className="btn-coffee">
              Submit Order
            </button>

          </div>
        )}

        {/* SEARCH */}
        <input
          placeholder="Search order..."
          className="input-coffee"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE */}
        <div className="card-coffee overflow-hidden">
          <table className="w-full">

            <thead className="bg-soft text-sub text-sm uppercase">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((o) => (
                <tr key={o.orderId} className="border-t">

                  <td className="p-4">{o.customer}</td>

                  <td className="p-4 text-sm">
                    {o.items.map((i) => `${i.name} x${i.qty}`).join(", ")}
                  </td>

                  <td className="p-4 text-primary font-semibold">
                    Rp {o.items
                      .reduce((a, b) => a + b.qty * b.price, 0)
                      .toLocaleString("id-ID")}
                  </td>

                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs
                      ${o.status === "Completed" && "bg-green-100 text-green-600"}
                      ${o.status === "Pending" && "bg-yellow-100 text-yellow-600"}
                    `}>
                      {o.status}
                    </span>
                  </td>

                  <td className="p-4">{o.date}</td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}
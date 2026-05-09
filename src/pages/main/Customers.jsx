import { useState } from "react";
import { Link } from "react-router-dom";
import customersData from "../../data/customers.json";
import PageHeader from "../../components/PageHeader";
import { FaEye } from "react-icons/fa";

export default function Customers() {
  const [customers, setCustomers] = useState(customersData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    loyalty: "Bronze"
  });

  // FILTER
  const filtered = customers.filter((c) =>
    c.customerName.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "" || c.loyalty === filter)
  );

  // SUBMIT
  const handleSubmit = () => {
    const newCustomer = {
      customerId: "CUST-" + Date.now(),
      ...form,
      totalOrders: 0,
      totalSpent: 0
    };

    setCustomers([newCustomer, ...customers]);

    setForm({
      customerName: "",
      email: "",
      phone: "",
      loyalty: "Bronze"
    });

    setShowForm(false);
  };

  return (
    <div className="flex-1 min-h-screen">
      <div className="p-5 space-y-5">

        {/* HEADER */}
        <PageHeader
          title="Customers"
          breadcrumb="Dashboard / Customers"
        >
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-coffee"
          >
            + Add Customer
          </button>
        </PageHeader>

        {/* FORM */}
        {showForm && (
          <div className="card-coffee grid md:grid-cols-2 gap-4">

            <input
              className="input-coffee"
              placeholder="Customer Name"
              value={form.customerName}
              onChange={(e) =>
                setForm({ ...form, customerName: e.target.value })
              }
            />

            <input
              className="input-coffee"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              className="input-coffee"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <select
              className="input-coffee"
              value={form.loyalty}
              onChange={(e) =>
                setForm({ ...form, loyalty: e.target.value })
              }
            >
              <option>Bronze</option>
              <option>Silver</option>
              <option>Gold</option>
            </select>

            <button
              onClick={handleSubmit}
              className="btn-coffee md:col-span-2"
            >
              Save Customer
            </button>

          </div>
        )}

        {/* SEARCH */}
        <div className="flex gap-4">

          <input
            placeholder="Search customer..."
            className="input-coffee"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="input-coffee w-52"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Loyalty</option>
            <option>Gold</option>
            <option>Silver</option>
            <option>Bronze</option>
          </select>

        </div>

        {/* TABLE */}
        <div className="card-coffee overflow-hidden">

          <table className="w-full">

            {/* HEAD */}
            <thead className="bg-soft text-sub text-sm">
              <tr>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Loyalty</th>
                <th className="p-4 text-center">Orders</th>
                <th className="p-4 text-right">Spent</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>

              {filtered.map((c) => (

                <tr
                  key={c.customerId}
                  className="border-t border-soft hover:bg-[#FAF6F2] transition"
                >

                  {/* CUSTOMER */}
                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-full bg-soft flex items-center justify-center text-primary font-semibold">
                        {c.customerName.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium">
                          {c.customerName}
                        </p>

                        <p className="text-sm text-muted">
                          {c.email}
                        </p>
                      </div>

                    </div>

                  </td>

                  {/* LOYALTY */}
                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        c.loyalty === "Gold" &&
                        "bg-yellow-100 text-yellow-700"
                      }
                      ${
                        c.loyalty === "Silver" &&
                        "bg-gray-200 text-gray-700"
                      }
                      ${
                        c.loyalty === "Bronze" &&
                        "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {c.loyalty}
                    </span>

                  </td>

                  {/* ORDERS */}
                  <td className="p-4 text-center font-medium">
                    {c.totalOrders}
                  </td>

                  {/* SPENT */}
                  <td className="p-4 text-right font-semibold text-primary">
                    Rp {c.totalSpent.toLocaleString("id-ID")}
                  </td>

                  {/* ACTION */}
                  <td className="p-4 text-center">

                    <Link
                      to={`/customers/${c.customerId}`}
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
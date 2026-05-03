import { useState } from "react";
import customersData from "../../data/customers.json";
import PageHeader from "../../components/PageHeader";

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

  const filtered = customers.filter((c) =>
    c.customerName.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "" || c.loyalty === filter)
  );

  const handleSubmit = () => {
    const newCustomer = {
      customerId: Date.now(),
      ...form,
      totalOrders: 0,
      totalSpent: 0
    };

    setCustomers([...customers, newCustomer]);
    setShowForm(false);
  };

  return (
    <div className="flex-1 min-h-screen">
      <div className="p-5 space-y-5">

        <PageHeader
          title="Customers"
          breadcrumb="Dashboard / Customers"
        >
          <button onClick={() => setShowForm(!showForm)} className="btn-coffee">
            + Add Customer
          </button>
        </PageHeader>

        {/* FORM */}
        {showForm && (
          <div className="card-coffee space-y-3">
            <input className="input-coffee" placeholder="Name"
              onChange={(e) => setForm({...form, customerName: e.target.value})} />
            <input className="input-coffee" placeholder="Email"
              onChange={(e) => setForm({...form, email: e.target.value})} />
            <input className="input-coffee" placeholder="Phone"
              onChange={(e) => setForm({...form, phone: e.target.value})} />
            <select className="input-coffee"
              onChange={(e) => setForm({...form, loyalty: e.target.value})}>
              <option>Bronze</option>
              <option>Silver</option>
              <option>Gold</option>
            </select>

            <button onClick={handleSubmit} className="btn-coffee">
              Submit
            </button>
          </div>
        )}

        {/* SEARCH */}
        <div className="flex gap-4">
          <input placeholder="Search..." className="input-coffee"
            onChange={(e) => setSearch(e.target.value)} />
          <select className="input-coffee"
            onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option>Gold</option>
            <option>Silver</option>
            <option>Bronze</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="card-coffee overflow-hidden">
          <table className="w-full">
            <thead className="bg-soft text-sub text-sm uppercase">
              <tr>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4">Loyalty</th>
                <th className="p-4 text-right">Orders</th>
                <th className="p-4 text-right">Spent</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c) => (
                <tr key={c.customerId} className="border-t">
                  <td className="p-4">{c.customerName}</td>
                  <td className="p-4">{c.loyalty}</td>
                  <td className="p-4 text-right">{c.totalOrders}</td>
                  <td className="p-4 text-right text-primary">
                    Rp {c.totalSpent.toLocaleString("id-ID")}
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
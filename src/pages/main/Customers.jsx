import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { customersAPI } from "../../services/customersAPI";

import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import SearchBar from "../../components/SearchBar";
import FilterSelect from "../../components/FilterSelect";
import Table from "../../components/Table";

import {
  Plus,
  Eye,
  Crown,
} from "lucide-react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    loyalty: "Bronze",
  });

  const searchRef = useRef(null);

  useEffect(() => {
    document.title = "Customers Management";
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await customersAPI.fetchData();
      setCustomers(data);
    } catch (err) {
      console.error("Gagal memuat data customers:", err);
    } finally {
      setLoading(false);
    }
  };

  // FILTER DATA
  const filtered = customers.filter(
    (c) =>
      c.customerName
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (filter === "" || c.loyalty === filter)
  );

  // SUBMIT NEW CUSTOMER
  const handleSubmit = async () => {
    const newCustomer = {
      customerId: "CUST-" + Date.now(),
      ...form,
      totalOrders: 0,
      totalSpent: 0,
      memberStatus: "Active",
    };

    try {
      const created = await customersAPI.createData(newCustomer);
      setCustomers([created, ...customers]);
    } catch (err) {
      console.error("Gagal menambah customer:", err);
    }

    setForm({
      customerName: "",
      email: "",
      phone: "",
      loyalty: "Bronze",
    });

    setShowForm(false);
  };

  const tableHeaders = ["Customer Info", "Phone", "Total Orders", "Total Spent", "Loyalty Status", "Actions"];

  if (loading) {
    return (
      <div className="flex-1 min-h-screen bg-[#F8F4EE] flex items-center justify-center">
        <p className="text-gray-400 text-sm animate-pulse">Memuat data customers...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-[#F8F4EE]">
      <div className="p-6 space-y-6">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <PageHeader
            title="Customers Management"
            breadcrumb="Manage coffee shop customers"
          />

          <Button
            variant="primary"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="size-4" />
            Add Customer
          </Button>
        </div>

        {/* FORM */}
        {showForm && (
          <Card>
            <h2 className="text-[20px] font-semibold text-[#5B2E0F] mb-5">
              Add New Customer
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Customer Name"
                value={form.customerName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    customerName: e.target.value,
                  })
                }
              />

              <Input
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />

              <Input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />

              <FilterSelect
                options={["Bronze", "Silver", "Gold"]}
                value={form.loyalty}
                onChange={(e) =>
                  setForm({
                    ...form,
                    loyalty: e.target.value,
                  })
                }
              />
            </div>

            <Button
              variant="primary"
              className="mt-5"
              onClick={handleSubmit}
            >
              Save Customer
            </Button>
          </Card>
        )}

        {/* FILTER BAR */}
        <div className="flex gap-4">
          <SearchBar
            placeholder="Search customer..."
            className="w-full max-w-sm"
            onChange={(e) => setSearch(e.target.value)}
          />

          <FilterSelect
            options={[
              "All Loyalty",
              "Gold",
              "Silver",
              "Bronze",
            ]}
            className="w-[220px]"
            onChange={(e) =>
              setFilter(
                e.target.value === "All Loyalty"
                  ? ""
                  : e.target.value
              )
            }
          />
        </div>

        {/* TABLE VIEW CONTAINER */}
        <Card className="p-2 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">
              No customers found.
            </div>
          ) : (
            <Table headers={tableHeaders}>
              {filtered.map((c) => (
                <tr
                  key={c.customerId}
                  className="border-b border-[#F1DFC8]/40 hover:bg-[#FDFBF7] transition-colors"
                >
                  {/* Kolom Informasi Utama (Nama & Email) */}
                  <td className="py-4 text-sm">
                    <div className="font-semibold text-[#5B2E0F]">
                      {c.customerName}
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">
                      {c.email}
                    </div>
                  </td>

                  {/* Nomor Telepon */}
                  <td className="py-4 text-sm text-gray-600 font-mono">
                    {c.phone || "-"}
                  </td>

                  {/* Total Transaksi / Orders */}
                  <td className="py-4 text-sm font-medium text-gray-700">
                    {c.totalOrders} orders
                  </td>

                  {/* Total Pengeluaran Uang */}
                  <td className="py-4 text-sm font-bold text-[#5B2E0F]">
                    Rp {c.totalSpent.toLocaleString("id-ID")}
                  </td>

                  {/* Tingkatan Loyalitas (Badge Status) */}
                  <td className="py-4 text-sm">
                    <Badge
                      color={
                        c.loyalty === "Gold"
                          ? "gold"
                          : c.loyalty === "Silver"
                          ? "silver"
                          : "bronze"
                      }
                    >
                      <div className="flex items-center gap-1">
                        <Crown className="size-3" />
                        <span>{c.loyalty}</span>
                      </div>
                    </Badge>
                  </td>

                  {/* Tombol Tindakan */}
                  <td className="py-4 text-sm">
                    <Link to={`/admin/customers/${c.customerId}`}>
                      <button
                        type="button"
                        className="px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg text-xs font-semibold transition-all duration-200 border border-amber-200/60 flex items-center gap-1.5 shadow-sm"
                        title="View Customer Details"
                      >
                        <Eye className="size-3.5" />
                        <span>Details</span>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </Card>

      </div>
    </div>
  );
}

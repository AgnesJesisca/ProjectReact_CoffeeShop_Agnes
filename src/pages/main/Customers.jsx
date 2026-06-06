import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import customersData from "../../data/customers.json";

import PageHeader from "../../components/PageHeader";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import SearchBar from "../../components/SearchBar";
import FilterSelect from "../../components/FilterSelect";


import {
  Plus,
  Eye,
  Crown,
  UserRound,
} from "lucide-react";

export default function Customers() {

  const [customers, setCustomers] =
    useState(customersData);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [form, setForm] =
    useState({
      customerName: "",
      email: "",
      phone: "",
      loyalty: "Bronze",
    });

    const searchRef = useRef(null);

    useEffect(() => {
      document.title =
        "Customers Management";
    }, []);

    useEffect(() => {
      console.log(searchRef.current);
    }, []);

  // FILTER
  const filtered = customers.filter(
    (c) =>
      c.customerName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) &&
      (filter === "" ||
        c.loyalty === filter)
  );

  // SUBMIT
  const handleSubmit = () => {

    const newCustomer = {

      customerId:
        "CUST-" + Date.now(),

      ...form,

      totalOrders: 0,

      totalSpent: 0,
    };

    setCustomers([
      newCustomer,
      ...customers,
    ]);

    setForm({
      customerName: "",
      email: "",
      phone: "",
      loyalty: "Bronze",
    });

    setShowForm(false);
  };

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
            onClick={() =>
              setShowForm(!showForm)
            }
          >
            <Plus className="size-4" />
            Add Customer
          </Button>

        </div>

        {/* FORM */}
        {showForm && (

          <Card>

            <h2
              className="
              text-[20px]
              font-semibold
              text-[#5B2E0F]
              mb-5
              "
            >
              Add New Customer
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <Input
                placeholder="Customer Name"
                value={form.customerName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    customerName:
                      e.target.value,
                  })
                }
              />

              <Input
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email:
                      e.target.value,
                  })
                }
              />

              <Input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone:
                      e.target.value,
                  })
                }
              />

              <FilterSelect
                options={[
                  "Bronze",
                  "Silver",
                  "Gold",
                ]}
                value={form.loyalty}
                onChange={(e) =>
                  setForm({
                    ...form,
                    loyalty:
                      e.target.value,
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

        {/* FILTER */}
        <div className="flex gap-4">

          <SearchBar
            placeholder="Search customer..."
            className="w-full max-w-sm"
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
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
                e.target.value ===
                  "All Loyalty"
                  ? ""
                  : e.target.value
              )
            }
          />

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {filtered.map((c) => (

            <Card
              key={c.customerId}
              className="
              hover:-translate-y-1
              hover:shadow-lg
              transition-all duration-300
              "
            >

              {/* TOP */}
              <div className="flex items-start justify-between">

                <div className="flex items-center gap-4">

                  <div
                    className="
                    w-14 h-14
                    rounded-2xl
                    bg-[#FFF7ED]
                    flex items-center justify-center
                    "
                  >

                    <UserRound className="text-[#D97706] size-6" />

                  </div>

                  <div>

                    <h2
                      className="
                      text-[20px]
                      font-semibold
                      text-[#5B2E0F]
                      "
                    >
                      {c.customerName}
                    </h2>

                    <p
                      className="
                      text-sm
                      text-[#A16207]
                      mt-1
                      "
                    >
                      {c.email}
                    </p>

                  </div>

                </div>

                {/* BADGE */}
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

                    {c.loyalty}

                  </div>

                </Badge>

              </div>

              {/* INFO */}
              <div className="space-y-4 mt-7">

                <InfoBox
                  label="Phone"
                  value={c.phone}
                />

                <InfoBox
                  label="Total Orders"
                  value={c.totalOrders}
                />

                <InfoBox
                  label="Total Spent"
                  value={`Rp ${c.totalSpent.toLocaleString("id-ID")}`}
                />

              </div>

              {/* ACTION */}
              <Link
                to={`/customers/${c.customerId}`}
              >

                <Button
                  variant="outline"
                  className="w-full mt-6"
                >

                  <Eye className="size-4" />

                  View Details

                </Button>

              </Link>

            </Card>

          ))}

        </div>

      </div>


    </div>
  );
}

function InfoBox({
  label,
  value,
}) {

  return (

    <Card
      className="
      bg-[#FFF7ED]
      border-[#F4E1C8]
      p-4
      shadow-none
      "
    >

      <p
        className="
        text-[#A16207]
        text-sm
        "
      >
        {label}
      </p>

      <h3
        className="
        text-[#5B2E0F]
        font-semibold
        mt-1
        "
      >
        {value}
      </h3>

    </Card>

  );
}
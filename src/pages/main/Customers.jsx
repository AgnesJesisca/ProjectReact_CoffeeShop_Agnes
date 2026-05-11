import { useState } from "react";
import { Link } from "react-router-dom";

import customersData from "../../data/customers.json";

import PageHeader from "../../components/PageHeader";

import {
  Plus,
  Search,
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

          <button
            onClick={() =>
              setShowForm(!showForm)
            }
            className="
            flex items-center gap-2
            bg-gradient-to-r
            from-[#D97706]
            to-[#F59E0B]
            hover:opacity-90
            text-white
            px-5 py-3
            rounded-2xl
            shadow-md
            text-sm font-medium
            transition-all
            "
          >
            <Plus className="size-4" />
            Add Customer
          </button>

        </div>

        {/* FORM */}
        {showForm && (

          <div
            className="
            bg-white
            rounded-[28px]
            border border-[#F1DFC8]
            shadow-sm
            p-6
            "
          >

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

              <input
                className="input-coffee"
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

              <input
                className="input-coffee"
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

              <input
                className="input-coffee"
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

              <select
                className="input-coffee"
                value={form.loyalty}
                onChange={(e) =>
                  setForm({
                    ...form,
                    loyalty:
                      e.target.value,
                  })
                }
              >
                <option>
                  Bronze
                </option>

                <option>
                  Silver
                </option>

                <option>
                  Gold
                </option>

              </select>

            </div>

            <button
              onClick={handleSubmit}
              className="
              mt-5
              bg-[#8B4513]
              hover:bg-[#6F3410]
              text-white
              px-5 py-3
              rounded-xl
              text-sm
              font-medium
              transition-all
              "
            >
              Save Customer
            </button>

          </div>
        )}

        {/* FILTER */}
        <div className="flex gap-4">

          <div className="relative w-full max-w-sm">

            <Search
              className="
              absolute
              left-4 top-1/2
              -translate-y-1/2
              text-[#A16207]
              size-4
              "
            />

            <input
              placeholder="Search customer..."
              className="
              input-coffee
              pl-11
              "
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          <select
            className="
            input-coffee
            w-[220px]
            "
            onChange={(e) =>
              setFilter(
                e.target.value
              )
            }
          >

            <option value="">
              All Loyalty
            </option>

            <option>
              Gold
            </option>

            <option>
              Silver
            </option>

            <option>
              Bronze
            </option>

          </select>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {filtered.map((c) => (

            <div
              key={c.customerId}
              className="
              bg-white
              rounded-[28px]
              border border-[#F1DFC8]
              shadow-sm
              p-6
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
                <span
                  className={`
                  px-3 py-1
                  rounded-full
                  text-xs
                  font-medium
                  flex items-center gap-1

                  ${
                    c.loyalty ===
                    "Gold"
                      ? "bg-yellow-100 text-yellow-700"
                      : ""
                  }

                  ${
                    c.loyalty ===
                    "Silver"
                      ? "bg-gray-200 text-gray-700"
                      : ""
                  }

                  ${
                    c.loyalty ===
                    "Bronze"
                      ? "bg-orange-100 text-orange-700"
                      : ""
                  }
                `}
                >

                  <Crown className="size-3" />

                  {c.loyalty}

                </span>

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
                className="
                mt-6
                flex items-center justify-center gap-2
                border border-[#EADBC8]
                hover:bg-[#FFF7ED]
                py-3
                rounded-2xl
                text-[#6B4F3A]
                text-sm
                font-medium
                transition-all
                "
              >

                <Eye className="size-4" />

                View Details

              </Link>

            </div>

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
    <div
      className="
      bg-[#FFF7ED]
      border border-[#F4E1C8]
      rounded-2xl
      p-4
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

    </div>
  );
}
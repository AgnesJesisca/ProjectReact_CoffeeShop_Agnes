import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import PageHeader from "../../components/PageHeader";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Badge from "../../components/Badge";
import Card from "../../components/Card";
import DashboardCard from "../../components/DashboardCard";
import MenuCard from "../../components/MenuCard";
import InventoryCard from "../../components/InventoryCard";
import CustomerCard from "../../components/CustomerCard";
import OrderCard from "../../components/OrderCard";
import ActivityTable from "../../components/ActivityTable";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import AuthCard from "../../components/AuthCard";
import AuthInput from "../../components/AuthInput";
import ChartCard from "../../components/ChartCard";
import FilterSelect from "../../components/FilterSelect";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";

import {
  DollarSign,
  ShoppingBag,
  Coffee,
  Users,
  Trash2,
  CreditCard,
  QrCode,
  Banknote,
} from "lucide-react";

export default function ComponentsPreview() {

  const menu = {
    name: "Caramel Latte",
    category: "Coffee",
    price: 32000,
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
  };

  const inventory = {
    name: "Arabica Beans",
    stock: 15,
    category: "Beans",
  };

  const customer = {
    name: "Andi Saputra",
    email: "andi@example.com",
    member: "Gold",
  };

  const order = {
    customer: "Budi",
    total: 54000,
    payment: "QRIS",
  };

  const activity = [
    {
      action: "New Order",
      name: "Caramel Latte",
      amount: "Rp 32.000",
      status: "Completed",
    },
    {
      action: "Restock",
      name: "Arabica Beans",
      amount: "15 pcs",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F4EE]">

      <Header />

      <div className="p-6 space-y-8">

        <PageHeader
          title="Components Preview"
          breadcrumb="Preview all reusable components"
        />

        {/* BUTTONS */}
        <Card>

          <h2 className="text-[22px] font-semibold text-[#5B2E0F] mb-5">
            Buttons
          </h2>

          <div className="flex flex-wrap gap-4">

            <Button>
              Primary
            </Button>

            <Button variant="secondary">
              Secondary
            </Button>

            <Button variant="outline">
              Outline
            </Button>

            <Button variant="ghost">
              Ghost
            </Button>

            <Button variant="danger">
              <Trash2 className="size-4" />
              Delete
            </Button>

            <Button variant="debit">
              <CreditCard className="size-4" />
              Debit
            </Button>

            <Button variant="qris">
              <QrCode className="size-4" />
              QRIS
            </Button>

            <Button variant="cash">
              <Banknote className="size-4" />
              Cash
            </Button>

          </div>

        </Card>

        {/* INPUT */}
        <Card>

          <h2 className="text-[22px] font-semibold text-[#5B2E0F] mb-5">
            Inputs
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <Input placeholder="Input component..." />

            <SearchBar placeholder="Search component..." />

            <FilterSelect
              options={[
                "Coffee",
                "Non-Coffee",
                "Snack",
              ]}
            />

            <AuthInput
              label="Email"
              placeholder="you@example.com"
            />

          </div>

        </Card>

        {/* BADGES */}
        <Card>

          <h2 className="text-[22px] font-semibold text-[#5B2E0F] mb-5">
            Badges
          </h2>

          <div className="flex flex-wrap gap-4">

            <Badge color="green">
              Completed
            </Badge>

            <Badge color="yellow">
              Pending
            </Badge>

            <Badge color="red">
              Cancelled
            </Badge>

            <Badge color="blue">
              Processing
            </Badge>

            <Badge color="gold">
              Gold Member
            </Badge>

            <Badge color="silver">
              Silver Member
            </Badge>

            <Badge color="bronze">
              Bronze Member
            </Badge>

          </div>

        </Card>

        {/* DASHBOARD CARDS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

          <DashboardCard
            title="Revenue"
            value="Rp 12.500.000"
            icon={<DollarSign className="size-6" />}
          />

          <DashboardCard
            title="Orders"
            value="120 Orders"
            icon={<ShoppingBag className="size-6" />}
          />

          <DashboardCard
            title="Menu"
            value="48 Products"
            icon={<Coffee className="size-6" />}
          />

          <DashboardCard
            title="Customers"
            value="320 Users"
            icon={<Users className="size-6" />}
          />

        </div>

        {/* CARD COMPONENTS */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-5">

          <MenuCard menu={menu} />

          <InventoryCard item={inventory} />

          <CustomerCard customer={customer} />

          <OrderCard order={order} />

        </div>

        {/* TABLE */}
        <Card className="overflow-hidden p-0">

          <div className="p-6 border-b border-[#F5E7D4]">

            <h2 className="text-[22px] font-semibold text-[#5B2E0F]">
              Table Component
            </h2>

          </div>

          <div className="overflow-x-auto">

            <Table
              headers={[
                "Customer",
                "Payment",
                "Status",
                "Total",
              ]}
            >

              <tr className="border-t border-[#F5E7D4]">

                <td className="p-5">
                  Andi Saputra
                </td>

                <td className="p-5">
                  QRIS
                </td>

                <td className="p-5">

                  <Badge color="green">
                    Completed
                  </Badge>

                </td>

                <td className="p-5 font-semibold">
                  Rp 54.000
                </td>

              </tr>

              <tr className="border-t border-[#F5E7D4]">

                <td className="p-5">
                  Budi Santoso
                </td>

                <td className="p-5">
                  Cash
                </td>

                <td className="p-5">

                  <Badge color="yellow">
                    Pending
                  </Badge>

                </td>

                <td className="p-5 font-semibold">
                  Rp 32.000
                </td>

              </tr>

            </Table>

          </div>

        </Card>

        {/* ACTIVITY TABLE */}
        <Card>

          <h2 className="text-[22px] font-semibold text-[#5B2E0F] mb-5">
            Activity Table
          </h2>

          <ActivityTable data={activity} />

        </Card>

        {/* CHART */}
        <ChartCard />

        {/* AUTH CARD */}
        <div className="max-w-[450px]">

          <AuthCard>

            <h2 className="text-[24px] font-semibold text-[#5B2E0F] mb-5">
              Auth Card
            </h2>

            <div className="space-y-4">

              <AuthInput
                label="Email"
                placeholder="you@example.com"
              />

              <AuthInput
                label="Password"
                type="password"
                placeholder="********"
              />

              <Button className="w-full">
                Login
              </Button>

            </div>

          </AuthCard>

        </div>

        {/* LOADING */}
        <Card>

          <h2 className="text-[22px] font-semibold text-[#5B2E0F] mb-5">
            Loading Component
          </h2>

          <Loading />

        </Card>

        {/* MODAL */}
        <Card>

          <h2 className="text-[22px] font-semibold text-[#5B2E0F] mb-5">
            Modal Preview
          </h2>

          <Modal />

        </Card>

      </div>

      <Footer />

    </div>
  );
}
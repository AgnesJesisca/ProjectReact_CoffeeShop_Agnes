import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { ordersAPI } from "../../services/ordersAPI";

import PageHeader from "../../components/PageHeader";
import ErrorPage from "./ErrorPage";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Table from "../../components/Table";

export default function OrderDetail() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const data = await ordersAPI.fetchById(id);
      if (!data) {
        setNotFound(true);
        return;
      }
      setOrder(data);
    } catch (err) {
      console.error("Gagal memuat detail order:", err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 min-h-screen bg-[#F8F4EE] flex items-center justify-center">
        <p className="text-gray-400 text-sm animate-pulse">Memuat detail order...</p>
      </div>
    );
  }

  if (notFound || !order) {
    return <ErrorPage code="404" message="Order Not Found" />;
  }

  const total =
    order.total ??
    order.items.reduce((a, b) => a + b.qty * b.price, 0);

  return (
    <div className="flex-1 min-h-screen bg-[#F8F4EE]">
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <PageHeader
          title="Order Detail"
          breadcrumb={`Dashboard / Orders / ${order.orderId}`}
        >
          <Link to="/admin/orders">
            <Button variant="secondary">Back</Button>
          </Link>
        </PageHeader>

        {/* TOP INFO */}
        <div className="grid md:grid-cols-3 gap-5">

          {/* CUSTOMER */}
          <Card>
            <p className="text-sm text-[#A16207] mb-2">Customer</p>
            <h2 className="text-[24px] font-semibold text-[#5B2E0F]">
              {order.customer}
            </h2>
            <p className="mt-2 text-[#6B4F3A]">{order.customerPhone}</p>
          </Card>

          {/* PAYMENT */}
          <Card>
            <p className="text-sm text-[#A16207] mb-2">Payment</p>
            <h2 className="text-[24px] font-semibold text-[#5B2E0F]">
              {order.paymentMethod}
            </h2>
            <p className="mt-2 text-[#6B4F3A]">{order.orderType}</p>
          </Card>

          {/* STATUS */}
          <Card>
            <p className="text-sm text-[#A16207] mb-2">Status</p>
            <Badge color={order.status === "Completed" ? "green" : "yellow"}>
              {order.status}
            </Badge>
            <p className="mt-3 text-[#6B4F3A]">{order.date}</p>
          </Card>

        </div>

        {/* ITEMS */}
        <Card>
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-[24px] font-semibold text-[#5B2E0F]">
                Order Items
              </h2>
              <p className="text-[#A16207] text-sm mt-1">Detail customer order</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#A16207]">Total Payment</p>
              <h2 className="text-[28px] font-bold text-[#5B2E0F]">
                Rp {total.toLocaleString("id-ID")}
              </h2>
            </div>
          </div>

          <Table headers={["Menu", "Qty", "Price", "Subtotal"]}>
            {order.items.map((item, index) => (
              <tr
                key={index}
                className="border-t border-[#F5E7D4] hover:bg-[#FFFBF6] transition-all"
              >
                <td className="p-5 font-medium text-[#5B2E0F]">{item.name}</td>
                <td className="p-5 text-center text-[#6B4F3A]">{item.qty}</td>
                <td className="p-5 text-right text-[#6B4F3A]">
                  Rp {item.price.toLocaleString("id-ID")}
                </td>
                <td className="p-5 text-right font-semibold text-[#5B2E0F]">
                  Rp {(item.qty * item.price).toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </Table>
        </Card>

        {/* EXTRA */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* BARISTA */}
          <Card>
            <p className="text-sm text-[#A16207] mb-2">Barista</p>
            <h2 className="text-[24px] font-semibold text-[#5B2E0F]">
              {order.barista}
            </h2>
          </Card>

          {/* NOTES */}
          <Card>
            <p className="text-sm text-[#A16207] mb-2">Order Notes</p>
            <p className="text-[#6B4F3A] leading-relaxed">
              {order.notes || "-"}
            </p>
          </Card>

        </div>

      </div>
    </div>
  );
}

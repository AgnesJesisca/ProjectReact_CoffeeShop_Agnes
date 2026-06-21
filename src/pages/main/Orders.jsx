import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  QrCode,
  Ticket,
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

  // STATE VOUCHER
  const [voucherCode, setVoucherCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState("");

  // VALIDASI VOUCHER
  const handleApplyVoucher = () => {
    const code = voucherCode.trim().toUpperCase();
    if (!code) return;

    if (code === "ELCOFFEEHOORAY") {
      setDiscountAmount(15000);
      setAppliedVoucher(code);
      alert("Voucher ELCOFFEEHOORAY Berhasil! Potongan Rp 15.000");
    } else if (code === "KOPIASIK") {
      setDiscountAmount(5000);
      setAppliedVoucher(code);
      alert("Voucher KOPIASIK Berhasil! Potongan Rp 5.000");
    } else {
      alert("Kode voucher tidak valid.");
      setDiscountAmount(0);
      setAppliedVoucher("");
    }
  };

  // FILTER MENU
  const filteredMenu = menuData.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(searchMenu.toLowerCase());
    const matchCategory = category === "All" ? true : m.category === category;
    return matchSearch && matchCategory;
  });

  // TAMBAH KE KERANJANG
  const addToCart = (item) => {
    const exist = cart.find((c) => c.name === item.name);
    if (exist) {
      setCart(
        cart.map((c) =>
          c.name === item.name ? { ...c, qty: c.qty + 1 } : c
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

  // ATUR QUANTITY
  const changeQty = (name, type) => {
    setCart(
      cart
        .map((c) => {
          if (c.name === name) {
            return {
              ...c,
              qty: type === "inc" ? c.qty + 1 : c.qty - 1,
            };
          }
          return c;
        })
        .filter((c) => c.qty > 0)
    );
  };

  // HAPUS ITEM
  const removeItem = (name) => {
    setCart(cart.filter((c) => c.name !== name));
  };

  // HITUNG TOTALS
  const subTotal = cart.reduce(
    (sum, item) => sum + Number(item.qty) * Number(item.price),
    0
  );
  const finalTotal = Math.max(0, subTotal - discountAmount);

  // SUBMIT TRANSAKSI
  const handleSubmit = (paymentMethod) => {
    if (cart.length === 0) {
      alert("Pilih menu terlebih dahulu!");
      return;
    }

    const customerName = customerType === "Member" ? selectedCustomer : guestName;
    if (!customerName) {
      alert("Nama pelanggan harus diisi!");
      return;
    }

    const newOrder = {
      orderId: "ORD-" + Date.now(),
      customer: customerName,
      customerPhone: "08123456789",
      items: cart.map((i) => ({
        name: i.name,
        qty: Number(i.qty),
        price: Number(i.price),
      })),
      paymentMethod,
      orderType,
      tableNumber: orderType === "Dine In" ? Math.floor(Math.random() * 20) + 1 : 0,
      barista: "Admin",
      status: "Completed",
      date: new Date().toISOString().slice(0, 10),
      notes,
      voucherApplied: appliedVoucher || null,
      discount: discountAmount,
      total: Number(finalTotal),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // RESET FORM
    setCart([]);
    setGuestName("");
    setNotes("");
    setVoucherCode("");
    setDiscountAmount(0);
    setAppliedVoucher("");
    setShowForm(false);

    alert("Pesanan berhasil diproses!");
  };

  const filteredOrders = orders.filter((o) =>
    o.customer.toLowerCase().includes(searchOrder.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen bg-[#F8F4EE] overflow-x-hidden">
      <div className="p-6 space-y-6">
        <PageHeader
          title="Orders Management"
          breadcrumb="Kelola kasir, pesanan masuk, dan diskon voucher"
        />

        <div className="flex justify-end">
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="size-5" />
            {showForm ? "Tutup Kasir" : "Buat Pesanan Baru"}
          </Button>
        </div>

        {showForm && (
          <Card className="space-y-6 bg-white border border-[#F5E7D4]">
            <div>
              <h2 className="text-[24px] font-semibold text-[#5B2E0F]">Input Pesanan Baru</h2>
              <p className="text-sm text-[#A16207] mt-1">Gunakan formulir ini untuk transaksi langsung</p>
            </div>

            {/* PELANGGAN */}
            <div className="grid md:grid-cols-2 gap-4">
              <FilterSelect
                value={customerType}
                options={["Member", "Guest"]}
                onChange={(e) => setCustomerType(e.target.value)}
              />
              {customerType === "Member" ? (
                <FilterSelect
                  value={selectedCustomer}
                  options={customers.map((c) => c.customerName)}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                />
              ) : (
                <Input
                  placeholder="Nama Tamu / Guest"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
              )}
            </div>

            {/* CARI MENU */}
            <div className="grid md:grid-cols-2 gap-4">
              <SearchBar
                placeholder="Cari item kopi atau makanan..."
                value={searchMenu}
                onChange={(e) => setSearchMenu(e.target.value)}
              />
              <FilterSelect
                value={category}
                options={["All", "Coffee", "Non-Coffee", "Snack"]}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            {/* GRID SELEKSI MENU */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredMenu.map((m) => (
                <Card
                  key={m.menuId}
                  className="cursor-pointer hover:bg-[#FFF7ED] transition-all p-4 border border-[#F5E7D4]"
                  onClick={() => addToCart(m)}
                >
                  <h3 className="font-semibold text-[#5B2E0F]">{m.name}</h3>
                  <p className="text-sm text-[#A16207] mt-1">{m.category}</p>
                  <p className="font-bold text-[#D97706] mt-3">
                    Rp {Number(m.price).toLocaleString("id-ID")}
                  </p>
                </Card>
              ))}
            </div>

            {/* KERANJANG BELANJA */}
            <div className="border-t border-[#F5E7D4] pt-6">
              <h3 className="text-[20px] font-semibold text-[#5B2E0F] mb-5">Daftar Keranjang</h3>
              {cart.length === 0 ? (
                <div className="text-center py-10 text-[#A16207]">Keranjang masih kosong</div>
              ) : (
                <div className="space-y-4">
                  {cart.map((c) => (
                    <div key={c.name} className="border border-[#F5E7D4] rounded-2xl p-4 bg-[#FFF7ED] flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-[#5B2E0F]">{c.name}</h3>
                        <p className="text-sm text-[#A16207] mt-1">
                          Rp {Number(c.price).toLocaleString("id-ID")} x {c.qty}
                        </p>
                        <p className="font-semibold text-[#D97706] mt-2">
                          Rp {(Number(c.price) * Number(c.qty)).toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" className="w-9 h-9 px-0 border-[#D46300] text-[#D46300]" onClick={() => changeQty(c.name, "dec")}>
                            <Minus className="size-4" />
                          </Button>
                          <span className="font-semibold min-w-[24px] text-center text-[#5B2E0F]">{c.qty}</span>
                          <Button variant="outline" className="w-9 h-9 px-0 border-[#D46300] text-[#D46300]" onClick={() => changeQty(c.name, "inc")}>
                            <Plus className="size-4" />
                          </Button>
                        </div>
                        <Button variant="danger" className="w-10 h-10 px-0 bg-red-500 text-white hover:bg-red-600" onClick={() => removeItem(c.name)}>
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* INPUT VOUCHER */}
            <div className="border-t border-[#F5E7D4] pt-6 space-y-3">
              <div className="flex items-center gap-2 text-[#5B2E0F] font-semibold">
                <Ticket className="size-5 text-[#D46300]" />
                <h3>Gunakan Voucher Diskon</h3>
              </div>
              <div className="flex gap-3 max-w-md">
                <Input
                  placeholder="Masukkan kode voucher (Contoh: KOPIASIK)"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                />
                <Button type="button" onClick={handleApplyVoucher}>Apply</Button>
              </div>
              {appliedVoucher && (
                <p className="text-sm text-green-600 font-medium">
                  ✓ Voucher <strong>{appliedVoucher}</strong> aktif (-Rp {discountAmount.toLocaleString("id-ID")})
                </p>
              )}
            </div>

            {/* CATATAN & JENIS PESANAN */}
            <div className="border-t border-[#F5E7D4] pt-6 grid md:grid-cols-2 gap-4">
              <FilterSelect
                value={orderType}
                options={["Dine In", "Take Away"]}
                onChange={(e) => setOrderType(e.target.value)}
              />
              <Input
                placeholder="Catatan pesanan (Contoh: Less sugar / Es banyakin)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* TOTAL HARGA & STRUKTUR BAYAR */}
            <div className="border-t border-[#F5E7D4] pt-6 space-y-2">
              {discountAmount > 0 && (
                <div className="flex justify-between text-sm font-medium text-[#A16207]">
                  <span>Subtotal Awal</span>
                  <span>Rp {subTotal.toLocaleString("id-ID")}</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="flex justify-between text-sm font-medium text-green-600">
                  <span>Diskon Potongan</span>
                  <span>- Rp {discountAmount.toLocaleString("id-ID")}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-[#6B4F3A] font-medium text-[16px]">Total Akhir</span>
                <h1 className="text-[34px] font-bold text-[#5B2E0F]">
                  Rp {Number(finalTotal).toLocaleString("id-ID")}
                </h1>
              </div>

              {/* ACTION BUTTON METODE PEMBAYARAN */}
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <Button variant="debit" onClick={() => handleSubmit("Debit")}>
                  <CreditCard className="size-5" /> Card
                </Button>
                <Button variant="qris" onClick={() => handleSubmit("QRIS")}>
                  <QrCode className="size-5" /> QRIS
                </Button>
                <Button variant="cash" onClick={() => handleSubmit("Cash")}>
                  <Banknote className="size-5" /> Cash
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* TABEL TRANSAKSI HISTORIS */}
        <Card className="overflow-hidden p-0 border border-[#F5E7D4]">
          <div className="p-6 border-b border-[#F5E7D4]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-[22px] font-semibold text-[#5B2E0F]">Daftar Riwayat Pesanan</h2>
                <p className="text-sm text-[#A16207] mt-1">Transaksi terperinci kasir</p>
              </div>
              <SearchBar
                placeholder="Cari nama pelanggan..."
                className="w-full md:w-[260px]"
                value={searchOrder}
                onChange={(e) => setSearchOrder(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table headers={["Pelanggan", "Item Menu", "Metode", "Status", "Total", "Aksi"]}>
              {filteredOrders.map((o) => (
                <tr key={o.orderId} className="border-t border-[#F5E7D4] hover:bg-[#FFFBF6] transition-all">
                  <td className="p-5">
                    <p className="font-semibold text-[#5B2E0F]">{o.customer}</p>
                    <p className="text-sm text-[#A16207] mt-1">{o.date}</p>
                  </td>
                  <td className="p-5 text-sm text-[#6B4F3A]">
                    {o.items.map((i) => `${i.name} x${i.qty}`).join(", ")}
                  </td>
                  <td className="p-5 text-center text-[#5B2E0F] font-medium">{o.paymentMethod}</td>
                  <td className="p-5 text-center"><Badge color="green">{o.status}</Badge></td>
                  <td className="p-5 text-right font-semibold text-[#5B2E0F]">
                    Rp {Number(o.total).toLocaleString("id-ID")}
                  </td>
                  <td className="p-5 text-center">
                    <Link to={`/orders/${o.orderId}`}>
                      <Button variant="outline" className="h-[40px] border-[#D46300] text-[#D46300] hover:bg-[#FFF7ED]">
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
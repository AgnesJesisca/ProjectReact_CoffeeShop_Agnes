import { useState, useEffect, useRef } from "react";

import data from "../../data/inventory.json";

import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import SearchBar from "../../components/SearchBar";
import Modal from "../../components/Modal";
import Table from "../../components/Table"; // Pastikan import komponen Table kustom sudah benar

import {
  Plus,
  AlertTriangle,
  PackagePlus,
  PackageMinus,
} from "lucide-react";

export default function Inventory() {
  const [items, setItems] = useState(data);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    stock: 0,
    unit: "",
  });

  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(0);

  const searchRef = useRef(null);

  useEffect(() => {
    document.title = "Inventory Management";
  }, []);

  useEffect(() => {
    console.log(searchRef.current);
  }, []);

  useEffect(() => {
    console.log(`Jumlah item inventory: ${items.length}`);
  }, [items]);

  // FILTER DATA
  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const lowStockItems = items.filter((i) => i.stock < 5);

  // ADD ITEM
  const handleAddItem = () => {
    setItems([
      ...items,
      {
        ...newItem,
        itemId: Date.now(),
        status: newItem.stock < 5 ? "Low" : "Normal",
      },
    ]);

    setShowForm(false);

    setNewItem({
      name: "",
      category: "",
      stock: 0,
      unit: "",
    });
  };

  // UPDATE STOCK
  const handleUpdateStock = () => {
    setItems(
      items.map((item) => {
        if (item.itemId === selected.itemId) {
          const newStock =
            selected.type === "add"
              ? item.stock + qty
              : item.stock - qty;

          return {
            ...item,
            stock: newStock < 0 ? 0 : newStock,
            status: newStock < 5 ? "Low" : "Normal",
          };
        }
        return item;
      })
    );

    setSelected(null);
    setQty(0);
  };

  // Judul kolom untuk tabel inventory
  const tableHeaders = ["Item Name", "Category", "Current Stock", "Status", "Actions"];

  return (
    <div className="flex-1 min-h-screen bg-[#F8F4EE]">
      <div className="p-6 space-y-6">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <PageHeader
            title="Inventory Management"
            breadcrumb="Track and manage your stock levels"
          />

          <Button
            variant="primary"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="size-4" />
            Add Item
          </Button>
        </div>

        {/* ADD FORM */}
        {showForm && (
          <Card className="space-y-4">
            <h2 className="text-[18px] font-semibold text-[#5B2E0F]">
              Add Inventory Item
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Item Name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    name: e.target.value,
                  })
                }
              />

              <Input
                placeholder="Category"
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    category: e.target.value,
                  })
                }
              />

              <Input
                type="number"
                placeholder="Stock"
                value={newItem.stock || ""}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    stock: Number(e.target.value),
                  })
                }
              />

              <Input
                placeholder="Unit (e.g., Kg, Pcs, Pack)"
                value={newItem.unit}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    unit: e.target.value,
                  })
                }
              />
            </div>

            <Button variant="primary" onClick={handleAddItem}>
              Submit
            </Button>
          </Card>
        )}

        {/* LOW STOCK ALERT */}
        {lowStockItems.length > 0 && (
          <Card className="bg-[#FFF7ED] border-[#FED7AA]">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-orange-500 size-5" />
              <div>
                <h2 className="text-[18px] font-semibold text-[#7C2D12]">
                  Low Stock Alert
                </h2>
                <p className="text-[13px] text-[#C2410C] mt-0.5">
                  {lowStockItems.length} item(s) need attention (Stock &lt; 5)
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* SEARCH BAR */}
        <SearchBar
          ref={searchRef}
          placeholder="Search inventory..."
          className="w-full max-w-sm"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE CONTAINER */}
        <Card className="p-2 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">
              No inventory items found.
            </div>
          ) : (
            <Table headers={tableHeaders}>
              {filtered.map((i) => (
                <tr
                  key={i.itemId}
                  className="border-b border-[#F1DFC8]/40 hover:bg-[#FDFBF7] transition-colors"
                >
                  {/* Nama Item */}
                  <td className="py-4 text-sm font-semibold text-[#5B2E0F]">
                    {i.name}
                  </td>

                  {/* Kategori */}
                  <td className="py-4 text-sm text-[#A16207]">
                    {i.category}
                  </td>

                  {/* Jumlah Stok + Unit */}
                  <td className="py-4 text-sm font-mono font-bold text-gray-800">
                    {i.stock} <span className="text-xs font-sans text-gray-400 font-normal ml-0.5">{i.unit}</span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 text-sm">
                    <Badge color={i.status === "Low" ? "red" : "green"}>
                      {i.status}
                    </Badge>
                  </td>

                  {/* Tombol Aksi (+ Stok / Pakai Stok) */}
                  <td className="py-4 text-sm">
                    <div className="flex items-center gap-2">
                      {/* Tombol Tambah Stok */}
                      <button
                        type="button"
                        onClick={() =>
                          setSelected({
                            ...i,
                            type: "add",
                          })
                        }
                        className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-semibold transition-all duration-200 border border-emerald-200/60 flex items-center gap-1 shadow-sm"
                        title="Restock Item"
                      >
                        <PackagePlus className="size-3.5" />
                        <span>Add</span>
                      </button>

                      {/* Tombol Pakai Stok */}
                      <button
                        type="button"
                        onClick={() =>
                          setSelected({
                            ...i,
                            type: "use",
                          })
                        }
                        className="px-2.5 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg text-xs font-semibold transition-all duration-200 border border-amber-200/60 flex items-center gap-1 shadow-sm"
                        title="Use Stock"
                      >
                        <MutableIcon type={i.status} />
                        <PackageMinus className="size-3.5" />
                        <span>Use</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </Card>

        {/* MODAL ADJUSTMENT */}
        {selected && (
          <Modal open={true}>
            <div className="space-y-5">
              <div>
                <h2 className="text-[20px] font-semibold text-[#5B2E0F]">
                  {selected.type === "add" ? "Add Stock" : "Use Stock"}
                </h2>
                <p className="text-[14px] text-[#A16207] mt-1">
                  {selected.name} (Current: {selected.stock} {selected.unit})
                </p>
              </div>

              <Input
                type="number"
                placeholder="Quantity"
                onChange={(e) => setQty(Number(e.target.value))}
              />

              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setSelected(null)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleUpdateStock}>
                  Submit
                </Button>
              </div>
            </div>
          </Modal>
        )}

      </div>
    </div>
  );
}

// Helper kosong mencegah crash if data kosong
function MutableIcon({ type }) {
  return null;
}
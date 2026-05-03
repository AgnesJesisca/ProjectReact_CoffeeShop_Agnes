import { useState } from "react";
import data from "../../data/inventory.json";
import PageHeader from "../../components/PageHeader";

export default function Inventory() {
  const [items, setItems] = useState(data);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    stock: 0,
    unit: ""
  });

  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(0);

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  // ADD ITEM
  const handleAddItem = () => {
    setItems([
      ...items,
      {
        ...newItem,
        itemId: Date.now(),
        status: "Normal"
      }
    ]);
    setShowForm(false);
    setNewItem({ name: "", category: "", stock: 0, unit: "" });
  };

  // UPDATE STOCK (RESTOCK / USE)
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
            status: newStock < 5 ? "Low" : "Normal"
          };
        }
        return item;
      })
    );

    setSelected(null);
    setQty(0);
  };

  return (
    <div className="flex-1 min-h-screen">
      <div className="p-5 space-y-5">

        {/* HEADER */}
        <PageHeader title="Inventory" breadcrumb="Dashboard / Inventory">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-coffee"
          >
            + Add Item
          </button>
        </PageHeader>

        {/* ADD FORM */}
        {showForm && (
          <div className="card-coffee space-y-3">
            <input
              className="input-coffee"
              placeholder="Item Name"
              onChange={(e) =>
                setNewItem({ ...newItem, name: e.target.value })
              }
            />

            <input
              className="input-coffee"
              placeholder="Category"
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
            />

            <input
              type="number"
              className="input-coffee"
              placeholder="Stock"
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  stock: Number(e.target.value)
                })
              }
            />

            <input
              className="input-coffee"
              placeholder="Unit (kg, pcs, ml)"
              onChange={(e) =>
                setNewItem({ ...newItem, unit: e.target.value })
              }
            />

            <button onClick={handleAddItem} className="btn-coffee">
              Submit
            </button>
          </div>
        )}

        {/* SEARCH */}
        <input
          placeholder="Search inventory..."
          className="input-coffee w-full max-w-sm"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* LIST */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {filtered.map((i) => (
            <div key={i.itemId} className="card-coffee">

              <h3 className="font-semibold">{i.name}</h3>
              <p className="text-sub text-sm">{i.category}</p>

              <p className="mt-2 font-semibold">
                {i.stock} {i.unit}
              </p>

              {/* STATUS */}
              <span
                className={`text-xs mt-2 inline-block px-2 py-1 rounded
                  ${
                    i.status === "Low"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }
                `}
              >
                {i.status}
              </span>

              {/* ACTION */}
              <div className="flex gap-2 mt-4">

                <button
                  onClick={() =>
                    setSelected({ ...i, type: "add" })
                  }
                  className="bg-green-100 text-green-700 px-3 py-1 rounded"
                >
                  + Add
                </button>

                <button
                  onClick={() =>
                    setSelected({ ...i, type: "use" })
                  }
                  className="bg-red-100 text-red-700 px-3 py-1 rounded"
                >
                  Use
                </button>

              </div>

            </div>
          ))}
        </div>

        {/* MODAL */}
        {selected && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

            <div className="bg-white p-6 rounded-xl w-80 space-y-4">

              <h2 className="font-semibold text-lg">
                {selected.type === "add"
                  ? "Add Stock"
                  : "Use Stock"}
              </h2>

              <p className="text-sm text-gray-500">
                {selected.name}
              </p>

              <input
                type="number"
                placeholder="Quantity"
                className="input-coffee"
                onChange={(e) =>
                  setQty(Number(e.target.value))
                }
              />

              <div className="flex justify-end gap-2">

                <button
                  onClick={() => setSelected(null)}
                  className="px-3 py-1"
                >
                  Cancel
                </button>

                <button
                  className="btn-coffee"
                  onClick={handleUpdateStock}
                >
                  Submit
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
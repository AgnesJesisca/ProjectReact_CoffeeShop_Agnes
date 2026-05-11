import { useState } from "react";

import data from "../../data/inventory.json";

import PageHeader from "../../components/PageHeader";

import {
  Plus,
  Package,
  AlertTriangle,
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

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(
      search.toLowerCase()
    )
  );

  // LOW STOCK
  const lowStockItems = items.filter(
    (i) => i.stock < 5
  );

  // ADD ITEM
  const handleAddItem = () => {

    setItems([
      ...items,

      {
        ...newItem,
        itemId: Date.now(),
        status:
          newItem.stock < 5
            ? "Low"
            : "Normal",
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

        if (
          item.itemId === selected.itemId
        ) {

          const newStock =
            selected.type === "add"
              ? item.stock + qty
              : item.stock - qty;

          return {
            ...item,

            stock:
              newStock < 0
                ? 0
                : newStock,

            status:
              newStock < 5
                ? "Low"
                : "Normal",
          };
        }

        return item;
      })
    );

    setSelected(null);

    setQty(0);
  };

  return (
    <div className="flex-1 min-h-screen bg-[#F8F4EE]">

      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <PageHeader
            title="Inventory Management"
            breadcrumb="Track and manage your stock levels"
          />

          <button
            onClick={() =>
              setShowForm(!showForm)
            }
            className="
            flex items-center gap-2
            bg-gradient-to-r
            from-[#8B4513]
            to-[#D97706]
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
            Add Item
          </button>

        </div>

        {/* ADD FORM */}
        {showForm && (

          <div
            className="
            bg-white
            rounded-[28px]
            border border-[#F1DFC8]
            shadow-sm
            p-6
            space-y-4
            "
          >

            <h2
              className="
              text-[18px]
              font-semibold
              text-[#5B2E0F]
              "
            >
              Add Inventory Item
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                className="input-coffee"
                placeholder="Item Name"
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    name: e.target.value,
                  })
                }
              />

              <input
                className="input-coffee"
                placeholder="Category"
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    category: e.target.value,
                  })
                }
              />

              <input
                type="number"
                className="input-coffee"
                placeholder="Stock"
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    stock: Number(
                      e.target.value
                    ),
                  })
                }
              />

              <input
                className="input-coffee"
                placeholder="Unit"
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    unit: e.target.value,
                  })
                }
              />

            </div>

            <button
              onClick={handleAddItem}
              className="
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
              Submit
            </button>

          </div>
        )}

        {/* LOW STOCK */}
        {lowStockItems.length > 0 && (

          <div
            className="
            bg-[#FFF7ED]
            border border-[#FED7AA]
            rounded-[28px]
            p-6
            "
          >

            <div className="flex items-center gap-3">

              <AlertTriangle className="text-orange-500 size-5" />

              <div>

                <h2
                  className="
                  text-[18px]
                  font-semibold
                  text-[#7C2D12]
                  "
                >
                  Low Stock Alert
                </h2>

                <p
                  className="
                  text-[13px]
                  text-[#C2410C]
                  mt-1
                  "
                >
                  {lowStockItems.length} item(s)
                  need attention
                </p>

              </div>

            </div>

          </div>
        )}

        {/* SEARCH */}
        <input
          placeholder="Search inventory..."
          className="input-coffee w-full max-w-sm"
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* INVENTORY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {filtered.map((i) => (

            <div
              key={i.itemId}
              className="
              bg-white
              rounded-[28px]
              border border-[#F1DFC8]
              shadow-sm
              p-6
              "
            >

              {/* TOP */}
              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className="
                    bg-[#FFF7ED]
                    p-3
                    rounded-2xl
                    "
                  >
                    <Package className="size-5 text-[#D97706]" />
                  </div>

                  <div>

                    <h3
                      className="
                      font-semibold
                      text-[#5B2E0F]
                      "
                    >
                      {i.name}
                    </h3>

                    <p
                      className="
                      text-[13px]
                      text-[#A16207]
                      mt-1
                      "
                    >
                      {i.category}
                    </p>

                  </div>

                </div>

                {/* STATUS */}
                <span
                  className={`
                  text-xs
                  px-3 py-1
                  rounded-full
                  font-medium

                  ${
                    i.status === "Low"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-700"
                  }
                `}
                >
                  {i.status}
                </span>

              </div>

              {/* STOCK */}
              <div className="mt-6">

                <h1
                  className="
                  text-[34px]
                  font-bold
                  text-[#5B2E0F]
                  leading-none
                  "
                >
                  {i.stock}

                  <span
                    className="
                    text-[16px]
                    text-[#A16207]
                    ml-2
                    "
                  >
                    {i.unit}
                  </span>

                </h1>

              </div>

              {/* ACTION */}
              <div className="flex gap-3 mt-6">

                <button
                  onClick={() =>
                    setSelected({
                      ...i,
                      type: "add",
                    })
                  }
                  className="
                  flex-1
                  bg-green-100
                  hover:bg-green-200
                  text-green-700
                  py-2.5
                  rounded-xl
                  text-sm
                  font-medium
                  transition-all
                  "
                >
                  + Add
                </button>

                <button
                  onClick={() =>
                    setSelected({
                      ...i,
                      type: "use",
                    })
                  }
                  className="
                  flex-1
                  bg-red-100
                  hover:bg-red-200
                  text-red-700
                  py-2.5
                  rounded-xl
                  text-sm
                  font-medium
                  transition-all
                  "
                >
                  Use
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* MODAL */}
        {selected && (

          <div
            className="
            fixed inset-0
            bg-black/30
            flex items-center justify-center
            z-50
            "
          >

            <div
              className="
              bg-white
              rounded-[28px]
              p-6
              w-[400px]
              shadow-xl
              "
            >

              <h2
                className="
                text-[20px]
                font-semibold
                text-[#5B2E0F]
                "
              >
                {selected.type === "add"
                  ? "Add Stock"
                  : "Use Stock"}
              </h2>

              <p
                className="
                text-[14px]
                text-[#A16207]
                mt-2
                "
              >
                {selected.name}
              </p>

              <input
                type="number"
                placeholder="Quantity"
                className="
                input-coffee
                mt-5
                "
                onChange={(e) =>
                  setQty(
                    Number(e.target.value)
                  )
                }
              />

              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() =>
                    setSelected(null)
                  }
                  className="
                  px-4 py-2
                  rounded-xl
                  text-sm
                  hover:bg-gray-100
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={
                    handleUpdateStock
                  }
                  className="
                  bg-[#8B4513]
                  hover:bg-[#6F3410]
                  text-white
                  px-5 py-2
                  rounded-xl
                  text-sm
                  font-medium
                  "
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
import { useState } from "react";

import data from "../../data/inventory.json";

import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import SearchBar from "../../components/SearchBar";
import Modal from "../../components/Modal";

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

          <Button
            variant="primary"
            onClick={() =>
              setShowForm(!showForm)
            }
          >
            <Plus className="size-4" />
            Add Item
          </Button>

        </div>

        {/* ADD FORM */}
        {showForm && (

          <Card className="space-y-4">

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

              <Input
                placeholder="Item Name"
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    name: e.target.value,
                  })
                }
              />

              <Input
                placeholder="Category"
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
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    stock: Number(
                      e.target.value
                    ),
                  })
                }
              />

              <Input
                placeholder="Unit"
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    unit: e.target.value,
                  })
                }
              />

            </div>

            <Button
              variant="primary"
              onClick={handleAddItem}
            >
              Submit
            </Button>

          </Card>
        )}

        {/* LOW STOCK */}
        {lowStockItems.length > 0 && (

          <Card className="bg-[#FFF7ED] border-[#FED7AA]">

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
                  {lowStockItems.length} item(s) need attention
                </p>

              </div>

            </div>

          </Card>
        )}

        {/* SEARCH */}
        <SearchBar
          placeholder="Search inventory..."
          className="w-full max-w-sm"
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {filtered.map((i) => (

            <Card key={i.itemId}>

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

                <Badge
                  color={
                    i.status === "Low"
                      ? "red"
                      : "green"
                  }
                >
                  {i.status}
                </Badge>

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

                <Button
                  variant="secondary"
                  className="flex-1 h-[45px]"
                  onClick={() =>
                    setSelected({
                      ...i,
                      type: "add",
                    })
                  }
                >
                  + Add
                </Button>

                <Button
                  variant="danger"
                  className="flex-1 h-[45px]"
                  onClick={() =>
                    setSelected({
                      ...i,
                      type: "use",
                    })
                  }
                >
                  Use
                </Button>

              </div>

            </Card>
          ))}

        </div>

        {/* MODAL */}
        {selected && (

          <Modal open={true}>

            <div className="space-y-5">

              <div>

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

              </div>

              <Input
                type="number"
                placeholder="Quantity"
                onChange={(e) =>
                  setQty(
                    Number(e.target.value)
                  )
                }
              />

              <div className="flex justify-end gap-3">

                <Button
                  variant="ghost"
                  onClick={() =>
                    setSelected(null)
                  }
                >
                  Cancel
                </Button>

                <Button
                  variant="primary"
                  onClick={
                    handleUpdateStock
                  }
                >
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
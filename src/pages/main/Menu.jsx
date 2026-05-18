import { useState } from "react";

import menuData from "../../data/menu.json";

import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import SearchBar from "../../components/SearchBar";
import FilterSelect from "../../components/FilterSelect";

import {
  Plus,
  Pencil,
  Trash2,
  Coffee,
} from "lucide-react";

export default function Menu() {

  const [menus, setMenus] = useState(menuData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [newMenu, setNewMenu] = useState({
    name: "",
    category: "",
    price: 0,
    image: "",
    stock: 0,
  });

  const filtered = menus.filter(
    (m) =>
      m.name
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (filter === "" ||
        m.category === filter)
  );

  // ADD MENU
  const addMenu = () => {

    if (editing) {

      setMenus(
        menus.map((m) =>
          m.menuId === editing.menuId
            ? {
                ...editing,
                ...newMenu,
              }
            : m
        )
      );

      setEditing(null);

    } else {

      setMenus([
        ...menus,
        {
          ...newMenu,
          menuId: Date.now(),
        },
      ]);
    }

    setShowForm(false);

    setNewMenu({
      name: "",
      category: "",
      price: 0,
      image: "",
      stock: 0,
    });
  };

  // DELETE
  const deleteMenu = (id) => {

    setMenus(
      menus.filter(
        (m) => m.menuId !== id
      )
    );
  };

  // EDIT
  const editMenu = (menu) => {

    setEditing(menu);

    setNewMenu({
      name: menu.name,
      category: menu.category,
      price: menu.price,
      image: menu.image,
      stock: menu.stock,
    });

    setShowForm(true);
  };

  const categories = [
    "Coffee",
    "Non-Coffee",
    "Snack",
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#F8F4EE]">

      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <PageHeader
            title="Menu Management"
            breadcrumb="Manage your coffee shop menu"
          />

          <Button
            variant="primary"
            onClick={() =>
              setShowForm(!showForm)
            }
          >
            <Plus className="size-4" />
            Add Menu
          </Button>

        </div>

        {/* FORM */}
        {showForm && (

          <Card className="space-y-4">

            <h2
              className="
              text-[18px]
              font-semibold
              text-[#5B2E0F]
              "
            >
              {editing
                ? "Edit Menu Item"
                : "Add New Menu"}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <Input
                placeholder="Menu Name"
                value={newMenu.name}
                onChange={(e) =>
                  setNewMenu({
                    ...newMenu,
                    name: e.target.value,
                  })
                }
              />

              <FilterSelect
                options={[
                  "Select Category",
                  "Coffee",
                  "Non-Coffee",
                  "Snack",
                ]}
                value={newMenu.category}
                onChange={(e) =>
                  setNewMenu({
                    ...newMenu,
                    category: e.target.value,
                  })
                }
              />

              <Input
                type="number"
                placeholder="Price"
                value={newMenu.price}
                onChange={(e) =>
                  setNewMenu({
                    ...newMenu,
                    price: Number(
                      e.target.value
                    ),
                  })
                }
              />

              <Input
                type="number"
                placeholder="Stock"
                value={newMenu.stock}
                onChange={(e) =>
                  setNewMenu({
                    ...newMenu,
                    stock: Number(
                      e.target.value
                    ),
                  })
                }
              />

              <Input
                className="md:col-span-2"
                placeholder="Image URL"
                value={newMenu.image}
                onChange={(e) =>
                  setNewMenu({
                    ...newMenu,
                    image: e.target.value,
                  })
                }
              />

            </div>

            <Button
              variant="primary"
              onClick={addMenu}
            >
              {editing
                ? "Update Menu"
                : "Submit"}
            </Button>

          </Card>
        )}

        {/* FILTER */}
        <div className="flex gap-4">

          <SearchBar
            placeholder="Search menu..."
            className="w-full max-w-sm"
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <FilterSelect
            options={[
              "All Categories",
              "Coffee",
              "Non-Coffee",
              "Snack",
            ]}
            className="w-[220px]"
            onChange={(e) =>
              setFilter(
                e.target.value ===
                  "All Categories"
                  ? ""
                  : e.target.value
              )
            }
          />

        </div>

        {/* CATEGORY */}
        {categories.map((category) => {

          const categoryItems =
            filtered.filter(
              (m) =>
                m.category === category
            );

          if (
            categoryItems.length === 0
          )
            return null;

          return (
            <div key={category}>

              <h2
                className="
                text-[22px]
                font-semibold
                text-[#5B2E0F]
                mb-5
                "
              >
                {category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                {categoryItems.map((m) => (

                  <Card
                    key={m.menuId}
                    className="
                    overflow-hidden
                    hover:-translate-y-1
                    hover:shadow-lg
                    transition-all duration-300
                    p-0
                    "
                  >

                    {/* IMAGE */}
                    <img
                      src={m.image}
                      className="
                      w-full
                      h-52
                      object-cover
                      "
                    />

                    <div className="p-6">

                      {/* TOP */}
                      <div className="flex items-start justify-between">

                        <div>

                          <div className="flex items-center gap-2">

                            <Coffee className="size-4 text-[#D97706]" />

                            <p
                              className="
                              text-[13px]
                              text-[#A16207]
                              "
                            >
                              {m.category}
                            </p>

                          </div>

                          <h3
                            className="
                            text-[20px]
                            font-semibold
                            text-[#5B2E0F]
                            mt-2
                            "
                          >
                            {m.name}
                          </h3>

                        </div>

                        <Badge
                          color={
                            m.stock < 5
                              ? "red"
                              : "green"
                          }
                        >
                          {m.stock < 5
                            ? "Low Stock"
                            : "Available"}
                        </Badge>

                      </div>

                      {/* PRICE */}
                      <div className="mt-5">

                        <h1
                          className="
                          text-[28px]
                          font-bold
                          text-[#5B2E0F]
                          "
                        >
                          Rp{" "}
                          {m.price.toLocaleString(
                            "id-ID"
                          )}
                        </h1>

                        <p
                          className="
                          text-[13px]
                          text-[#A16207]
                          mt-1
                          "
                        >
                          Stock: {m.stock}
                        </p>

                      </div>

                      {/* ACTION */}
                      <div className="flex gap-3 mt-6">

                        <Button
                          variant="outline"
                          className="flex-1 h-[45px]"
                          onClick={() =>
                            editMenu(m)
                          }
                        >
                          <Pencil className="size-4" />
                        </Button>

                        <Button
                          variant="danger"
                          className="flex-1 h-[45px] text-red-600 hover:bg-red-50"
                          onClick={() =>
                            deleteMenu(
                              m.menuId
                            )
                          }
                        >
                          <Trash2 className="size-4" />
                        </Button>

                      </div>

                    </div>

                  </Card>
                ))}

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}
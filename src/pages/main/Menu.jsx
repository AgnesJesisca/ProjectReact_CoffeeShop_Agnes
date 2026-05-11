import { useState } from "react";

import menuData from "../../data/menu.json";

import PageHeader from "../../components/PageHeader";

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

  // FILTER
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

  // GROUP CATEGORY
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
            Add Menu
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
              {editing
                ? "Edit Menu Item"
                : "Add New Menu"}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                className="input-coffee"
                placeholder="Menu Name"
                value={newMenu.name}
                onChange={(e) =>
                  setNewMenu({
                    ...newMenu,
                    name: e.target.value,
                  })
                }
              />

              <select
                className="input-coffee"
                value={newMenu.category}
                onChange={(e) =>
                  setNewMenu({
                    ...newMenu,
                    category:
                      e.target.value,
                  })
                }
              >
                <option value="">
                  Select Category
                </option>

                <option>
                  Coffee
                </option>

                <option>
                  Non-Coffee
                </option>

                <option>
                  Snack
                </option>

              </select>

              <input
                type="number"
                className="input-coffee"
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

              <input
                type="number"
                className="input-coffee"
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

              <input
                className="
                input-coffee
                md:col-span-2
                "
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

            <button
              onClick={addMenu}
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
              {editing
                ? "Update Menu"
                : "Submit"}
            </button>

          </div>
        )}

        {/* FILTER */}
        <div className="flex gap-4">

          <input
            className="
            input-coffee
            w-full max-w-sm
            "
            placeholder="Search menu..."
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            className="
            input-coffee
            w-[220px]
            "
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option value="">
              All Categories
            </option>

            <option>
              Coffee
            </option>

            <option>
              Non-Coffee
            </option>

            <option>
              Snack
            </option>

          </select>

        </div>

        {/* CATEGORY SECTION */}
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

                  <div
                    key={m.menuId}
                    className="
                    bg-white
                    rounded-[28px]
                    border border-[#F1DFC8]
                    shadow-sm
                    overflow-hidden
                    hover:-translate-y-1
                    hover:shadow-lg
                    transition-all duration-300
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

                        {/* STOCK */}
                        <span
                          className={`
                          text-xs
                          px-3 py-1
                          rounded-full
                          font-medium

                          ${
                            m.stock < 5
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-700"
                          }
                        `}
                        >
                          {m.stock < 5
                            ? "Low Stock"
                            : "Available"}
                        </span>

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

                        <button
                          onClick={() =>
                            editMenu(m)
                          }
                          className="
                          flex-1
                          border border-[#EADBC8]
                          hover:bg-[#FFF7ED]
                          py-2.5
                          rounded-xl
                          flex items-center justify-center
                          transition-all
                          "
                        >
                          <Pencil className="size-4 text-[#8B4513]" />
                        </button>

                        <button
                          onClick={() =>
                            deleteMenu(
                              m.menuId
                            )
                          }
                          className="
                          flex-1
                          border border-red-200
                          hover:bg-red-50
                          py-2.5
                          rounded-xl
                          flex items-center justify-center
                          transition-all
                          "
                        >
                          <Trash2 className="size-4 text-red-600" />
                        </button>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}
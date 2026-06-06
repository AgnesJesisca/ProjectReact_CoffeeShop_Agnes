import { useState, useEffect, useRef } from "react";
import menuData from "../../data/menu.json";

import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import SearchBar from "../../components/SearchBar";
import FilterSelect from "../../components/FilterSelect";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [activeTab, setActiveTab] = useState("all");

  const [newMenu, setNewMenu] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    stock: "",
  });

  const searchRef = useRef(null);

    useEffect(() => {
      document.title = "Menu Management";
    }, []);

    useEffect(() => {
      searchRef.current?.focus();
    }, []);

  const filtered = menus.filter(
    (m) =>
      m.name
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (filter === "" || m.category === filter) &&
      (activeTab === "all" || m.category === activeTab)
  );

  // ADD / UPDATE MENU
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
      price: "",
      image: "",
      stock: "",
    });
  }; 

  // DELETE MENU
  const deleteMenu = (id) => {
    setMenus(menus.filter((m) => m.menuId !== id));
  };

  // EDIT MENU
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

  const categories =
    activeTab === "all"
      ? ["Coffee", "Non-Coffee", "Snack"]
      : [activeTab];

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
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="size-4" />
            Add Menu
          </Button>
        </div>

        <Card className="p-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="info">
              <AccordionTrigger>
                Menu Management Information
              </AccordionTrigger>

              <AccordionContent>
                This page is used to add, edit, search, filter and delete
                coffee shop menus.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* FORM */}
        {showForm && (
          <Card className="space-y-4">
            <h2 className="text-[18px] font-semibold text-[#5B2E0F]">
              {editing ? "Edit Menu Item" : "Add New Menu"}
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
                value={newMenu.price || ""}
                onChange={(e) =>
                  setNewMenu({
                    ...newMenu,
                    price: Number(e.target.value),
                  })
                }
              />

              <Input
                type="number"
                placeholder="Stock"
                value={newMenu.stock || ""}
                onChange={(e) =>
                  setNewMenu({
                    ...newMenu,
                    stock: Number(e.target.value),
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

            <Button variant="primary" onClick={addMenu}>
              {editing ? "Update Menu" : "Submit"}
            </Button>
          </Card>
        )}

        {/* FILTER */}
        <div className="flex gap-4">
          <SearchBar
             ref={searchRef}
            placeholder="Search menu..."

            className="w-full max-w-sm"
            onChange={(e) => setSearch(e.target.value)}
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
                e.target.value === "All Categories"
                  ? ""
                  : e.target.value
              )
            }
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Coffee">Coffee</TabsTrigger>
            <TabsTrigger value="Non-Coffee">Non Coffee</TabsTrigger>
            <TabsTrigger value="Snack">Snack</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* CATEGORY */}
        {categories.map((category) => {
          const categoryItems = filtered.filter(
            (m) => m.category === category
          );

          if (categoryItems.length === 0) return null;

          return (
            <div key={category}>
              <h2 className="text-[22px] font-semibold text-[#5B2E0F] mb-5">
                {category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {categoryItems.map((m) => (
                  <Card
                    key={m.menuId}
                    className="overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 p-0"
                  >
                    {/* IMAGE */}
                    <img
                      src={m.image}
                      className="w-full h-52 object-cover"
                      alt={m.name}
                    />

                    <div className="p-6">
                      {/* TOP */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Coffee className="size-4 text-[#D97706]" />
                            <p className="text-[13px] text-[#A16207]">
                              {m.category}
                            </p>
                          </div>

                          <h3 className="text-[20px] font-semibold text-[#5B2E0F] mt-2">
                            {m.name}
                          </h3>
                        </div>

                        <Badge color={m.stock < 5 ? "red" : "green"}>
                          {m.stock < 5 ? "Low Stock" : "Available"}
                        </Badge>
                      </div>

                      {/* PRICE */}
                      <div className="mt-5">
                        <h1 className="text-[28px] font-bold text-[#5B2E0F]">
                          Rp {m.price.toLocaleString("id-ID")}
                        </h1>
                        <p className="text-[13px] text-[#A16207] mt-1">
                          Stock: {m.stock}
                        </p>
                      </div>

                      {/* ACTION */}
                      <div className="flex gap-3 mt-6">
                        <Button
                          variant="outline"
                          className="flex-1 h-[45px]"
                          onClick={() => editMenu(m)}
                        >
                          <Pencil className="size-4" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="danger"
                              className="flex-1 h-[45px] text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                            
                          </AlertDialogTrigger>

                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Menu?
                              </AlertDialogTitle>
                            </AlertDialogHeader>

                            <p>
                              Are you sure you want to delete this menu
                              item?
                            </p>

                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMenu(m.menuId)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
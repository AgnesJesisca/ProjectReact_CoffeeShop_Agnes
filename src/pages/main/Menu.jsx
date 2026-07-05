import { useState, useEffect, useRef } from "react";

import { menuAPI } from "../../services/menuAPI";

import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import SearchBar from "../../components/SearchBar";
import FilterSelect from "../../components/FilterSelect";
import Table from "../../components/Table";

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
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
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
    loadMenus();
  }, []);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const loadMenus = async () => {
    try {
      setLoading(true);
      const data = await menuAPI.fetchData();
      setMenus(data);
    } catch (err) {
      console.error("Gagal memuat data menu:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = menus.filter(
    (m) =>
      m.name
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (filter === "" || m.category === filter) &&
      (activeTab === "all" || m.category === activeTab)
  );

  // ADD / UPDATE MENU
  const addMenu = async () => {
    try {
      if (editing) {
        const updated = await menuAPI.updateData(editing.menuId, newMenu);
        setMenus(menus.map((m) => (m.menuId === editing.menuId ? updated : m)));
        setEditing(null);
      } else {
        const payload = {
          ...newMenu,
          menuId: "MENU-" + Date.now(),
          isAvailable: true,
        };
        const created = await menuAPI.createData(payload);
        setMenus([...menus, created]);
      }
    } catch (err) {
      console.error("Gagal menyimpan menu:", err);
    }

    setShowForm(false);
    setNewMenu({ name: "", category: "", price: "", image: "", stock: "" });
  };

  // DELETE MENU
  const deleteMenu = async (menuId) => {
    try {
      await menuAPI.deleteData(menuId);
      setMenus(menus.filter((m) => m.menuId !== menuId));
    } catch (err) {
      console.error("Gagal menghapus menu:", err);
    }
  };

  // EDIT MENU
  const editMenu = (menu) => {
    setEditing(menu);
    setNewMenu({
      name: menu.name,
      category: menu.category,
      price: menu.price,
      image: menu.image || "",
      stock: menu.stock,
    });
    setShowForm(true);
  };

  const tableHeaders = ["Menu Name", "Category", "Price", "Stock", "Status", "Actions"];

  if (loading) {
    return (
      <div className="flex-1 min-h-screen bg-[#F8F4EE] flex items-center justify-center">
        <p className="text-gray-400 text-sm animate-pulse">Memuat data menu...</p>
      </div>
    );
  }

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
                  setNewMenu({ ...newMenu, name: e.target.value })
                }
              />

              <FilterSelect
                options={["Select Category", "Coffee", "Non-Coffee", "Snack"]}
                value={newMenu.category}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, category: e.target.value })
                }
              />

              <Input
                type="number"
                placeholder="Price"
                value={newMenu.price || ""}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, price: Number(e.target.value) })
                }
              />

              <Input
                type="number"
                placeholder="Stock"
                value={newMenu.stock || ""}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, stock: Number(e.target.value) })
                }
              />

              <Input
                className="md:col-span-2"
                placeholder="Image URL (Optional)"
                value={newMenu.image}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, image: e.target.value })
                }
              />
            </div>

            <div className="flex gap-2">
              <Button variant="primary" onClick={addMenu}>
                {editing ? "Update Menu" : "Submit"}
              </Button>
              {editing && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditing(null);
                    setShowForm(false);
                    setNewMenu({ name: "", category: "", price: "", image: "", stock: "" });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* FILTER & TABS */}
        <div className="flex gap-4">
          <SearchBar
            ref={searchRef}
            placeholder="Search menu..."
            className="w-full max-w-sm"
            onChange={(e) => setSearch(e.target.value)}
          />

          <FilterSelect
            options={["All Categories", "Coffee", "Non-Coffee", "Snack"]}
            className="w-[220px]"
            onChange={(e) =>
              setFilter(
                e.target.value === "All Categories" ? "" : e.target.value
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

        {/* CONTAINER UTAMA BERBENTUK TABEL */}
        <Card className="p-2 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">
              No menu items found.
            </div>
          ) : (
            <Table headers={tableHeaders}>
              {filtered.map((m) => (
                <tr
                  key={m.menuId}
                  className="border-b border-[#F1DFC8]/40 hover:bg-[#FDFBF7] transition-colors"
                >
                  {/* Nama Menu */}
                  <td className="py-4 text-sm font-semibold text-[#5B2E0F]">
                    <div className="flex items-center gap-2">
                      <Coffee className="size-4 text-[#D97706] shrink-0" />
                      <span>{m.name}</span>
                    </div>
                  </td>

                  {/* Kategori */}
                  <td className="py-4 text-sm text-[#A16207]">
                    {m.category}
                  </td>

                  {/* Harga */}
                  <td className="py-4 text-sm font-bold text-[#5B2E0F]">
                    Rp {m.price.toLocaleString("id-ID")}
                  </td>

                  {/* Stok */}
                  <td className="py-4 text-sm text-gray-600">
                    {m.stock}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 text-sm">
                    <Badge color={m.stock < 5 ? "red" : "green"}>
                      {m.stock < 5 ? "Low Stock" : "Available"}
                    </Badge>
                  </td>

                  {/* Tombol Aksi */}
                  <td className="py-4 text-sm">
                    <div className="flex items-center gap-2">
                      {/* BUTTON EDIT */}
                      <button
                        type="button"
                        onClick={() => editMenu(m)}
                        className="p-2 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl transition-all duration-200 border border-amber-200/60 flex items-center justify-center size-9 shadow-sm"
                        title="Edit Menu"
                      >
                        <Pencil className="size-4" />
                      </button>

                      {/* BUTTON DELETE */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            type="button"
                            className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all duration-200 border border-red-200/60 flex items-center justify-center size-9 shadow-sm"
                            title="Delete Menu"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Menu?</AlertDialogTitle>
                          </AlertDialogHeader>
                          <p className="text-sm text-gray-600">
                            Are you sure you want to delete{" "}
                            <strong>{m.name}</strong> from the menu list? This
                            action cannot be undone.
                          </p>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMenu(m.menuId)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </Card>

      </div>
    </div>
  );
}

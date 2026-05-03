import { useState } from "react";
import menuData from "../../data/menu.json";
import PageHeader from "../../components/PageHeader";

export default function Menu() {
  const [menus, setMenus] = useState(menuData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [newMenu, setNewMenu] = useState({
    name: "",
    category: "",
    price: 0,
    image: "",
    stock: 0
  });

  const filtered = menus.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "" || m.category === filter)
  );

  const addMenu = () => {
    setMenus([...menus, { ...newMenu, menuId: Date.now() }]);
    setShowForm(false);
  };

  return (
    <div className="flex-1 min-h-screen">
      <div className="p-5 space-y-5">

        <PageHeader title="Menu Items" breadcrumb="Dashboard / Menu">
          <button onClick={() => setShowForm(!showForm)} className="btn-coffee">
            + Add Menu
          </button>
        </PageHeader>

        {showForm && (
          <div className="card-coffee space-y-3">
            <input className="input-coffee" placeholder="Name"
              onChange={(e) => setNewMenu({...newMenu, name: e.target.value})} />
            <input className="input-coffee" placeholder="Category"
              onChange={(e) => setNewMenu({...newMenu, category: e.target.value})} />
            <input type="number" className="input-coffee" placeholder="Price"
              onChange={(e) => setNewMenu({...newMenu, price: Number(e.target.value)})} />
            <input className="input-coffee" placeholder="Image URL"
              onChange={(e) => setNewMenu({...newMenu, image: e.target.value})} />
            <input type="number" className="input-coffee" placeholder="Stock"
              onChange={(e) => setNewMenu({...newMenu, stock: Number(e.target.value)})} />

            <button onClick={addMenu} className="btn-coffee">Submit</button>
          </div>
        )}

        <div className="flex gap-4">
          <input className="input-coffee" placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)} />
          <select className="input-coffee"
            onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option>Coffee</option>
            <option>Non-Coffee</option>
            <option>Snack</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {filtered.map((m) => (
            <div key={m.menuId} className="card-coffee">
              <img src={m.image} className="w-full h-40 object-cover rounded-xl" />
              <h3 className="mt-2 font-semibold">{m.name}</h3>
              <p className="text-sub text-sm">{m.category}</p>
              <p className="font-semibold">
                Rp {m.price.toLocaleString("id-ID")}
              </p>
              <p className="text-sm">Stock: {m.stock}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
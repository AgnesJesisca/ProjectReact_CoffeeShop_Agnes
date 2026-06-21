import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { usersAPI } from "../../services/usersAPI";
import { AiFillDelete, AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { FiUsers, FiShield, FiUser } from "react-icons/fi"; // Tambahan icon biar makin cantik

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  
  // State baru untuk memfilter tampilan berdasarkan Role
  const [activeFilter, setActiveFilter] = useState("All"); 

  const [dataForm, setDataForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer", // Default diset ke customer agar aman
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await usersAPI.fetchUsers();
      setUsers(data || []);
    } catch (err) {
      setError("Gagal memuat data user");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await usersAPI.updateUser(editingId, dataForm);
        alert("User berhasil diperbarui!");
      } else {
        await usersAPI.createUser(dataForm);
        alert("User berhasil ditambahkan!");
      }
      resetForm();
      loadUsers();
    } catch (err) {
      alert("Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setDataForm({
      username: user.username,
      email: user.email,
      password: "", 
      role: user.role.toLowerCase(), // Amankan case-sensitivity
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin hapus user ini?");
    if (!confirmDelete) return;

    try {
      await usersAPI.deleteUser(id);
      alert("User berhasil dihapus!");
      loadUsers();
    } catch {
      alert("Gagal menghapus user");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setDataForm({
      username: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  // Logika Filter Data User berdasarkan Role aktif
  const filteredUsers = users.filter((user) => {
    if (activeFilter === "All") return true;
    return user.role?.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="p-8 bg-[#F8F4EE] min-h-screen">
      <PageHeader title="User Management" breadcrumb="Manage Registered Users" />

      {/* FORM */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#F5E7D4] p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#5B2E0F]">
            {editingId ? "Edit User Profil" : "Tambah User Baru"}
          </h2>
          {editingId && (
            <button onClick={resetForm} className="flex items-center gap-1 text-sm text-red-500 hover:underline">
              <AiOutlineClose /> Batalkan Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={dataForm.username}
            onChange={handleChange}
            className="border border-[#F5E7D4] rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={dataForm.email}
            onChange={handleChange}
            className="border border-[#F5E7D4] rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder={editingId ? "Kosongkan jika tidak ingin mengubah password" : "Password"}
            value={dataForm.password}
            onChange={handleChange}
            className="border border-[#F5E7D4] rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            required={!editingId}
          />
          
          {/* Mengubah input teks role menjadi Select Dropdown agar data konsisten */}
          <select
            name="role"
            value={dataForm.role}
            onChange={handleChange}
            className="border border-[#F5E7D4] rounded-xl p-3 w-full bg-white text-[#5B2E0F] focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition shadow-md"
          >
            {loading ? "Menyimpan..." : editingId ? "Update User" : "Tambah User"}
          </button>
        </form>
      </div>

      {/* FILTER TABS & TABLE CONTAINER */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#F5E7D4] mt-6 overflow-hidden">
        <div className="p-6 border-b border-[#F5E7D4] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#5B2E0F]">Registered Users</h2>
            <p className="text-gray-500 text-sm mt-1">Total Entri: {filteredUsers.length} User</p>
          </div>
          
          {/* TAB FILTER ROLE */}
          <div className="flex bg-[#F8F4EE] p-1 rounded-xl border border-[#F5E7D4]">
            <button
              onClick={() => setActiveFilter("All")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                activeFilter === "All" ? "bg-orange-500 text-white shadow-sm" : "text-[#6B4F3A] hover:bg-amber-50"
              }`}
            >
              <FiUsers /> Semua
            </button>
            <button
              onClick={() => setActiveFilter("admin")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                activeFilter === "admin" ? "bg-red-500 text-white shadow-sm" : "text-[#6B4F3A] hover:bg-amber-50"
              }`}
            >
              <FiShield /> Admin
            </button>
            <button
              onClick={() => setActiveFilter("customer")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                activeFilter === "customer" ? "bg-blue-500 text-white shadow-sm" : "text-[#6B4F3A] hover:bg-amber-50"
              }`}
            >
              <FiUser /> Customer
            </button>
          </div>
        </div>

        {loading && <div className="p-6 text-center text-gray-500">Loading data...</div>}
        {error && <div className="p-6 text-red-500 text-center">{error}</div>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FFFBF6] border-b border-[#F5E7D4]">
                  <th className="p-4 text-center w-16 text-[#5B2E0F] font-bold">No</th>
                  <th className="p-4 text-[#5B2E0F] font-bold">Username</th>
                  <th className="p-4 text-[#5B2E0F] font-bold">Email</th>
                  <th className="p-4 text-[#5B2E0F] font-bold">Role</th>
                  <th className="p-4 text-center w-32 text-[#5B2E0F] font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-gray-400 italic">
                      Tidak ada data user dengan role "{activeFilter}".
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => {
                    const isAdmin = user.role?.toLowerCase() === "admin";
                    return (
                      <tr key={user.id || index} className="border-b border-[#F5E7D4]/60 hover:bg-[#FFFBF6]/50 transition-colors">
                        <td className="p-4 text-center text-gray-600 font-medium">{index + 1}</td>
                        <td className="p-4 font-semibold text-[#5B2E0F]">{user.username}</td>
                        <td className="p-4 text-gray-600">{user.email}</td>
                        <td className="p-4">
                          {/* Badge Pembeda Warna Admin & Customer */}
                          <span
                            className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                              isAdmin
                                ? "bg-red-50 text-red-600 border border-red-200"
                                : "bg-blue-50 text-blue-600 border border-blue-200"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 flex justify-center gap-4">
                          <button onClick={() => handleEdit(user)} title="Edit User">
                            <AiFillEdit className="text-blue-500 hover:text-blue-700 text-2xl transition" />
                          </button>
                          <button onClick={() => handleDelete(user.id)} title="Hapus User">
                            <AiFillDelete className="text-red-500 hover:text-red-700 text-2xl transition" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
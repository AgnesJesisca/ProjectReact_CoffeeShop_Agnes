import { useEffect, useState } from "react";

import { usersAPI } from "../../services/usersAPI";

import PageHeader    from "../../components/PageHeader";
import Card          from "../../components/Card";
import Button        from "../../components/Button";
import Input         from "../../components/Input";
import Badge         from "../../components/Badge";
import Table         from "../../components/Table";
import FilterSelect  from "../../components/FilterSelect";

import { AiFillDelete, AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { FiUsers, FiShield, FiUser } from "react-icons/fi";

export default function UserManagement() {
  const [users,       setUsers]       = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");
  const [editingId,   setEditingId]   = useState(null);
  const [activeFilter,setActiveFilter]= useState("All");

  const [dataForm, setDataForm] = useState({
    username: "",
    email:    "",
    password: "",
    role:     "member",   // default: member
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
    } catch {
      setError("Gagal memuat data user.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
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
    } catch {
      alert("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setDataForm({
      username: user.username,
      email:    user.email,
      password: "",
      role:     user.role?.toLowerCase() || "member",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus user ini?")) return;
    try {
      await usersAPI.deleteUser(id);
      alert("User berhasil dihapus!");
      loadUsers();
    } catch {
      alert("Gagal menghapus user.");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setDataForm({ username: "", email: "", password: "", role: "member" });
  };

  // Filter berdasarkan role aktif
  const filteredUsers = users.filter((user) => {
    if (activeFilter === "All") return true;
    return user.role?.toLowerCase() === activeFilter.toLowerCase();
  });

  const tableHeaders = ["No", "Username", "Email", "Role", "Action"];

  // Badge color helper
  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":  return "red";
      case "member": return "blue";
      default:       return "blue";
    }
  };

  return (
    <div className="p-8 bg-[#F8F4EE] min-h-screen space-y-6">
      <PageHeader title="User Management" breadcrumb="Manage Registered Users" />

      {/* ── FORM CARD ──────────────────────────────────────── */}
      <Card>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-[#5B2E0F]">
            {editingId ? "Edit User Profil" : "Tambah User Baru"}
          </h2>
          {editingId && (
            <Button
              type="button"
              variant="danger"
              className="h-9 px-4 text-sm"
              onClick={resetForm}
            >
              <AiOutlineClose className="size-4" />
              Batalkan Edit
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Username */}
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={dataForm.username}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={dataForm.email}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <Input
            type="password"
            name="password"
            placeholder={editingId ? "Kosongkan jika tidak ingin mengubah password" : "Password"}
            value={dataForm.password}
            onChange={handleChange}
            required={!editingId}
          />

          {/* Role — pakai FilterSelect agar konsisten */}
          <FilterSelect
            name="role"
            value={dataForm.role}
            options={["member", "admin"]}
            onChange={handleChange}
            className="w-full"
          />

          {/* Submit */}
          <div className="md:col-span-2">
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? "Menyimpan..." : editingId ? "Update User" : "Tambah User"}
            </Button>
          </div>
        </form>
      </Card>

      {/* ── TABLE CARD ─────────────────────────────────────── */}
      <Card className="p-0 overflow-hidden">
        {/* Header + Filter Tabs */}
        <div className="p-6 border-b border-[#F1DFC8] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#5B2E0F]">Registered Users</h2>
            <p className="text-gray-500 text-sm mt-1">
              Total Entri: <span className="font-semibold text-[#5B2E0F]">{filteredUsers.length}</span> User
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex bg-[#F8F4EE] p-1 rounded-xl border border-[#F1DFC8] gap-1">
            {[
              { label: "Semua", value: "All",    icon: <FiUsers />,  activeClass: "bg-[#D97706] text-white shadow-sm"  },
              { label: "Admin", value: "admin",  icon: <FiShield />, activeClass: "bg-red-500 text-white shadow-sm"    },
              { label: "Member",value: "member", icon: <FiUser />,   activeClass: "bg-blue-500 text-white shadow-sm"   },
            ].map(({ label, value, icon, activeClass }) => (
              <button
                key={value}
                onClick={() => setActiveFilter(value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  activeFilter === value ? activeClass : "text-[#6B4F3A] hover:bg-amber-50"
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="p-10 text-center text-gray-400 text-sm animate-pulse">
            Memuat data user...
          </div>
        )}
        {error && (
          <div className="p-6 text-red-500 text-center text-sm">{error}</div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="px-2">
            <Table headers={tableHeaders}>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400 text-sm italic">
                    Tidak ada user dengan role "{activeFilter}".
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.id || index}
                    className="border-b border-[#F1DFC8]/60 hover:bg-[#FFFBF6] transition-colors"
                  >
                    {/* No */}
                    <td className="py-4 pl-4 text-sm text-gray-500 font-medium w-12">
                      {index + 1}
                    </td>

                    {/* Username */}
                    <td className="py-4 text-sm font-semibold text-[#5B2E0F]">
                      {user.username}
                    </td>

                    {/* Email */}
                    <td className="py-4 text-sm text-gray-500 font-mono">
                      {user.email}
                    </td>

                    {/* Role Badge */}
                    <td className="py-4 text-sm">
                      <Badge color={getRoleBadgeColor(user.role)}>
                        {user.role?.toLowerCase() === "member" ? "Member" : user.role}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(user)}
                          title="Edit User"
                          className="p-2 bg-blue-50 text-blue-500 hover:bg-blue-100 rounded-xl transition border border-blue-100"
                        >
                          <AiFillEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          title="Hapus User"
                          className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition border border-red-100"
                        >
                          <AiFillDelete className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}

import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { usersAPI } from "../../services/usersAPI";
import { AiFillDelete, AiFillEdit, AiOutlineClose } from "react-icons/ai";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [dataForm, setDataForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
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
      role: user.role,
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
      role: "",
    });
  };

  return (
    <div className="p-8">
      <PageHeader title="User Management" breadcrumb="Manage Registered Users" />

      {/* FORM */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {editingId ? "Edit User" : "Tambah User"}
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
            className="border rounded-xl p-3 w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={dataForm.email}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder={editingId ? "Kosongkan jika tidak ingin mengubah password" : "Password"}
            value={dataForm.password}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full"
            required={!editingId}
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={dataForm.role}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="col-span-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 rounded-xl transition"
          >
            {loading ? "Menyimpan..." : editingId ? "Update User" : "Tambah User"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-lg mt-6 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Registered Users</h2>
          <p className="text-gray-500 mt-1">Total Users : {users.length}</p>
        </div>

        {loading && <div className="p-6 text-center">Loading data...</div>}
        {error && <div className="p-6 text-red-500 text-center">{error}</div>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-4 text-center w-16">No</th>
                  <th className="p-4">Username</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4 text-center w-32">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-gray-500">Belum ada data user.</td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={user.id || index} className="border-b hover:bg-gray-50">
                      <td className="p-4 text-center">{index + 1}</td>
                      <td className="p-4">{user.username}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">{user.role}</span>
                      </td>
                      <td className="p-4 flex justify-center gap-4">
                        <button onClick={() => handleEdit(user)}>
                          <AiFillEdit className="text-blue-500 hover:text-blue-700 text-2xl transition" />
                        </button>
                        <button onClick={() => handleDelete(user.id)}>
                          <AiFillDelete className="text-red-500 hover:text-red-700 text-2xl transition" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
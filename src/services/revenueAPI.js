import { supabase } from "../lib/supabaseClient";

const TABLE = "revenue";

export const revenueAPI = {
  // Ambil semua data revenue, urut dari tanggal terlama
  async fetchData() {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("date", { ascending: true });
    if (error) throw error;
    return data;
  },

  // Ambil satu record berdasarkan tanggal (format: "YYYY-MM-DD")
  async fetchById(date) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("date", date)
      .single();
    if (error) throw error;
    return data;
  },

  // Tambah data revenue baru
  async createData(payload) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Update data revenue berdasarkan tanggal
  async updateData(date, payload) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(payload)
      .eq("date", date)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Hapus data revenue berdasarkan tanggal
  async deleteData(date) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq("date", date);
    if (error) throw error;
    return true;
  },
};

import { supabase } from "../lib/supabaseClient";

const TABLE = "orders";

export const ordersAPI = {
  // Ambil semua order
  async fetchData() {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("id", { ascending: true });
    if (error) throw error;
    return data;
  },

  // Ambil satu order berdasarkan orderId
  async fetchById(orderId) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("orderId", orderId)
      .single();
    if (error) throw error;
    return data;
  },

  // Tambah order baru
  async createData(payload) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Update order berdasarkan orderId
  async updateData(orderId, payload) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(payload)
      .eq("orderId", orderId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Hapus order berdasarkan orderId
  async deleteData(orderId) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq("orderId", orderId);
    if (error) throw error;
    return true;
  },
};

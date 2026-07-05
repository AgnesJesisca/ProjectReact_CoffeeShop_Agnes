import { supabase } from "../lib/supabaseClient";

const TABLE = "inventory";

export const inventoryAPI = {
  // Ambil semua item inventory
  async fetchData() {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("id", { ascending: true });
    if (error) throw error;
    return data;
  },

  // Ambil satu item berdasarkan itemId
  async fetchById(itemId) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("itemId", itemId)
      .single();
    if (error) throw error;
    return data;
  },

  // Tambah item inventory baru
  async createData(payload) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Update item inventory berdasarkan itemId
  async updateData(itemId, payload) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(payload)
      .eq("itemId", itemId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Hapus item inventory berdasarkan itemId
  async deleteData(itemId) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq("itemId", itemId);
    if (error) throw error;
    return true;
  },
};

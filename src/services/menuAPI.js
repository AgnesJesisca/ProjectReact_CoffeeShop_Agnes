import { supabase } from "../lib/supabaseClient";

const TABLE = "menu";

export const menuAPI = {
  // Ambil semua menu
  async fetchData() {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("id", { ascending: true });
    if (error) throw error;
    return data;
  },

  // Ambil satu menu berdasarkan menuId
  async fetchById(menuId) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("menuId", menuId)
      .single();
    if (error) throw error;
    return data;
  },

  // Tambah menu baru
  async createData(payload) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Update menu berdasarkan menuId
  async updateData(menuId, payload) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(payload)
      .eq("menuId", menuId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Hapus menu berdasarkan menuId
  async deleteData(menuId) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq("menuId", menuId);
    if (error) throw error;
    return true;
  },
};

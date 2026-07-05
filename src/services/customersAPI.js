import { supabase } from "../lib/supabaseClient";

const TABLE = "customers";

export const customersAPI = {
  // Ambil semua customer
  async fetchData() {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("id", { ascending: true });
    if (error) throw error;
    return data;
  },

  // Ambil satu customer berdasarkan customerId
  async fetchById(customerId) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("customerId", customerId)
      .single();
    if (error) throw error;
    return data;
  },

  // Ambil satu customer berdasarkan email
  async fetchByEmail(email) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .ilike("email", email)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  // Tambah customer baru
  async createData(payload) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Update customer berdasarkan customerId
  async updateData(customerId, payload) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(payload)
      .eq("customerId", customerId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Hapus customer berdasarkan customerId
  async deleteData(customerId) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq("customerId", customerId);
    if (error) throw error;
    return true;
  },
};

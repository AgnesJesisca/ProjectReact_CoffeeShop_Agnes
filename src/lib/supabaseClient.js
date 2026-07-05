import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qcowiyjtrslxzcvmqcia.supabase.co";
const SUPABASE_ANON_KEY =
  "sb_publishable_mapIPeI9y3UD04_7xSnwbQ_R0-dSw1i";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

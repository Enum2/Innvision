import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://prdpknvnizpdkoxndttc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByZHBrbnZuaXpwZGtveG5kdHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxODgzNDIsImV4cCI6MjA1MTc2NDM0Mn0.ldiNMfaVkGID52KSLABECQdthCej9XbfoiIigIoa-cc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

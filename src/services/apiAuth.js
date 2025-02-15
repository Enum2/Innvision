import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error("An error occurred while logging in.");
  }

  console.log(data.user); // Log the user data
  return data.user; // Return the user object
}

export async function getCurrentUser() {
  // ✅ Await the session fetch
  const { data: sessionData } = await supabase.auth.getSession();

  if (!sessionData?.session) return null; // No active session

  const { data, error } = await supabase.auth.getUser();

  console.log(data); // Log the user data
  if (error) {
    throw new Error("An error occurred while getting the user.");
  }
  return data?.user;
}

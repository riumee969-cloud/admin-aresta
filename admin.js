
async function loginAdmin(email, password) {
  const { data, error } =
    await client.auth.signInWithPassword({
      email,
      password
    });

  if (error) {
    alert("Login gagal. Periksa email dan kata sandi.");
    return false;
  }

  return Boolean(data.user);
}

async function muatData() {
  const { data, error } = await client
    .from("pendaftaran")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error.message);
    return [];
  }

  return data;
}

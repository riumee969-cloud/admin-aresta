
const client = window.supabase.createClient(
  window.APP_CONFIG.SUPABASE_URL,
  window.APP_CONFIG.SUPABASE_PUBLISHABLE_KEY
);

async function kirimFormulir(dataFormulir) {
  const { data, error } = await client
    .from("pendaftaran")
    .insert([{
      nama: dataFormulir.nama,
      email: dataFormulir.email,
      nomor_telepon: dataFormulir.nomor_telepon,
      keterangan: dataFormulir.keterangan
    }]);

  if (error) {
    console.error("Gagal menyimpan:", error.message);
    alert("Data gagal dikirim. Silakan coba lagi.");
    return false;
  }

  alert("Data berhasil dikirim!");
  return true;
}

document
  .getElementById("sponsorshipForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = {
      nama: form.elements.nama.value.trim(),
      email: form.elements.email.value.trim(),
      nomor_telepon: form.elements.nomor_telepon.value.trim(),
      keterangan: form.elements.keterangan.value.trim()
    };

    if (!data.nama || !data.email ||
        !data.nomor_telepon || !data.keterangan) {
      alert("Lengkapi semua kolom wajib.");
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;

    try {
      const berhasil = await kirimFormulir(data);
      if (berhasil) form.reset();
    } finally {
      button.disabled = false;
    }
  });

// ===============================================================
// === LOAD HEADER & FOOTER DINAMIS (MODULAR WEBSITE) ============
// ===============================================================
document.addEventListener("DOMContentLoaded", async () => {
  // Fungsi untuk memuat komponen HTML ke dalam elemen yang ditentukan
  async function loadComponent(selector, filePath) {
    const el = document.querySelector(selector);
    if (!el) return;
    try {
      const res = await fetch(filePath);
      if (!res.ok) throw new Error(`Gagal memuat ${filePath}`);
      const html = await res.text();
      el.innerHTML = html;
    } catch (err) {
      console.error("Error memuat komponen:", filePath, err);
    }
  }

  // Deteksi apakah halaman di root atau subfolder
  const basePath =
    window.location.pathname.includes("/hubungi-kami") ||
    window.location.pathname.includes("/kontak-kami")
      ? ".."
      : ".";

  // Muat header dan footer
  await loadComponent("header", `${basePath}/components/header.html`);
  await loadComponent("footer", `${basePath}/components/footer.html`);

  // Muat komponen tambahan (WhatsApp widget dan menu responsif)
  await loadComponent("#whatsapp-container", `${basePath}/components/whatsapp-widget.html`);
  await loadComponent("#menu-responsive-container", `${basePath}/components/responsive-menu.html`);

  // Setelah header/footer termuat, jalankan seluruh fitur website (jika ada)
  if (typeof EducateWebsite === "function") {
    new EducateWebsite();
  }

  // Menjalankan fungsi binding event dari modul
  if (typeof bindWhatsappEvents === "function") {
    bindWhatsappEvents();
  }

  if (typeof bindMenuEvents === "function") {
    bindMenuEvents();
  }
});




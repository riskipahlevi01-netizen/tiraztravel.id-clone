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

  // Deteksi apakah halaman di root atau subfolder, dengan pengecekan URL detail blog
  const basePath = (() => {
    const pathname = window.location.pathname;
    if (pathname.includes("/hubungi-kami") ||
        pathname.includes("/testimonial") ||
        pathname.includes("/tentang-kami") ||
        pathname.includes("/blog")) {
      // Cek apakah ini halaman detail blog, berdasarkan URL yang mengandung /blog/detail/
     const blogDetailMatch = pathname.match(/\/blog\/detail\/\d+\/.+/); // Pencocokan angka dan nama artikel setelah /blog/detail/
      if (blogDetailMatch) {
        return "..";  // Kembali ke folder dasar jika diperlukan
      }
    }
    return "."; // Default untuk halaman lain
  })();

  // Muat header dan footer
  await loadComponent("header", `${basePath}/components/header.html`);
  await loadComponent("footer", `${basePath}/components/footer.html`);

  // Muat komponen tambahan (Widget WhatsApp dan menu responsif)
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

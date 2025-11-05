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

  // Tentukan basePath berdasarkan URL
  const basePath = (() => {
    const pathname = window.location.pathname;

    // Naik dua level 
    if (pathname.includes("/blog/detail/")) {
      return "../../../";  // Naik dua folder
    }

    // Naik satu level 
    if (pathname.includes("/tentang-kami") ||
      pathname.includes("/testimonial") ||
      pathname.includes("/hubungi-kami")) {
      return "..";  // Naik satu folder
    }

    // Default jika berada di root atau folder yang sama
    return "."; // Default
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

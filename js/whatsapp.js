(function () {

    // Fungsi untuk menampilkan atau menyembunyikan chatbox
    function toggleWhatsapp() {
        var chatBox = $('#ctc-chat-box');
        var status = chatBox.attr('status');
        if (status !== 'hidden') {
            chatBox.attr('status', 'hidden');
        } else {
            chatBox.attr('status', 'display');
            $('#ctc-chat-body-inner').show();
            $('#ctc-chat-form').hide();
        }
    }

    // Fungsi untuk menampilkan form berdasarkan nomor CS yang dipilih
    function showForm(nomorCS) {
        $('input[name="nomor_cs"]').val(nomorCS);
        $('#ctc-chat-body-inner').hide();
        $('#ctc-chat-form').show();
    }

    // Fungsi untuk mengirim data form dan membuka WhatsApp Web dengan format link yang benar
    function sendFormAndOpenWhatsapp(nomorCS, message) {
        if (!nomorCS) {
            alert("Nomor CS belum ditentukan!");
            return;
        }

        // Encode pesan agar sesuai untuk URL
        var encodedMessage = encodeURIComponent(message);

        // Format URL resmi WhatsApp
        var waLink = `https://api.whatsapp.com/send/?phone=${nomorCS}&text=${encodedMessage}&type=phone_number&app_absent=0`;

        // Buka WhatsApp Web di tab baru
        window.open(waLink, '_blank');

        // Simpan data pengunjung ke server (opsional)
        var data = getFormData('TQ3POJ0WiNiaC0bD0LRzNlk9DqGoupxtCDpPcjGq');
        ajaxTransfer(
            'https://tiraztravel.id/subscriber/save-click-to-chat', // Ubah sesuai endpoint kamu
            data,
            '#result-TQ3POJ0WiNiaC0bD0LRzNlk9DqGoupxtCDpPcjGq'
        );
    }

    // Fungsi untuk mengikat event-event ke elemen-elemen
    function bindWhatsappEvents() {
        // Toggle chat box
        $('#ctc-chat-icon, #ctc-chat-header').on('click', function () {
            toggleWhatsapp();
        });

        // Klik salah satu kontak -> buka form dengan nomor CS yang sesuai
        $('.ctc-contact-list.ctc-whatsapp').on('click', function () {
            const nomor = $(this).data('nomor');
            showForm(nomor);
        });

        // Submit form chat WhatsApp
        $('#TQ3POJ0WiNiaC0bD0LRzNlk9DqGoupxtCDpPcjGq').on('submit', function (e) {
            e.preventDefault();

            const nomorCS = $('input[name="nomor_cs"]').val().trim() || "6282289998043"; // Default nomor
            const message = $('#pesan').val().trim() || "Assalamualaikum, mohon informasi tentang paket dari Travel Anda.";

            sendFormAndOpenWhatsapp(nomorCS, message);
        });

        // Animasi chatbox muncul
        setTimeout(function () {
            $('#ctc-chat-box').animate({ bottom: '0px' }, 1000);
        }, 1000);
    }

    // Jalankan script hanya di halaman tertentu
    if (window.location.pathname === '/hubungi-kami/' || window.location.pathname === '/hubungi-kami') {
        $(document).ready(function () {
            bindWhatsappEvents();
        });
    }

    // Mengekspos fungsi untuk debugging
    window.bindWhatsappEvents = bindWhatsappEvents;

})();

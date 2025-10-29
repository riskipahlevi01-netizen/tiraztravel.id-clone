
function confirmActionLogout() {
    modalConfirm(
        'Konfirmasi Tindakan',
        alertWarning('Apakah Anda yakin akan keluar dari sistem?'),
        function () {
            location.href = '/logout';
        }
    );
}

function base64Encode(str) {
    let utf8Bytes = new TextEncoder().encode(str);
    let binary = '';
    let salt = 'G8h2jHPJLGIPG7mlIe7I24QL1LlQJCHpCced3A24IcJKpohgO8Q16opI19hH8aKa';
    const chunkSize = 0x8000;

    for (let i = 0; i < utf8Bytes.length; i += chunkSize) {
        let chunk = utf8Bytes.subarray(i, i + chunkSize);
        binary += String.fromCharCode.apply(null, chunk);
    }

    return salt + btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

// tombol scroll ke atas
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

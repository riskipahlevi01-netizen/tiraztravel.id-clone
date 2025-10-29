(function () {

    function openResponsiveMenu() {
        $('#list-menu-responsive').removeClass('hidden');
    }

    function closeResponsiveMenu() {
        $('#list-menu-responsive').addClass('hidden');
    }

    function bindMenuEvents() {
        // tombol buka menu
        $('#responsive-menu-btn').on('click', function () {
            openResponsiveMenu();
        });

        // tombol close di pojok menu
        $('#lmr-close').on('click', function () {
            closeResponsiveMenu();
        });

        // auto close kalau window di-resize (misal balik ke desktop)
        $(window).on('resize', function () {
            closeResponsiveMenu();
        });

        // delay untuk animasi tombol responsive-menu-btn
        setTimeout(function () {
            $('#responsive-menu-btn').removeClass('inactive');
        }, 500);
    }

    // expose
    window.bindMenuEvents = bindMenuEvents;

})();

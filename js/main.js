'use strict';

$(function(){
    /* EVENTS */
    /*
    $(window).resize(function(){
        hideSidebarFilters();
    });*/

    // Navigation
    var n = $(document).scrollTop();

    $(window).scroll(function () {

        if (n < $(document).scrollTop()) {
            $(".navbar-logged-in").addClass("scrolled");
            $(".navbar-main").addClass("scrolled");
            $(".navbar-products").addClass("scrolled");
        } else {
            $(".navbar-logged-in").removeClass("scrolled");
            $(".navbar-main").removeClass("scrolled");
            $(".navbar-products").removeClass("scrolled");
        }

        $(document).scrollTop()> 0 ? n = $(document).scrollTop() : n = 0;

        // Sticky table header
        var fixedOffset = $('.navbar-main').height() + $('.navbar-products').height() + $('.navbar-logged-in').height();
        $('.products-table').stickyTableHeaders({
            fixedOffset: fixedOffset
        }).on('enabledStickiness.stickyTableHeaders', function(){
            this.fixedOffset = $('.navbar-main').height() + $('.navbar-products').height();
        });
    });

    // Mobile Menu
    $('#productNavigation').on('show.bs.collapse', function() {
        $('.search-form-wrapper .search-form').detach().eq(0).appendTo('#productNavigation .mobile-search');
    }).on('hidden.bs.collapse', function() {
        $('.mobile-search .search-form').detach().eq(0).appendTo('.search-form-wrapper');
    });

    // Modal with custom scrollbar
    $('.modal').on('show.bs.modal', function (ev) {
        $(this).find('.modal-body').mCustomScrollbar({
            theme: 'rounded-dark',
            scrollInertia: 150,
            advanced: {
                updateOnContentResize: true
            }
        });
    });

    // User-data show/hide password
    $("#show-password").on('click', function () {
        $(".open-password").show();
        $(".close-password").hide();
    });

    $("#hide-password").on('click', function () {
        $(".close-password").show();
        $(".open-password").hide();
    });

    // Increase, decrease product quantity
    $('.btn-number').click(function(ev){
        ev.stopPropagation();
        ev.preventDefault();
        var fieldName = $(this).attr('data-field'),
            type = $(this).attr('data-type'),
            input = $("input[name='"+fieldName+"']"),
            currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if(type === 'minus') {
                if(currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                }
                if(parseInt(input.val()) === input.attr('min')) {
                    $(this).attr('disabled', true);
                }
            } else if(type === 'plus') {
                if(currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
                }
                if(parseInt(input.val()) === input.attr('max')) {
                    $(this).attr('disabled', true);
                }
            }
        } else {
            input.val(0);
        }
    });
    $('.input-number').focusin(function(){
        $(this).data('oldValue', $(this).val());
    }).change(function() {

        var minValue =  parseInt($(this).attr('min')),
            maxValue =  parseInt($(this).attr('max')),
            valueCurrent = parseInt($(this).val()),
            name = $(this).attr('name');
        if(valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
        } else {
            alert('Sorry, the minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        if(valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
        } else {
            alert('Sorry, the maximum value was reached');
            $(this).val($(this).data('oldValue'));
        }
    }).keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode === 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    // Show order details
    $('.order-items-wrapper').find('div').on('show.bs.collapse', function() {
        if($(this).is(':last-child')) {
            $(this).closest('tr').prev().addClass('remove-border');
        }
        // Show/hide parent table header when order details are visible
        $(this).closest('tr').next().addClass('header-show');
    }).on('hide.bs.collapse', function() {
        $(this).closest('tr').next().removeClass('header-show');
        $(this).closest('tr').prev().removeClass('remove-border');
    });

    // Show sidebar filters on desktop > 992px
    showSidebarFilters();

    // Show product grid on mobile
    showProductGrid();

    // Filter test
    /*
    $('#common-filter').find('input').on('change', function() {
        console.log('Test');
        var checkedValues = [];
        $('#common-filter').find('input:checked').each(function() {
            checkedValues.push($(this).val());
        });
        console.log(checkedValues);
    });
    */

    function showProductGrid() {
        var viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if(viewPortWidth < 992) {
            $('#products-grid').trigger('click');
        }
    }

    function showSidebarFilters() {
        var viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if(viewPortWidth > 992) {
            //console.log('show');
            $('.filter-toggler').removeClass('collapsed');
            $('#common-filter').addClass('show');
            $('#category-filter').addClass('show');
        }
    }
});
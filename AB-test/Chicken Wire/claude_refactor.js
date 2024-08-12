document.addEventListener('DOMContentLoaded', function () {
    // Constants
    const PRODUCT_KEYS = {
        T_POSTS: ['qwbj', 'kgps', 'cao4'],
        PEGS: 'slph',
        CABLE_TIES: 'rgil',
        TENSIONING_WIRE: '6vhr'
    };

    const ATTRIBUTE_IDS = ['pa_height', 'pa_length', 'pa_hole-size', 'gauge-wire-diameter', 'pa_grade'];

    // Helper functions
    function createFloatingHeader(productTitle = '', totalPrice = '') {
        return `
            <div class="fixed-buy-bar"> 
                <div class="hidden-xs container"> 
                    <div class="col-sm-7 col-md-8 col-buy-bar-left"> 
                        <h4><a href="#product-options-var-total"><span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></a><strong>${productTitle}</strong></h4>
                    </div> 
                    <div class="col-sm-5 col-md-4 col-buy-bar-right"> 
                        <p class="price-section">
                            <small class="hidden-xs">Total: </small> ${totalPrice}
                        </p> 
                        <a class="btn-smb-green" href="#product-options-var-total"><span>Buy Now</span></a> 
                    </div> 
                </div> 
            </div>`;
    }

    function checkAndAddFloatingHeader() {
        const smbToggle = $('#smb-toggle');
        if (smbToggle.length) {
            const scrollPosition = $(window).scrollTop();
            const elementOffset = smbToggle.offset().top;

            if (scrollPosition >= elementOffset) {
                if ($('.header-navigation').hasClass('es-sticky') && !$('.fixed-buy-bar').length) {
                    const totalPrice = $('.woobt-total .woocommerce-Price-amount').html();
                    const productTitle = $('.product_title').text().replace('In Stock', '').trim();
      
                    const floatingHeaderHTML = createFloatingHeader(productTitle, totalPrice);
                    $('body .header-navigation').append(floatingHeaderHTML);
                }
            } else {
                $('.fixed-buy-bar').remove();
            }
        }
    }

    function createInfoWrapper(additionalClass = '', content = '') {
        return `
            <span style="display:inline-block; position:relative;" class="info-wrapper ${additionalClass}">
                <img width="15" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/03/octicon_info-24.svg">
                <div class="hide-box">
                    <span class="info-box-close">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6L1 1M6 6L11 11M6 6L11 1M6 6L1 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    ${content}
                </div>
            </span>`;
    }

    function createHeaderDiv(className, text, content) {
        $('#addToCart form table').before(`
            <div class="${className}">
                <h5>${text} 
                    ${createInfoWrapper(`${className}-info`, content)}
                </h5>
            </div>`);
    }

    function updateCartButtonText() {
        const cartSvg = `<svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_616_1479)">
                <path d="M8.2526 20.9173C8.75887 20.9173 9.16927 20.5069 9.16927 20.0007C9.16927 19.4944 8.75887 19.084 8.2526 19.084C7.74634 19.084 7.33594 19.4944 7.33594 20.0007C7.33594 20.5069 7.74634 20.9173 8.2526 20.9173Z" stroke="white" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.3307 20.9173C18.837 20.9173 19.2474 20.5069 19.2474 20.0007C19.2474 19.4944 18.837 19.084 18.3307 19.084C17.8245 19.084 17.4141 19.4944 17.4141 20.0007C17.4141 20.5069 17.8245 20.9173 18.3307 20.9173Z" stroke="white" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M0.914062 1.66797H4.58073L7.0374 13.9421C7.12122 14.3642 7.35081 14.7433 7.68598 15.0131C8.02115 15.2829 8.44054 15.4262 8.87073 15.418H17.7807C18.2109 15.4262 18.6303 15.2829 18.9655 15.0131C19.3006 14.7433 19.5302 14.3642 19.6141 13.9421L21.0807 6.2513H5.4974" stroke="white" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_616_1479">
                    <rect width="22" height="22" fill="white" transform="translate(0 0.75)"/>
                </clipPath>
            </defs>
        </svg>`;
        $('#addToCart .single_add_to_cart_button').eq(0).html(`${cartSvg} &nbsp; Add to Basket`);
    }

    function setupBulkInfoTable() {
        $('.awdr-bulk-customizable-table').addClass('bulk-info-table').removeClass('awdr-bulk-customizable-table');
        $('#addToCart button[type="submit"]').eq(0).before($('.bulk-info-table').eq(0));
        $('#sort_customizable_table').before('<h6>Bulk Discount</h6>');
        $('.bulk-info-table .wdr_table_discounted_value').each(function () {
            $(this).text(`Save ${$(this).text()}`);
        });
    }

    function setupBulkInfo() {
        const bulkInfoHtml = `
            <div class="bulk-info">
                <img width="18px" height="18px" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/03/ic_baseline-local-offer.svg">
                Bulk Discount & Save upto 15% 
                <img width="18px" height="18px" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/03/mingcute_down-line.svg">
            </div>`;
        $('.bulk-info-table').eq(0).before(bulkInfoHtml);

        $('.bulk-info').click(function () {
            $('.bulk-info-table').toggle();
            $('.bulk-info img').eq(1).css('rotate', function(_, val) {
                return val === '180deg' ? '0deg' : '180deg';
            });
        });

        $('body .bulk-info-table tr').click(function () {
            const quantity = $(this).children('.wdr_bulk_range').text().split('+')[0];
            $("#addToCart .variations_form.cart .quantity .input-text").val(quantity).trigger('change');
            $('body .bulk-info-table tr').removeClass('active');
            $(this).addClass('active');
        });
    }

    function setupProductOptions() {
        $('#addToCart .woocommerce-variation-add-to-cart.variations_button .single_add_to_cart_button')
            .before($('.woocommerce-variation.single_variation'));

        $('#addToCart .woocommerce-variation-add-to-cart .quantity').before('<h5>Quantity</h5>');

        ATTRIBUTE_IDS.forEach(id => {
            $(`#addToCart table #${id} option`).each(function () {
                if ($(this).val().length > 0) {
                    $(`.${id}`).append(`<div value="${$(this).attr('value')}"> ${$(this).text()} </div>`);
                }
            });
            clickToUpdate(id);
        });
    }

    function clickToUpdate(className) {
        $(`.${className} > div`).click(function () {
            if ($(this).hasClass('active')) {
                $(`.${className} > div`).removeClass('active');
                $(`#${className}`).val('').trigger('change');
            } else if ($(this).css('cursor') != 'not-allowed') {
                $(`#${className}`).val($(this).attr('value')).trigger('change');
                $(`.${className} > div`).removeClass('active');
                $(this).addClass('active');
            }
        });

        $(`.${className} > div[value="${$(`#${className}`).val()}"]`).addClass('active');
    }

    function applyStyles(selector) {
        $(`.${selector} > div`).hide();

        $(`#addToCart .variations_form.cart select#${selector} option`).each(function () {
            $(`.${selector} > div[value="${$(this).val()}"]`).css({
                'display': 'block',
                'pointer-events': 'unset',
                'opacity': '1',
                'cursor': 'pointer'
            });
        });

        $(`.${selector} > div`).each(function () {
            if ($(this).css('display') === 'none') {
                $(this).css({
                    'display': 'block',
                    'opacity': '0.2',
                    'cursor': 'not-allowed'
                });
            }
        });

        $(`.${selector} > div[value="${$(`#${selector}`).val()}"]`)
            .addClass('active')
            .siblings()
            .removeClass('active');
    }

    function setupAdditionalProducts() {
        $('.woobt-actions').appendTo('.woobt-products');
        $('.woobt-products').prepend(`
            <h6>Suggested Add On Quantity 
                <span style="display:inline-block;"> 
                    Select All <input class="selectAll" checked type="checkbox">
                </span>
            </h6>`);

        $('.woobt-products button[type="submit"]').before($('.woobt-total.woobt-text'));
        $('.woobt-price').append('<span style="display:inline-block; font-size: 14px;">each</span>');
    }

    function setupInfoWrappers() {
        const contentMap = {
            't-post-info': createTPostContent(),
            'pegs-info': createPegsContent(),
            'cable-ties-info': createCableTiesContent(),
            'tensioning-wire-info': createTensioningWireContent()
        };

        PRODUCT_KEYS.T_POSTS.forEach(key => {
            $(`.woobt-products div[data-key="${key}"] .woobt-title-inner`).append(createInfoWrapper('t-post-info', contentMap['t-post-info']));
        });

        $(`.woobt-products div[data-key="${PRODUCT_KEYS.PEGS}"] .woobt-title-inner`).append(createInfoWrapper('pegs-info', contentMap['pegs-info']));
        $(`.woobt-products div[data-key="${PRODUCT_KEYS.CABLE_TIES}"] .woobt-title-inner`).append(createInfoWrapper('cable-ties-info', contentMap['cable-ties-info']));
        $(`.woobt-products div[data-key="${PRODUCT_KEYS.TENSIONING_WIRE}"] .woobt-title-inner`).append(createInfoWrapper('tensioning-wire-info', contentMap['tensioning-wire-info']));

        ATTRIBUTE_IDS.forEach(id => {
            $(`label[for="${id}"]`).after(createInfoWrapper(`${id}-info`));
        });
    }

    function setupInfoWrapperInteractions() {
        $('.info-wrapper > img').click(function () {
            $(this).parent().children('div').toggleClass('hide-box');
        });

        $(window).click(function (e) {
            if ($(e.target).closest('.info-wrapper').length !== 1) {
                $('.info-wrapper > div').addClass('hide-box');
            }
        });

        $('.info-box-close').click(function () {
            $('.info-wrapper > div').addClass('hide-box');
        });
    }

    function setupSelectAllCheckboxes() {
        const selectAll = $('.selectAll');
        const checkboxes = $('.woobt-products #woobt_checkbox_1, .woobt-products #woobt_checkbox_2, .woobt-products #woobt_checkbox_3, .woobt-products #woobt_checkbox_4, .woobt-products #woobt_checkbox_5, .woobt-products #woobt_checkbox_6');
        
        selectAll.change(function () {
            checkboxes.prop('checked', selectAll.is(':checked')).trigger('change');
        });
    }

    function setupShowMoreButtons() {
        setupShowMoreButton('.download-block', '#show-more-button');
        setupShowMoreComments();
    }

    function setupShowMoreButton(contentSelector, buttonSelector) {
        const content = $(contentSelector);
        content.addClass('hide-more');
        content.after(`<button id="${buttonSelector.slice(1)}">Show More</button>`);
        const button = $(buttonSelector);

        button.on('click', function() {
            content.toggleClass('hide-more');
            $(this).text(content.hasClass('hide-more') ? 'Show More' : 'Show Less');
        });
    }

    function setupShowMoreComments() {
        const commentList = $('#comments .commentlist');
        const hiddenComments = commentList.children('li:nth-child(n+4)');
        hiddenComments.addClass('hide-comment');

        commentList.after('<button id="show-more-comments">Show More</button>');
        const showMoreButton = $('#show-more-comments');

        showMoreButton.on('click', function() {
            hiddenComments.toggleClass('hide-comment');
            $(this).text(hiddenComments.hasClass('hide-comment') ? 'Show More' : 'Show Less');
            if (hiddenComments.hasClass('hide-comment')) {
                $('html, body').animate({
                    scrollTop: $('#smb-rating').offset().top
                }, 200);
            }
        });
    }

    function updateWooPrice() {
        const $amounts = $('.woobt-total .amount');
        let buttonText = 'ADD TO ORDER • ';

        if ($amounts.length === 2) {
            buttonText += `<del>${$amounts.eq(0).text()}</del> ${$amounts.eq(1).text()}`;
        } else {
            buttonText += $amounts.text();
        }

        $('.woobt-products button[type="submit"]').html(buttonText);
    }

    function createTPostContent() {
        return `
            <div class="tpost-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
                <div style="text-align:left;">
                    <h6>T Posts</h6>
                    <ul>
                        <li>Compatible with wire mesh, chicken wire, and panels. </li>
                        <li>Temporary or permanent</li>
                        <li>Quick & easy installation</li>
                        <li>30-50 year lifespan</li>
                    </ul>
                </div>
            </div>
            <img style="width:100%;" src="https://www.wirefence.co.uk/wp-content/uploads/2023/07/IMAGE-10-post-calculator-edited-768x768.jpg.webp" width="200px" height="200px">
        `;
    }

    function createPegsContent() {
        return `
            <div class="pegs-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
                <div style="text-align:left;">
                    <h6>Pegs</h6>
                </div>
            </div>
        `;
    }

    function createCableTiesContent() {
        return `
            <div class="cableTies-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
                <div style="text-align:left;">
                    <h6>Cable Ties</h6>
                </div>
            </div>
        `;
    }

    function createTensioningWireContent() {
        return `
            <div class="tensioningwire-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
                <div style="text-align:left;">
                    <h6>Tensioning Wire</h6>
                </div>
            </div>
        `;
    }

    function initializeProductPage() {
        // Set up event listeners
        $(window).on('scroll', checkAndAddFloatingHeader);

        $("#addToCart .variations_form.cart .quantity .input-text").change(() => {
            updateTPostQty();
            updatePegsQty();
            updateCableTieQty();
            updateTensioningWireQty();
            updateThisProduct();
        });

        $('#addToCart .variations_form.cart select').change(function () {
            setTimeout(() => {
                $('#addToCart tbody select#pa_length, #addToCart tbody select#pa_height, #addToCart tbody select#pa_hole-size, #addToCart tbody select#gauge-wire-diameter, #addToCart tbody select#pa_grade').each(function (index, el) {
                    $(this).toggleClass('active', $(this).val().length !== 0);
                });
            
                // highlight selected options
                ATTRIBUTE_IDS.forEach(applyStyles);
        
                updateTPostQty();
                updatePegsQty();
                updateCableTieQty();
                updateTensioningWireQty();
                updateThisProduct();

                //change select text to 'Select'
                $('#addToCart select, .woobt-product select').each(function (index, el) {
                    $(el)[0].options[0].text = 'Select';
                });

            }, 200);
        });

        // Initialize page elements
        updateCartButtonText();
        setupBulkInfoTable();
        setupBulkInfo();
        setupProductOptions();
        setupAdditionalProducts();
        setupInfoWrappers();
        setupInfoWrapperInteractions();
        setupSelectAllCheckboxes();
        setupShowMoreButtons();

        // Create header divs
        createHeaderDiv("pa_height", "Height", createHeightContent());
        createHeaderDiv("pa_length", "Length", createLengthContent());
        createHeaderDiv("pa_hole-size", "Hole Size", createHoleSizeContent());
        createHeaderDiv("gauge-wire-diameter", "Wire Diameter", createWireDiameterContent());
        createHeaderDiv("pa_grade", "Grade", createGradeContent());
    }

    function createHeightContent() {
        return `
            <div class="height-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
                <div style="text-align:left;">
                    <h6>Height</h6>
                </div>
            </div>
            <img style="width:100%;" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/06/chicken-wire-height-diagram-768x768.jpg" width="200px" height="200px">
        `;
    }

    function createLengthContent() {
        return `
            <div class="lenght-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
                <div style="text-align:left;">
                    <h6>Length</h6>
                </div>
            </div>
            <img style="width:100%;" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/06/chicken-wire-lenght-diagram-768x768.jpg" width="200px" height="200px">
        `;
    }

    function createHoleSizeContent() {
        return `
            <div class="holesize-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
                <div style="text-align:left;">
                    <h6>Hole Size</h6>
                </div>
            </div>
            <img style="width:100%;" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/06/hole-size-chicken-wire-768x768.jpg" width="200px" height="200px">
        `;
    }

    function createWireDiameterContent() {
        return `
            <div class="wirediameter-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
                <div style="text-align:left;">
                    <h6>Wire Diameter</h6>
                </div>
            </div>
            <img style="width:100%;" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/06/wire-dia-chicken-wire-768x768.jpg" width="200px" height="200px">
        `;
    }

    function createGradeContent() {
        return `
            <div class="grade-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
                <div style="text-align:left;">
                    <h6>Grade</h6>
                </div>
            </div>
            <img style="width:100%;" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/06/grade-table2.png" width="200px" height="200px">
        `;
    }

    // Initialize the page
    initializeProductPage();
});
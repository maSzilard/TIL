// Global configuration object
const CONFIG = {
    // Attribute IDs
    ATTRIBUTES: {
        HEIGHT: 'pa_height',
        LENGTH: 'pa_length',
        HOLE_SIZE: 'pa_hole-size',
        WIRE_DIAMETER: 'gauge-wire-diameter',
        GRADE: 'pa_grade'
    },

    // Product keys for bought together products
    PRODUCT_KEYS: {
        T_POST_60CM: 'qwbj',
        T_POST_90CM: 'kgps',
        T_POST_180CM: 'cao4',
        PEGS: 'slph',
        CABLE_TIES: 'rgil',
        TENSIONING_WIRE_95: '8jwr',
        TENSIONING_WIRE_190: '79ys',
        TENSIONING_WIRE_470: 'uetl'
    },

    // Selectors
    SELECTORS: {
        ADD_TO_CART: '#addToCart .single_add_to_cart_button',
        QUANTITY_INPUT: '#addToCart .variations_form.cart .quantity .input-text',
        BULK_INFO_TABLE: '.bulk-info-table',
        WOOBT_PRODUCTS: '.woobt-products',
        PRODUCT_TITLE: '.product_title',
        TOTAL_PRICE: '.woobt-total .woocommerce-Price-amount'
    },

    // Content URLs
    CONTENT_URLS: {
        HEIGHT_DIAGRAM: 'https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/06/chicken-wire-height-diagram-768x768.jpg',
        LENGTH_DIAGRAM: 'https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/06/chicken-wire-lenght-diagram-768x768.jpg',
        HOLE_SIZE_DIAGRAM: 'https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/06/hole-size-chicken-wire-768x768.jpg',
        WIRE_DIAMETER_DIAGRAM: 'https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/06/wire-dia-chicken-wire-768x768.jpg',
        GRADE_TABLE: 'https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/06/grade-table2.png'
    },

    // Calculation constants
    CALC: {
        POST_QTY_MAP: { '10m-33ft': 5, '25m-82ft': 10, '50m-164ft': 20 },
        LENGTH_MAP: { '10m-33ft': 10, '25m-82ft': 25, '50m-164ft': 50 },
        HEIGHT_MAP: {'60cm-2ft': 60, '90cm-3ft': 90, '1-05m-3-5ft': 105, '1-2m-4ft': 120, '1-8m-5-9ft': 180}
    }
};

// 1. Initialization and DOM Ready Function
document.addEventListener('DOMContentLoaded', function () {
    initFloatingHeader();
    initUIUpdates();
    initProductOptions();
    initBulkDiscount();
    initInfoBoxes();
    initAccessories();
    initShowMoreLess();
    initGallery();
    initAccordionToggles();
    initCart();
});

// 2. Floating Header
function initFloatingHeader() {
    const floatingHeader = (productTitle = '', totalPrice = '') => {
        return `<div class="fixed-buy-bar"> 
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

    const checkAndAddFloatingHeader = () => {
        const smbToggle = $('#smb-toggle');
        if (smbToggle.length) {
            const scrollPosition = $(window).scrollTop();
            const elementOffset = smbToggle.offset().top;
            const elementHeight = smbToggle.outerHeight();
  
            if (scrollPosition >= elementOffset) {
                if ($('.header-navigation').hasClass('es-sticky') && !$('.fixed-buy-bar').length) {
                    const totalPrice = $('.woobt-total .woocommerce-Price-amount').html();
                    const productTitle = $('.product_title').text().replace('In Stock', '').trim();
        
                    const floatingHeaderHTML = floatingHeader(productTitle, totalPrice);
                    $('body .header-navigation').append(floatingHeaderHTML);
                }
            } else {
                $('.fixed-buy-bar').remove();
            }
        }
    }

    $(window).on('scroll', checkAndAddFloatingHeader);
};

// 3. UI Updates and Styling
function initUIUpdates() {
    // Change cart text
    
    $('#addToCart .single_add_to_cart_button').eq(0).html(`<svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_616_1479)"> <path d="M8.2526 20.9173C8.75887 20.9173 9.16927 20.5069 9.16927 20.0007C9.16927 19.4944 8.75887 19.084 8.2526 19.084C7.74634 19.084 7.33594 19.4944 7.33594 20.0007C7.33594 20.5069 7.74634 20.9173 8.2526 20.9173Z" stroke="white" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/> <path d="M18.3307 20.9173C18.837 20.9173 19.2474 20.5069 19.2474 20.0007C19.2474 19.4944 18.837 19.084 18.3307 19.084C17.8245 19.084 17.4141 19.4944 17.4141 20.0007C17.4141 20.5069 17.8245 20.9173 18.3307 20.9173Z" stroke="white" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/> <path d="M0.914062 1.66797H4.58073L7.0374 13.9421C7.12122 14.3642 7.35081 14.7433 7.68598 15.0131C8.02115 15.2829 8.44054 15.4262 8.87073 15.418H17.7807C18.2109 15.4262 18.6303 15.2829 18.9655 15.0131C19.3006 14.7433 19.5302 14.3642 19.6141 13.9421L21.0807 6.2513H5.4974" stroke="white" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/> </g> <defs> <clipPath id="clip0_616_1479"> <rect width="22" height="22" fill="white" transform="translate(0 0.75)"/> </clipPath> </defs> </svg> &nbsp; Add to Basket`);

    $('.awdr-bulk-customizable-table').addClass('bulk-info-table');
    $('.awdr-bulk-customizable-table').removeClass('awdr-bulk-customizable-table');
};

// 4. Product Options and Variations
function initProductOptions() {
    // Create header for select divs
    createHeaderDiv("pa_height", "Height", heightContent);
    createHeaderDiv("pa_length", "Length", LengthContent);
    createHeaderDiv("pa_hole-size", "Hole Size", holeSizeContent);
    createHeaderDiv("gauge-wire-diameter", "Wire Diameter", wireDiameter);
    createHeaderDiv("pa_grade", "Grade", grade);

    // Handle option changes
    $("#addToCart .variations_form.cart .quantity .input-text").change(() => {
        updateTPostQty();
        updatePegsQty();
        updateCableTieQty();
        updateTensioningWireQty();
        updateThisProduct();
    });

    ids.forEach(id => {
        // Create divs for each select option
        $(`#addToCart table #${id} option`).each(function (index, el) {
            if ($(el).val().length > 0) {
                $(`.${id}`).append(`<div value="${$(el).attr('value')}"> ${$(el).text()} </div>`);
            }
        });
  
        // Click function on select divs
        clickToUpdate(id);
    });

    // ... (other option handling logic)
};

// 5. Bulk Discount Handling
function initBulkDiscount() {
    $('#addToCart button[type="submit"]').eq(0).before($('.bulk-info-table').eq(0))
    $('#sort_customizable_table').before('<h6>Bulk Discount</h6>');
    $('.bulk-info-table .wdr_table_discounted_value').each(function (index, el) {
    $(this).text(`Save ${$(this).text()}`);
    })
  
    // bulk info elements
    $('.bulk-info-table').eq(0).before('<div class="bulk-info"><img width="18px" height="18px" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/03/ic_baseline-local-offer.svg"> Bulk Discount & Save up to 15% <img width="18px" height="18px" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/03/mingcute_down-line.svg"> </div>');
    $('.bulk-info').click(function () {
        if ($('.bulk-info-table').css('display') == 'none') {
            $('.bulk-info-table').css('display', 'block');
            $('.bulk-info img').eq('1').css('rotate', '180deg');
        } else if ($('.bulk-info-table').css('display') == 'block') {
            $('.bulk-info-table').css('display', 'none');
            $('.bulk-info img').eq('1').css('rotate', '0deg');
        }
    })
    $('body .bulk-info-table tr').click(function () {
        $("#addToCart .variations_form.cart .quantity .input-text").val($(this).children('.wdr_bulk_range').text().split('+')[0]);
        $("#addToCart .variations_form.cart .quantity .input-text").trigger('change');
        $('body .bulk-info-table tr').removeClass('active');
        $(this).addClass('active');
    })
};

// 6. Info Boxes and Tooltips
function initInfoBoxes() {
    const createInfoWrapper = (additionalClass = '', content = '') => {
        return `<span style="display:inline-block;" class="info-wrapper ${additionalClass}">
            <img width="15" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/03/octicon_info-24.svg" alt="Info icon" class="info-icon">
            <div class="info-box hide-box">
                <span class="info-box-close"> 
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 6L1 1M6 6L11 11M6 6L11 1M6 6L1 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg> 
                </span>
                <div class="tensioningwire-content">
                    ${content}
                </div>    
            </div>
        </span>`;
    };
  
    const tpostContent = `<div class="tpost-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
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
    <img style="width:100%;" src="https://www.wirefence.co.uk/wp-content/uploads/2023/07/IMAGE-10-post-calculator-edited-768x768.jpg.webp" width="200px" height="200px">`;
  
    const pegsContent = `<div class="pegs-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
    <div style="text-align:left;">
        <h6>Attach to soil</h6>
    </div>
    </div>
    <img style="width:100%;" src="https://www.wirefence.co.uk/wp-content/uploads/2021/02/Pegs_Chicken-Wire-Wood-Post-NO-TEXT.jpg" width="200px" height="200px">`;
  
    const cableTiesContent = `<div class="cableTies-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
    <div style="text-align:left;">
        <h6>Attach to posts</h6>
    </div>
    </div>
    <img style="width:100%;" src="https://www.wirefence.co.uk/wp-content/uploads/2021/01/Chicken-Wire-Fence_Metal-Post.jpg" width="200px" height="200px">`;
  
    const tensioningWireContent = `<div class="tensioningwire-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
        <div style="text-align:left;">
            <h6>Tensioning Wire</h6>
            <p>Increase strength of fence / reduce sagging</p>
        </div>
    </div>`;

    $('.woobt-products div[data-key="qwbj"] .woobt-title-inner').append(createInfoWrapper('t-post-info', tpostContent));
    $('.woobt-products div[data-key="kgps"] .woobt-title-inner').append(createInfoWrapper('t-post-info', tpostContent));
    $('.woobt-products div[data-key="cao4"] .woobt-title-inner').append(createInfoWrapper('t-post-info', tpostContent));
    $('.woobt-products div[data-key="slph"] .woobt-title-inner').append(createInfoWrapper('pegs-info', pegsContent));
    $('.woobt-products div[data-key="rgil"] .woobt-title-inner').append(createInfoWrapper('cable-ties-info', cableTiesContent));
    $('.woobt-products div[data-key="8jwr"] .woobt-title-inner').append(createInfoWrapper('tensioning-wire-info', tensioningWireContent));
    $('.woobt-products div[data-key="79ys"] .woobt-title-inner').append(createInfoWrapper('tensioning-wire-info', tensioningWireContent));
    $('.woobt-products div[data-key="uetl"] .woobt-title-inner').append(createInfoWrapper('tensioning-wire-info', tensioningWireContent));
  
    $('label[for="pa_length"]').after(createInfoWrapper('length-info'));
    $('label[for="pa_height"]').after(createInfoWrapper('height-info'));
    $('label[for="pa_hole-size"]').after(createInfoWrapper('hole-size-info'));
    $('label[for="gauge-wire-diameter"]').after(createInfoWrapper('gauge-wire-diameter-info'));
    $('label[for="pa_grade"]').after(createInfoWrapper('pa_grade-info'));
  
    // click on info icon
    $('.info-wrapper .info-icon').click(function() {
        var $infoBox = $(this).siblings('.info-box');
        $infoBox.toggleClass('hide-box');
        $(this).parent('.info-wrapper').toggleClass('modals');
    });
  
    $(window).click(function (e) {
    if ($(e.target).closest('.info-wrapper').length != 1) {
        $('.info-wrapper > div').addClass('hide-box');
    }
    });
  
    $('.info-box-close').click(function() {
        var $infoWrapper = $(this).closest('.info-wrapper');
        $infoWrapper.find('.info-box').addClass('hide-box');
        $infoWrapper.removeClass('modals');
    });

    // ... (other info box logic)
};

// 7. Accessories and Related Products
function initAccessories() {
    // ... (accessories logic)
};

const updateInputFieldsQty = (key, qty) => {
    const itemProduct = $(`.woobt-product-together[data-key="${key}"]`);
    itemProduct.find('input[type="number"]').val(qty);
    itemProduct.attr('data-qty', qty);	
  
    if (itemProduct.hasClass('woobt-hide')) {
      itemProduct.find('.woobt-choose input').click();
      itemProduct.show();
    }
};
  
const alertLowStock = (productName, key) => {
const alertMessage = `<div class="woobt-alert smb-text" style="display: block; background-color: #ff000020; border-left: 4px solid #FF0000;">
            Alert: Low Stock!\nThe quantity of **${productName}** available is less than the amount you need.
            </div>`;
const itemProduct = $(`.woobt-product-together[data-key="${key}"]`);
itemProduct.after(alertMessage);
};
  
const uncheckInputFields = (key) => {
const itemProduct = $(`.woobt-product-together[data-key="${key}"]`);
if (!itemProduct.hasClass('woobt-hide')) {
itemProduct.find('.woobt-choose input').click();
itemProduct.hide();
}
};
  
function updateTPostQty() {
    const lengthActive = $('.pa_length > div.active');
    const heightActive = $('.pa_height > div.active');
    
    if (lengthActive.length === 0 || heightActive.length === 0) {
        return;
    }
    
    //postQty 10m=5, 25m=10, 50m=20
    const postQtyMap = { '10m-33ft': 5, '25m-82ft': 10, '50m-164ft': 20 };
    //height 150=qwbj, 175=kgps, 225=cao4
    const tpostHeightMap = { '60cm-2ft': 'qwbj', '90cm-3ft': 'qwbj', '1-05m-3-5ft': 'kgps', '1-2m-4ft': 'kgps', '1-8m-5-9ft': 'cao4' };
    
    const selectedLength = lengthActive.attr('value');
    const selectedHeight = heightActive.attr('value');
    
    const meshLength = postQtyMap[selectedLength];
    const meshHeight = tpostHeightMap[selectedHeight];
    const quantity = Number($("#addToCart .variations_form.cart .quantity .input-text").val());
    const postQty = meshLength * quantity;
    
    updateInputFieldsQty(meshHeight, postQty);
    
    const resetKeys = Object.values(tpostHeightMap).filter(key => key !== meshHeight);
    resetKeys.forEach(key => {
        updateInputFieldsQty(key, 1);
        uncheckInputFields(key);
    });
};
  
function updatePegsQty() {
  if ($('.pa_length > div.active').length == 0) {
  return;
  }
  //legnth
  const lengthMap = { '10m-33ft': 10, '25m-82ft': 25, '50m-164ft': 50 };
  const selectedLength = $('.pa_length > div.active').attr('value');
  const meshLength = lengthMap[selectedLength];
  const quantity = Number($("#addToCart .variations_form.cart .quantity .input-text").val());
  //calculate pegs
  const pegQty = Math.ceil((meshLength * quantity) / 20);
  
  $('.woobt-product-together[data-key="slph"] input[type="number"]').val(pegQty);
  $('.woobt-product-together[data-key="slph"]').attr('data-qty', pegQty);
};
  
function updateCableTieQty() {
  if ($('.pa_length > div.active').length === 0 || $('.pa_height > div.active').length === 0) {
  return;
  }
  //legnth
  const postQtyMap = { '10m-33ft': 5, '25m-82ft': 10, '50m-164ft': 20 };
  const selectedLength = $('.pa_length > div.active').attr('value');
  const meshLength = postQtyMap[selectedLength];
  //height
  const heightMap = {'60cm-2ft': 60, '90cm-3ft': 90, '1-05m-3-5ft': 105 , '1-2m-4ft': 120, '1-8m-5-9ft': 180};
  const selectedHeight = $('.pa_height > div.active').attr('value');
  const meshHeight = heightMap[selectedHeight];
  //qty
  const quantity = Number($("#addToCart .variations_form.cart .quantity .input-text").val());
  //calculate cable tier
  let CableTieQty;
  if (meshHeight >= 100) {
  CableTieQty = Math.ceil((meshLength * quantity * 12) / 100);
  } else {
  CableTieQty = Math.ceil((meshLength * quantity * 8) / 100);
  }
  
  $('.woobt-product-together[data-key="rgil"] input[type="number"]').val(CableTieQty);
  $('.woobt-product-together[data-key="rgil"]').attr('data-qty', CableTieQty);
};

function updateTensioningWireQty() {
  const lengthMap = { '10m-33ft': 10, '25m-82ft': 25, '50m-164ft': 50 };
  const heightMap = {'60cm-2ft': 60, '90cm-3ft': 90, '1-05m-3-5ft': 105 , '1-2m-4ft': 120, '1-8m-5-9ft': 180};
  const quantity = Number($("#addToCart .variations_form.cart .quantity .input-text").val());
  const selectedLength = $('.pa_length > div.active').attr('value');
  const selectedHeight = $('.pa_height > div.active').attr('value');
  const meshLength = lengthMap[selectedLength];
  const meshHeight = heightMap[selectedHeight];
  let tensioningWireQty;
  
  if (meshHeight >= 100) {
    tensioningWireQty = Math.ceil((meshLength * 3.1 * quantity) / 95);
  } else {
    tensioningWireQty = Math.ceil((meshLength * 2.1 * quantity) / 95);
  }
  
  const lengthNeeded = quantity * meshLength;
  
  if (lengthNeeded <= 95) {
    tensioningWireQty = calculateTensioningWireQty(meshLength, quantity, 95, meshHeight);
    updateInputFieldsQty('8jwr', tensioningWireQty);
    uncheckInputFields('79ys');
    uncheckInputFields('uetl');
  } else if (lengthNeeded <= 190) {
    tensioningWireQty = calculateTensioningWireQty(meshLength, quantity, 190, meshHeight);
    updateInputFieldsQty('79ys', tensioningWireQty);
    uncheckInputFields('8jwr');
    uncheckInputFields('uetl');
  } else if (lengthNeeded <= 470) {
    tensioningWireQty = calculateTensioningWireQty(meshLength, quantity, 470, meshHeight);
    updateInputFieldsQty('uetl', tensioningWireQty);
    uncheckInputFields('8jwr');
    uncheckInputFields('79ys');
  }
};
  
function calculateTensioningWireQty(meshLength, quantity, lengthLimit, meshHeight) {
  if (meshHeight >= 100) {
  return Math.ceil((meshLength * 3.1 * quantity) / lengthLimit);
  } else {
  return Math.ceil((meshLength * 2.1 * quantity) / lengthLimit);
  }
};
  
function updateThisProduct() {
    $('#addToCart .variations_form.cart select').each(function (index, el) {
        $(`.woobt-product-this select#${$(this).attr('id')}`).val($(this).val());
        $(`.woobt-product-this select#${$(this).attr('id')}`).trigger('change');
    })
    const getProductQty = Number($("#addToCart .variations_form.cart .quantity .input-text").val());
    $('.woobt-product-this .quantity .input-text').val(getProductQty);
    $('.woobt-product-this .quantity .input-text').attr('value', getProductQty);
};

// 8. Show More/Less Functionality
function initShowMoreLess() {
    const downloadBlock = $('.download-block');
    downloadBlock.addClass('hide-more');
    downloadBlock.after(`<button id="show-more-button">Show More</button>`);
    let showMoreBbutton = $('#show-more-button');
  
    // Set initial button text
    showMoreBbutton.text('Show More');
  
    // Toggle functionality
    showMoreBbutton.on('click', function() {
        if (downloadBlock.hasClass('hide-more')) {
            downloadBlock.removeClass('hide-more');
            $(this).text('Show Less');
        } else {
            downloadBlock.addClass('hide-more');
            $(this).text('Show More');
        }
    });
  
    const commentList = $('#comments .commentlist');
    const hiddenComments = commentList.children('li:nth-child(n+4)');
  
    // Initially set the hidden class
    hiddenComments.addClass('hide-comment');
  
    // Add the Show More button after the comment list
    commentList.after('<button id="show-more-comments">Show More</button>');
    let showMoreButton = $('#show-more-comments');
  
    // Toggle functionality
    showMoreButton.on('click', function() {
        if (hiddenComments.hasClass('hide-comment')) {
            hiddenComments.removeClass('hide-comment');
            $(this).text('Show Less');
        } else {
            hiddenComments.addClass('hide-comment');
            $(this).text('Show More');
            // jump up to #reviews
            $('html, body').animate({
                scrollTop: $('#smb-rating').offset().top
            }, 200);
        }
    });
};

// 9. Gallery and Image Handling
function initGallery() {
    initGalleryPhotoListCw();
};

// 9.1 Customer Gallery Photo List Chicken Wire
function initGalleryPhotoListCw() {

    let photoWrap = jQuery('.gallery-photo-list-chicken-wire');
    let photos = photoWrap.find('.item');
    let	step = Math.floor(photoWrap.width() / photos.innerWidth());
  
    if(step < 2 ){
        step = 2;
    }
    
    photos.each(function (item) {
        if (item < step) {
            jQuery(this).addClass('show');
  
            let imgBox = $(this).find('.img-box');
            let imgURL = imgBox.data('image');
  
            imgBox.css({
                'background-image': 'url(' + imgURL + ')'
            })
        }
  
        if (item == 9) {
            let overlay = `<span class="overlay add-more"><i class="fa fa-solid fa-image"></i>More <br> Photos</span>`;
            let content = $(this).find('.content');
  
            content.append(overlay);
        }
    });
  
    jQuery('body').on('click', '.gallery-photo-list-chicken-wire .add-more', function (e) {
        e.preventDefault();
  
        jQuery(this).remove();
  
        let hiddenPhotos = photoWrap.find('.item:not(.show)');
  
        hiddenPhotos.each(function (item) {
            if (item < step) {
                jQuery(this).addClass('show');
  
                let imgBox = $(this).find('.img-box');
                let imgURL = imgBox.data('image');
  
                imgBox.css({
                    'background-image': 'url(' + imgURL + ')'
                })
            }
        });
  
        hiddenPhotos = photoWrap.find('.item:not(.show)');
        let showedPhotos = photoWrap.find('.item.show');
  
        if(hiddenPhotos.length > 0){
            showedPhotos.each(function(index){
  
                if(showedPhotos.length - 1 == index ){
                    let overlay = `<span class="overlay add-more"><i class="fa fa-solid fa-image"></i>More <br> Photos</span>`;
                    let lastItem = $(this).find('.content');
  
                    lastItem.append(overlay);
                }
            });
        }
  
        let showLess = photoWrap.find('.show-less');
  
        if (showLess.length == 0 ) {
            let overlayLess =  `<span class="overlay show-less"><i class="fa fa-solid fa-image"></i>Less <br> Photos</span>`;
            let firstItem = photoWrap.find('.show:first-child .content');
  
            firstItem.append(overlayLess);
        }
    });
  
    jQuery('body').on('click', '.gallery-photo-list-chicken-wire .show-less', function (e) {
        e.preventDefault();
  
        jQuery(this).remove();
  
        let showedPhotos = photoWrap.find('.item.show');
  
        if(showedPhotos.length > step){
            showedPhotos.each(function (item) {
                if (showedPhotos.length - step < step){
                    if (item < showedPhotos.length - step) {
                        jQuery(this).removeClass('show');
                    }
                } else{
                    if (item <  step) {
                        jQuery(this).removeClass('show');
                    }
                }
            });
        }
  
        showedPhotos = photoWrap.find('.item.show');
        let addMore = photoWrap.find('.add-more');
  
        if(showedPhotos.length > step ){
            showedPhotos.each(function(index){
                if(index==0 ){
                    let overlayLess =  `<span class="overlay show-less"><i class="fa fa-solid fa-image"></i>Less <br> Photos</span>`;
                    let firstItem = $(this).find('.content');
                    firstItem.append(overlayLess);
                }
            })
        }
  
        if(addMore.length == 0){
            showedPhotos.each(function(index){
                if(showedPhotos.length - 1 == index ){
                    let overlay = `<span class="overlay add-more"><i class="fa fa-solid fa-image"></i>More <br> Photos</span>`;
                    let lastItem = $(this).find('.content');
  
                    lastItem.append(overlay);
                }
  
            });
        }
    });
  
    let hrefs = []
    $(".gallery-photo-list-chicken-wire a").each(function () {
        hrefs.push($(this).attr('href'));
    });
  
    $(".gallery-photo-list-chicken-wire a").on('click', function (e) {
        e.preventDefault();
  
        let modalContent = `
            <div class='term-modal gallery-modal'>
            <div class='gallery-modal-content'>
            <span class='aira-close'>&times;</span>
            <div class='modal-image-container'>
            <button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button" style="display: block;">Previous</button>
            <img class='gallery-slider-modal-img'  src='${ $(this).attr('href') }' >
            <button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button" style="display: block;">Next</button>
            </div>
            </div>
            </div> 
        `;
  
        $('#footer').before().append(modalContent);
  
        $('.term-modal').show();
  
        // clicked on Modal Next Button
        $('.slick-next').click(function () {
            let current = $('.gallery-slider-modal-img').attr('src');
            let currentIndex = hrefs.indexOf(current);
  
            if (currentIndex == hrefs.length - 1) {
                currentIndex = -1
            }
            nextImg = currentIndex + 1;
            $('.gallery-slider-modal-img').attr("src", hrefs[nextImg]);
        });
  
        // clicked on Modal Prev Button
        $('.slick-prev').click(function () {
            let current = $('.gallery-slider-modal-img').attr('src');
            let currentIndex = hrefs.indexOf(current);
  
            if (currentIndex == 0) {
                currentIndex = hrefs.length;
            }
            prevImg = currentIndex - 1;
            $('.gallery-slider-modal-img').attr("src", hrefs[prevImg]);
        });
    })
  
    $(window).click(function (event) {
        if ((event.target.className == 'term-modal gallery-modal') || (event.target.className == 'aira-close')) {
            $('.term-modal.gallery-modal').remove();
        }
    });
};

// 10. Accordion Toggles
function initAccordionToggles() {
    $('.elementor-toggle-item .elementor-tab-title').on('click', function(e) {
        var $this = $(this);
        
        // $this.hasClass('elementor-active');
        if (!$this.hasClass('elementor-active')) {
            // Close all other toggles
            closeAllToggles();
        }
    });
};

// 11. Cart and Checkout
function initCart() {
    alertAddtoCart();
    addToCart('.woobt-form .single_add_to_cart_button');
};

// 11.1 Alert Add to Cart
function alertAddtoCart() {
var $customMessage = '<div id="custom-message" style="display:none; font-size:12px;"></div>';
var addToCartButton = $('.single_variation_wrap .single_add_to_cart_button');
addToCartButton.after($customMessage);

addToCartButton.click(function(e) {
    e.preventDefault(); // Prevent the form from submitting                
    
    // First, check if the button has the 'disabled' class
    if ($(this).hasClass('disabled')) {
        e.stopPropagation();

        var requiredClasses = ['pa_height', 'pa_length', 'pa_hole-size', 'gauge-wire-diameter', 'pa_grade'];
        var errorMessage = ''; // To store the error message

        // Loop through each required class
        $.each(requiredClasses, function(index, className) {
            var selector = '.' + className;
            var div = $(selector);

            // Check if the div has an active child
            if (!div.find('.active').length) { // Assuming 'active' is the class applied to selected options
                optionTitles = className.replace('pa_', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                if (optionTitles === 'Gauge Wire Diameter') {
                    optionTitles = 'Wire Diameter';
                }
                errorMessage += 'Please select the "' + optionTitles + '" option.<br>';
                
                // Avoid appending multiple messages by checking if it already exists
                if (div.find('.select-option-text').length === 0) {
                    div.find('h5>span').append('<span class="select-option-text" style="color:red; font-size:12px;"><< Please select option</span>');
                }

            }
        });

        // If there is an error message, show it and prevent form submission
        if (errorMessage) {
            $('#custom-message').html(errorMessage).slideDown();
        } else {
            $('#custom-message').slideUp(); // Hide the message if all attributes are selected
            $('.select-option-text').remove();
        }

    } else {
        addToCart('.single_variation_wrap .single_add_to_cart_button');
    }
});
};

// 11.2 Add to Cart
function addToCart(className) {
$(className).click(function () {
    // Create the notice if it doesn't exist
    if ($(".custom-slide-notice").length === 0) {
        $("body").append('<div class="custom-slide-notice"></div>');
    }
    
    $(".custom-slide-notice").text("Added to cart");
    $(".custom-slide-notice").addClass("show");
    
    setTimeout(function() {
        $(".custom-slide-notice").removeClass("show");
    }, 5000);
});
};

// 12. Create header div
function createHeaderDiv(className, text, content) {
    $('#addToCart form table').before(`
      <div class="${className}">
        <h5>${text} 
          <span style="display:inline-block;" class="info-wrapper ${className}-info">
            <img width="15" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/03/octicon_info-24.svg" alt="Info icon" class="info-icon">
            <div class="info-box hide-box">
              <span class="info-box-close">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 6L1 1M6 6L11 11M6 6L11 1M6 6L1 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>
              </span>
              <div class="wire-info">
                ${content}
              </div>
            </div>
          </span> 
        </h5>
      </div>`);
};

// 13. Update with clicked option
function clickToUpdate(className) {
    $(`.${className} > div`).click(function () {
        $(`.${className} h5 span.select-option-text`).remove();
        // check if custom message is visible
        if ($('#custom-message').is(':visible')) {
            $('#custom-message').slideUp();
        }
        if ($(this).hasClass('active')) {
            $(`.${className} > div`).removeClass('active');
            $(`#${className}`).val('');
            $(`#${className}`).trigger('change');
        } else if ($(this).css('cursor') != 'not-allowed') {
            $(`#${className}`).val($(this).attr('value'));
            $(`#${className}`).trigger('change');
            $(`.${className} > div`).removeClass('active');
            $(this).addClass('active');
        }
    });
  
    $(`.${className} > div[value="${$(`#${className}`).val()}"]`).addClass('active');
}

// 14. Apply styles for options
function applyStyles(selector) {
    $(`.${selector} > div`).css('display', "none");
  
    $(`#addToCart .variations_form.cart select#${selector} option`).each(function name(index, el) {
        $(`.${selector} > div[value="${$(this).val()}"]`).css({
            'display': 'block',
            'pointer-events': 'unset',
            'opacity': '1',
            'cursor': 'pointer'
        });
    });
  
    $(`.${selector} > div`).each(function (index, el) {
        if ($(el).css('display') == 'none') {
            $(el).css({
                'display': 'block',
                'opacity': '0.2',
                'cursor': 'not-allowed'
            });
        }
    });
  
    $(`.${selector} > div`).each(function (index, el) {
        if ($(el).attr('value') == $(`#${selector}`).val()) {
            $(`.${selector} > div`).removeClass('active');
            $(el).addClass('active');
            return false;
        }
    });
};

// ... (other utility functions)
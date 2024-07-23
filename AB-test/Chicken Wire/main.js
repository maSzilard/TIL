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
}

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
}

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
}

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
}

function calculateTensioningWireQty(meshLength, quantity, lengthLimit, meshHeight) {
if (meshHeight >= 100) {
  return Math.ceil((meshLength * 3.1 * quantity) / lengthLimit);
} else {
  return Math.ceil((meshLength * 2.1 * quantity) / lengthLimit);
}
}

function updateThisProduct() {
$('#addToCart .variations_form.cart select').each(function (index, el) {
  $(`.woobt-product-this select#${$(this).attr('id')}`).val($(this).val());
  $(`.woobt-product-this select#${$(this).attr('id')}`).trigger('change');
})
const getProductQty = Number($("#addToCart .variations_form.cart .quantity .input-text").val());
$('.woobt-product-this .quantity .input-text').val(getProductQty);
$('.woobt-product-this .quantity .input-text').attr('value', getProductQty);
}

function updateWooPrice() {
if ($('.woobt-total .amount').length == 2) {
  let woobt_original = $('.woobt-total .amount').eq(0).text();
  let woobt_discounted = $('.woobt-total .amount').eq(1).text();
  $('.woobt-products button[type="submit"]').html(`ADD TO ORDER • <del>${woobt_original}</del> ${woobt_discounted}`)
} else {
  $('.woobt-products button[type="submit"]').html(`ADD TO ORDER • ${$('.woobt-total .amount').text()}`);
}
}

function generateBoxes(elName, elId, elClass) {
$('#addToCart form table').after(`<div class="${elClass}"><h5>${elName}</h5></div>`);

$(`#addToCart table #${elId} option`).each(function (index, el) {
  if ($(el).val().length > 0) {
    $(`.${elClass}`).append(`<div value="${$(el).attr('value')}"> ${$(el).text()} </div>`)
  }
});

$(`.${elClass} > div`).click(function () {
  if ($(this).hasClass('active')) {
    $(`.${elClass} > div`).removeClass('active');
    $(`#${elId}`).val('');
    $(`#${elId}`).trigger('change');
  } else {
    $(`#${elId}`).val($(this).attr('value'));
    $(`#${elId}`).trigger('change');
    $(`.${elClass} > div`).removeClass('active');
    $(this).addClass('active');
  }
})

$(`.${elClass} > div[value="${$(`#${elId}`).val()}"]`).addClass('active');
}

function createHeaderDiv(className, text, content) {
$('#addToCart form table').before(`
  <div class="${className}">
    <h5>${text} 
      <span style="display:inline-block; position:relative;" class="info-wrapper ${className}-info">
        <img width="15" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/03/octicon_info-24.svg">
        <div class="hide-box">
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
}

function clickToUpdate(className) {
$(`.${className} > div`).click(function () {
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
})

$(`.${className} > div[value="${$(`#${className}`).val()}"]`).addClass('active');
}

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
}

document.addEventListener('DOMContentLoaded', function () {

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

  // change cart text
  $('#addToCart .single_add_to_cart_button').eq(0).html(`<svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_616_1479)"> <path d="M8.2526 20.9173C8.75887 20.9173 9.16927 20.5069 9.16927 20.0007C9.16927 19.4944 8.75887 19.084 8.2526 19.084C7.74634 19.084 7.33594 19.4944 7.33594 20.0007C7.33594 20.5069 7.74634 20.9173 8.2526 20.9173Z" stroke="white" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/> <path d="M18.3307 20.9173C18.837 20.9173 19.2474 20.5069 19.2474 20.0007C19.2474 19.4944 18.837 19.084 18.3307 19.084C17.8245 19.084 17.4141 19.4944 17.4141 20.0007C17.4141 20.5069 17.8245 20.9173 18.3307 20.9173Z" stroke="white" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/> <path d="M0.914062 1.66797H4.58073L7.0374 13.9421C7.12122 14.3642 7.35081 14.7433 7.68598 15.0131C8.02115 15.2829 8.44054 15.4262 8.87073 15.418H17.7807C18.2109 15.4262 18.6303 15.2829 18.9655 15.0131C19.3006 14.7433 19.5302 14.3642 19.6141 13.9421L21.0807 6.2513H5.4974" stroke="white" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/> </g> <defs> <clipPath id="clip0_616_1479"> <rect width="22" height="22" fill="white" transform="translate(0 0.75)"/> </clipPath> </defs> </svg> &nbsp; Add to Basket`);

  $('.awdr-bulk-customizable-table').addClass('bulk-info-table');
  $('.awdr-bulk-customizable-table').removeClass('awdr-bulk-customizable-table');

  const heightContent = `<div class="height-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
  <div style="text-align:left;">
    <h6>Height</h6>
  </div>
  </div>
  <img style="width:100%;" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/06/chicken-wire-height-diagram-768x768.jpg" width="200px" height="200px">`;

  const lenghtContent = `<div class="lenght-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
  <div style="text-align:left;">
      <h6>Lenght</h6>
    </div>
  </div>
  <img style="width:100%;" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/06/chicken-wire-lenght-diagram-768x768.jpg" width="200px" height="200px">`;
  
  const holeSizeContent = `<div class="holesize-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
  <div style="text-align:left;">
      <h6>Hole Size</h6>
    </div>
  </div>
  <img style="width:100%;" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/06/hole-size-chicken-wire-768x768.jpg" width="200px" height="200px">`;

  const wireDiameter = `<div class="wirediameter-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
  <div style="text-align:left;">
      <h6>Wire Diameter</h6>
    </div>
  </div>
  <img style="width:100%;" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/06/wire-dia-chicken-wire-768x768.jpg" width="200px" height="200px">`;

  const grade = `<div class="grade-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
  <div style="text-align:left;">
      <h6>Grade</h6>
    </div>
  </div>
  <img style="width:100%;" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/06/grade-table2.png" width="200px" height="200px">`;


  // Create Header for select divs
  createHeaderDiv("pa_height", "Height", heightContent);
  createHeaderDiv("pa_length", "Length", lenghtContent);
  createHeaderDiv("pa_hole-size", "Hole Size", holeSizeContent);
  createHeaderDiv("gauge-wire-diameter", "Wire Diameter", wireDiameter);
  createHeaderDiv("pa_grade", "Grade", grade);
  

  $("#addToCart .variations_form.cart .quantity .input-text").change(() => {
  updateTPostQty();
  updatePegsQty();
  updateCableTieQty();
  updateTensioningWireQty();
  updateThisProduct();
  });

  const ids = ['pa_height', 'pa_length', 'pa_hole-size', 'gauge-wire-diameter', 'pa_grade'];

  ids.forEach(id => {
    $(`#addToCart table #${id} option`).each(function (index, el) {
      if ($(el).val().length > 0) {
        $(`.${id}`).append(`<div value="${$(el).attr('value')}"> ${$(el).text()} </div>`);
      }
    });
  });

  // Click on select divs
  clickToUpdate('pa_height');
  clickToUpdate('pa_length');
  clickToUpdate('pa_hole-size');
  clickToUpdate('gauge-wire-diameter');
  clickToUpdate('pa_grade');

  // add text
  $('#addToCart .woocommerce-variation-add-to-cart .quantity').before('<h5>Quantity</h5>');

  // change
  $('#addToCart .variations_form.cart select').change(function () {
    setTimeout(() => {

      $('#addToCart tbody select#pa_length, #addToCart tbody select#pa_height, #addToCart tbody select#pa_hole-size, #addToCart tbody select#gauge-wire-diameter, #addToCart tbody select#pa_grade').each(function (index, el) {
        if ($(this).val().length != 0) {
          $(this).addClass('active')
        } else {
          $(this).removeClass('active')
        }
      })
    
      // highlight selected options
      applyStyles('pa_height');
      applyStyles('pa_length');
      applyStyles('pa_hole-size');
      applyStyles('gauge-wire-diameter');
      applyStyles('pa_grade');
  
      updateTPostQty();
      updatePegsQty();
      updateCableTieQty();
      updateTensioningWireQty();
      updateThisProduct();

      //change select text to 'Select'
      $('#addToCart select, .woobt-product select').each(function (index, el) {
        $(el)[0].options[0].text = 'Select';
      })

    }, 200)
  });


// text
$('.woobt-actions').appendTo('.woobt-products'); // move fbt button
$('.woobt-products').prepend('<h6>Suggested Add On Quantity <span style="display:inline-block; "> Select All <input class="selectAll" checked type="checkbox"> </span></h6>');


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

$('#addToCart .woocommerce-variation-add-to-cart.variations_button .single_add_to_cart_button').before($('.woocommerce-variation.single_variation'))

// boxes
const createInfoWrapper = (additionalClass = '', content = '') => {
  return `<span style="display:inline-block; position:relative;" class="info-wrapper ${additionalClass}">
    <img width="15" src="https://env-wirefence-wfpremstg.kinsta.cloud/wp-content/uploads/2024/03/octicon_info-24.svg">
    <div class="hide-box"><span class="info-box-close"> <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 6L1 1M6 6L11 11M6 6L11 1M6 6L1 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </span>${content}</div>
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
    <h6>Pegs</h6>
  </div>
</div>`;

const cableTiesContent = `<div class="cableTies-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
  <div style="text-align:left;">
    <h6>Cable Ties</h6>
  </div>
</div>`;

const tensioningWireContent = `<div class="tensioningwire-content" style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
  <div style="text-align:left;">
  <h6>Tensioning Wire</h6>
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
$('.info-wrapper > img').click(function () {
  if ($(this).parent().children('div').attr('class') == "hide-box") {
    $(this).parent().children('div').removeClass('hide-box');
  } else {
    $(this).parent().children('div').addClass('hide-box')
  }
})

$(window).click(function (e) {
  if ($(e.target).closest('.info-wrapper').length != 1) {
    $('.info-wrapper > div').addClass('hide-box');
  }
})

$('.info-box-close').click(function () {
  $('.info-wrapper > div').addClass('hide-box')
})

const selectAllCheckboxes = (selectAllCheckbox, checkboxes) => {
  selectAllCheckbox.change(function () {
    if (selectAllCheckbox.is(':checked')) {
      checkboxes.prop('checked', true);
      checkboxes.trigger('change');
    } else if (!selectAllCheckbox.is(':checked')) {
      checkboxes.prop('checked', false);
      checkboxes.trigger('change');
    }
  });
};

const selectAll = $('.selectAll');
const checkboxes = $('.woobt-products #woobt_checkbox_1, .woobt-products #woobt_checkbox_2, .woobt-products #woobt_checkbox_3, .woobt-products #woobt_checkbox_4, .woobt-products #woobt_checkbox_5, .woobt-products #woobt_checkbox_6');
selectAllCheckboxes(selectAll, checkboxes);

$('.woobt-products button[type="submit"]').before($('.woobt-total.woobt-text'));

$('.woobt-price').append('<span style="display:inline-block; font-size: 14px;">each</span>');
$('#addToCart select, .woobt-product select').each(function (index, el) {
  $(el)[0].options[0].text = 'Select';
});

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

});
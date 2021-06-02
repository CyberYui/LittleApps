window.onload = function() {
    
    'use strict';

    let id = $('#orderId').html();
    
    // barcode 要单独初始化
    $('#barcode').JsBarcode(id);

}
Application.$controller("MainPageController", ["$scope", function($scope) {
    "use strict";

    /* perform any action on widgets/variables within this block */
    $scope.onPageReady = function() {
        /*
         * variables can be accessed through '$scope.Variables' property here
         * e.g. to get dataSet in a staticVariable named 'loggedInUser' use following script
         * $scope.Variables.loggedInUser.getData()
         *
         * widgets can be accessed through '$scope.Widgets' property here
         * e.g. to get value of text widget named 'username' use following script
         * '$scope.Widgets.username.datavalue'
         */
    };


    $scope.askWatsonWatsonresponse = function($isolateScope) {
        var data = $isolateScope.watsonresponse;

        var output_text = _.get(data, 'output.text');
        if (typeof output_text != 'undefined') {
            if (output_text[0].startsWith('(--OMS_GET_ORDERS_BY_PRODUCT--)')) {
                var entities = _.get(data, 'entities');
                entities.forEach(function(entity, index) {
                    if (entity.entity == 'Products') {
                        output_text[0] = 'I will find you the orders with ' + entity.value;
                        $scope.Variables.htmlContent.dataSet = {
                            "dataValue": ''
                        };
                        $scope.Variables.product.dataSet = {
                            "dataValue": entity.value
                        };
                    }
                });
            } else if (output_text[0].startsWith('(--OMS_GET_ORDER_STATUS--)')) {
                var input = _.get(data, 'input');
                output_text[0] = 'I will find you the status of order number ' + input.text;
                $scope.Variables.htmlContent.dataSet = {
                    "dataValue": ''
                };
                $scope.Variables.order_for_status.dataSet = {
                    "dataValue": input.text
                };
            } else if (output_text[0].startsWith('(--OMS_GET_ORDER_DETAIL--)')) {
                var input = _.get(data, 'input');
                output_text[0] = 'I will find you the line items from order number ' + input.text;
                $scope.Variables.htmlContent.dataSet = {
                    "dataValue": ''
                };
                $scope.Variables.order_for_detail.dataSet = {
                    "dataValue": input.text
                };
            } else if (output_text[0].startsWith('(--OMS_GET_ORDERS_ALL--)')) {
                output_text[0] = 'Here is a list of all recent orders'
                $scope.Variables.htmlContent.dataSet = {
                    "dataValue": ''
                };
                var counter = $scope.Variables.forceOrdersInvoke.dataSet.dataValue;
                counter += 1;
                $scope.Variables.forceOrdersInvoke.dataSet = {
                    "dataValue": counter
                };
            } else {
                $scope.Variables.htmlContent.dataSet = {
                    "dataValue": ''
                };

            }

        }

    };

    $scope.svcOrdersByProductonResult = function(variable, data) {
        if (data.results.PRODUCT != '') {
            var msg = '<table style="text-align: left; " border="0" cellpadding="2" cellspacing="2"><tbody>';
            msg += '<tr><td><b>Product:</b></td><td colspan="5">' + data.results.PRODUCT + '</td></tr>';
            msg += '<tr><td><b>Order Number</b></td><td><b>Delivery Date</b></td><td><b>Description</b></td><td><b>Order Quantity</b></td><td><b>Modify Quantity</b></td><td><b>Ship Quantity</b></td></tr>';
            data.results.ORDERS.forEach(function(order, index) {
                msg += '<tr><td>' + order.ORDER_NBR + '</td><td>' + order.SCHEDULE_DELIVERY_DT + '</td><td>' + order.ITEM_DSC + '</td><td>' + order.ORDER_QTY + '</td><td>' + order.MODIFY_QTY + '</td><td>' + order.SHIP_QTY + '</td></tr>';
            });

            msg += '</tbody></table>';
            $scope.Variables.htmlContent.dataSet = {
                "dataValue": msg
            };
            $scope.Variables.product.dataSet = {
                "dataValue": ''
            };
        };
    };


    $scope.svcOrderStatusonResult = function(variable, data) {
        if (data.results.ORDER_NBR != '') {
            var msg = '<table style="text-align: left; " border="0" cellpadding="2" cellspacing="2"><tbody>';
            msg += '<tr><td><b>Order Number:</b></td><td colspan="5">' + data.results.ORDER_NBR + '</td></tr>';
            msg += '<tr><td><b>Order Date</b></td><td><b>Whse</b></td><td><b>Store</b></td><td><b>User ID</b></td><td><b>Delivery Date</b></td></tr>';
            data.results.ORDER_STATUS.forEach(function(order, index) {
                msg += '<tr><td>' + order.ORDER_DT + '</td><td>' + order.SHIP_FACILITY_ID + '</td><td>' + order.DEST_FACILITY_ID + '</td><td>' + order.DW_CREATE_USER_ID + '</td><td>' + order.SCHEDULE_DELIVERY_DT + '</td></tr>';
            });

            msg += '</tbody></table>';
            $scope.Variables.htmlContent.dataSet = {
                "dataValue": msg
            };
            $scope.Variables.order_for_status.dataSet = {
                "dataValue": ''
            };
        };

    };


    $scope.svcOrderDetailonResult = function(variable, data) {
        if (data.results.ORDER_NBR != '') {
            var msg = '<table style="text-align: left; " border="0" cellpadding="2" cellspacing="2"><tbody>';
            msg += '<tr><td><b>Order Number:</b></td><td colspan="5">' + data.results.ORDER_NBR + '</td></tr>';
            msg += '<tr><td><b>Item</b></td><td><b>Order Qty</b></td><td><b>Modify Qty</b></td><td><b>Ship Qty</b></td></tr>';
            data.results.ORDER_DETAIL.forEach(function(order, index) {
                msg += '<tr><td>' + order.ITEM_DSC + '</td><td>' + order.ORDER_QTY + '</td><td>' + order.MODIFY_QTY + '</td><td>' + order.SHIP_QTY + '</td></tr>';
            });

            msg += '</tbody></table>';
            $scope.Variables.htmlContent.dataSet = {
                "dataValue": msg
            };
            $scope.Variables.order_for_status.dataSet = {
                "dataValue": ''
            };
        };
    };


    $scope.svcOrdersonResult = function(variable, data) {
        if ($scope.Variables.forceOrdersInvoke.dataSet.dataValue > 0) {
            console.log('counter: ', $scope.Variables.forceOrdersInvoke.dataSet.dataValue);
            var msg = '<table style="text-align: left; " border="0" cellpadding="2" cellspacing="2"><tbody>';
            msg += '<tr><td><b>Store</b></td><td><b>Order Number</b></td><td><b>Order Date</b></td><td><b>Whse</b></td></tr>';
            data.results.ORDERS.forEach(function(order, index) {
                msg += '<tr><td>' + order.DEST_FACILITY_ID + '</td><td>' + order.ORDER_NBR + '</td><td>' + order.ORDER_DT + '</td><td>' + order.SHIP_FACILITY_ID + '</td></tr>';
            });

            msg += '</tbody></table>';
            $scope.Variables.htmlContent.dataSet = {
                "dataValue": msg
            };
        };
    };
}]);
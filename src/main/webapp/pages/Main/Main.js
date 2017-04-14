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
            } else
                output_text[0] = 'Handler Undefinded for ' + output_text;
        }

    };

    $scope.svcOrdersByProductonResult = function(variable, data) {
        var msg = '<table style="text-align: left; " border="0" cellpadding="2" cellspacing="2"><tbody>';
        msg += '<tr><td><b>Product:</b></td><td colspan="5">' + data.results.PRODUCT + '</td></tr>';
        msg += '<tr><td><b>Order Number</b></td><td><b>Delivery Date</b></td><td><b>Description</b></td><td><b>Order Quantity</b></td><td><b>Modify Quantity</b></td><td><b>Ship Quantity</b></td></tr>';
        data.results.ORDERS.forEach(function(order, index) {
            msg += '<tr><td>' + order.ORDER_NBR + '</td><td>' + order.SCHEDULE_DELIVERY_DT + '</td><td>' + order.ITEM_DSC + '</td><td>' + order.ORDER_QTY + '</td><td>' + order.MODIFY_QTY + '</td><td>' + order.SHIP_QTY + '</td></tr>';
        });

        msg += '</tbody></table>';
        console.log('msg: ', msg);
        $scope.Variables.htmlContent.dataSet = {
            "dataValue": msg
        };
    };

}]);
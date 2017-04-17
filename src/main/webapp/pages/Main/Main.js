Application.$controller("MainPageController", ["$scope", function($scope) {
    "use strict";

    /* perform any action on widgets/variables within this block */
    $scope.onPageReady = function() {
        $scope.Widgets.OrdersContainer.show = false;
        $scope.Widgets.OrderStatusContainer.show = false;
        $scope.Widgets.OrderDetailContainer.show = false;
        $scope.Widgets.OrdersByProductContainer.show = false;
        $scope.Widgets.OrdersByStoreContainer.show = false;
        $scope.Widgets.OrdersByUserContainer.show = false;
        $scope.Widgets.OrdersByProductAndStoreContainer.show = false;
        $scope.Widgets.OEByStoreContainer.show = false;
        $scope.Widgets.OEByProductAndStoreContainer.show = false;
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
            } else if (output_text[0].startsWith('(--OMS_GET_ORDERS_STORE--)')) {
                var input = _.get(data, 'input');
                output_text[0] = 'I will find you a list of orders by store number ' + input.text;
                $scope.Variables.htmlContent.dataSet = {
                    "dataValue": ''
                };
                $scope.Variables.store.dataSet = {
                    "dataValue": input.text
                };
            } else if (output_text[0].startsWith('(--OMS_GET_ORDERS_USER--)')) {
                var input = _.get(data, 'input');
                output_text[0] = 'I will find a list of orders by user ' + input.text;
                $scope.Variables.htmlContent.dataSet = {
                    "dataValue": ''
                };
                $scope.Variables.user.dataSet = {
                    "dataValue": input.text
                };
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
            $scope.Widgets.OrdersContainer.show = false;
            $scope.Widgets.OrderStatusContainer.show = false;
            $scope.Widgets.OrderDetailContainer.show = false;
            $scope.Widgets.OrdersByProductContainer.show = true;
            $scope.Widgets.OrdersByStoreContainer.show = false;
            $scope.Widgets.OrdersByUserContainer.show = false;
            $scope.Widgets.OrdersByProductAndStoreContainer.show = false;
            $scope.Widgets.OEByStoreContainer.show = false;
            $scope.Widgets.OEByProductAndStoreContainer.show = false;
        };
    };


    $scope.svcOrderStatusonResult = function(variable, data) {
        if (data.results.ORDER_NBR != '') {
            $scope.Widgets.OrdersContainer.show = false;
            $scope.Widgets.OrderStatusContainer.show = true;
            $scope.Widgets.OrderDetailContainer.show = false;
            $scope.Widgets.OrdersByProductContainer.show = false;
            $scope.Widgets.OrdersByStoreContainer.show = false;
            $scope.Widgets.OrdersByUserContainer.show = false;
            $scope.Widgets.OrdersByProductAndStoreContainer.show = false;
            $scope.Widgets.OEByStoreContainer.show = false;
            $scope.Widgets.OEByProductAndStoreContainer.show = false;

        };

    };


    $scope.svcOrderDetailonResult = function(variable, data) {
        if (data.results.ORDER_NBR != '') {
            $scope.Widgets.OrdersContainer.show = false;
            $scope.Widgets.OrderStatusContainer.show = false;
            $scope.Widgets.OrderDetailContainer.show = true;
            $scope.Widgets.OrdersByProductContainer.show = false;
            $scope.Widgets.OrdersByStoreContainer.show = false;
            $scope.Widgets.OrdersByUserContainer.show = false;
            $scope.Widgets.OrdersByProductAndStoreContainer.show = false;
            $scope.Widgets.OEByStoreContainer.show = false;
            $scope.Widgets.OEByProductAndStoreContainer.show = false;
        };
    };


    $scope.svcOrdersonResult = function(variable, data) {
        if ($scope.Variables.forceOrdersInvoke.dataSet.dataValue > 0) {
            $scope.Widgets.OrdersContainer.show = true;
            $scope.Widgets.OrderStatusContainer.show = false;
            $scope.Widgets.OrderDetailContainer.show = false;
            $scope.Widgets.OrdersByProductContainer.show = false;
            $scope.Widgets.OrdersByStoreContainer.show = false;
            $scope.Widgets.OrdersByUserContainer.show = false;
            $scope.Widgets.OrdersByProductAndStoreContainer.show = false;
            $scope.Widgets.OEByStoreContainer.show = false;
            $scope.Widgets.OEByProductAndStoreContainer.show = false;
        };
    };

    $scope.svcOrdersByUseronResult = function(variable, data) {
        if (data.results.DW_CREATE_USER_ID != '') {
            $scope.Widgets.OrdersContainer.show = false;
            $scope.Widgets.OrderStatusContainer.show = false;
            $scope.Widgets.OrderDetailContainer.show = false;
            $scope.Widgets.OrdersByProductContainer.show = false;
            $scope.Widgets.OrdersByStoreContainer.show = false;
            $scope.Widgets.OrdersByUserContainer.show = true;
            $scope.Widgets.OrdersByProductAndStoreContainer.show = false;
            $scope.Widgets.OEByStoreContainer.show = false;
            $scope.Widgets.OEByProductAndStoreContainer.show = false;
        };
    };


    $scope.svcOrdersByStoreonResult = function(variable, data) {
        if (data.results.DEST_FACILITY_ID != '') {
            $scope.Widgets.OrdersContainer.show = false;
            $scope.Widgets.OrderStatusContainer.show = false;
            $scope.Widgets.OrderDetailContainer.show = false;
            $scope.Widgets.OrdersByProductContainer.show = false;
            $scope.Widgets.OrdersByStoreContainer.show = true;
            $scope.Widgets.OrdersByUserContainer.show = false;
            $scope.Widgets.OrdersByProductAndStoreContainer.show = false;
            $scope.Widgets.OEByStoreContainer.show = false;
            $scope.Widgets.OEByProductAndStoreContainer.show = false;
        };
    };


    $scope.svcOrdersByProductAndStoreonResult = function(variable, data) {
        $scope.Widgets.OrdersContainer.show = false;
        $scope.Widgets.OrderStatusContainer.show = false;
        $scope.Widgets.OrderDetailContainer.show = false;
        $scope.Widgets.OrdersByProductContainer.show = false;
        $scope.Widgets.OrdersByStoreContainer.show = false;
        $scope.Widgets.OrdersByUserContainer.show = false;
        $scope.Widgets.OrdersByProductAndStoreContainer.show = true;
        $scope.Widgets.OEByStoreContainer.show = false;
        $scope.Widgets.OEByProductAndStoreContainer.show = false;
    };


    $scope.svcOrderExceptionsByStoreonResult = function(variable, data) {
        $scope.Widgets.OrdersContainer.show = false;
        $scope.Widgets.OrderStatusContainer.show = false;
        $scope.Widgets.OrderDetailContainer.show = false;
        $scope.Widgets.OrdersByProductContainer.show = false;
        $scope.Widgets.OrdersByStoreContainer.show = false;
        $scope.Widgets.OrdersByUserContainer.show = false;
        $scope.Widgets.OrdersByProductAndStoreContainer.show = false;
        $scope.Widgets.OEByStoreContainer.show = true;
        $scope.Widgets.OEByProductAndStoreContainer.show = false;
    };


    $scope.svcOrderExceptionsByProductAndStoreonResult = function(variable, data) {
        $scope.Widgets.OrdersContainer.show = false;
        $scope.Widgets.OrderStatusContainer.show = false;
        $scope.Widgets.OrderDetailContainer.show = false;
        $scope.Widgets.OrdersByProductContainer.show = false;
        $scope.Widgets.OrdersByStoreContainer.show = false;
        $scope.Widgets.OrdersByUserContainer.show = false;
        $scope.Widgets.OrdersByProductAndStoreContainer.show = false;
        $scope.Widgets.OEByStoreContainer.show = false;
        $scope.Widgets.OEByProductAndStoreContainer.show = true;
    };


    $scope.text8Change = function($event, $isolateScope, newVal, oldVal) {
        $scope.Variables.product.dataSet = {
            "dataValue": newVal
        };
        $scope.Widgets.OrdersContainer.show = false;
        $scope.Widgets.OrderStatusContainer.show = false;
        $scope.Widgets.OrderDetailContainer.show = false;
        $scope.Widgets.OrdersByProductContainer.show = true;
        $scope.Widgets.OrdersByStoreContainer.show = false;
        $scope.Widgets.OrdersByUserContainer.show = false;
        $scope.Widgets.OrdersByProductAndStoreContainer.show = false;
        $scope.Widgets.OEByStoreContainer.show = false;
        $scope.Widgets.OEByProductAndStoreContainer.show = false;
    };


    $scope.text9Change = function($event, $isolateScope, newVal, oldVal) {
        $scope.Variables.store.dataSet = {
            "dataValue": newVal
        };
        $scope.Widgets.OrdersContainer.show = false;
        $scope.Widgets.OrderStatusContainer.show = false;
        $scope.Widgets.OrderDetailContainer.show = false;
        $scope.Widgets.OrdersByProductContainer.show = false;
        $scope.Widgets.OrdersByStoreContainer.show = true;
        $scope.Widgets.OrdersByUserContainer.show = false;
        $scope.Widgets.OrdersByProductAndStoreContainer.show = false;
        $scope.Widgets.OEByStoreContainer.show = false;
        $scope.Widgets.OEByProductAndStoreContainer.show = false;
    };


    $scope.text10Change = function($event, $isolateScope, newVal, oldVal) {
        $scope.Variables.user.dataSet = {
            "dataValue": newVal
        };
        $scope.Widgets.OrdersContainer.show = false;
        $scope.Widgets.OrderStatusContainer.show = false;
        $scope.Widgets.OrderDetailContainer.show = false;
        $scope.Widgets.OrdersByProductContainer.show = false;
        $scope.Widgets.OrdersByStoreContainer.show = true;
        $scope.Widgets.OrdersByUserContainer.show = false;
        $scope.Widgets.OrdersByProductAndStoreContainer.show = false;
        $scope.Widgets.OEByStoreContainer.show = false;
        $scope.Widgets.OEByProductAndStoreContainer.show = false;
    };


    $scope.text11Change = function($event, $isolateScope, newVal, oldVal) {
        $scope.Variables.product_for_product_and_store.dataSet = {
            "dataValue": newVal
        };
    };


    $scope.text13Change = function($event, $isolateScope, newVal, oldVal) {
        $scope.Variables.store_for_product_and_store.dataSet = {
            "dataValue": newVal
        };
        $scope.Widgets.OrdersContainer.show = false;
        $scope.Widgets.OrderStatusContainer.show = false;
        $scope.Widgets.OrderDetailContainer.show = false;
        $scope.Widgets.OrdersByProductContainer.show = false;
        $scope.Widgets.OrdersByStoreContainer.show = false;
        $scope.Widgets.OrdersByUserContainer.show = false;
        $scope.Widgets.OrdersByProductAndStoreContainer.show = true;
        $scope.Widgets.OEByStoreContainer.show = false;
        $scope.Widgets.OEByProductAndStoreContainer.show = false;

    };


    $scope.text14Change = function($event, $isolateScope, newVal, oldVal) {
        $scope.Variables.order_for_detail.dataSet = {
            "dataValue": newVal
        };
        $scope.Widgets.OrdersContainer.show = false;
        $scope.Widgets.OrderStatusContainer.show = false;
        $scope.Widgets.OrderDetailContainer.show = true;
        $scope.Widgets.OrdersByProductContainer.show = false;
        $scope.Widgets.OrdersByStoreContainer.show = false;
        $scope.Widgets.OrdersByUserContainer.show = false;
        $scope.Widgets.OrdersByProductAndStoreContainer.show = false;
        $scope.Widgets.OEByStoreContainer.show = false;
        $scope.Widgets.OEByProductAndStoreContainer.show = false;

    };


    $scope.text15Change = function($event, $isolateScope, newVal, oldVal) {
        $scope.Variables.order_for_status.dataSet = {
            "dataValue": newVal
        };
        $scope.Widgets.OrdersContainer.show = false;
        $scope.Widgets.OrderStatusContainer.show = true;
        $scope.Widgets.OrderDetailContainer.show = false;
        $scope.Widgets.OrdersByProductContainer.show = false;
        $scope.Widgets.OrdersByStoreContainer.show = false;
        $scope.Widgets.OrdersByUserContainer.show = false;
        $scope.Widgets.OrdersByProductAndStoreContainer.show = false;
        $scope.Widgets.OEByStoreContainer.show = false;
        $scope.Widgets.OEByProductAndStoreContainer.show = false;

    };


    $scope.text16Change = function($event, $isolateScope, newVal, oldVal) {
        $scope.Variables.store_for_exceptions_by_store.dataSet = {
            "dataValue": newVal
        };
        $scope.Widgets.OrdersContainer.show = false;
        $scope.Widgets.OrderStatusContainer.show = false;
        $scope.Widgets.OrderDetailContainer.show = false;
        $scope.Widgets.OrdersByProductContainer.show = false;
        $scope.Widgets.OrdersByStoreContainer.show = false;
        $scope.Widgets.OrdersByUserContainer.show = false;
        $scope.Widgets.OrdersByProductAndStoreContainer.show = false;
        $scope.Widgets.OEByStoreContainer.show = true;
        $scope.Widgets.OEByProductAndStoreContainer.show = false;

    };


    $scope.text17Change = function($event, $isolateScope, newVal, oldVal) {
        $scope.Variables.product_for_exceptions_by_product_and_store.dataSet = {
            "dataValue": newVal
        };
    };


    $scope.text18Change = function($event, $isolateScope, newVal, oldVal) {
        $scope.Variables.store_for_exceptions_by_product_and_store.dataSet = {
            "dataValue": newVal
        };
        $scope.Widgets.OrdersContainer.show = false;
        $scope.Widgets.OrderStatusContainer.show = false;
        $scope.Widgets.OrderDetailContainer.show = false;
        $scope.Widgets.OrdersByProductContainer.show = false;
        $scope.Widgets.OrdersByStoreContainer.show = false;
        $scope.Widgets.OrdersByUserContainer.show = false;
        $scope.Widgets.OrdersByProductAndStoreContainer.show = false;
        $scope.Widgets.OEByStoreContainer.show = false;
        $scope.Widgets.OEByProductAndStoreContainer.show = true;
    };

}]);

Application.$controller("grid1Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("grid3Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("grid4Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("grid4_1Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("grid5Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("grid6Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("grid7Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("grid8Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("grid9Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);
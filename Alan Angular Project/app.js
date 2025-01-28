var app = angular.module('ecommerceApp', []);

app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    // Initialize the necessary variables
    $scope.products = [];
    $scope.cart = [];
    $scope.showCart = false;
    $scope.orderHistory = [];
    
    // Load products from server
    $http.get('http://localhost:8080/api/products')
        .then(function(response) {
            $scope.products = response.data;
        })
        .catch(function(error) {
            console.error("Error fetching products:", error);
            alert("Error fetching products.");
        });

    // Add product to cart
    $scope.addToCart = function(product) {
        let found = false;
        for (let item of $scope.cart) {
            if (item.product.id === product.id) {
                item.quantity++;
                found = true;
                break;
            }
        }
        if (!found) {
            $scope.cart.push({ product: product, quantity: 1 });
        }
    };

    // Remove product from cart
    $scope.removeFromCart = function(item) {
        let index = $scope.cart.indexOf(item);
        if (index > -1) {
            $scope.cart.splice(index, 1);
        }
    };

    // Increment product quantity in cart
    $scope.incrementQuantity = function(item) {
        item.quantity++;
    };

    // Decrement product quantity in cart
    $scope.decrementQuantity = function(item) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            $scope.removeFromCart(item);
        }
    };

    // Calculate the total price of items in the cart
    $scope.getTotal = function() {
        return $scope.cart.reduce(function(total, item) {
            return total + item.product.price * item.quantity;
        }, 0);
    };

    // Checkout process
    $scope.checkout = function() {
        if ($scope.cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
    
        const cartData = $scope.cart.map(item => ({
            id: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price * item.quantity
        }));
    
        // Send the checkout request
        $http.post('http://localhost:8080/api/products/checkout', cartData)
            .then(function(response) {
                // Log the response for debugging (optional)
                console.log(' Added to cart.');
                
                // Show success message regardless of response
                alert('Order placed successfully!');
                    
                // Clear the cart and hide it
                $scope.cart = [];
                $scope.showCart = false;
            })
    };
    
    

    // View order history
    $scope.viewOrderHistory = function() {
        window.location.href = 'order-history.html'; // Consider Angular routing for smoother navigation
    };

    // Check if cart is empty to disable checkout button
    $scope.isCartEmpty = function() {
        return $scope.cart.length === 0;
    };
}]);

app.controller('OrderHistoryController', ['$scope', '$http', function($scope, $http) {
    $scope.orderHistory = [];

    // Load order history from server
    $http.get('http://localhost:8080/api/products/products/orders')
        .then(function(response) {
            $scope.orderHistory = response.data;
        })
        .catch(function(error) {
            console.error("Error fetching order history:", error);
            alert("Error fetching order history.");
        });

         // Delete an order by ID
         $scope.deleteOrder = function(orderId) {
            if (confirm("Are you sure you want to delete this order?")) {
                $http.delete('http://localhost:8080/api/products/orders/${orderID}' + orderId)
                    .then(function(response) {
                        alert(response.data);
                        // Refresh the order history
                        $scope.orderHistory = $scope.orderHistory.filter(order => order.order_id !== orderId);
                    })
                    .catch(function(error) {
                        console.error("Error deleting order:", error);
                        alert("Error deleting order.");
                    });
            }
        };
        

    // Navigate back to the main page
    $scope.goBack = function() {
        window.location.href = 'index.html'; // Consider Angular routing for smoother navigation
    };
}]);

package com.example.ecommerce.dao;

import com.example.ecommerce.model.Product;
import java.util.List;
import java.util.Map;

public interface ProductDAO {
    List<Product> getAllProducts();
    void saveCartItems(List<Product> cartItems);
    
    // ProductDAO.java
List<Map<String, Object>> getOrderHistory();

void deleteOrder(int orderId);

}

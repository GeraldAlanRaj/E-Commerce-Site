package com.example.ecommerce.service;

import com.example.ecommerce.dao.ProductDAO;
import com.example.ecommerce.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProductService {

    private final ProductDAO productDAO;

    public ProductService(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    public List<Product> getAllProducts() {
        return productDAO.getAllProducts();
    }

    // Add the saveCartItems method
    public void saveCartItems(List<Product> cartItems) {
        productDAO.saveCartItems(cartItems);
    }

    public List<Map<String, Object>> getOrderHistory() {
        return productDAO.getOrderHistory();
}

public void deleteOrder(int orderId) {
    productDAO.deleteOrder(orderId);
}


}

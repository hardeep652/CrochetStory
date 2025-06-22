package com.example.backend_springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend_springboot.model.product;
import com.example.backend_springboot.repository.productrepo;

import jakarta.transaction.Transactional;

@Service
public class productservice {
    
    @Autowired
    productrepo obj;

    @Transactional
    public product addproduct(product p)
    {
        obj.save(p);
        return p;
    }
    
    public List<product> getalldecorproducts()
    {
      return  obj.findByCategory("Home Decor");
    }
    public List<product> getallhairproducts()
    {
      return obj.findByCategory("Hair Accessories");
    }
    public List<product> getallgiftproducts()
    {
      return obj.findByCategory("Gift Articles");
    }
    public List<product> getallotherproducts()
    {
      return obj.findByCategory("Others");
    }
}

package com.example.backend_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend_springboot.model.product;
import java.util.List;


public interface productrepo extends JpaRepository<product, Long>{

    List<product> findByCategory(String category);
}

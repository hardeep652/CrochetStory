package com.example.backend_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend_springboot.model.contact;

@Repository
public interface contactrepo extends JpaRepository<contact, Long>{

}

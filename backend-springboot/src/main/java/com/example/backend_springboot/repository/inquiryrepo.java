package com.example.backend_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend_springboot.model.inquiry;

public interface inquiryrepo extends JpaRepository<inquiry , Integer> {

}

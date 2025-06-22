package com.example.backend_springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend_springboot.model.inquiry;
import com.example.backend_springboot.repository.inquiryrepo;

@Service
public class inquiryservice {

    @Autowired
    inquiryrepo obj;

    public inquiry saveinquiry(inquiry i)
    {
       return obj.save(i);
    }
}

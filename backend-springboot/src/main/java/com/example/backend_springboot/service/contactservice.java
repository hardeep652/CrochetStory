package com.example.backend_springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend_springboot.model.contact;
import com.example.backend_springboot.repository.contactrepo;

@Service
public class contactservice {

    @Autowired
    contactrepo obj;

    public contact addcontact(contact c)
    {
        return obj.save(c);
    }
}

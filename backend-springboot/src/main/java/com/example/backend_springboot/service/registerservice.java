package com.example.backend_springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend_springboot.model.contact;
import com.example.backend_springboot.model.register;
import com.example.backend_springboot.repository.registerrepo;

@Service
public class registerservice {

    @Autowired
    registerrepo obj;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public register adduser(register r)
    {
       r.setPassword(passwordEncoder.encode(r.getPassword()));
       return  obj.save(r);
    }
}

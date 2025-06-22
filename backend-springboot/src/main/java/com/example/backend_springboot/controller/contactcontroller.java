package com.example.backend_springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend_springboot.model.contact;
import com.example.backend_springboot.service.contactservice;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET}) // Added CORS
public class contactcontroller {
  
    @Autowired
    contactservice obj;
    
    @PostMapping("/contact/sendinquiry")
    public String postMethodName(@RequestBody contact c) {
        //TODO: process POST request
        return "the inquiry was recieved"+obj.addcontact(c);
        
    }
    


}

package com.example.backend_springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend_springboot.model.inquiry;
import com.example.backend_springboot.service.inquiryservice;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "https://crochet-story-hiqp-pn2kl8srx-hardeep652s-projects.vercel.app")
public class inquirycontroller {

   @Autowired
   inquiryservice obj;

   @PostMapping("/inquiry/submit")
   public String sendinquiry(@RequestBody inquiry i)
   {
    return "the inquiry was recieved we will reach to you shortly"+obj.saveinquiry(i);
   }


   
}

package com.example.backend_springboot.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class inquiry {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String product_name;
    private int price;
    private String description;
    private String category;
    private String name;
    private long phone_number;
    private String state;
    private String city;
    private String additional_details;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getProduct_name() {
        return product_name;
    }
    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }
    public int getPrice() {
        return price;
    }
    public void setPrice(int price) {
        this.price = price;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public long getPhone_number() {
        return phone_number;
    }
    public void setPhone_number(long phone_number) {
        this.phone_number = phone_number;
    }
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getAdditional_details() {
        return additional_details;
    }
    public void setAdditional_details(String additional_details) {
        this.additional_details = additional_details;
    }

    @Override
    public String toString() {
        return "enquiry [id=" + id + ", product_name=" + product_name + ", price=" + price + ", description="
                + description + ", category=" + category + ", name=" + name + ", phone_number=" + phone_number
                + ", state=" + state + ", city=" + city + ", additional_details=" + additional_details + "]";
    }

    
    
}

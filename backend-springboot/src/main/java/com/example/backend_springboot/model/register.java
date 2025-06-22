package com.example.backend_springboot.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class register {

    @Id
    private String email;
    private String fullname;
    private String password;

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getFullname() {
        return fullname;
    }
    public void setFullname(String fullname) {
        this.fullname = fullname;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "register [email=" + email + ", fullname=" + fullname + ", password=" + password + "]";
    }

    

}

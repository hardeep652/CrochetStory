package com.example.backend_springboot.controller;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.backend_springboot.model.product;
import com.example.backend_springboot.service.productservice;


@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "https://crochet-story-hiqp-pn2kl8srx-hardeep652s-projects.vercel.app", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET}) // Added CORS
public class productcontroller {

    @Autowired
    private productservice obj;

    @Autowired
    private Cloudinary cloudinary;

   @PostMapping("/admin/addproduct")
public ResponseEntity<String> addProduct(
        @RequestParam("product_name") String name,
        @RequestParam("description") String description,
        @RequestParam("price") double price,
        @RequestParam("category") String category,
        @RequestParam("imageURLs") MultipartFile[] imageFiles) {
    try {
        System.out.println("Received " + imageFiles.length + " files"); // Debug
        for (int i = 0; i < imageFiles.length; i++) {
            System.out.println("File " + i + ": " + imageFiles[i].getOriginalFilename()); // Debug
        }

        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile file : imageFiles) {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "folder", "crochetlux/products",
                "resource_type", "image"
            ));
            String url = uploadResult.get("secure_url").toString();
            imageUrls.add(url);
            System.out.println("Uploaded to Cloudinary: " + url); // Debug
        }

        product p = new product();
        p.setProduct_name(name);
        p.setDescription(description);
        p.setPrice(price);
        p.setCategory(category);
        p.setImageURLs(imageUrls);

        product saved = obj.addproduct(p);
        System.out.println("Saved product: " + saved);
        return ResponseEntity.ok("Product added: " + saved.getProduct_name());
    } catch (Exception e) {
        System.err.println("Error adding product: " + e.getMessage());
        return ResponseEntity.status(500).body("Error: " + e.getMessage());
    }
}

    @GetMapping("/getproducts/home-decor")
    public List<product> getproducts() {
       return  obj.getalldecorproducts();
    }

    @GetMapping("/getproducts/hair-accessories")
    public List<product> gethairproducts()
    {
        return obj.getallhairproducts();
    }

    @GetMapping ("/getproducts/gift-articles")
    public List<product> getgiftproducts()
    {
        return obj.getallgiftproducts();
    }
    
    @GetMapping("/getproducts/others")
    public List<product> getotherproducts() 
    {
        return obj.getallotherproducts();
    }
    
    

}
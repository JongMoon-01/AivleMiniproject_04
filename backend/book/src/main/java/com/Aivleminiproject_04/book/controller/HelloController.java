package com.Aivleminiproject_04.book.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class HelloController {

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/api/hello")
    public String sayHello() {
        return "Hello Spring Boot!";
    }
}

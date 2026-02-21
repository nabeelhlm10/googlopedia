package com.googlopedia.controller;

import com.googlopedia.model.EBook;
import com.googlopedia.repository.EBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ebooks")
@CrossOrigin(origins = "*")
public class EBookController {

    @Autowired
    private EBookRepository eBookRepository;

    @GetMapping
    public List<EBook> getAllEBooks() {
        return eBookRepository.findAll();
    }
}

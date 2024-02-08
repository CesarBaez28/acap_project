package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.acap.api.model.Folders;
import com.acap.api.service.FoldersService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("folders")
public class FoldersController {
  private final FoldersService foldersService;

  public FoldersController (FoldersService foldersService) {
    this.foldersService = foldersService;
  }

  @GetMapping("/findAll")
  public List<Folders> findAll () {
    return foldersService.findAll();
  }  

  @PostMapping("/save")
  public Folders saveFolder (@RequestBody Folders folder) {      
    return foldersService.saveFolder(folder);
  }
  
}

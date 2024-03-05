package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.acap.api.model.Folders;
import com.acap.api.service.FoldersService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/*
 * Clase controlador que gestiona las 
 * operaciones relacionadas con los nombre
 * de las carpetas que usan para guardar 
 * las evidencias al momento de destruir las
 * cintas
 */
@RestController
@RequestMapping("folders")
public class FoldersController {
  
  private final FoldersService foldersService;

  public FoldersController (FoldersService foldersService) {
    this.foldersService = foldersService;
  }

  // Obtener todas las carpetas
  @GetMapping("/findAll")
  public List<Folders> findAll () {
    // Devolver la lista de todas las carpetas
    return foldersService.findAll();
  }  

  // Guardar una nueva carpeta
  @PostMapping("/save")
  public Folders saveFolder (@RequestBody Folders folder) {      
    // Guardar la nueva carpeta y devolver la carpeta guardada
    return foldersService.saveFolder(folder);
  }
}

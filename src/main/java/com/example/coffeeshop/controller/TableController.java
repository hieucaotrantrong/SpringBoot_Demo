package com.example.coffeeshop.controller;

import com.example.coffeeshop.entity.CoffeeTable;
import com.example.coffeeshop.service.CoffeeTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/*---------------------------------------
 * 
---------------------------------------*/
@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/api")
public class TableController {

    @Autowired
    private CoffeeTableService tableService;

    // Endpoint cho user xem danh sách bàn
    @GetMapping("/user/tables")
    public List<CoffeeTable> getAvailableTables() {
        return tableService.getAllTables();
    }

    // Endpoint cho user đặt bàn
    @PutMapping("/user/tables/book/{id}")
    public CoffeeTable bookTable(@PathVariable Long id) {
        CoffeeTable table = tableService.getTableById(id);
        if ("ĐÃ ĐẶT".equals(table.getStatus())) {
            throw new RuntimeException("Bàn này đã được đặt");
        }
        table.setStatus("ĐÃ ĐẶT");
        return tableService.updateTable(table);
    }

/*---------------------------------------
 * Create Table new
---------------------------------------*/
    @PostMapping("/admin/tables/create")
    public CoffeeTable createTable(@RequestBody CoffeeTable table) {
        table.setStatus("CHƯA ĐẶT");
        return tableService.createTable(table);
    }
/*---------------------------------------
 * Get on table
---------------------------------------*/
    @GetMapping("/admin/tables/all")
    public List<CoffeeTable> getAllTables() {
        return tableService.getAllTables();
    }

/*---------------------------------------
 *Update status table
---------------------------------------*/
    @PutMapping("/admin/tables/update/{id}")
    public CoffeeTable updateTableStatus(@PathVariable Long id, @RequestBody CoffeeTable tableUpdate) {
        CoffeeTable existingTable = tableService.getTableById(id);
        existingTable.setStatus(tableUpdate.getStatus());
        existingTable.setTableNumber(tableUpdate.getTableNumber());
        existingTable.setDescription(tableUpdate.getDescription());
        return tableService.updateTable(existingTable);
    }

/*---------------------------------------
 *Delete Table
---------------------------------------*/
  @DeleteMapping("/admin/tables/delete/{id}")
    public ResponseEntity<?> deleteTable(@PathVariable Long id) {
    tableService.deleteTable(id);
    return ResponseEntity.ok("Xóa bàn thành công!");
}
/*---------------------------------------
 * Get information table by Id
---------------------------------------*/
    @GetMapping("/admin/tables/{id}")
    public CoffeeTable getTableById(@PathVariable Long id) {
        return tableService.getTableById(id);
    }

}

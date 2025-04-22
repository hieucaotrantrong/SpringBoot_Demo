package com.example.coffeeshop.controller;

import com.example.coffeeshop.entity.CoffeeTable;
import com.example.coffeeshop.service.CoffeeTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/tables")
public class TableController {

    @Autowired
    private CoffeeTableService tableService;

    // Tạo bàn mới
    @PostMapping("/create")
    public CoffeeTable createTable(@RequestBody CoffeeTable table) {
        table.setStatus("CHƯA ĐẶT");
        return tableService.createTable(table);
    }

    // Lấy tất cả
    @GetMapping("/all")
    public List<CoffeeTable> getAllTables() {
        return tableService.getAllTables();
    }

    // Cập nhật trạng thái bàn
    @PutMapping("/update/{id}")
    public CoffeeTable updateTableStatus(@PathVariable Long id, @RequestBody CoffeeTable tableUpdate) {
        CoffeeTable existingTable = tableService.getTableById(id);
        // existingTable.setStatus(tableUpdate.getStatus());
        existingTable.setStatus("ĐÃ ĐẶT");
        existingTable.setDescription(tableUpdate.getDescription());
        return tableService.updateTable(existingTable);
    }

    // Xóa bàn
    @DeleteMapping("/delete/{id}")
    public void deleteTable(@PathVariable Long id) {
        tableService.deleteTable(id);
    }

    // Lấy thông tin bàn theo ID
    @GetMapping("/{id}")
    public CoffeeTable getTableById(@PathVariable Long id) {
        return tableService.getTableById(id);
    }
}

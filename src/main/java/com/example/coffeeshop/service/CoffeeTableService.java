package com.example.coffeeshop.service;

import com.example.coffeeshop.entity.CoffeeTable;
import com.example.coffeeshop.repository.CoffeeTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoffeeTableService {
    @Autowired
    private CoffeeTableRepository tableRepository;

    /*---------------------------------------
    * Create table new
    ---------------------------------------*/
    public CoffeeTable createTable(CoffeeTable table) {
        return tableRepository.save(table);
    }

    /*---------------------------------------
    * All list table
    ---------------------------------------*/
    public List<CoffeeTable> getAllTables() {
        return tableRepository.findAll();
    }

    /*---------------------------------------
    * All list table by id
    ---------------------------------------*/
    public CoffeeTable getTableById(Long id) {
        return tableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bàn với id " + id));
    }

    /*---------------------------------------
    * Update table by id
    ---------------------------------------*/
    public CoffeeTable updateTable(CoffeeTable table) {
        return tableRepository.save(table);
    }

    /*---------------------------------------
    * delete table by id
    ---------------------------------------*/
    public void deleteTable(Long id) {
        if (tableRepository.existsById(id)) {
            tableRepository.deleteById(id);
        } else {
            throw new RuntimeException("Không thể xóa bàn. Bàn không tồn tại.");
        }
    }
}

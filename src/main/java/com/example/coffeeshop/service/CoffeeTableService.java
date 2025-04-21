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

    // Tạo bàn mới
    public CoffeeTable createTable(CoffeeTable table) {
        return tableRepository.save(table);
    }

    // Lấy tất cả bàn
    public List<CoffeeTable> getAllTables() {
        return tableRepository.findAll();
    }

    // Lấy bàn theo ID
    public CoffeeTable getTableById(Long id) {
        return tableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bàn với id " + id));
    }

    // Cập nhật bàn
    public CoffeeTable updateTable(CoffeeTable table) {
        return tableRepository.save(table);
    }

    // Xóa bàn
    public void deleteTable(Long id) {
        if (tableRepository.existsById(id)) {
            tableRepository.deleteById(id);
        } else {
            throw new RuntimeException("Không thể xóa bàn. Bàn không tồn tại.");
        }
    }
}

package com.example.coffeeshop.repository;

import com.example.coffeeshop.entity.CoffeeTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoffeeTableRepository extends JpaRepository<CoffeeTable, Long> {
}

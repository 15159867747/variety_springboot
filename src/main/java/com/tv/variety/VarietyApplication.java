package com.tv.variety;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
//@MapperScan(value={"com.tv.variety.config"})

@EnableScheduling
public class VarietyApplication {

    public static void main(String[] args) {
        SpringApplication.run(VarietyApplication.class, args);
    }

}

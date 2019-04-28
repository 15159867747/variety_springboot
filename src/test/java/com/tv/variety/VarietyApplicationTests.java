package com.tv.variety;

import com.tv.variety.bll.impl.VarietyMongoDB;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class VarietyApplicationTests {
 @Autowired
 private VarietyMongoDB varietyMongoDB;
    @Test
    public void contextLoads() {
        varietyMongoDB.findVarietyByType("搞笑");
    }

}

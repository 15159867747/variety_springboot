package com.tv.variety.config;


import com.tv.variety.util.mongodb.MongoPageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Configuration
public class MongoConfiguration{

    @Autowired
    private MongoTemplate mongoTemplate;
    @Bean(name = "mongoPageHelper")
    public MongoPageHelper mongoPageHelper() {
        return new MongoPageHelper(mongoTemplate);
    }

}

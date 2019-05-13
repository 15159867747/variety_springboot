package com.tv.variety.dto;

import lombok.Data;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@Data
public class CommentParams {
     String id;
     String userid;
     String varietyId;
     String comment;
     Long commentDate;
     String name;
     String picurl;

}

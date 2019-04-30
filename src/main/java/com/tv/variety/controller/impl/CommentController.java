package com.tv.variety.controller.impl;

import com.tv.variety.controller.ICommentController;
import com.tv.variety.facade.ICommentFacade;
import com.tv.variety.param.InsertCommentParams;
import com.tv.variety.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
@RestController
//@Controller
@RequestMapping(value = "/Comments")
public class CommentController implements ICommentController {
    @Autowired
    private ICommentFacade iCommentFacade;


    @Override
    @RequestMapping(value = "/getCommentListByVarietyId" , method = RequestMethod.POST)
    public JsonResult getCommentList(String varietyId, int pageNum, int pageSize) {
        if (varietyId==null&&varietyId.equals(""))
        {
            return new JsonResult<>(-1,"哎呀出错啦，可能是节目为空也");
        }
//        if (pageNum==0)
//        {
//            pageNum=10;
//        }
//        if (pageSize==0)
//        {
//            pageSize=1;
//        }
        return new JsonResult(iCommentFacade.getCommentList(varietyId,pageNum,pageSize),"评论显示成功啦",1);

    }

    @Override
    @RequestMapping(value = "/insertComment" , method = RequestMethod.POST)
    public JsonResult insertComment(InsertCommentParams insertCommentParams) {
        int rs =iCommentFacade.insertComment(insertCommentParams);
        if (rs==0){
            return new JsonResult<>(-1,"评论了耶");
        }
        return new JsonResult<>(1,"评论成功拉");
    }

    @Override
    @RequestMapping(value = "/deleteComment" , method = RequestMethod.POST)
    public JsonResult deleteComment(String id) {
        int rs =iCommentFacade.deleteComment(id);
        if (rs==0){
            return new JsonResult<>(-1,"删除失败啦");
        }
        return new JsonResult<>(1,"删除成功啦");
    }

    @Override
    @RequestMapping(value = "/getCommentListByUserid" , method = RequestMethod.POST)
    public JsonResult getCommentListByUserid(String userid, int pageNum, int pageSize) {
        if (userid==null&&userid.equals(""))
        {
            return new JsonResult<>(-1,"哎呀出错啦，可能是节目为空也");
        }
        if (pageNum==0)
        {
            pageNum=10;
        }
        if (pageSize==0)
        {
            pageSize=1;
        }
        return new JsonResult(iCommentFacade.getCommentListByUserid(userid,pageNum,pageSize),"评论显示成功啦",1);
    }
}

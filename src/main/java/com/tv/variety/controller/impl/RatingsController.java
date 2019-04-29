package com.tv.variety.controller.impl;

import com.tv.variety.controller.IRatingsController;
import com.tv.variety.facade.IRatingsFacade;
import com.tv.variety.facade.impl.RatingsFacade;
import com.tv.variety.param.InsertRatingsParams;
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
@RequestMapping(value = "/Ratings")
public class RatingsController implements IRatingsController {
    @Autowired
    private IRatingsFacade iRatingsFacade;


    @Override
    @RequestMapping(value = "/insertOrUpdateRatings" , method = RequestMethod.POST)
    public JsonResult updateORinsertRatings(InsertRatingsParams insertRatingsParams) {
        InsertRatingsParams insertRatingsParams1=new InsertRatingsParams();
        insertRatingsParams1=iRatingsFacade.seracherRatings(insertRatingsParams.getUserid(),insertRatingsParams.getVarietyId());
        if (insertRatingsParams1.getUserid()==null&&insertRatingsParams1.getVarietyId()==null&&insertRatingsParams1.getRatings()==0)
        {
            int i=iRatingsFacade.insertRatings(insertRatingsParams);
            if (i>0){
                return new JsonResult<>(1,"增加成功");
            }
            else{
                return new JsonResult<>(-1,"评星失败");
            }
//            return new JsonResult<>(-1,"失败");
        }
        else{
            int i=iRatingsFacade.updateRatings(insertRatingsParams);
            if (i>0){
                return new JsonResult<>(1,"修改成功");
            }
            else{
                return new JsonResult<>(-1,"评星失败");
            }
        }

    }

    @Override
    public JsonResult seracherRatings(String userid, String varietyId) {
        InsertRatingsParams insertRatingsParams=new InsertRatingsParams();
        insertRatingsParams=iRatingsFacade.seracherRatings(userid,varietyId);
        return null;
    }
}

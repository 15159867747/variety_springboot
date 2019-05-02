package com.tv.variety.util.HandlerInterceptor;

import com.tv.variety.bll.IUserBLL;
import com.tv.variety.mybatic.mapper.TokenMapper;
import com.tv.variety.mybatic.model.Token;
import com.tv.variety.util.annotation.UnInterception;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.List;


/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */


public class TokenInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(TokenInterceptor.class);

//    @Resource
//    private TokenMapper TokenMapper;
    @Autowired
    private IUserBLL userBLL;
    //提供查询

    @Override
    public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2) throws Exception {
////        HandlerMethod handlerMethod= (HandlerMethod) arg2;
//        Method method = handlerMethod.getMethod();
        //普通路径放行
        arg0.getCookies();
        Cookie[] cookies = arg0.getCookies();
        String token = "";
        String userid="";
        for (Cookie cookie : cookies) {
            if(cookie.getName().equals("token"))
            {
                token = cookie.getValue();
            }
            if (cookie.getName().equals("userid"))
            {
                userid=cookie.getValue();
            }
            if(userid!="" && token!="")
            {
                break;
            }
        }
//        System.out.println(token);
//        System.out.println(arg0.getCookies()[0].getName());


//        System.out.println(arg0.getContextPath()+"/login.html");
        logger.info("====拦截到了方法：{}，在该方法执行之前执行====", arg0.getRequestURI());
        String uri=arg0.getRequestURI();

        if ("/API/addUser".equals(uri) || "/API/check".equals(uri)||"/API/exit".equals(uri)||"/Comments/getCommentListByVarietyId".equals(uri)){
            System.out.println("没有被拦截");
            return true;}

//        UnInterception unInterception = method.getAnnotation(UnInterception.class);
//        if (null != unInterception) {
//            return true;
//        }

        //判断请求信息
        if(token==null||token.trim().equals("")){

            System.out.println("你没有token,需要登录");
//            arg1.sendRedirect(arg0.getContextPath()+"/login.html");

            return false;
        }
        //解析Token信息
        try {
            List<Token> listToken= userBLL.searchToken(userid);
            String tokendb="";
            long tokenDate=0;
//            System.out.println(listToken.size());
            if (listToken.size()>0)
            {
                tokendb=listToken.get(0).getToken();
                tokenDate=listToken.get(0).getBuildtime();
//                System.out.println("tokendb"+tokendb);
//                System.out.println("tokenDate"+tokenDate);
            }
            //数据库没有Token记录
            if(null==tokendb||tokendb.trim().equals("")) {
                System.out.println("数据库没有你的token,需要登录");

//                arg1.sendRedirect(arg0.getContextPath()+"/login.html");
                return false;
            }
            //数据库Token与客户Token比较
            if( !token.equals(tokendb) ){
                System.out.println("你的token不正确");
                System.out.println(tokendb);

//                arg1.sendRedirect(arg0.getContextPath()+"/login.html");
                return false;
            }
            //判断Token过期

            int chaoshi=(int)(new Date().getTime()-tokenDate)/1000;
            if(chaoshi>60*60*24*3){
//                arg1.sendRedirect(arg0.getContextPath()+"/login.html");
                System.out.println("你的token过期了");
//                arg1.sendRedirect(arg0.getContextPath()+"/login.html");
                arg1.sendRedirect("/login.html");
                return false;
            }

        } catch (Exception e) {
            e.printStackTrace();
            arg1.sendRedirect(arg0.getContextPath()+"/login.jsp");
            System.out.println("反正token不对,需要登录");
            return false;
        }
        //最后才放行
        System.out.println("没有被拦截");
        return true;
    }
    @Override
    public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
            throws Exception {}
    @Override
    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
            throws Exception {}
}


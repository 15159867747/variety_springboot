package com.tv.variety.util.Scheduled;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */

import java.text.SimpleDateFormat;
import java.util.Date;

import com.tv.variety.bll.IConfigPythonBLL;
import com.tv.variety.bll.impl.ConfigPythonBLL;
import com.tv.variety.mybatic.model.Configpy;
import com.tv.variety.util.python.Python;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * 从配置文件加载任务信息
 * @author 王久印
 * 2018年3月1日
 */
@Component
public class ScheduledTask {


    private int fixedDelayCount = 1;
    @Autowired
    private IConfigPythonBLL configPythonBLL;


    @Scheduled(fixedDelay = 1000*60*10)        //表示当前方法执行完毕10分钟后，Spring scheduling会再次调用该方法
    public void FixDelay10min() {
        Python python=new Python();
        System.out.println("定时器为"+1000*60*10);
        for (int i=1;i<=2;i++)
        {
            Configpy configpy=new Configpy();
            configpy=configPythonBLL.showConfigpy(i);
            if(configpy.getStatus()==1)
            {
               continue;
            }
            else if(configpy.getStatus()==0){
                if(configpy.getActiontime()==1000*60*10)
                {   configpy.setStatus(1);
                    configPythonBLL.update(configpy);
                    if(configpy.getId()==2)
                    {   System.out.println("正在爬取芒果TV视频...，执行周期为"+1000*60*10);
                        int rs=python.MongoTvAction();
                        System.out.println("爬取完成");
                        configpy.setStatus(0);
                        configPythonBLL.update(configpy);
                    }
                    if(configpy.getId()==1)
                    {
                        System.out.println("正在爬取优酷视频...，执行周期为"+1000*60*10);
                        python.youkuAction();
                        System.out.println("爬取完成");
                        configpy.setStatus(0);
                        configPythonBLL.update(configpy);
                    }

                }
                else{
                    continue;
                }
            }
            else{
                continue;
            }

        }
    }

    @Scheduled(fixedDelay = 1000*60*30)        //表示当前方法执行完毕30分钟后，Spring scheduling会再次调用该方法
    public void FixDelay30min() {
        Python python=new Python();
        System.out.println("定时器为"+1000*60*30);
        for (int i=1;i<=2;i++)
        {
            Configpy configpy=new Configpy();
            configpy=configPythonBLL.showConfigpy(i);
            if(configpy.getStatus()==1)
            {
                continue;
            }
            else if(configpy.getStatus()==0){
                if(configpy.getActiontime()==1000*60*30)
                {   configpy.setStatus(1);
                    configPythonBLL.update(configpy);
                    if(configpy.getId()==2)
                    {   System.out.println("正在爬取芒果TV视频...，执行周期为"+1000*60*30);
                        python.MongoTvAction();
                        System.out.println("爬取完成");
                        configpy.setStatus(0);
                        configPythonBLL.update(configpy);
                    }
                    if(configpy.getId()==1)
                    {
                        System.out.println("正在爬取优酷视频...，执行周期为"+1000*60*30);
                        python.youkuAction();
                        System.out.println("爬取完成");
                        configpy.setStatus(0);
                        configPythonBLL.update(configpy);
                    }

                }
                else{
                    continue;
                }
            }
            else{
                continue;
            }

        }



    }

    @Scheduled(fixedDelay = 1000*60*60)        //表示当前方法执行完毕1小时后，Spring scheduling会再次调用该方法
    public void FixDelay1h() {
        System.out.println("定时器为"+1000*60*60);
        Python python=new Python();
        for (int i=1;i<=2;i++)
        {
            Configpy configpy=new Configpy();
            configpy=configPythonBLL.showConfigpy(i);
            if(configpy.getStatus()==1)
            {
                continue;
            }
            else if(configpy.getStatus()==0){
                if(configpy.getActiontime()==1000*60*60)
                {   configpy.setStatus(1);
                    configPythonBLL.update(configpy);
                    if(configpy.getId()==2)
                    {   System.out.println("正在爬取芒果TV视频...，执行周期为"+1000*60*60);
                        python.MongoTvAction();
                        System.out.println("爬取完成");
                        configpy.setStatus(0);
                        configPythonBLL.update(configpy);
                    }
                    if(configpy.getId()==1)
                    {
                        System.out.println("正在爬取优酷视频...，执行周期为"+1000*60*60);
                        python.youkuAction();
                        System.out.println("爬取完成");
                        configpy.setStatus(0);
                        configPythonBLL.update(configpy);
                    }

                }
                else{
                    continue;
                }
            }
            else{
                continue;
            }

        }

    }

    @Scheduled(fixedDelay = 1000*60*60*12)        //表示当前方法执行完毕12小时后，Spring scheduling会再次调用该方法
    public void FixDelay12h() {
        System.out.println("定时器为"+1000*60*60*12);
        Python python=new Python();
        for (int i=1;i<=2;i++)
        {
            Configpy configpy=new Configpy();
            configpy=configPythonBLL.showConfigpy(i);
            if(configpy.getStatus()==1)
            {
                continue;
            }
            else if(configpy.getStatus()==0){
                if(configpy.getActiontime()==1000*60*60*12)
                {   configpy.setStatus(1);
                    configPythonBLL.update(configpy);
                    if(configpy.getId()==2)
                    {   System.out.println("正在爬取芒果TV视频...，执行周期为"+1000*60*60*12);
                        python.MongoTvAction();
                        System.out.println("爬取完成");
                        configpy.setStatus(0);
                        configPythonBLL.update(configpy);
                    }
                    if(configpy.getId()==1)
                    {
                        System.out.println("正在爬取优酷视频...，执行周期为"+1000*60*60*12);
                        python.youkuAction();
                        System.out.println("爬取完成");
                        configpy.setStatus(0);
                        configPythonBLL.update(configpy);
                    }

                }
                else{
                    continue;
                }
            }
            else{
                continue;
            }

        }

    }
    @Scheduled(fixedDelay = 1000*60*60*24)        //表示当前方法执行完毕12小时后，Spring scheduling会再次调用该方法
    public void FixDelay24h() {
        System.out.println("定时器为"+1000*60*60*24);
        Python python=new Python();
        for (int i=1;i<=2;i++)
        {
            Configpy configpy=new Configpy();
            configpy=configPythonBLL.showConfigpy(i);
            if(configpy.getStatus()==1)
            {
                continue;
            }
            else if(configpy.getStatus()==0){
                if(configpy.getActiontime()==1000*60*60*24)
                {   configpy.setStatus(1);
                    configPythonBLL.update(configpy);
                    if(configpy.getId()==2)
                    {   System.out.println("正在爬取芒果TV视频...，执行周期为"+1000*60*60*24);
                        python.MongoTvAction();
                        System.out.println("爬取完成");
                        configpy.setStatus(0);
                        configPythonBLL.update(configpy);
                    }
                    if(configpy.getId()==1)
                    {
                        System.out.println("正在爬取优酷视频...，执行周期为"+1000*60*60*24);
                        python.youkuAction();
                        System.out.println("爬取完成");
                        configpy.setStatus(0);
                        configPythonBLL.update(configpy);
                    }

                }
                else{
                    continue;
                }
            }
            else{
                continue;
            }
        }
    }



}
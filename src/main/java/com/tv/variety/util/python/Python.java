package com.tv.variety.util.python;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */

import com.tv.variety.bll.IConfigParamsBLL;
import com.tv.variety.bll.IRatingsBLL;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
public class Python {
    @Autowired
    private IConfigParamsBLL iConfigParamsBLL;

    public int MongoTvAction() {
        Process proc;
        try {
            System.out.println("mongo");
            proc = Runtime.getRuntime().exec("python C:\\Users\\Dell\\Desktop\\毕设\\youku_mongotv\\demo1.py");// 执行py文件
            //用输入输出流来截取结果
//            BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
//            String line = null;
//            while ((line = in.readLine()) != null) {
//                System.out.println(line);
//            }
//            in.close();
            proc.waitFor();
            return 1;
        } catch (IOException e) {
            e.printStackTrace();
            return 0;
        } catch (InterruptedException e) {
            e.printStackTrace();
            return 0;
        }

    }


    public int youkuAction() {
        Process proc;
        try {
            System.out.println("youku");
            proc = Runtime.getRuntime().exec("python C:\\Users\\Dell\\Desktop\\毕设\\youku_mongotv\\demo2.py");// 执行py文件
            //用输入输出流来截取结果
//            BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
//            String line = null;
//            while ((line = in.readLine()) != null) {
//                System.out.println(line);
//            }
//            in.close();
            proc.waitFor();
            return 1;
        } catch (IOException e) {
            e.printStackTrace();
            return 0;
        } catch (InterruptedException e) {
            e.printStackTrace();
            return 0;
        }

    }

    public List<String> recommendpy(String user)  //5
    {
        Process proc;
        try {
            System.out.println("reconmmend");

            proc = Runtime.getRuntime().exec("python C:\\Users\\Dell\\Desktop\\毕设\\Variety_K-means\\actionRecommend.py "+ user+" ");// 执行py文件
            //用输入输出流来截取结果
            BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
            String line = null;
            List<String> list=new ArrayList<String>();
            while ((line = in.readLine()) != null) {
                list.add(line);
//                System.out.println(line);
            }
//            System.out.println(list.size());
            in.close();
            proc.waitFor();
            System.out.println("reconmmendSuccess");
            return list;

        } catch (IOException e) {
//            System.out.println(e);
            e.printStackTrace();
            return null;
        } catch (InterruptedException e) {
//            System.out.println(e);
            e.printStackTrace();
            return null;

        }
    }

    public int MovieRatingsAction(){
        Process proc;
        try {
            System.out.println("BuildMovieRatings");
//            String[] args1 = new String[] { "python", "C:\\Users\\Dell\\Desktop\\毕设\\AgglomerativeClustering\\actionRecommend.py", String.valueOf(user) };
//            Process proc = Runtime.getRuntime().exec(args1);
            proc = Runtime.getRuntime().exec("python C:\\Users\\Dell\\Desktop\\毕设\\Variety_K-means\\actionMovieRatings.py");// 执行py文件
            //用输入输出流来截取结果
//            BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
//            String line = null;
//            while ((line = in.readLine()) != null) {
//                System.out.println(line);
//            }
//            in.close();
            proc.waitFor();
            return 1;

        } catch (IOException e) {
//            System.out.println(e);
            e.printStackTrace();
            return 0;

        } catch (InterruptedException e) {
//            System.out.println(e);
            e.printStackTrace();
            return 0;

        }
    }  //2

    public int SklearnAction(){
        Process proc;
        try {
            System.out.println("k-means");
//            String[] args1 = new String[] { "python", "C:\\Users\\Dell\\Desktop\\毕设\\AgglomerativeClustering\\actionRecommend.py", String.valueOf(user) };
//            Process proc = Runtime.getRuntime().exec(args1);
            proc = Runtime.getRuntime().exec("python C:\\Users\\Dell\\Desktop\\毕设\\Variety_K-means\\Sklearn_K-Means.py");// 执行py文件
            //用输入输出流来截取结果
//            BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
//            String line = null;
//            while ((line = in.readLine()) != null) {
//                System.out.println(line);
//            }
//            in.close();
            proc.waitFor();
            return 1;

        } catch (IOException e) {
//            System.out.println(e);
            e.printStackTrace();
            return 0;

        } catch (InterruptedException e) {
//            System.out.println(e);
            e.printStackTrace();
            return 0;

        }
    }       //3

    public int SimAction(){
        Process proc;
        try {
            System.out.println("simcalculate");
//            String[] args1 = new String[] { "python", "C:\\Users\\Dell\\Desktop\\毕设\\AgglomerativeClustering\\actionRecommend.py", String.valueOf(user) };
//            Process proc = Runtime.getRuntime().exec(args1);
            proc = Runtime.getRuntime().exec("python C:\\Users\\Dell\\Desktop\\毕设\\Variety_K-means\\actionForeachSim.py");// 执行py文件
            //用输入输出流来截取结果
//            BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
//            String line = null;
//            while ((line = in.readLine()) != null) {
//                System.out.println(line);
//            }
//            in.close();
            proc.waitFor();
            return 1;

        } catch (IOException e) {
//            System.out.println(e);
            e.printStackTrace();
            return 0;

        } catch (InterruptedException e) {
//            System.out.println(e);
            e.printStackTrace();
            return 0;

        }
    }           //4

    public int getRatings(String time){
        long longtime=Long.parseLong(time);
        Process proc;
        try {
            System.out.println("getRatings");
//            String[] args1 = new String[] { "python", "C:\\Users\\Dell\\Desktop\\毕设\\AgglomerativeClustering\\actionRecommend.py", String.valueOf(user) };
//            Process proc = Runtime.getRuntime().exec(args1);
//                                                          python C:\\Users\\Dell\\Desktop\\毕设\\Variety_K-means\\actionRecommend.py "+ user+" "
            proc = Runtime.getRuntime().exec("python C:\\Users\\Dell\\Desktop\\毕设\\Variety_K-means\\actionGetDBRatings.py "+longtime+" ");// 执行py文件
            //用输入输出流来截取结果
            BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
            String line = null;
            while ((line = in.readLine()) != null) {
                System.out.println(line);
            }
            in.close();
            proc.waitFor();
            return 1;

        } catch (IOException e) {
//            System.out.println(e);
            e.printStackTrace();
            return 0;

        } catch (InterruptedException e) {

//            System.out.println(e);
            e.printStackTrace();
            return 0;

        }
    }           //1

    public static void main(String[] args) {
        Python python=new Python();
        python.getRatings("1557643436000");
//        python.recommendpy("31");




//        Process proc;
//        try {
//            System.out.println("reconmmend");
////            String[] args1 = new String[] { "python", "C:\\Users\\Dell\\Desktop\\毕设\\AgglomerativeClustering\\actionRecommend.py", String.valueOf(user) };
////            Process proc = Runtime.getRuntime().exec(args1);
//            proc = Runtime.getRuntime().exec("python C:\\Users\\Dell\\Desktop\\毕设\\Variety_K-means\\actionGetDBRatings.py");// 执行py文件
//            //用输入输出流来截取结果
////            BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
////            String line = null;
////            while ((line = in.readLine()) != null) {
////                System.out.println(line);
////            }
////            in.close();
//            proc.waitFor();
//
//
//        } catch (IOException e) {
////            System.out.println(e);
//            e.printStackTrace();
//
//        } catch (InterruptedException e) {
////            System.out.println(e);
//            e.printStackTrace();
//
//
//        }






//        String a="2132132";
//        System.out.println(a.length());
        // TODO Auto-generated method stub
//        Process proc;
//        try {
//            System.out.println("reconmmend");
////            String[] args1 = new String[] { "python", "C:\\Users\\Dell\\Desktop\\毕设\\AgglomerativeClustering\\actionRecommend.py", String.valueOf(user) };
////            Process proc = Runtime.getRuntime().exec(args1);
//            proc = Runtime.getRuntime().exec("python C:\\Users\\Dell\\Desktop\\毕设\\Variety_K-means\\actionForeachSim.py");// 执行py文件
//            //用输入输出流来截取结果
//            BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
//            String line = null;
//            while ((line = in.readLine()) != null) {
//                System.out.println(line);
//            }
//            in.close();
//            proc.waitFor();
//
//        } catch (IOException e) {
//            System.out.println(e);
//            e.printStackTrace();
//
//        } catch (InterruptedException e) {
//            System.out.println(e);
//            e.printStackTrace();
//
//        }
    }




}
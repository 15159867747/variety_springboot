package com.tv.variety.util.python;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Python {

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


//    public static void main(String[] args) {
//        // TODO Auto-generated method stub
//        Process proc;
//        try {
//            System.out.println("mongo");
//            proc = Runtime.getRuntime().exec("python C:\\Users\\Dell\\Desktop\\毕设\\youku_mongotv\\demo2.py");// 执行py文件
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
//            e.printStackTrace();
//
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//
//        }
//    }




}
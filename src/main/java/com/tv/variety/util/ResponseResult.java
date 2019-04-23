package com.tv.variety.util;

/**
 * @author yrongqin@linwell.com
 * @createtime ${date}${time}
 */
public class ResponseResult<T> {
    private int status;
    private int code = -1;
    private T content;
    private String message;

    public ResponseResult() {
    }

    public int getStatus() {
        return this.status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getCode() {
        return this.code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public T getContent() {
        return this.content;
    }

    public void setContent(T content) {
        this.content = content;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

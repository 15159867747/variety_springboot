﻿!function () {
    var i = ['<div class="conner">', "</div>", '<div class="frame">', '   <div class="head">', '       <h3 class="title">我们这些人</h3>', '       <div class="close" title="关闭浮层"><a class="icon"></a></div>', "   </div>", '   <div class="body">', "   </div>", "</div>"].join(""),
        e = function (e, o) {
            var s = this;
            this.option = {
                className: "mod-tipcard z-act", renderTo: "", titleLink: !0, onClose: function () {
                }, onReady: function () {
                }, position: null
            }, this.target = e, this.option = T.extend(this.option, o || {}), this.GUID = "mod-tipcard-" + T.lang.guid(), this.container = T.dom.create("div", {
                id: "modtipcard-" + T.lang.guid(),
                className: this.option.className
            }), this.dir = "r", this.view = null, this.container.innerHTML = F.tpl.compile(i)({}), this.holder = T.query(".body", this.container)[0], this.close = T.query(".close", this.container)[0], this.title = T.query(".title", this.container)[0], this.close && T.on(this.close, "click", function () {
                s.option.onClose && s.option.onClose()
            }), this.__init(), this.setDirection(this.dir)
        };
    e.prototype.setTitle = function (i) {
        if (this.title) try {
            this.title.innerHTML = i + ""
        } catch (e) {
        }
    }, e.prototype.getSize = function () {
        var i = {x: 0, y: 0};
        if (this.container && (i.x = this.container.offsetWidth, i.y = this.container.offsetHeight), "r" == this.dir) {
            var e = T.query(".conner", this.container)[0];
            e && (i.x += e.offsetWidth)
        }
        return i
    }, e.prototype.setDirection = function (i) {
        this.dir = i;
        var e = ["mod-tipcard-l", "mod-tipcard-r"];
        if (console.log("setDir", this.container, "dir", i), this.container) {
            for (var o = 0; o < e.length; o++) T.dom.removeClass(this.container, e[o]);
            switch (i) {
                case"r":
                    T.dom.addClass(this.container, "mod-tipcard-r");
                    break;
                case"n":
                    T.dom.addClass(this.container, "mod-tipcard-rn")
            }
        }
    }, e.prototype.setView = function (i) {
        this.holder && (this.holder.innerHTML = "", this.holder.appendChild(i));
        var e = i.getAttribute("data-viewtype");
        switch (e) {
            case"torrent":
                this.container && T.dom.addClass(this.container, "mod-tipcard-torrent")
        }
    }, e.prototype.__init = function () {
        var i = this, e = function () {
            T.dom.insertAfter(i.container, document.body.lastChild), i.option.onReady && i.option.onReady()
        };
        T.ready.isReady ? e() : T.ready(function () {
            e()
        })
    };
    var o = function () {
        var i = this;
        this.card = void 0, this.wrap = void 0, this.viewDataLoader = void 0, this.viewData = void 0, this.view = void 0, this.isShow = !1, this.pos = {
            x: 0,
            y: 0
        }, this.loadTitle = "加载中...", this.title = "加载中..", this.titleLink = !0;
        var o = {}, s = void 0, n = null, a = void 0;
        this.onReady = function () {
            this.view = document.createElement("div"), this.view.className = "view", this.view.setAttribute("data-viewtype", "torrent"), this.card.setView(this.view), this.layout(), a && (a(), a = void 0)
        }, this.onCardClose = function () {
            this.hide()
        };
        var r = function () {
            try {
                i.card = new e(null, {
                    onReady: function () {
                        setTimeout(function () {
                            i.onReady.call(i)
                        }, 10)
                    }, onClose: function () {
                        i.onCardClose.call(i)
                    }
                })
            } catch (o) {
                alert("init:" + o)
            }
        }, h = function (i, e, o) {
            console.log("onTorrentClick", i, e, o), this.playVideo(o, this.currentRate)
        }, d = function () {
            i.onContentLayout && i.onContentLayout()
        }, c = function () {
            var e = void 0;
            try {
                e = F.widget.torrent.TorrentRender
            } catch (s) {
            }
            e && (new e(i.view, o, "", {
                onItemClick: h,
                onLayout: d,
                from: "tipcard",
                tabpageMode: 1
            }), i.view.className = "view", T.dom.addClass(i.view, "tip-" + o.gallery_type))
        }, l = function (e) {
            if (i.view ? s ? c() : F.load("widget.torrent.TorrentRender", c) : a = function () {
                return function (i) {
                    l(i)
                }
            }(e), o && o.name) {
                var r = o.name, h = -1 != window.location.href.indexOf("client_play");
                i.titleLink && !h && (r = '<a href="/vplay/g-' + o.gallery_id + '">' + r + "</a>"), i.setTitle(r)
            }
            i.isShow ? T.show(i.wrap) : T.hide(i.wrap), "function" == typeof n && n()
        };
        this.setTitle = function (i) {
            this.title = i, this.card && this.card.setTitle(this.title)
        }, this.show = function (i, e, s) {
            console.log("showGallery", i, "pos", s);
            var a = this;
            if (this.setTitle(this.loadTitle), n = e, this.viewData) l(o); else {
                if (this.viewDataLoader) try {
                    this.viewDataLoader.abort()
                } catch (r) {
                }
                this.viewDataLoader = F.jsonp(F.config.q + "/ajax/vod_panel/" + i, function (i) {
                    i && 200 == i.status ? (o = i.data, "vipmovie" == o.gallery_type && (o.gallery_type = "movie"), l(i)) : a.view.innerHTML = "<div class='error info'><div class='txt'>种子数据异常，请联系  <a href='/aboutus/relation/' target='_blank'>fun.tv</a></div></div>"
                }), this.view && (this.view.innerHTML = "<div class='loading info'><div class='txt'>资源加载中，请稍候...</div></div>")
            }
            console.log("showwrap", this.wrap), T.show(this.wrap), s && (this.setDirection(s.d), this.setPosition(s.x, s.y)), this.onShow && this.onShow(), this.isShow = !0, T.observer.send("tipCard.show")
        }, this.getHeight = function () {
            return this.card ? this.card.getSize().y : 0
        }, this.getWidth = function () {
            return this.card ? this.card.getSize().x : 0
        }, this.setDirection = function (i) {
            i = i || "l", this.card && this.card.setDirection(i), this.dir = i
        }, this.setPosition = function (i, e) {
            this.pos.x = i, this.pos.y = e, this.wrap && (T.dom.setStyle(this.wrap, "left", this.pos.x), T.dom.setStyle(this.wrap, "top", this.pos.y))
        }, this.layout = function () {
            this.wrap || this.card && this.card.container && (this.wrap = this.card.container), this.wrap && this.isShow && (T.show(this.wrap), this.viewData || (this.view.innerHTML = "<div class='loading info'><div class='txt'>资源加载中，请稍候...</div></div>"), this.pos && (this.setDirection(this.pos.d), this.setPosition(this.pos.x, this.pos.y)), this.onShow && this.onShow())
        }, this.hide = function () {
            clearTimeout(this.mouseOverTimeId), T.hide(this.wrap), this.isShow = !1, T.observer.send("tipCard.hide")
        }, r()
    };
    F.namespace("card.tipCard", e), F.namespace("card.TorrentView", o)
}();
;!function () {
    function e(e) {
        this.option = T.object.extend({root: "", collectBtn: ""}, e || {}), this.map = {
            noadd: "收藏",
            added: "已收藏",
            addedTit: "取消收藏",
            addedClassName: "collected"
        }, this.init()
    }

    function a(e) {
        F.log.action({
            flag: F.user.userid ? e ? 0 : 1 : -1,
            action: "collect",
            mediatype: [vplay.channelid || "", vplay.galleryid || "", vplay.videoid || ""].join("|")
        })
    }

    e.prototype.bind = function () {
        var e = this, o = T.get(e.option.collectBtn), d = T.getAttr(T.get(e.option.root), "data-videoid"),
            i = T.dom.hasClass(o, e.map.addedClassName), n = i ? "cancel" : "add",
            l = F.config.api + "/ajax/favorite/" + n + "/" + d;
        F.tool.user.userid ? F.get(l, function (d) {
            d && 200 == d.status && (i ? (T.dom.removeClass(o, e.map.addedClassName), T.q("txt", o)[0].innerHTML = e.map.noadd, T.setAttr(o, "title", e.map.noadd)) : (T.dom.addClass(o, e.map.addedClassName), T.q("txt", o)[0].innerHTML = e.map.added, T.setAttr(o, "title", e.map.addedTit)), a(i))
        }) : (a(i), F.tool.ajaxLogin.panel())
    }, e.prototype.init = function () {
        var e = this, a = T.get(e.option.collectBtn);
        a && T.on(a, "click", function (a) {
            T.event.stop(T.event.get(a)), e.bind()
        })
    }, T.dom.ready(function () {
        new e({root: "_digglist", collectBtn: "favorite"})
    })
}();
;!function () {
    var e = {pagesize: 30, defaultText: "我来说两句"},
        i = ['<div class="cmt-box-wrp">', "	<!--评论条目左侧项-->", '	<div class="cmt-avatar"><img class="lazy-alpha-start" src="//img.funshion.com/img/blank.gif" _lazysrc="<% uinfo.mhead %>">', "   <%if uinfo.vip_state %>", '   <span class="vip-sign"></span>', "   <%/if%>", "   </div>", "	<!--评论条目右侧项-->", '	<div class="cmt-content-wrp">', "		<!--用户名文字-->", '		<div class="cmt-info-head fix">', '			<div class="info-name">', '				<a href="###<% uinfo.accountid %>" title="<% uinfo.name %>"><% uinfo.name %></a>', "			</div>", "			<!--评分-->", "           <% if rating !=-1 %>", '			<div class="cmt-rating" data-rating="<% rating %>">', '				<div class="com-rating">', '					<div class="rating-box disable">', "						<!-- current放第几个标签，就显示几星-->", '						<a title="很差" <% if rating==1 %>class="rating current rating-stars1 z-5"<% /if %> href="javascript:void(0)"></a>', '						<a title="较差" <% if rating==2 %>class="rating current rating-stars2 z-4"<% /if %> href="javascript:void(0)"></a>', '						<a title="一般" <% if rating==3 %>class="rating current rating-stars3 z-3"<% /if %> href="javascript:void(0)"></a>', '						<a title="较好" <% if rating==4 %>class="rating current rating-stars4 z-2"<% /if %> href="javascript:void(0)"></a>', '						<a title="很好" <% if rating==5 %>class="rating current rating-stars5 z-1"<% /if %> href="javascript:void(0)"></a>', "					</div>", "				</div>", "			</div>", "           <%/if%>", "		</div>", '		<div class="info-text"><% htmlContent %></div>', '		<div class="cmt-info-footer">', '			<span class="info-time"><% createdate %></span>', "           <% if infoact!=0 %>", '			<div class="info-action">', '				<a class="act-reply" href="javascript:;">回复</a>｜<a class="act-agree <%if is_up==1%>act-agree-on<%/if%> <%if stat==0%>act-agree-disable<%/if%>" href="javascript:;" data-stat="<% stat %>" data-value="<% is_up %>"><% if is_up==1 %>已赞同<%else%>赞同<% /if %><em>（<% upCount %>）</em></a>', "			</div>", "           <%/if%>", "		</div>", "		<!-- com-cmt-form标记为评论框组件　-->", '		<div class="com-cmt-form">', '           <div class="cmt-error-info z-1" style="display: none"><div class="wrap"><div class="content">请输入内容</div></div></div>', '			<div class="cmt-text-box">', '			<div class="cmt-txt-box-wrap">', '					<!--<i class="c-t-arrows"></i>-->', '					<textarea class="cmt-text" rows="10" cols="10" value="" name="cmtText">我来说两句</textarea>', "				</div>", "			</div>", "			<!--评论工具容器-->", '			<div class="cmt-rpl-tool"></div>', "		</div>", "	</div>", "</div>"].join(""),
        o = F.config.protocol,
        n = ['<div class="tools tool-replay">', '    <span class="cmt-rpl-info">还可以输入<b class="font">12</b>个字</span><a class="cmt-btn-rpl">回复</a><a class="cmt-btn-rplclose">取消</a>', "</div>", "<!--rating的最大zindex为5-->", '<div class="tools tool-emotion z-6">', '   <a class="tool-emo" href="javascript:;">表情</a>', '   <div class="cmt-emo-box fix">', '	<b class="cmt-sprite cmt-arr"></b>', '        <div class="cmt-box-title">', '            <b class="cmt-sprite cmt-box-close"></b>插入表情', "        </div>", '        <ul class="cmt-emo-list">', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_0.gif" title="微笑"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_1.gif" title="鬼脸"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_2.gif" title="大兵"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_3.gif" title="困"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_4.gif" title="擦汗"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_5.gif" title="猪头"></li>', '           <li class="last"><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_6.gif" title="奋斗"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_7.gif" title="坏笑"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_8.gif" title="晕"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_9.gif" title="鼓掌"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_10.gif" title="酷"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_11.gif" title="撇嘴"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_12.gif" title="色"></li>', '           <li class="last"><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_13.gif" title="发呆"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_14.gif" title="惊讶"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_15.gif" title="白眼"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_16.gif" title="折磨"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_17.gif" title="憨笑"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_18.gif" title="傲慢"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_19.gif" title="敲打"></li>', '           <li class="last"><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_20.gif" title="衰"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_21.gif" title="冷汗"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_22.gif" title="害羞"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_23.gif" title="呲牙"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_24.gif" title="惊恐"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_25.gif" title="可怜"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_26.gif" title="流汗"></li>', '           <li class="last"><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_27.gif" title="疑问"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_28.gif" title="偷笑"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_29.gif" title="鄙视"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_30.gif" title="发怒"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_31.gif" title="咒骂"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_32.gif" title="阴险"></li>', '           <li><img src="' + o + '//img.funshion.com/img/v9/program/comment/emo/emo_33.gif" title="流泪"></li>', "       </ul>", "    </div>", " </div>", '   <em class="tools tool-empty">|</em>', '   <div class="tools tool-share">', '       <a class="empty">同步到:</a>', '       <a href="javascript:;" data-type="qzone" data-checked="0" class="qzone" title="同步至QQ空间"></a>', '       <a href="javascript:;" data-type="sinaweibo" data-checked="0" class="sinaweibo" title="同步至新浪微博"></a>', '       <a href="javascript:;" data-type="weixin" data-checked="0" class="weixin" title="同步至微信"></a>', '       <a href="javascript:;" data-type="qq" data-checked="0" class="qq" title="同步至腾讯微博"></a>', "   </div>", "</div>"].join(""),
        r = function (e, i) {
            this.options = i || {}, this.target = this.options.target, this.type = this.options.type, this.container = e;
            {
                var o = n, r = /<img[^>]+>/gim;
                r.exec(o)
            }
            o = o.replace(r, function () {
                var e = arguments[0], i = /(<img.*)(src=['|"]([^'"]+)['|"])([^>]*[\/]*>)/gi;
                return e = e.replace(i, '$1 _lazysrc="$3" _lazyignore="1" src="//img.funshion.com/img/blank.gif" $4')
            }), this.container.innerHTML = o, this.textField = this.target.getTextField(), this._init()
        };
    r.prototype.show = function () {
        T.show(this.container), this.__onTextFieldEvent()
    }, r.prototype.hide = function () {
        T.hide(this.container)
    }, r.prototype.__onShowEmotion = function () {
        this.toolEmoPane && T.show(this.toolEmoPane);
        var e = new F.widget.lazyloading.LazyWraper(this.toolEmoPane);
        e.registry(this.toolEmoPane), T.each(T.query("img", this.toolEmoPane), function (e) {
            e.instance && e.instance.start()
        }), this.target.clearTextFieldBlurTimer()
    }, r.prototype.__onHideEmotion = function () {
        clearTimeout(this.emotionBlurTimeout), this.toolEmoPane && T.hide(this.toolEmoPane)
    }, r.prototype.__onEmotionFocus = function () {
        clearTimeout(this.emotionBlurTimeout)
    }, r.prototype.__onEmotionBlur = function () {
        var e = this;
        clearTimeout(e.emotionBlurTimeout), e.emotionBlurTimeout = setTimeout(function () {
            e.__onHideEmotion()
        }, 1500)
    }, r.prototype.__onDocClick = function (e) {
        var i = this, o = e.target || e.srcElement, n = T.query(".tool-emotion", i.container);
        n[0] && baidu.dom.contains(n[0], o) || i.__onHideEmotion()
    }, r.prototype.__onInsertFace = function () {
        {
            var e = arguments[0];
            arguments[1] || window.event
        }
        this.target.appendText("[" + e + "]")
    }, r.prototype.__onSetSNS = function (e) {
        var i = this, o = e.getAttribute("data-checked");
        o = "1" == o ? 0 : 1, T.dom.setAttr(e, "data-checked", o);
        var n = {};
        T.each(T.query(".tool-share a", i.container), function (e) {
            {
                var i = e.getAttribute("data-type");
                e.getAttribute("data-checked")
            }
            if (i) {
                var o = "1" == e.getAttribute("data-checked") ? !0 : !1;
                n[i] = o;
                var r = i + "-c";
                T.dom.removeClass(e, r), o && T.dom.addClass(e, r)
            }
        }), this.target.setSNSState(n)
    }, r.prototype.__onReply = function () {
        this.target.sumbit(), this.reply && T.dom.removeClass(this.reply, "cmt-btn-rpl-current")
    }, r.prototype.__onReplyClose = function () {
        this.target && this.target.hideForm()
    }, r.prototype.__onTextFieldEvent = function () {
        var e = this.textField.value, i = e.length, o = 140, n = T.query(".cmt-rpl-info", this.container)[0];
        o >= i ? (n.innerHTML = '还可以输入<b class="font">' + (o - i) + "</b>个字", this.target.isOutMaxNum = !1) : (n.innerHTML = '已经超出<b class="font warn-text">' + (i - o) + "</b>个字", this.target.isOutMaxNum = !0), this.checkCommitButton()
    }, r.prototype.checkCommitButton = function () {
        var e = this.textField.value, i = e.length;
        this.reply && (T.dom.removeClass(this.reply, "cmt-btn-rpl-current"), i > 0 && T.dom.addClass(this.reply, "cmt-btn-rpl-current"))
    }, r.prototype._init = function () {
        var e = this;
        e.toolEmoPane = T.query(".cmt-emo-box", e.container)[0], e.reply = T.query(".cmt-btn-rpl", e.container)[0], e.replyclose = T.query(".cmt-btn-rplclose", e.container)[0], e.reply.innerHTML = "commit" == e.options.type ? "发表评论" : "回复", T.on(T.query(".tool-emo", e.container)[0], "click", T.fn.bind(e.__onShowEmotion, e)), e.emotionBlurTimeout = 0, T.on(e.toolEmoPane, "mouseover", T.fn.bind(e.__onEmotionFocus, e)), T.on(e.toolEmoPane, "mouseout", T.fn.bind(e.__onEmotionBlur, e)), T.on(e.toolEmoPane, "mouseleave", T.fn.bind(e.__onEmotionBlur, e)), T.on(document, "click", T.fn.bind(e.__onDocClick, e)), T.each(T.query(".cmt-emo-list li img", e.container), function (i) {
            var o = i.getAttribute("title");
            T.on(i, "click", T.fn.bind(e.__onInsertFace, e, o))
        }), T.each(T.query(".tool-share a", e.container), function (i) {
            T.on(i, "click", T.fn.bind(e.__onSetSNS, e, i))
        }), T.on(e.reply, "click", T.fn.bind(e.__onReply, e)), T.on(e.replyclose, "click", T.fn.bind(e.__onReplyClose, e)), T.on(e.textField, "keyup", T.fn.bind(e.__onTextFieldEvent, e))
    };
    var a = function (e, i) {
        "commentitem" != e.getAttribute("data-comtype") && (e.setAttribute("data-comtype", "commentitem"), this.target = e, this.commendId = e.getAttribute("data-commentid"), this.commendOwnerId = e.getAttribute("data-ownerid"), this.options = i, this.textFieldBlurTimeId = null, this._init())
    };
    a.current = null, a.prototype._init = function () {
        var e = this;
        e.formItem = T.query(".com-cmt-form", this.target)[0], e.textField = T.query(".cmt-text", this.formItem)[0], e.rating = T.query(".com-rating", this.target)[0], e.textConent = T.query(".info-text", this.target)[0];
        var i = this.target.getAttribute("data-quality");
        "20" == i && e.textConent && (e.textConent.innerHTML += "<i class='s-dig'></i>"), e.rateInstance = null, e.rateIdx = 0, e.isAgree = !1, e.isFormVisible = !1, e.frmRating = 0, e.frmObjSyn = {}, e.frmSyn = "", e.frmText = "", e.tools = new r(T.query(".cmt-rpl-tool", this.target)[0], {
            target: e,
            type: this.options.type
        }), e.attachEvent()
    }, a.prototype.sumbit = function () {
        var e = window.vplay || window.minfo, i = this, o = this.options.type;
        if (!F.tool.user.isLogin()) return F.tool.user.isLogin(!0), void T.observer.send(F.EventCenter.ERR_NO_LOGIN);
        if (e.switchControl && 0 == e.switchControl.comment) return void F.tool.errModule();
        var e = this.getItemInfo();
        if (e && "" == e.formContent) return void this.showError();
        if (i.isOutMaxNum) return void this.showError('<div class="wrap"><div class="content">字数超出了!</div></div>');
        var n = "", r = "", a = 0, s = this.options.target.userInfo || {};
        n = s.mhead, r = s.nickname, s.vip_state && "0" != s.vip_state && 0 != s.vip_state && (a = 1);
        var m = T.query("#userMsgLayout span.com-pic-vip")[0];
        "block" == T.dom.getStyle(m, "display") && (a = 1);
        var c = T.query(".com-rating", this.target)[0];
        c = c ? c.getAttribute("data-rating") : 0;
        var l = new Date, g = function (e) {
            return e = "0" + e, e.substr(e.length - 2, 2)
        };
        r || (r = i.options.target.userInfo.nickname);
        var u = "";
        if (!r) {
            try {
                u = decodeURI(F.tool.user.name)
            } catch (d) {
            }
            u && (r = u)
        }
        var p = l.getFullYear() + "-" + g(l.getMonth() + 1) + "-" + g(l.getDate()) + " " + g(l.getHours()) + ":" + g(l.getMinutes()) + ":" + g(l.getSeconds()),
            h = {
                uinfo: {mhead: n, name: r, vip_state: a},
                rating: c,
                content: e.formContent,
                createdate: p,
                infoact: 0
            };
        i.options.target.appendComment(h), i.options.target.hideError();
        try {
            i.options.target.pager.anchor(!0)
        } catch (d) {
        }
        "reply" == o && i.hideForm();
        var f = i.options.target.firstComment();
        if ("commit" == o) {
            var v = {};
            v.star = 2 * i.frmRating, v.content = e.formContent || "", v.comment_type = "t_comment";
            var y = i.options.target.metchAPITemplete(F.config.api + "/comment/update/{TYPE}/{ID}");
            if (!y) return;
            F.post(y, v, function (e) {
                return e && "403" == e.status && (F.tool.user.isLogin(!0, !0), f && T.dom.remove(f)), e && 1408 == e.status ? (F.tool.errModule(), void i.options.target.undoComment()) : void i.clearText()
            })
        } else if ("reply" == o) {
            var v = {};
            v.star = 2 * i.frmRating, v.content = e.formContent, v.comment_type = "t_reply", i.commendId && (v.comment_id = i.commendId), i.commendOwnerId && (v.comment_owner = i.commendOwnerId);
            var y = i.options.target.metchAPITemplete(F.config.api + "/comment/update/{TYPE}/{ID}");
            if (!y) return;
            F.post(y, v, function (e) {
                return e && "403" == e.status && (F.tool.user.isLogin(!0, !0), f && T.dom.remove(f)), e && 1408 == e.status ? (F.tool.errModule(), void i.options.target.undoComment()) : void i.clearText()
            })
        }
    }, a.prototype.clearText = function () {
        this.textField.value = ""
    }, a.prototype.appendText = function (i) {
        this.textField.value == e.defaultText && (this.textField.value = "");
        var o = this.textField;
        if (document.selection) {
            o.focus();
            var n = document.selection.createRange();
            n.text = i, n.select()
        } else if ("number" == typeof o.selectionStart && "number" == typeof o.selectionEnd) {
            var r, a = o.value, s = o.selectionStart, m = o.selectionEnd;
            o.focus(), r = s != m ? a.substring(0, s) + i + a.substring(m) : a.substring(0, s) + i + a.substring(s), o.value = r, o.selectionStart = o.selectionEnd = s + i.length
        } else o.value += i
    }, a.prototype.focusTextField = function () {
        this.textField.focus();
        var e = 0;
        if (document.selection) {
            var i = this.createTextRange();
            i.moveStart("character", e), i.collapse()
        } else "number" == typeof this.textField.selectionStart && "number" == typeof this.textField.selectionEnd && (this.textField.selectionStart = this.textField.selectionEnd = e);
        this.checkTextField()
    }, a.prototype.autoComplete = function () {
        if ("reply" == this.options.type) {
            var e = this.getItemInfo(), i = "//@{username}:{content}", o = i.replace(/{username}/gi, e.username);
            o = o.replace(/{content}/gi, e.content), this.textField.value = o
        }
    }, a.prototype.getTextField = function () {
        return this.textField
    }, a.prototype.getItemInfo = function () {
        var e = {};
        return e.username = "reply" == this.options.type ? T.query(".info-name a", this.target)[0].innerHTML : T.query(".info-name span", this.target)[0].innerHTML, e.content = this.target.content, e.formContent = T.query(".cmt-text", this.target)[0].value, "我来说两句" == e.formContent && (e.formContent = ""), e
    }, a.prototype.showForm = function () {
        T.show(this.formItem), this.isFormVisible = !0, this.autoComplete(), this.focusTextField()
    }, a.prototype.hideForm = function () {
        T.hide(this.formItem), this.isFormVisible = !1
    }, a.prototype.showError = function (e) {
        var i = T.query(".cmt-error-info", this.target)[0];
        i && (e = e ? e : '<div class="wrap"><div class="content">请输入内容</div></div>', T.show(i), i.innerHTML = e, T.dom.setStyle(i, "top", "0"), F.tween(i, null, .5, {top: "12"})), setTimeout(this.hideError, 1500)
    }, a.prototype.hideError = function () {
        var e = T.query(".cmt-error-info", this.target)[0];
        F.killtween(e), e && T.hide(e)
    }, a.prototype.clearTextFieldBlurTimer = function () {
        clearTimeout(this.textFieldBlurTimeId)
    }, a.prototype.startTextFieldBlurTimer = function () {
        var i = this;
        clearTimeout(this.textFieldBlurTimeId), this.textFieldBlurTimeId = setTimeout(function () {
            ("" == i.textField.value || i.textField.value == e.defaultText) && (i.textField.value = e.defaultText)
        }, 200)
    }, a.prototype.checkTextField = function () {
        var e = this;
        this.textField.style.height = "24px", e.isSecondCheck ? this.textField.style.height = this.textField.scrollHeight + "px" : (this.textField.style.height = "44px", e.isSecondCheck = !0)
    }, a.prototype.__onShowForm = function () {
        a.current && a.current.hideForm(), a.current = this, this.showForm()
    }, a.prototype.__onContextMenu = function (e) {
        T.observer.send(F.EventCenter.COMMENT_MGR_SHOWCONTEXT, {
            target: this,
            element: this.target,
            event: e || window.event
        })
    }, a.prototype.__onToggleForm = function () {
        a.current && a.current.hideForm(), a.current = this, this.isFormVisible ? this.hideForm() : this.showForm()
    }, a.prototype.__onTextEvent = function (i) {
        var i = i || window.event;
        switch (i.type) {
            case"focus":
                F.tool.user.isLogin() || (F.tool.user.isLogin(!0), this.textField.blur()), ("" == this.textField.value || this.textField.value == e.defaultText) && (this.textField.value = ""), this.hideError(), this.tools.show();
                break;
            case"blur":
                this.startTextFieldBlurTimer();
                break;
            case"keyup":
                this.checkTextField()
        }
    }, a.prototype.__onSetRating = function (e) {
        var i = this;
        if (i.frmRating = e + 1, i.rateInstance) {
            var o = {};
            o.star = 2 * i.frmRating, o.content = "", o.comment_type = "t_star";
            var n = i.options.target.metchAPITemplete(F.config.api + "/comment/update/{TYPE}/{ID}");
            if (!n) return;
            F.post(n, o, function (o) {
                return o && 200 == o.status ? (i.rateInstance.setRate(e), i.rateInstance.disable(), void T.observer.send(F.EventCenter.MEDIA_RATING, {rateIdx: e})) : void(403 == o.status && F.tool.user.isLogin(!0, !0))
            })
        }
    }, a.prototype.setSNSState = function () {
        self.frmObjSyn
    }, a.prototype.attachEvent = function () {
        var e = this;
        T.on(e.textField, "focus", T.fn.bind(e.__onTextEvent, e)), T.on(e.textField, "blur", T.fn.bind(e.__onTextEvent, e)), T.on(e.textField, "keyup", T.fn.bind(e.__onTextEvent, e));
        var i = T.query(".act-reply", this.target)[0], o = T.query(".act-agree", this.target)[0];
        if (e.isAgree = o && "1" == o.getAttribute("data-value") ? !0 : !1, this.target.getAttribute("data-commentid") && T.on(this.target, "contextmenu", T.fn.bind(e.__onContextMenu, e)), i && T.on(i, "click", T.fn.bind(e.__onToggleForm, e)), e.rating) {
            e.rateInstance = e.rating.instance;
            var n = function () {
                F.widget.rating.rating.registry(e.target), e.rateInstance = e.rating.instance, e.rateInstance.onRate = T.fn.bind(e.__onSetRating, e)
            };
            e.rateInstance ? n() : F.load("widget.rating.rating", n)
        }
        if (o) {
            var r = function () {
                if (!e.isAgree && !T.dom.hasClass(o, "act-agree-disable")) {
                    var i = T.query("em", o)[0], n = i.innerHTML, r = /\d+/gi.exec(n);
                    n = n.replace(r, parseInt(r) + 1), F.post(F.config.api + "/comment/update/comment/" + e.commendId, {}, function (i) {
                        return i && 200 == i.status ? (o.innerHTML = "已赞同<em>" + n + "</em>", T.dom.addClass(o, "act-agree-on"), e.isAgree = !0, void 0) : void(403 == i.status ? F.tool.user.isLogin(!0, !0) : 1408 == i.status && F.tool.errModule())
                    })
                }
            };
            T.on(o, "click", r)
        }
    };
    var s = function (i, o) {
        this.options = baidu.extend(baidu.extend({}, e), o), this.target = i, this.itemContainer = T.query(".cmt-list", this.target)[0], this.loading = T.query(".cmt-loading", this.target)[0], this.items = [], this.pageCache = [], this.starEditable = !0, this.isRenderStar = !1, this.isPageInit = !1, this.emoHash = null, this.currentChilds = [], this.pager = null, this.pagesize = this.options.pagesize || 50, this.page = 0, this.currentPage = 1, this.count = 1, this.isReload = !0, this.latestComment = null, this.userInfo = {nickname: ""}, this.pageType = 1, window.vplay && (this.pageType = parseInt(window.vplay.gtype + "")), this._init()
    };
    s.prototype.registryItem = function (e, i) {
        var o = new a(e, {type: i, target: this});
        this.items.push(o)
    }, s.prototype.reload = function () {
        var e = this;
        e.isReload = !0, e.pageCache = [], e.renderPager(), this.setPage(1)
    }, s.prototype.firstComment = function () {
        var e = T.dom.query(".cmt-list-box")[0];
        return e
    }, s.prototype.undoComment = function () {
        if (this.latestComment) {
            try {
                this.latestComment.parentNode.removeChild(this.latestComment)
            } catch (e) {
            }
            this.latestComment = null
        }
    }, s.prototype.appendComment = function (e) {
        var o = this, n = T.dom.create("div", {className: "cmt-list-box fix"});
        this.latestComment = n;
        var r = e.content.replace(/\/\/@([^:]+):/gi, "//<em><a>@$1</a></em>:"), a = /\[([^\]]+)\]/gi;
        r = r.replace(a, function (e, i) {
            var n = i;
            return o.emoHash[n] ? '<img src="' + o.emoHash[n] + '" />' : e
        }), e.htmlContent = r;
        var s = F.tpl.compile(i)(e);
        if (s = s.replace(/&#60;/gi, "<"), s = s.replace(/&#62;/gi, ">"), s = s.replace(/&#34;/gi, '"'), s = s.replace(/&#39;/gi, "'"), s = s.replace(/&#38;/gi, "&"), n.innerHTML = s, n.setAttribute("data-commentid", e.commentId), n.setAttribute("data-ownerid", e.accountId), T.each(T.query("img", n), function (e) {
            e.getAttribute("_lazysrc") && (e.setAttribute("src", e.getAttribute("_lazysrc")), e.removeAttribute("_lazysrc"))
        }), o.itemContainer.childNodes.length > 0) {
            var m = o.itemContainer.childNodes[0];
            T.dom.insertBefore(n, m)
        } else o.itemContainer.appendChild(n);
        o.count || (o.count = 0), o.count += 1, o.renderCount(), T.observer.send("appendComment")
    }, s.prototype.renderPager = function () {
        var e = this;
        if (e.pager) {
            e.pager.update({total: e.count, pageSize: e.pagesize, currentPage: 1});
            var i = e.count / e.pagesize, o = T.query(".cmt-pager", e.target)[0];
            i > 1 && o ? T.dom.show(o) : T.dom.hide(o)
        }
    }, s.prototype.setRating = function (e) {
        this.star = 2 * (e + 1), this.renderStar(this.star)
    }, s.prototype.renderStar = function (e) {
        var i = this;
        i.isRenderStar || (e = Math.ceil(parseInt(e) / 2), i.starEditable = 0 == e, i.rate = T.query(".com-rating", i.target)[0], i.rate && i.rate.instance && i.rate.instance.setRate(e - 1), i.starEditable || i.rate.instance.disable())
    }, s.prototype.renderPage = function (e) {
        var i = this, o = i.pageCache[e];
        if (o) for (var n = 0; n < o.length; n++) i.itemContainer.appendChild(o[n]), i.registryItem(o[n], "reply");
        try {
            T.page.lazyLoadImage({preloadHeight: 100})
        } catch (r) {
        }
    }, s.prototype.renderUserHeadInfo = function (e) {
        {
            var i = T.query(".cmt-avatar img", this.target)[0], o = T.query(".cmt-avatar .vip-sign", this.target)[0],
                n = T.query(".cmt-info-head .info-name span", this.target)[0];
            T.query(".cmt-rating", this.target)[0]
        }
        i && i.setAttribute("src", e.uinfo.mhead), "0" != e.uinfo.vip_state && 0 != e.uinfo.vip_state && T.dom.show(o), n && (this.userInfo.nickname || (this.userInfo.nickname = e.uinfo.name), F.tool.user.isLogin() ? (n.setAttribute("title", e.uinfo.name), n.innerHTML = e.uinfo.name) : n.innerHTML = "未登录用户,　请<a style='color:#f86400' href='javascript:F.tool.user.isLogin(true);void(null);'>登录</a>"), this.userInfo.vip_state = e.uinfo.vip_state, this.userInfo.mhead || (this.userInfo.mhead = e.uinfo.mhead);
        Math.ceil(Number(e.star) / 2)
    }, s.prototype.renderCount = function () {
        var e = this, i = T.query(".cmt-title em i")[0];
        i && (i.innerHTML = e.count);
        var o = T.query(".tool-block .commentbtn .count")[0];
        o && (o.innerHTML = (e.count + "").replace(/\d+?(?=(?:\d{3})+$)/gim, "$&,"))
    }, s.prototype.showError = function (e) {
        var i = this.loading, o = T.query("span", i)[0];
        o && (o.innerHTML = e)
    }, s.prototype.hideError = function () {
        T.dom.hide(this.loading)
    }, s.prototype.loadPage = function (e) {
        var o = this;
        this.page = e;
        var n = function (n) {
            var r = [], a = null, s = n.comment || [], m = o.pagesize;
            if (m = Math.min(s.length, m), 0 >= m) return o.showError("暂无评论，快来抢沙发～"), o.renderStar(n.star), void o.renderUserHeadInfo(n);
            T.dom.hide(o.loading);
            for (var c = 0; m > c; c++) {
                a = T.dom.create("div", {className: "cmt-list-box fix"});
                var l = {idx: c, page: e, rating: Math.floor(5 * Math.random())};
                l = s[c], l.idx = c;
                var g = l.content.replace(/\/\/@([^:]+):/gi, "//<em><a>@$1</a></em>:"), u = /\[([^\]]+)\]/gi;
                g = g.replace(u, function (e, i) {
                    var n = i;
                    return o.emoHash[n] ? '<img src="' + o.emoHash[n] + '" />' : e
                }), l.htmlContent = g, l.page = e, l.rating = Math.ceil(Number(l.score) / 2);
                var d = F.tpl.compile(i)(l);
                d = d.replace(/&#60;/gi, "<"), d = d.replace(/&#62;/gi, ">"), d = d.replace(/&#34;/gi, '"'), d = d.replace(/&#39;/gi, "'"), d = d.replace(/&#38;/gi, "&"), a.innerHTML = d, a.setAttribute("data-commentid", l.commentId), a.setAttribute("data-ownerid", l.accountId), a.setAttribute("data-quality", l.quality), a.setAttribute("data-stat", l.stat), a.content = l.content, r.push(a)
            }
            o.count = Number(n.total_num) || 0, o.pageCache[e] = r, o.renderPage(e);
            var p = n.star || o.star || 0;
            o.renderStar(p), p && T.observer.send(F.EventCenter.MEDIA_RATING, {rateIdx: p / 2 - 1}), o.renderUserHeadInfo(n), o.renderCount(), o.isReload && (o.renderPager(), o.isReload = !1)
        }, r = [];
        r.push("pg=" + e), r.push("pg_size=" + o.pagesize);
        var a = o.metchAPITemplete(F.config.api + "/comment/display/{TYPE}/{ID}");
        a && (F.get(a + "?" + r.join("&"), function (e) {
            return e && 200 == e.status ? (e.data && e.data.uinfo && "undefined" == typeof e.data.uinfo.vip_state && (e.data.uinfo.vip_state = 0), n(e.data), T.observer.send("appendComment"), void(o.isPageInit || (o.pager.update({
                pageSize: o.pagesize,
                total: e.data.total_num
            }), o.isPageInit = !0))) : void o.showError("服务器异常，请稍后重试.")
        }), T.dom.show(o.loading))
    }, s.prototype.metchAPITemplete = function (e) {
        var i = this, o = window.vplay || window.minfo || window.vinfo;
        if (!o) return void i.showError("评论功能异常，找不到评论模块数据.");
        if (o && !o.galleryid && !o.videoid) return i.showError("评论功能异常，找不到评论模块参数"), "";
        var n = "", r = 0;
        return o.galleryid ? (n = "gallery", r = o.galleryid) : (n = "video", r = o.videoid), e = e.replace(/{TYPE}/gi, n), e = e.replace(/{ID}/gi, r)
    }, s.prototype.setPage = function (e) {
        var i = this;
        if (i.currentPage = e, i.pager) {
            var o = (e - 1) * i.pagesize, n = e * i.pagesize;
            if (0 >= o && (o = 0), n >= i.count && (n = i.count), this.itemContainer) {
                T.each(T.query(".cmt-list-box", i.itemContainer), function (e) {
                    T.dom.remove(e)
                });
                i.pageCache[e] ? i.renderPage(e) : i.loadPage(e)
            }
        }
    }, s.prototype.initPageAction = function () {
        var e = this, i = function (e) {
            return e
        }, o = T.query(".cmt-pager", e.target)[0];
        e.pager || F.load("widget.pager.pager", function () {
            e.pager = new F.widget.pager.pager({
                currentPage: 1,
                pageSize: e.pagesize,
                total: e.count,
                pageButtonNumber: 6,
                renderTo: o,
                anchor: "commentAnchor",
                anchorOffset: -71,
                lang: {pre: "上一页", next: "下一页", n: i},
                update: function () {
                    e.setPage(this.options.currentPage)
                }
            })
        }), T.dom.hide(o)
    }, s.prototype.onMGREvent = function (e, i) {
        return this.pageCache[this.page] = null, void this.setPage(this.page)
    }, s.prototype._init = function () {
        var e = this, i = T.query(".cmt-box", this.target)[0], o = T.query(".cmt-list-box", this.target);
        if (e.count = 0, e.registryItem(i, "commit"), T.each(o, function (i) {
            e.registryItem(i, "reply")
        }), e.initPageAction(), !e.emoHash) {
            e.emoHash = {};
            var n = T.query(".cmt-emo-list", this.target)[0];
            T.each(T.query("li img", n), function (i) {
                var o = i.getAttribute("title"), n = i.getAttribute("src");
                -1 != n.indexOf("blank.gif") && (n = i.getAttribute("_lazysrc")), o && (e.emoHash[o] = n)
            })
        }
        e.setPage(1), T.observer.add(F.EventCenter.COMMENT_MGR_CLEAR, T.fn.bind(this.onMGREvent, this)), T.observer.add(F.EventCenter.COMMENT_MGR_TOP, T.fn.bind(this.onMGREvent, this)), T.observer.add(F.EventCenter.COMMENT_MGR_MODIFY, T.fn.bind(this.onMGREvent, this)), T.observer.add(F.EventCenter.MEDIA_RATING, function (i, o) {
            e.setRating(o.rateIdx)
        })
    }, setTimeout(function () {
        T.each(T.query(".mod-comment"), function (e) {
            var i = window.comment_opt || {}, o = new s(e, i);
            window.cmt = o
        })
    }, 1e3), T.ready(function () {
    })
}();
;!function () {
    if (F.config && F.config.ctrlname) {
        return
    }
}();
;!function () {
    function n(n) {
        var i = T.get("aniRun");
        i.innerHTML = n, F.tween(T.get("aniRun"), F.math.tweener.simple, 1, {top: -40}, function () {
            T.dom.remove(i)
        })
    }

    function i(i) {
        var e = T.dom.getAttr(i, "class");
        T.dom.hasClass(i, "ding") && (e = "ding"), T.dom.hasClass(i, "cai") && (e = "cai");
        var d = r[e];
        d && (T.dom.insertHTML(i, "beforeEnd", '<div id="aniRun" class="animation"></div>'), o(e, function () {
            n("ding" == e ? "+1" : "-1"), T.dom.addClass(i.parentNode, d.cls), a(d.type), T.un(c, "click")
        }))
    }

    function a(n) {
        {
            var i = T.query(".sm-ding", c)[0], a = parseInt(i.innerHTML) || 0, e = T.query(".sm-cai", c)[0],
                o = parseInt(e.innerHTML) || 0;
            T.query(".bar", c)[0]
        }
        "up" == n ? a++ : o++, i.innerHTML = a, e.innerHTML = o
    }

    function e(n, i) {
        F.tool.user.userid ? i && i(n) : (s(n), F.tool.ajaxLogin.panel())
    }

    function o(n, i) {
        if (r[n]) {
            var a = F.config.api + "/ajax/digg/" + r[n].type + "/" + T.dom.getAttr(c, "data-videoid");
            F.get(a, function (a) {
                403 == a.status ? (s(n), F.tool.ajaxLogin.panel()) : 200 == a.status && (s(n), i && i(a))
            })
        }
    }

    function d() {
        var n = null;
        T.on(c, "click", function (a) {
            a = T.event.get(a), n = a.target, "A" == n.tagName && e(n, i)
        })
    }

    function s(n) {
        var i = "string" == typeof n ? n : T.dom.getAttr(n, "class"), a = r[i];
        if (a) {
            var e = r[i].action;
            F.log.action({
                flag: F.user.userid ? 1 : -1,
                action: e,
                mediatype: [vplay.channelid || "", vplay.galleryid || "", vplay.videoid || ""].join("|")
            })
        }
    }

    var r = {
        ding: {type: "up", text: "已顶", cls: "digglisted digglistUpEd", action: "up"},
        cai: {type: "step", text: "已踩", cls: "digglisted digglistStepEd", action: "down"}
    }, c = T.get("_digglist");
    c && T.dom.ready(function () {
        d()
    })
}();
;T.dom.ready(function () {
    function e(e) {
        this.option = T.object.extend({
            root: "",
            dotroot: "",
            item: "",
            dot: "",
            cls: "current",
            progress: !1
        }, e || {}), this.root = T.get(this.option.root), this.root && (this.prevBtn = T.get("prevBtn"), this.nextBtn = T.get("nextBtn"), this.initialize = !1, this.index = -1, this.total = 0, this.repeat = "0" == this.root.getAttribute("data-repeat") ? !1 : !0, this.thumbs = "1" == this.root.getAttribute("data-thumbs") ? !0 : !1, this.autohidepager = "1" == this.root.getAttribute("data-autohidepager") ? !0 : !1, this.thumbsWidth = 0, this.isFirstTimeResizeThumbs = !0, this.lazyslider = "1" == this.root.getAttribute("data-lazyslider") ? !0 : !1, this.duration = 3e3, this.delay = 500, this.steps = T.browser.ie < 7 ? 50 : 20, this.iPad = T.platform.isIpad, this.width = 0, this.dotTpl = '<a class="dot-wrp" href="javascript:;"><b class="dot"></b></a>', this.supportTransition = T.dom.supportStyle("transition"), this.init())
    }

    var o = null;
    e.prototype.init = function () {
        this.update(), this.bindArrow(), this.bindStop(), this.bindIpad(), this.play(0), this.autoRun(), T.observer.addOne(F.EventCenter.FOCUS_AD_LOADED, T.fn.bind(this.update, this)), T.on(window, "resize", T.fn.bind(this.onResize, this)), this.onResize()
    }, e.prototype.play = function (e) {
        var o = this;
        if (o.repeat ? (e >= o.total && (e = 0), 0 > e && (e = o.total - 1)) : (e >= o.total && (e = o.total - 1), 0 > e && (e = 0)), e != o.index) {
            o.index = e, T.each(o.items, function (e) {
                o.supportTransition ? T.dom.setStyles(e, {
                    display: "block",
                    opacity: ""
                }) : T.dom.setStyles(e, {
                    display: "none",
                    opacity: 0
                }), T.dom.removeClass(e, "z-3"), T.dom.addClass(e, "z-1")
            }), T.each(o.dots, function (e) {
                T.dom.removeClass(e, o.option.cls)
            });
            var i = o.items[e], s = T.query("img", i)[0];
            T.dom.addClass(o.dots[e], o.option.cls), T.dom.addClass(i, "z-3"), o.supportTransition ? T.dom.setStyles(i, {display: "block"}) : T.dom.setStyles(i, {display: "block"}), s && !T.dom.getAttr(s, "src") && (s.src = T.dom.getAttr(s, "data-original")), o.initialize || (T.dom.setStyle(i, "opacity", 1), o.thumbs && o.isFirstTimeResizeThumbs ? T.dom.setStyle(i, "visibility", "hidden") : T.dom.setStyle(i, "visibility", "visible"), o.supportTransition && T.dom.setStyle(i, "visibility", "visible"), o.initialize = !0), this.supportTransition || (F.killtween(i), T.dom.setStyle(i, "visibility", "visible"), F.tween(i, F.math.tweener.simple, o.delay / 1e3, {opacity: 1}, function () {
                o.option.progress && o.progress()
            })), o.repeat || (T.dom.removeClass(o.prevBtn, "btn-disable"), T.dom.removeClass(o.nextBtn, "btn-disable"), 0 == o.index && T.dom.addClass(o.prevBtn, "btn-disable"), o.index == o.total - 1 && T.dom.addClass(o.nextBtn, "btn-disable")), o.autoUpdateThumbsScrollLeft(), T.observer.send("focus_change")
        }
    }, e.prototype.autoUpdateThumbsScrollLeft = function () {
        return
    }, e.prototype.autoRun = function () {
        var e = this;
        e.stopRun(), e.total <= 1 || (e.option.progress ? e.progress() : e.autoTimer = setInterval(function () {
            e.play(e.index + 1)
        }, e.duration))
    }, e.prototype.progress = function () {
        function e(e) {
            return e > a ? (o(), void s.play(++s.index % s.total)) : (T.dom.setStyle(n, "width", 100 * e / a + "%"), void(s.progressTimer = setTimeout(i, d)))
        }

        function o() {
            clearTimeout(s.progressTimer), T.dom.setStyle(n, "width", 0), T.dom.show(n.parentNode)
        }

        function i() {
            r += d, e(r)
        }

        var s = this, n = T.get("_progress"), r = (s.width || n.parentNode.offsetWidth, 0), a = s.duration, d = s.steps;
        o(), s.progressTimer = setTimeout(i, d)
    }, e.prototype.stopRun = function () {
        var e = this;
        clearInterval(e.autoTimer), clearTimeout(e.progressTimer)
    }, e.prototype.update = function (e, o) {
        this.items = T.query("#focusWrap li"), F.setURLTarget(T.query("#focusWrap")), this.total = this.items.length, o && o.index <= this.index && (e ? this.index = 0 : this.index += 1), this.updateDots(e), this.bindIpad()
    }, e.prototype.onResize = function () {
        var e = this;
        if (e.thumbs && e.dots.length > 0) {
            var o = e.dots[0].offsetWidth, i = T.query(".foc-con-dot-wrap", e.root)[0];
            if (!i) return;
            T.dom.setStyle(i, "width", o * e.dots.length);
            var s = T.page.getWidth(), n = T.dom.getPosition(e.root).left, r = T.query(".fon-con-inner .item", e.root);
            T.each(T.query(".fon-con-inner .item .pic", e.root), function (e) {
                var o = e.offsetWidth || 1600;
                T.dom.setStyle(e, "left", s / 2 - o / 2 - n)
            }), e.isFirstTimeResizeThumbs && T.each(r, function (e) {
                T.dom.setStyle(e, "visibility", "visible")
            }), e.isFirstTimeResizeThumbs = !1
        }
        e.autoUpdateThumbsScrollLeft()
    }, e.prototype.updateDots = function (e) {
        var o = this, i = T.get(o.option.dotroot);
        if (i) {
            var s = "#" + this.option.dotroot + " .dot-wrp";
            if (o.dots = T.query(s), e && e.type == F.EventCenter.FOCUS_AD_LOADED && o.onResize(), o.total > 1 && e && (o.bindArrow(), o.autoRun(), T.dom.show(i)), o.total <= 1 && T.dom.hide(i), o.dots.length <= 0) {
                var n = "";
                T.each(o.items, function () {
                    n += o.dotTpl
                }), i.innerHTML = n, o.dots = T.query(s)
            }
            var r = o.index;
            0 > r && (r = 0), T.each(o.dots, function (e) {
                T.dom.removeClass(e, "current")
            }), o.index = -1, o.play(0), T.dom.addClass(o.dots[r], "current"), o.bindDots()
        }
    }, e.prototype.bindDots = function () {
        var e = this, o = T.get(e.option.dotroot);
        if (o && !o.bindDelegate) {
            var i = 0, s = 200;
            F.Event.delegate(o, ".dot-wrp", "mouseover", function () {
                clearTimeout(i);
                var o = this, n = e.dots.indexOf(o);
                i = setTimeout(function () {
                    T.dom.hasClass(o, "current") || e.play(n), e.index = n
                }, s)
            }), o.bindDelegate = !0
        }
    }, e.prototype.bindDots2 = function () {
        var e = this, o = 0, i = 200;
        T.each(e.dots, function (s, n) {
            T.on(s, "mouseover", function () {
                clearTimeout(o), o = setTimeout(function () {
                    T.dom.hasClass(s, "current") || e.play(n), e.index = n
                }, i)
            })
        })
    }, e.prototype.bindArrow = function () {
        function e() {
            r.lazyslider ? s("next") : r.play(r.index + 1)
        }

        function o() {
            r.lazyslider ? s("prev") : r.play(r.index - 1)
        }

        function i() {
            T.dom.removeClass(r.prevBtn, "prev-disable"), T.dom.removeClass(r.nextBtn, "next-disable"), 0 >= u && (u = 0, T.dom.addClass(r.prevBtn, "prev-disable")), u >= h - 1 && (u = h - 1, T.dom.addClass(r.nextBtn, "next-disable")), 1 == h && (T.dom.addClass(r.prevBtn, "prev-disable"), T.dom.addClass(r.nextBtn, "next-disable"))
        }

        function s(e, o) {
            if (c) {
                "next" == e ? u += 1 : u -= 1, "undefined" != typeof o && (u = o), i();
                var s = u * p * d, n = l.scrollLeft;
                F.tween({val: n}, F.math.tweener.simple, .5, {val: s}, null, null, null, null, function (e, o) {
                    l.scrollLeft = o
                })
            }
        }

        function n() {
            var e = r.index, o = Math.floor(e / p);
            o != u && s("", o)
        }

        var r = this;
        if (!(r.total <= 1) && r.prevBtn && r.nextBtn) {
            T.dom.setStyle(r.prevBtn, "visibility", "visible"), T.dom.setStyle(r.nextBtn, "visibility", "visible"), T.un(r.prevBtn, "click", o), T.un(r.nextBtn, "click", e), r.prevBtn.onclick = o, r.nextBtn.onclick = e;
            var a = 0, d = 0, l = null, u = 0, p = 1, h = 1, c = !1, m = function () {
                try {
                    r.items = T.query("#focusWrap li"), r.total = r.items.length, l = T.get(r.option.dotroot), a = l.offsetWidth, d = r.thumbsWidth || r.dots[0].offsetWidth
                } catch (e) {
                }
                r.thumbsWidth = d ? d : 0, a && d && l && (c = !0, p = Math.floor(a / r.thumbsWidth), h = Math.ceil(r.total / p)), i()
            };
            T.on(window, "resize", m), T.observer.add(F.EventCenter.FOCUS_AD_LOADED, m), T.observer.add("focus_change", n), m(), T.dom.addClass(r.prevBtn, "prev-disable"), l && setTimeout(function () {
                l.scrollLeft = 0
            }, 100)
        }
    }, e.prototype.bindStop = function () {
        var e = this;
        T.on(T.get(e.option.root), "mouseover", function () {
            e.stopRun(), e.displayFocBtn(!0)
        }), T.on(T.get(e.option.root), "mouseout", function () {
            e.autoRun(), e.displayFocBtn(!1)
        })
    }, e.prototype.bindIpad = function () {
        var e = this;
        !e.iPad || e.total <= 1 || T.each(e.items, function (e) {
            T.dom.hasAttr(e, "data-touch-bind") || (F.TouchHandler.attach(e, {
                onTouchStart: function () {
                    o.stopRun()
                }, onTouchMove: function (e) {
                    "h" == this.dir && T.event.stop(e)
                }, onTouchEnd: function () {
                    var e = this.start, i = this.moved, s = this.distance;
                    return e.x === i.x || Math.abs(s.x) < Math.abs(s.y) ? void o.autoRun() : (o.play(i.x < e.x ? o.index + 1 : o.index - 1), void o.autoRun())
                }
            }), T.dom.setAttr(e, "data-touch-bind", 1))
        })
    }, e.prototype.displayFocBtn = function (e) {
        this.lazyslider || this.autohidepager && this.prevBtn && this.nextBtn && (e ? (F.tween(this.prevBtn, F.math.tweener.easeOutCubic, .5, {left: 0}), F.tween(this.nextBtn, F.math.tweener.easeOutCubic, .5, {right: 0})) : (F.tween(this.prevBtn, F.math.tweener.easeOutCubic, .5, {left: -37}), F.tween(this.nextBtn, F.math.tweener.easeOutCubic, .5, {right: -37})))
    }, o = new e({root: "focusWrap", dotroot: "dotLayout", item: "li", dot: "a.dot-wrp", cls: "current"})
});
;T.ready(function () {
    T.each(T.q("tool-foldtxt"), function (e) {
        if ("fold" != T.dom.getAttr(e, "data-comtype")) {
            var i = T.query("[data-show]=1", e)[0], n = T.query("[data-show=0]", e)[0], d = T.q("fold", e)[0], o = !0;
            i.innerHTML != n.innerHTML && T.setStyle(d, "display", "inline");
            var l = function () {
                o ? (T.hide(i), T.dom.setStyle(n, "display", "inline"), T.addClass(d, "unfold"), d.innerHTML = "收起<i></i>") : (T.dom.setStyle(i, "display", "inline"), T.hide(n), T.removeClass(d, "unfold"), d.innerHTML = "展开<i></i>"), o = !o
            };
            T.on(d, "click", l), T.dom.setAttr(e, "data-comtype", "fold")
        }
    })
});
;!function () {
    var e = "";
    T.dom.ready(function () {
        {
            var o = T.get("gototopwrap");
            T.query(".ad-game-tip")[0]
        }
        if (o) {
            var i = 0;
            e && (T.dom.removeClass(o, e), T.dom.addClass(o, e));
            var a = {scroH: 450, pageH: 230, ttl: 500};
            if (!(T.page.getViewHeight() < a.pageH) && o) {
                var d = function () {
                    clearTimeout(i), i = setTimeout(function () {
                        T.page.getScrollTop() > a.scroH ? T.dom.setStyle(o, "visibility", "visible") : T.dom.setStyle(o, "visibility", "hidden")
                    }, a.ttl)
                };
                T.un(window, "scroll", d), T.on(window, "scroll", d), window.fixedIE6 && window.fixedIE6()
            }
        }
    }), T.observer.add(F.EventCenter.CLIENT_INSTALL_TIP_CHANGE, function (o) {
        e = "install-cl-margin";
        var i = T.get("gototopwrap");
        i && (T.dom.removeClass(i, e), T.dom.addClass(i, e));
        var a = T.query(".ad-game-tip")[0];
        a && o && 1 == o.status && T.dom.setStyle(a, "bottom", 147)
    })
}();
;T.dom.ready(function () {
    !function () {
        var o = F.cookie.get("BRANCH");
        "alpha" == o && T.dom.insertHTML(document.body, "beforeEnd", '<div class="z-10" style="width:80px;height:100px;overflow:hidden;position:fixed;_position:absolute;right:0;top:100px;background-color:red;color:#fff;font-size:14px;line-height:20px;padding:10px;">这个环境是alpha,不是公网,清除缓存在试,谢谢！</div>')
    }()
});
;!function () {
    return
}();
;!function () {
    var a = {margin: {x: 20, y: 20}}, e = function (e, r) {
        var i = this, n = baidu.extend(baidu.extend({}, a), r);
        if (i.options = n, i.GUID = T.lang.guid(), i.target = T.g(e), !T.dom.getAttr(i.target, "data-lazy") && i.target && "guesslike" != i.target.getAttribute("data-comtype")) {
            i.target.setAttribute("data-comtype", "guesslike"), i.lazypageCache = {}, i.container = T.q("guess-wrap", i.target)[0], i.uiChange = T.q("guess-change", i.target)[0], i.stp = "", i.stpReport = [], i.switchenable = "0" == T.dom.getAttr(i.target, "data-switch") ? !1 : !0, i.customTpl = T.dom.getAttr(i.target, "data-tpl") || "tplGuessLike", i.serverAPI = "/api/guess_like/";
            var s = T.dom.getAttr(i.target, "data-ajax");
            s ? (i.ajaxParam = T.dom.getAttr(i.target, "data-ajaxparam") || "", i.serverParam = T.dom.getAttr(i.target, "data-serverparam") || "", i.serverPath = T.dom.getAttr(i.target, "data-serverpath") || "/api/guess_like/", i.render()) : i._init()
        }
    };
    e.prototype._init = function () {
        var a = this;
        if (a.childs = a.container && T.dom.children(a.container), a.count = a.childs && a.childs.length, !a.count || !a.container) return void(a.uiChange && T.hide(a.uiChange));
        var e = a.container, r = a.childs[0];
        a.page = 1;
        var i = (a.target.getAttribute("data-mgntype") || "").split(",");
        if (i.length > 1) {
            var n = 0, s = 0, g = {2: "margin-right", 4: "margin-left"}, o = {1: "margin-top", 3: "margin-bottom"};
            T.array.each(i, function (a) {
                g[a] && (n += parseInt(T.dom.getStyle(r, g[a]))), o[a] && (s += parseInt(T.dom.getStyle(r, o[a])))
            }), a.options.margin.x = n, a.options.margin.y = s
        }
        var d, p, m, u, c, h = 1, l = function () {
            var e = T.query(".mod-vd-group-i", a.target)[0],
                r = e ? T.query(".mod-vd-group-i", a.target) : T.query(".mod-vd-i", a.target),
                i = Math.max(0, (a.page - 1) * u - 1), n = a.page * u;
            if (T.each(r, function (e, r) {
                r >= i && n > r && a.lazyload(e)
            }), a.stp && a.container.offsetHeight > 0) {
                if (T.array.indexOf(a.stpReport, a.page) > -1) return;
                a.stpReport.push(a.page), F.log.guess({stp: a.stp, mids: a.ids.slice(i, n), et: 0})
            }
        }, y = function () {
            a.lazypageCache = {}, u && (c = (a.page - 1) * u + 1), d = r.offsetHeight + a.options.margin.y, p = r.offsetWidth + a.options.margin.x, m = parseInt((e.offsetHeight + a.options.margin.y) / d, 10), h = parseInt((e.offsetWidth + a.options.margin.x) / p, 10), 1 >= h && (h = 1), u = m * h, a.maxPage = parseInt(a.count / u, 10), a.uiChange && (a.switchenable ? (a.maxPage < 2 ? T.hide : T.show)(a.uiChange) : T.hide(a.uiChange)), c && (a.page = Math.max(1, Math.min(Math.ceil(c / u), a.maxPage)));
            var i = T.query(".mod-vd-i", a.target);
            T.each(i, function (e, r) {
                var i = T.query("img", e)[0];
                i && r > a.page * u - 1 && T.dom.setAttr(i, "_lazyignore", 1)
            }), l(), e.scrollTop = d * m * (a.page - 1)
        };
        y(), T.on(window, "resize", y);
        var f = function () {
            a.page >= a.maxPage && (a.page = 0), a.page++, a.page = Math.max(1, Math.min(a.page, a.maxPage)), l(), e.scrollTop = d * (a.page - 1) * m
        };
        a.uiChange && T.on(a.uiChange, "click", f)
    }, e.prototype.render = function () {
        var a = this, e = "";
        if (e += F.config.api + a.serverPath, a.serverParam && (e += 0 == a.serverParam.indexOf("/") ? a.serverParam.substring(1) : a.serverParam), a.ajaxParam) {
            var r = a.ajaxParam.substr(0, 1);
            ("?" == r || "&" == r) && (a.ajaxParam = a.ajaxParam.substring(1)), r = e.substring(e.length - 1), ("?" == r || "&" == r) && (e = e.substring(e.length - 1)), e = -1 != e.indexOf("?") ? e + "&" + a.ajaxParam : e + "?" + a.ajaxParam
        }
        F.get(e, function (e) {
            if (e && 200 == e.status) {
                var r = e.data;
                r = "[object Array]" == Object.prototype.toString.call(r) ? e : e.data, a.container.innerHTML = F.tpl.renderFile(a.customTpl, r), T.dom.removeClass(a.container, "loading-bg"), a.stp = r.stp, a.ids = r.ids, a.stp && F.Event.delegate(a.container, "a", "mousedown", function () {
                    var e = T.dom.getAttr(this, "data-id");
                    e && F.log.guess({stp: a.stp, mid: e, et: "1"})
                }), a._init()
            }
        })
    }, e.prototype.lazyload = function (a) {
        if (!this.LazyWraper) try {
            this.LazyWraper = F.widget.lazyloading.LazyWraper
        } catch (e) {
        }
        this.LazyWraper && (this.lazy ? this.lazy.registry(a) : this.lazy = new this.LazyWraper(a)), T.each(T.query("img", a), function (a) {
            a.instance && a.instance.start()
        })
    };
    var r = function (a) {
        var r = a && a.dom || document;
        T.each(T.query(".tool-guesslike", r), function (a) {
            "guesslike" != T.dom.getAttr(a, "data-comtype") && new e(a, {margin: {x: 20, y: 20}})
        })
    };
    T.ready(function () {
        r(), T.each(T.query("[data-stp]"), function (a) {
            var e = T.dom.getAttr(a, "data-stp"), r = T.dom.getAttr(a, "data-ids");
            e && r && (F.log.guess({stp: e, mids: r, et: 0}), F.Event.delegate(a, "a", "mousedown", function () {
                var a = T.dom.getAttr(this, "data-id");
                a && F.log.guess({stp: e, mid: a, et: "1"})
            }))
        })
    }), F.namespace("guesslike", "guesslike", e), T.observer.add(F.EventCenter.REGISTER_GUESSLIKE, r)
}();
;!function () {
    var e = function () {
        var e = "_sh";
        this.addKey = function (o) {
            if (console.log("addKey", o), o) {
                for (var i = this.get(), n = o.split("#")[0], c = [], s = 0; s < i.length; s++) {
                    var r = i[s].split("#")[0];
                    r != n && c.push(i[s])
                }
                c.unshift(o), c = c.slice(0, 8), F.cookie.set(e, decodeURIComponent(c.join("|")))
            }
        }, this.removeKey = function (o) {
            if (console.log("removeKey", o), o) {
                var i = this.get(), n = i.indexOf(o);
                n > -1 && i.splice(n, 1), i = i.slice(0, 8), F.cookie.set(e, decodeURIComponent(i.join("|")))
            }
        }, this.get = function () {
            var o = F.cookie.get(e) || "";
            try {
                o = decodeURIComponent(o)
            } catch (i) {
            }
            o = o.split("|");
            for (var n = [], c = 0; c < o.length; c++) o[c] && n.push(o[c]);
            return n
        }, this.clear = function () {
            F.cookie.del(e)
        }
    };
    F.searchHistory = new e
}();
;!function () {
    function e() {
        s && (clearTimeout(a), a = setTimeout(function () {
            var e = T.page.getScrollTop(), n = 0;
            n = e > c ? 0 : 1, c = e, 1 == n && T.dom.setStyle(s, "visibility", "visible"), F.tween(s, F.math.tweener.easeOutQuint, .6, {opacity: n}, function () {
                0 == n && T.dom.setStyles(s, {visibility: "hidden"})
            })
        }, 100))
    }

    var n = function () {
        var e = T.get("userMsgLayout"), n = T.get("loginLayout"), i = function () {
            var e = ["movie_", "home_", "subject_", "list_", "search_", "vip_pay", "index_", "vip_", "vip_doc"];
            T.array.indexOf(e, F.config.ctrlname) < 0
        }, o = function () {
            if (F.user.update(), !F.user.userid) return n && T.removeClass(n, "hidden"), void(e && T.addClass(e, "hidden"));
            try {
                F.config.isFsHost && F.cookie.get("userid") && F.cookie.get("sso_token") && window.external.onlogin(F.cookie.get("userid"), F.cookie.get("sso_token"))
            } catch (o) {
            }
            F.get(F.config.api + "/account_check", function (o) {
                if (o && 200 == o.status) {
                    F.client.isClient() && i();
                    var a = o.cpStatus;
                    if (200 == a) {
                        var r = T.query("#userMsgLayout a.my-cpsetting")[0];
                        r && T.dom.removeClass(r.parentNode, "hidden")
                    }
                    var s = T.query("#userMsgLayout b")[0], c = T.query("#userMsgLayout img")[0],
                        l = T.query(".js-userInfo span")[0];
                    if (l) {
                        var d = T.query(".js-subAvatar img")[0], u = T.query(".js-subCredit")[0],
                            v = T.query(".js-subValidDate")[0], f = T.query(".js-subVipBtn")[0],
                            m = T.query(".js-subVipSign")[0];
                        if (s && (s.innerHTML = o.name, T.dom.setAttr(s, "title", o.name), l.innerHTML = o.name, T.dom.setAttr(l, "title", o.name)), c && (T.dom.setAttr(c, "src", o.pic), T.dom.setAttr(d, "src", o.pic)), u && (u.innerHTML = o.credit), "valid" == o.vipStatus) {
                            var g = T.query("#userMsgLayout span.com-pic-vip")[0];
                            g && T.dom.setStyle(g, "display", "block"), v.innerHTML = "有效期至：" + o.authEnd, f.innerHTML = "续费会员", T.dom.addClass(m, "vip-sign")
                        }
                        n && T.addClass(n, "hidden"), e && T.removeClass(e, "hidden"), T.observer.send("account_check", o), 0 == o.real && F.load("widget.login.ajaxLogin", function () {
                            this.verifyRealId()
                        })
                    }
                } else switch (o.status) {
                    case 1412:
                        T.observer.send("logout")
                }
            })
        };
        o(), T.lang.eventCenter.addEventListener("login", function () {
            try {
                window.Player && window.Player.getPlayer().triger("login")
            } catch (e) {
            }
            o()
        });
        var a = T.query("#verticalMenuLayout")[0], r = !1;
        a && (T.observer.add(F.EventCenter.SIDEBAR_INIT, function () {
            T.dom.show(a), r = "1" == F.cookie.get("_m_show")
        }), T.on(a, "click", function () {
            r = "1" == F.cookie.get("_m_show"), T.observer.send(r ? F.EventCenter.SIDEBAR_HIDE : F.EventCenter.SIDEBAR_SHOW)
        }));
        var s = T.query("#nav-container .nav-toggle")[0], c = T.query("#nav-container .nav")[0],
            l = T.query("#nav-container .nav .prev")[0], d = T.query(".hd-content-sub-rel .nav-arrow")[0], u = !1;
        if (s && c) {
            l || f(!1);
            var v = 0, f = function (e) {
                clearTimeout(v), T.dom.addClass(s, "nav-opacity0"), s && (e ? (T.dom.show(s), v = setTimeout(function () {
                    T.dom.removeClass(s, "nav-opacity0"), T.dom.addClass(s, "nav-opacity100")
                }, 300)) : T.dom.hide(s))
            }, m = function () {
                var e = c.scrollHeight, n = c.offsetHeight;
                f(e > n ? !0 : !1)
            };
            T.on(window, "resize", m), m(), c.scrollTop = 0, T.on(s, "click", function () {
                if (u = !u) {
                    T.dom.addClass(s, "nav-toggle-current");
                    var e = T.query("span", s)[0];
                    e && (e.innerHTML = "返回"), F.tween(c, F.math.tweener.simple, .5, {scrollTop: 40}, null, null, null, null, function (e, n) {
                        e.scrollTop = n
                    }), "channels_" == F.config.ctrlname, d && T.dom.setStyle(d, "visibility", "hidden")
                } else {
                    T.dom.removeClass(s, "nav-toggle-current");
                    var e = T.query("span", s)[0];
                    e && (e.innerHTML = "更多"), F.tween(c, F.math.tweener.simple, .5, {scrollTop: 0}, null, null, null, null, function (e, n) {
                        e.scrollTop = n
                    }), "channels_" == F.config.ctrlname, d && T.dom.setStyle(d, "visibility", "visible")
                }
            })
        }
        !function () {
            var e = null, n = null,
                i = ["movie_", "tv_", "children_", "cartoon_", "variety_", "channel_", "channel_lists", "pgc_", "channels_"],
                o = ["pgc_new", "nchannel_"];
            i = i.concat(o);
            var a = function () {
                if (-1 != i.indexOf(F.config.ctrlname)) {
                    if (!e) for (var a = T.query(".hd-content-sub-con .nav .item"), r = null, s = 0; s < a.length; s++) if (r = a[s], T.dom.hasClass(r, "current")) {
                        e = r;
                        break
                    }
                    if (n || (n = T.query(".hd-content-sub-rel .nav-arrow")[0]), e && n) {
                        var c = e.offsetLeft;
                        -1 != o.indexOf(F.config.ctrlname) && (c = T.dom.getPosition(e).left);
                        var l = c + e.offsetWidth / 2 - n.offsetWidth / 2;
                        T.dom.setStyles(n, {left: l, visibility: "visible"})
                    }
                }
            };
            T.on(window, "resize", a), a()
        }()
    };
    F.setMarginTop = function (e) {
        e = e || 0;
        var n = T.get("nav-container-main"), i = T.get("nav-container-sub");
        n && i && (T.dom.setStyle(n, "top", e), T.dom.setStyle(i, "top", 56 + e));
        var o = T.get("nav-container");
        o && T.dom.setStyle(n, "marginTop", e)
    }, F.setHeadFixed = function (e) {
        var n = T.get("nav-container-main"), i = T.get("nav-container-sub");
        T.dom.removeClass(n, "fixed"), i && T.dom.removeClass(i, "fixed"), i && T.dom.setStyle(i, "position", "static"), e && (T.dom.addClass(n, "fixed"), i && (T.dom.addClass(i, "fixed"), T.dom.setStyle(i, "position", "fixed"))), e ? T.dom.setStyle(n, "position", "") : T.dom.setStyle(n, "position", "relative")
    }, T.observer.add("pop.top.close", function () {
        F.setHeadFixed(!0)
    }), T.observer.add("pop.top.show", function () {
        console.log(".onshow", arguments), F.setHeadFixed(!1)
    }), F.setMarginTop(F.config.banner && F.config.banner.height), -1 != window.location.href.indexOf("#fs") && (F.config.isFsDomain = !0, F.config.isFsHost = !0, F.client.isClient = function () {
        return !0
    }), F.client.isClient() && F.load("widget.client.client", function () {
        this.init()
    });
    var i = function (e, n) {
        var i = 0, o = 0, a = function () {
            clearInterval(i), n()
        };
        clearInterval(i), i = setInterval(function () {
            return o += 1, o >= 20 ? void clearInterval(i) : void(e() && a())
        }, 500)
    };
    if (void 0 != typeof T && T.dom) {
        var o = !1, a = 0, r = function () {
            clearTimeout(a), o || (n(), o = !0)
        };
        a = setTimeout(function () {
            T.dom.ready && T.dom.ready.isReady ? r() : i(function () {
                var e = null;
                try {
                    e = T.get("userMsgLayout")
                } catch (n) {
                }
                return e
            }, r)
        }, 500), T.dom.ready && T.dom.ready.isReady ? r() : T.dom.ready(function () {
            r()
        })
    }
    if ("vplay_" != F.config.ctrlname) {
        var a = null, s = T.get("nav-container-sub");
        if (s) {
            var c = T.page.getScrollTop();
            T.on(window, "scroll", e), T.on(window, "resize", e), e()
        }
    }
    var l = function () {
    };
    F.user && F.user.isLogin && F.user.isLogin() ? l() : T.observer.add(F.EventCenter.LOGIN_STATE_CHANGE, function () {
        F.user && F.user.isLogin && F.user.isLogin() && l()
    }), function () {
        var e = T.get("soUnit");
        if (F.searchHistory) {
            var n = F.searchHistory.get(),
                i = ['<li><a class="his-list" block="somyword_<%index%>_<%name%>" data-mid="<%mediaid%>">', '<span class="text"><%name%></span>', '<span class="info"><%update_info%></span>', '<span class="del" title="清除" ct="1" block="sodel_<%index%>"><i></i></span>', "</a></li>"];
            i = i.join("");
            var o = -1, a = {}, r = [], s = T.get("so-history-wrap"), c = [], l = T.query(".so-history", e)[0],
                d = /<[^>]+>.*<[^>]+>/gi, u = function () {
                    if (o = -1, s && l) {
                        if (n = F.searchHistory.get(), n.length <= 0) return void T.dom.hide(l);
                        T.dom.show(l);
                        for (var e = [], c = 0; c < n.length; c++) {
                            var d = n[c].split("#"), u = {};
                            u.mediaid = "", u.name = d[0], u.index = c + 1, u.update_info = "", d[1] && (u.mediaid = d[1]), u.mediaid && a[u.mediaid] && (u.update_info = a[u.mediaid]);
                            var f = i.replace(/<%\s*([^%\s]+)\s*%>/gi, function (e, n) {
                                return u[n]
                            });
                            r.push(u.name), e.push(f)
                        }
                        s.innerHTML = e.join(""), v()
                    }
                }, v = function () {
                    if (s) {
                        var e = [];
                        c = T.query(".his-list", s), T.each(c, function (n) {
                            var i = n.getAttribute("data-mid");
                            i && !a[i] && e.push(i)
                        }), e.length > 0 && F.jsonp(F.config.api + "/api/search_hot?mids=" + e.join(","), function (e) {
                            f(e.data)
                        })
                    }
                }, f = function (e) {
                    e = e || {};
                    for (var n in e) a[n] || (a[n] = e[n]);
                    s && T.each(T.query(".his-list", s), function (e) {
                        var n = e.getAttribute("data-mid");
                        if (n && a[n]) {
                            var i = T.query(".info", e)[0];
                            i && (i.innerHTML = a[n])
                        }
                    })
                }, m = function (e) {
                    if (e) {
                        var n = "";
                        if ("string" == typeof e) n = e; else {
                            var i = e.getAttribute("data-mid") || "", o = T.query(".text", e)[0], a = o.innerHTML;
                            a = a.replace(d, ""), n = i ? a + "#" + i : a
                        }
                        return n
                    }
                }, g = function (e) {
                }, y = function (e) {
                    if (console.log("so.autofocus", C.AUTO_FOCUS), !C.AUTO_FOCUS) {
                        e = T.event.get(e);
                        var n = !1;
                        switch (e.keyCode) {
                            case 38:
                                n = !0, C.HOT_FOCUS = !0, h();
                                break;
                            case 40:
                                n = !0, C.HOT_FOCUS = !0, p()
                        }
                        -1 != r.indexOf(C.value) || n || (C.HOT_FOCUS = !1), "" == C.value && (o = -2, p())
                    }
                }, h = function () {
                    if (s) {
                        var e = T.query(".his-list", s), n = e.length;
                        o--, 0 > o && (o = n - 1), _(o, e)
                    }
                }, p = function () {
                    if (s) {
                        var e = T.query(".his-list", s), n = e.length;
                        o++, o >= n && (o = 0), _(o, e)
                    }
                }, _ = function (e, n) {
                    console.log("highlightIdx", e);
                    for (var i = n.length, a = "", r = 0; i > r; r++) if (T.dom.removeClass(n[r], "current"), r == o) {
                        T.dom.addClass(n[r], "current");
                        var t = T.query(".text", n[r])[0];
                        a = t.innerHTML.replace(d, "")
                    }
                    C.value = a
                }, w = function (e) {
                    F.searchHistory.removeKey(m(e)), u()
                };
            F.Event.delegate("#soUnit .so-hotkey-wrap", "a", "click", function () {
                g(this)
            }), F.Event.delegate("#so-history-wrap", "a", "click", function (e) {
                e = e || window.event;
                var n = e.target || e.srcElement;
                if (console.log("target", n), n && "del" == n.className || "i" == n.tagName.toLowerCase()) w(this), T.event.stop(e); else {
                    var i = T.query(".text", this)[0], o = i.innerHTML.replace(d, "");
                    C.value = o, document.forms.msearch.submit(), g(this)
                }
            }), T.on(s, "mouseover", function (e) {
                return
            });
            var b = T.get("submit-btn"), C = T.get("so");
            if (b && C && T.on(b, "click", function () {
                g(C.value)
            }), e) {
                var q = T.query(".remove", e)[0];
                q && T.on(q, "click", function () {
                    F.searchHistory.clear(), u()
                })
            }
            T.on(C, "keydown", y), u(), T.observer.add("reload_search_history", u)
        }
    }(), function () {
        var e = T.query(".baiying_download");
        T.each(e, function (e) {
            T.platform.isWindows ? T.dom.setAttr(e, "href", "http://neirong.funshion.com/download/baiying/Downloader_C7928.exe") : T.platform.isMacintosh && T.dom.setAttr(e, "href", "http://neirong.funshion.com/Mac/FunshionInstallForMac1.0.1.1.dmg")
        })
    }(), function () {
        var e = T.get("nav-container"), n = T.query(".close-festival")[0], i = T.get("hd-festival"),
            o = T.get("nav-container"), a = T.get("nav-container-main"), r = T.get("nav-container-sub");
        a && (a.style.marginTop = 0), n && T.on(n, "click", function () {
            T.hide(i), T.dom.removeClass(e, "head-festival");
            try {
                a.style.top = 0, r.style.top = 0, r.style.marginTop = "56px", o.style.marginTop = 0
            } catch (n) {
            }
        })
    }()
}();
;!function () {
    if (window.T && window.T.swf.version) {
        var a = F.config.protocol + "//static.funshion.com/open/static/localStorage.swf?20141218",
            e = ['<div style="position:absolute;left:0;top:0;width:2px;height:2px;overflow:hidden">', '<object width="2" height="2" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="localStorage" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">', '<param value="' + a + '" name="movie" />', '<param value="transparent" name="wmode"/>', '<param value="always" name="allowScriptAccess"/>', '<embed width="2" height="2" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" name="localStorage" type="application/x-shockwave-flash" allowscriptaccess="always" loop="false" play="true" quality="high" src="' + a + '"></embed>', "</object>", "</div>"].join("");
        T.ready(function () {
            try {
                T.g("localstoreSWF").innerHTML = e
            } catch (a) {
            }
        })
    }
}();
;T.ready(function () {
    function e() {
        !T.browser.ieTrue || T.browser.ieTrue > 6 || T.each(T.query("[data-hover-wrap]"), function (e) {
            var o = T.query("[data-hover-ele]", e);
            if (o.length) {
                var n = T.dom.getAttr(e, "data-hover-wrap");
                T.each(o, function (o) {
                    "1" == n ? (T.on(e, "mouseenter", function () {
                        T.show(o)
                    }), T.on(e, "mouseleave", function () {
                        T.hide(o)
                    })) : (T.on(o, "mouseenter", function () {
                        T.dom.addClass(e, n)
                    }), T.on(o, "mouseleave", function () {
                        T.dom.removeClass(e, n)
                    }))
                })
            }
        })
    }

    e()
});
;!function () {
    var e = "", a = function () {
        var a = "", s = "", r = T.page.getViewWidth(!0),
            o = [{max: 1600, css: "player_960"}, {max: 1800, css: "player_1180"}, {max: 1e4, css: "player_1400"}];
        if (1200 > r ? a += "w1200" : r >= 1200 && 1340 > r ? a += "w1200_1340" : r >= 1340 && 1600 > r ? a += "w1340_1600" : r > 1600 && (a += "w1600"), "vplay_" == F.config.ctrlname) {
            for (var n = 0, i = 0; i < o.length; i++) if (o[i - 1] && r >= o[i - 1].max && r < o[i].max) {
                n = i;
                break
            }
            var l = T.query(".playerWrap")[0];
            s = o[n].css, l && (T.each(o, function (e) {
                T.dom.removeClass(l, e.css)
            }), T.dom.addClass(l, s))
        }
        e != a && (T.removeClass(T.query("html")[0], e), T.addClass(T.query("html")[0], a), e = a)
    }, s = document.getElementsByTagName("html");
    T && T.browser && T.browser.ie <= 8 && s && s.length > 0 && a(), T.ready(function () {
        if (T.platform.isIpad && T.addClass(T.query("html")[0], "ipad"), F.config.isFsHost && T.addClass(T.query("body")[0], "fs"), T.browser.ie && !(T.browser.ie > 8)) {
            var e = function () {
                a(), T.observer.send(F.EventCenter.PAGE_RESPONSE)
            };
            T.on(window, "resize", e), e()
        }
    })
}();
;!function () {
    function e(e) {
        this.option = T.object.extend({
            behistory: "",
            nohistory: "",
            hiscontent: "",
            histitle: "",
            hismore: ""
        }, e || {}), this.target = F.client.isClient() ? "" : 'target="_blank"', this.isProcessing = !1, this.init()
    }

    e.prototype.clear = function () {
        var e = this, o = function () {
            T.dom.remove(e.beHistory), e.noHistory && T.dom.hasClass(e.noHistory, "hidden") && T.dom.removeClass(e.noHistory, "hidden")
        };
        if (F.user.userid) {
            var i = F.config.api + "/ajax/playstatus/removeall/";
            F.get(i, function (e) {
                e && 200 == e.status && o()
            })
        } else {
            try {
                T.swf.getMovie("localStorage").remove("history_watch")
            } catch (r) {
                console.log(r)
            }
            o()
        }
    }, e.prototype.upState = function (e) {
        var o = this, e = e || {};
        o.noHistory && !T.dom.hasClass(o.noHistory, "hidden") && T.dom.addClass(o.noHistory, "hidden"), o.beHistory && T.dom.hasClass(o.beHistory, "hidden") && (T.dom.removeClass(o.beHistory, "hidden"), "noLogin" == e.type && T.dom.addClass(o.beHistory, "hisCookie"))
    }, e.prototype.filtrate = function (e) {
        var o = this, i = e || {}, r = T.q("res-list", o.beHistory);
        T.each(r, function (e) {
            "filter" == i.actType ? "long" != T.dom.getAttr(e, "data-type") && T.hide(e) : T.show(e)
        })
    }, e.prototype.bind = function () {
        var e = this, o = T.get(e.option.histitle);
        o && T.on(o, "click", function (o) {
            o = T.event.get(o);
            var i = o.target, r = T.dom.getAttr(i, "id");
            switch (r) {
                case"deleteBtn":
                    T.dom.removeClass(T.get("deleInfo"), "hidden");
                    break;
                case"selectBtn":
                    T.dom.hasClass(i, "select-current") ? (T.dom.removeClass(i, "select-current"), e.filtrate({actType: "recover"})) : (T.dom.addClass(i, "select-current"), e.filtrate({actType: "filter"}));
                    break;
                case"confirmBtn":
                    e.clear();
                    break;
                case"cancelBtn":
                    T.dom.addClass(i.parentNode, "hidden")
            }
        })
    }, e.prototype.historyHandler = function () {
        var e = this, o = T.q("res-wrap", e.beHistory), i = T.q("res-list", e.beHistory);
        o && o.length && (T.dom.addClass(o[0], "first-wrap"), T.each(o, function (o) {
            T.on(o, "click", function (i) {
                if (!e.isProcessing) {
                    i = T.event.get(i);
                    var r = i.target;
                    if (e.selected = {wrap: o, list: r.parentNode.parentNode}, T.dom.hasClass(r, "colse")) {
                        e.isProcessing = !0;
                        var s = T.dom.getAttr(e.selected.list, "data-videoid"),
                            n = T.dom.getAttr(e.selected.list, "data-galleryid"),
                            a = F.config.api + "/ajax/playstatus/remove/" + n + "/" + s + "/",
                            l = F.get(a, function (o) {
                                e.isProcessing = !1, o && 200 == o.status && e.updateList()
                            });
                        setTimeout(function () {
                            l && l.abort && l.abort(), e.isProcessing = !1
                        }, 3e3)
                    }
                }
            })
        })), i && i.length && T.each(i, function (e) {
            T.on(e, "mouseover", function () {
                T.dom.addClass(e, "res-list-hover")
            }), T.on(e, "mouseout", function () {
                T.dom.removeClass(e, "res-list-hover")
            })
        }), e.bind()
    }, e.prototype.updateList = function () {
        var e = this, o = e.selected;
        T.dom.remove(o.list), T.q("res-list", o.wrap).length || T.dom.remove(o.wrap), 0 == T.q("res-list", e.beHistory).length && e.clear()
    }, e.prototype.disposeCookie = function (e) {
        var o = this, i = [];
        T.isArray(e) && e.length ? i = e : "number" == typeof e && i.push(e);
        var t;
        T.each(i, function (e) {
            t = Number(e), o.__mids.push(String(e))
        })
    }, e.prototype.setCookie = function () {
        var e = this;
        for (e.__mids = T.array.unique(e.__mids); e.__mids.length > 50;) e.__mids.pop();
        F.cookie.set("_mids", e.__mids.join(","))
    }, e.prototype.localStorage = function () {
        var e = this, o = "", i = [], r = 100, s = 0, n = function () {
            var n = [];
            try {
                n = T.swf.getMovie("localStorage").getHistory ? T.swf.getMovie("localStorage").getHistory() : []
            } catch (a) {
            }
            var l = [];
            if (T.isArray(n) && n.length) {
                i = n;
                var d = {earlier: [], thisweek: [], today: []};
                if (console.log("未登录的历史进度："), console.log(i), T.each(i, function (o) {
                    if (r > s) {
                        var i = T.array.indexOf(["movie", "tv", "cartoon", "variety"], o[2]) >= 0 ? "long" : o[2];
                        if (15 > s) {
                            var n = {}, a = o[0], c = o[7] || a || 1,
                                h = o[8] || Math.floor((new Date).getTime() / 1e3);
                            n.video_type = i, n.videoid = o[1], n.galleryid = o[6], n.go_on_url = "/" + o[4], n.title = o[3], n.is_www = 1, n.cl = "web", n.percent = 0 == o[5] ? Math.floor(a / c * 100) : 100;
                            var t = Math.floor((new Date).getTime() / 1e3) - parseInt(h);
                            604800 > t ? 86400 > t ? d.today.push(n) : d.thisweek.push(n) : d.earlier.push(n), e.renderHtml(d)
                        }
                        "long" == i && o[1] && l.push(o[6] + "-" + o[1])
                    }
                    s += 1
                }), "vplay_" == F.config.ctrlname && window.vplay && "1" == window.vplay.gtype) {
                    if (!/(.*\/g-\d+\/?$)/.test(location.href)) return;
                    var c = l;
                    T.each(c, function (e) {
                        var o = /(\d+)-(\d+)/.exec(e);
                        o[1] == vplay.galleryid && (location.href = "/vplay/g-" + o[1] + ".v-" + o[2] + "/")
                    })
                }
                e.disposeCookie(l), e.hisContent && T.dom.insertHTML(e.hisContent, "beforeEnd", o), e.upState({type: "noLogin"}), e.bind(), e.setCookie(), T.on(T.get(e.option.hismore), "click", function (e) {
                    F.user.isLogin() || (T.event.stop(T.event.get(e)), F.tool.ajaxLogin.panel())
                })
            }
        };
        1 == window.localStorageReady ? n() : T.observer.add("localStorageReady", function () {
            n()
        })
    }, e.prototype.renderHtml = function (e) {
        var o = this, i = {data: {}}, r = function () {
        };
        e.today && e.today.length && (i.data.today = {
            title: "今日",
            list: e.today,
            target: o.target
        }, r(e.today)), e.thisweek && e.thisweek.length && (i.data.thisweek = {
            title: "本周",
            list: e.thisweek,
            target: o.target
        }, r(e.thisweek)), e.earlier && e.earlier.length && (i.data.earlier = {
            title: "更早",
            list: e.earlier,
            target: o.target
        }, r(e.earlier));
        var s = T.g("tplHistory") && F.tpl.renderFile("tplHistory", i) || "";
        o.hisContent && (o.hisContent.innerHTML = "", T.dom.insertHTML(o.hisContent, "beforeEnd", s))
    }, e.prototype.asyncStorage = function () {
        var e = this, o = F.config.api + "/ajax/playstatus/getlist/7/";
        F.get(o, function (o) {
            o = o || {};
            var i = o.data;
            if (200 == o.status) {
                if (!i || !i.today.length && !i.thisweek.length && !i.earlier.length) return;
                e.renderHtml(i), e.upState({type: "loginED"}), e.setCookie(), e.historyHandler()
            }
        })
    }, e.prototype.init = function () {
        var e = this;
        e.__cookie = String(F.cookie.get("_mids")), e.__mids = [], e.beHistory = T.get(e.option.behistory), e.noHistory = T.get(e.option.nohistory), e.hisContent = T.get(e.option.hiscontent), F.user.userid ? e.asyncStorage() : e.localStorage(), T.observer.add("login", T.fn.bind(e.asyncStorage, e))
    };
    var o = null;
    T.dom.ready(function () {
        o || (o = new e({
            behistory: "beHistory",
            nohistory: "noHistory",
            hiscontent: "historyContent",
            histitle: "resultTit",
            hismore: "historyMore"
        }))
    })
}();
;!function () {
    var e = function () {
        this.init(), this.message_ids = F.cookie.get("_message_ids") || ""
    };
    e.prototype = {
        init: function () {
            T.get("hd-message") && (this.getMessage(), this.bindEvent())
        }, getMessage: function () {
            var e = this, s = T.query(".js-no-message")[0], a = T.query(".js-message-item")[0],
                i = ' <% each data %>                                    <a class="item" href="<%$value.url%>" target="<%target%>" <% if $value.record_id %>record_id="<%$value.record_id%>"<% /if %>>                                        <% if isLogined %><em></em><% /if %>                                        <h3><span><%$value.title%></span></h3>                                        <p><%$value.content%></p>                                        <i><%$value.release_time%></i>                                    </a>                                    <% /each %>',
                o = '<% each data %>                                <div class="hd-message-notice js-message-popup" <% if isLogined %>record_id="<%$value.record_id%>"<% else %>id="message_popup_<%$value.message_id%>" message_id="<%$value.message_id%>"<% /if %>>                                    <h3><%$value.title%></h3>                                    <p><%$value.content%></p>                                    <div class="message-notice-btn">                                    <a href="<%$value.url%>" target="<%target%>" class="message-notice-know js-close"><%$value.btn_tips%></a>                                    <a href="javascript:;" class="message-notice-close js-close">关闭</a>                                    </div>                                </div>                                <% /each %>';
            F.get(F.config.api + "/api/get_message", function (e) {
                return e && 200 == e.status && e.data.length ? (e.target = F.config.isFsHost ? "_self" : "_blank", e.isLogined = !!F.user.userid, T.query("ul", a)[0].innerHTML = F.tpl.compile(i)(e), T.addClass(s, "hidden"), T.removeClass(a, "hidden"), void(F.user.userid || (T.addClass(T.query(".js-read-all")[0], "hidden"), T.removeClass(T.query(".js-read-all-no")[0], "hidden")))) : (T.removeClass(s, "hidden"), void T.addClass(a, "hidden"))
            }), F.get(F.config.api + "/api/get_message/popup", function (s) {
                if (s && 200 == s.status && s.data.length && (s.target = F.config.isFsHost ? "_self" : "_blank", s.isLogined = !!F.user.userid, s.data = s.data.reverse(), T.get("hd-message-popup").innerHTML = F.tpl.compile(o)(s), !F.user.userid)) for (var a = "" != e.message_ids ? e.message_ids.split(",") : [], i = s.data, d = 0; d < i.length; d++) for (var n = 0; n < a.length; n++) i[d].message_id == a[n] && T.hide(T.get("message_popup_" + a[n]))
            })
        }, bindEvent: function () {
            var e = this;
            T.observer.add("login", function () {
                e.getMessage()
            }), T.each(T.query(".js-message-item"), function (e) {
                F.Event.delegate(e, ".item", "click", function () {
                    var e = this;
                    if (F.user.userid) {
                        var s = T.dom.getAttr(e, "record_id");
                        F.get(F.config.api + "/api/get_message/modify/?ids=" + s, function (s) {
                            s && 200 == s.status && T.addClass(e, "hasRead")
                        })
                    }
                })
            }), T.each(T.query(".js-read-all"), function (e) {
                T.on(e, "click", function () {
                    var s = [],
                        a = T.dom.hasAttr(e, "isPage") ? T.get("message_content") : T.query(".js-message-item")[0];
                    T.each(T.query(".item", a), function (e) {
                        s.push(T.dom.getAttr(e, "record_id"))
                    }), F.get(F.config.api + "/api/get_message/modify/?ids=" + s.join(","), function (e) {
                        e && 200 == e.status && T.each(T.query(".item", a), function (e) {
                            T.addClass(e, "hasRead")
                        })
                    })
                })
            }), F.Event.delegate(T.get("hd-message-popup"), ".js-message-popup .js-close", "click", function () {
                var s = this, a = T.dom.getAncestorByClass(s, "js-message-popup");
                if (F.user.userid) {
                    var i = T.dom.getAttr(a, "record_id");
                    F.get(F.config.api + "/api/get_message/modify/?ids=" + i, function (e) {
                        e && 200 == e.status && T.hide(a)
                    })
                } else {
                    var o = "" != e.message_ids ? e.message_ids.split(",") : [], d = T.dom.getAttr(a, "message_id");
                    o.push(d), F.cookie.set("_message_ids", o.join(","), 30), T.hide(a)
                }
            });
            var s = T.query(".js-message-hover")[0];
            F.cookie.get("_message_hover") || (T.show(T.query("em", s)[0]), T.on(s, "mouseover", function () {
                F.cookie.get("_message_hover") || (F.cookie.set("_message_hover", 1, 1), T.hide(T.query("em", s)[0]))
            }))
        }
    }, T.ready(function () {
        new e
    })
}();
;window.F = window.F || {}, window.F.tool = window.F.tool || {}, function () {
    var e = "_pvlog", o = 0, n = ["type", "param", "root", "split", "domain"], r = function () {
        var o = T.json.parse(F.cookie.get(e).toString()), r = [];
        if (!o || !T.isArray(o)) return [];
        for (var i, a, c = 0; c < o.length; c++) {
            i = {};
            for (var s = n.length - 1; s >= 0; s--) a = o[c][s], i[n[s]] = void 0 == a ? "" : a;
            r.push(i)
        }
        return r
    }, i = function (o) {
        var i = r(), a = [];
        i.push(o);
        for (var c, s, d = 0; d < i.length; d++) {
            c = [];
            for (var u = n.length - 1; u >= 0; u--) s = i[d][n[u]], c[u] = void 0 == s ? "" : s;
            a.push(c)
        }
        F.cookie.set(e, T.json.stringify(a), 1)
    }, a = function (e) {
        var o = {param: {}, root: "website", domain: F.config.statHost + "/", split: "*_*"}, n = T.extend({}, e);
        for (var r in n) n[r] || (n[r] = o[r]);
        for (var r in o) n[r] || (n[r] = o[r]);
        n.root = n.root || "website";
        var i, a = n.param || {}, c = [], s = n.path || n.domain + n.root + "/" + n.type + "?";
        for (var d in a) "function" != typeof a[d] && (i = void 0 == a[d] ? "" : a[d], c.push(d.toString() + "=" + i.toString()));
        return F.tool.pv.dispatch(s + c.join(n.split)), !1
    };
    F.tool.pv = {
        send: function (e) {
            if (!F.config.isWangjs && !F.config.isIRSample) {
                var o, n = arguments;
                o = T.isString(e) ? {type: n[0], param: n[1], root: n[2]} : e || {}, a(o)
            }
        }, dispatch: function (e) {
            e && !F.config.isWangjs && (F.config.isIRSample || setTimeout(function () {
                var o = T.dom.create("img", {src: e});
                o.onload = function () {
                }
            }, 200))
        }
    };
    var c = {}, s = "track_log";
    F.tool.FTH = {
        add: function (e, o) {
            return c[e] = o, F.cookie.set(s, T.json.encode(c), 1), this
        }, get: function () {
            var e = F.cookie.get(s);
            return e ? T.json.parse(e) : {}
        }, empty: function () {
            return c.target = "", delete c.type, F.cookie.set(s, "", -365), this
        }
    }, F.tool.pvManager = {
        add: function (e) {
            var n, r = arguments;
            n = T.isString(e) ? {type: r[0], param: r[1], root: r[2]} : e || {}, n.param = n.param || {};
            var t = (new Date).getTime();
            return t - this.lt < 500 ? this : (o = t, window != top ? F.tool.pv.send(n) : i(n), this)
        }, send: function () {
            var o, n = r();
            if (!n.length) return this;
            for (var i = 0; i < n.length; i++) o = n[i], o.length < 2 || F.tool.pv.send(o);
            return F.cookie.set(e, "", -365), this
        }
    }
}(), function () {
    var e = "*_*", o = "website";
    window.F && window.F.config && window.F.config.logPlatform && (o = window.F.config.logPlatform);
    var n = {
        pv: {
            rprotocol: "4",
            firstname: o,
            secondname: "pv",
            protocol: ["rprotocol", "clientFlag", "fck", "mac", "userid", "fpc", "version", "sid", "pvid", "config", "url", "referurl", "channelid", "vtime", "ext", "step", "sestep", "seidcount", "ta", "mediatype", "fpv"]
        },
        click: {
            rprotocol: "4",
            timeout: void 0 !== window.logClickTimeout ? window.logClickTimeout : 3e3,
            firstname: o,
            secondname: "pgclick",
            protocol: ["rprotocol", "clientFlag", "fck", "mac", "userid", "fpc", "version", "sid", "pvid", "config", "url", "referurl", "channelid", "block", "screenw", "screenh", "browserw", "browserh", "browserpx", "browserpy", "pagepx", "pagepy", "ext", "mediatype"]
        },
        event: {
            rprotocol: "1",
            firstname: o,
            secondname: "eventpv",
            protocol: ["rprotocol", "fck", "mac", "userid", "fpc", "version", "sid", "pvid", "config", "url", "referurl", "channelid", "vtime", "event", "ext"]
        },
        guess: {
            rprotocol: "1",
            firstname: o,
            timeout: 3e3,
            secondname: "guessevent",
            protocol: ["rprotocol", "clientFlag", "fck", "mac", "userid", "fpc", "version", "sid", "url", "referurl", "pt", "mid", "mids", "et", "stp", "ext"]
        },
        action: {
            rprotocol: "1",
            firstname: o,
            secondname: "action",
            protocol: ["rprotocol", "clientFlag", "fck", "mac", "userid", "fpc", "version", "sid", "pvid", "config", "url", "referurl", "channelid", "mediatype", "action", "flag", "ext"]
        }
    }, r = {
        key: "fck", create: function () {
            var e = parseInt(+new Date / 1e3) + (p() + p()).substr(0, 5);
            return F.cookie.set(r.key, e), e
        }, get: function () {
            var e = F.cookie.get(r.key);
            return e || r.create()
        }
    }, i = new Date, a = i, c = null, s = {
        key: "pvsid", convkey: "pvsid_cunv", cycle: 1800, create: function () {
            var e = parseInt(+new Date / 1e3) + (p() + p()).substr(0, 5);
            return s.write(e), u.set("seidcount", u.get("seidcount") + 1), document.cookie = s.convkey + "=1; path=/; domain=.fun.tv", u.set("sestep", 0), e
        }, write: function (e) {
            F.cookie.set(s.key, e, s.cycle / 86400)
        }, get: function () {
            var e = F.cookie.get(s.key), o = F.cookie.get(s.convkey);
            return o && e || s.create()
        }, onmousemove: function () {
            i = new Date
        }, init: function () {
            T.un(document.body, "mousemove", s.onmousemove), T.on(document.body, "mousemove", s.onmousemove), clearInterval(c), c = setInterval(function () {
                i > a && (a = i, s.write(s.get()))
            }, 1e3 * s.cycle / 2)
        }
    }, d = {
        guid: "", get: function (e) {
            var o = "";
            return e ? (o = f(), d.guid = o, u.set("step", u.get("step") + 1), u.set("sestep", u.get("sestep") + 1)) : d.guid ? o = d.guid : (o = f(), d.guid = o), o
        }
    }, u = {
        cookie: "pvcount", log: ["step", "seidcount", "sestep"], get: function (e) {
            var o = F.cookie.get(u.cookie), n = o.split("|"), r = T.array.indexOf(u.log, e);
            return parseInt(n[r]) || 0
        }, set: function (e, o) {
            for (var n = F.cookie.get(u.cookie).split("|"), r = T.array.indexOf(u.log, e), i = 0; i < u.log.length; i++) n[i] = parseInt(n[i]) || 0;
            r > -1 && (n[r] = o), F.cookie.set(u.cookie, n.join("|"))
        }
    }, l = {pvid: d, sid: s, fck: r}, p = function () {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
    }, f = function () {
        for (var e = "", o = 1; 32 >= o; o++) {
            var n = Math.floor(16 * Math.random()).toString(16);
            e += n, (8 == o || 12 == o || 16 == o || 20 == o) && (e += "-")
        }
        return e
    }, g = function () {
        var e = "";
        try {
            e = document.referrer.length > 0 ? document.referrer : window.opener && opener.location && opener.location.href ? opener.location.href : ""
        } catch (o) {
        }
        return e
    }, m = T.swf ? T.swf.version : "", v = function (e) {
        var o = F.cookie.get("channelid") || F.cookie.get("alliance_id");
        o || (o = F.partner ? F.partner.getId() : 0);
        var n = {mac: "Mac", userid: "userid", fpc: "_fpc", version: "_version"}, r = ["fck", "sid", "pvid"],
            i = "|" + F.cookie.get("_scn"), a = {
                config: F.logParam.ctrlname || F.config.ctrlname,
                url: location.href,
                ta: i,
                referurl: g(),
                channelid: o,
                vtime: F.config.timeStrart ? (new Date).getTime() - F.config.timeStrart : 0,
                ext: F.config.pvext || "",
                step: u.get("step"),
                seidcount: u.get("seidcount"),
                sestep: u.get("sestep"),
                clientFlag: F.client.isClient() ? 2 : 5,
                mediatype: F.config.mediatype || "||||"
            };
        a.fpv = m;
        var c = 1e3;
        if ("redirect_" == F.config.ctrlname && (a.clientFlag = 6, window.redirectInfo && window.redirectInfo.siteid && (a.ext = c + Number(window.redirectInfo.siteid))), "search_" == F.config.ctrlname) {
            var s = T.query(".search-item .item-wrap"), d = [];
            T.each(s, function (e, o) {
                var n = T.query(".torr-switch a", e), r = !1;
                T.each(n, function (e) {
                    var n = Number(e.getAttribute("data-id")) || 0;
                    n ? (r = !0, d.push("out_" + (o + 1) + "_" + (c + n))) : d.push("in_" + (o + 1))
                })
            }), a.ext = d.join(",")
        }
        for (var p in n) a[p] = F.cookie.get(n[p]);
        "" == a.userid && (a.userid = 0);
        for (var f = e && e.needUpdate ? !0 : !1, v = "", w = 0; w < r.length; w++) v = r[w], a[v] = f && "pvid" == v ? l[v].get(!0) : l[v].get();
        return T.extend(a, e || {}), a
    }, w = function () {
        function o(e, o) {
            for (var n, r, i = [], a = 0; a < e.length; a++) n = e[a], r = o[n], i.push(n + "=" + ("undefined" == typeof r ? "" : encodeURIComponent(r)));
            return i
        }

        function n(e, o) {
            for (var n, r, i = {}, a = 0; a < e.length; a++) n = e[a], r = o[n], i[n] = "undefined" == typeof r ? "" : encodeURIComponent(r);
            return i
        }

        return {
            getRequest: function (r, i) {
                i.rprotocol = r.rprotocol;
                var a = r.firstname || "website", c = r.secondname || "pv", s = r.host ? r.host : "stat.funshion.com",
                    d = F.config.protocol + "//" + s + "/" + a + "/" + c + "?";
                if (r.timeout) {
                    var u = {root: a, type: c, param: n(r.protocol, i)};
                    r.domain && (u.domain = r.domain), r.split && (u.split = r.split), F.tool.pvManager.add(u), setTimeout(function () {
                        F.tool.pvManager.send()
                    }, r.timeout)
                } else F.tool.pv.dispatch(d + o(r.protocol, i).join(e))
            }
        }
    }(), h = function () {
        return {
            init: function () {
                s.init()
            }, send: function (e) {
                var o = v(e);
                o.url = decodeURIComponent(o.url), w.getRequest(n.pv, o)
            }
        }
    }(), k = function () {
        function e(e, o) {
            return e.replace(/\/?#.*|\/$/, "") === o.replace(/\/?#.*|\/$/, "")
        }

        function o(e) {
            var o = e.href;
            if (!o) return "";
            if (/^(javascript:|#)/i.test(o)) return "";
            var n = location.href, r = n.replace(/(https?:\/\/[^\/]+).*/, "$1"),
                i = r === n ? r + "/" : n.replace(/[#?].*/, "").replace(/[^\/]*$/, "");
            return o.replace(/^\.[\.\/]+/g, function (t) {
                for (var e = (t.match(/\.\.\//g) || []).length, o = 0; e > o; o++) i = i.replace(/[^\/]+\/$/, "");
                return i
            }).replace(/&amp;/g, "&").replace(/^\//, r + "/").replace(/^[^\h\/f]/, i + "$&")
        }

        function r(e) {
            var o = {A: 1, INPUT: 1, BUTTON: 1};
            if ("LABEL" == e.nodeName) {
                var n, r = T.dom.getAttr(e, "for");
                if (r && (n = T.query("input#" + r)[0]), !n) {
                    var i = T.query("input:first", e)[0];
                    i && (n = i)
                }
                n && (e = n)
            }
            for (var a = 4; a-- && e && !o[e.nodeName];) {
                if (e.getAttribute && e.getAttribute("ct")) return e;
                e = e.parentNode
            }
            return e && o[e.nodeName] ? e : !1
        }

        function i(e) {
            var o = document.evaluate(e, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            return o.snapshotLength > 0 ? o.snapshotItem(0) : null
        }

        function a(e) {
            for (var o = [], n = "", r = ""; e; e = e.parentNode) {
                var i = e.nodeName.toUpperCase();
                if ("BODY" == i) break;
                if (n = T.dom.getAttr(e, "block")) return o.splice(0, 0, "#" + n), o.join("~");
                if (r = T.dom.getAttr(e, "bc")) o.splice(0, 0, "*" + r); else {
                    for (var a = 0, s = e.previousSibling; s; s = s.previousSibling) {
                        var d = s.nodeName.toUpperCase();
                        0 !== c[d] && d == i && ++a
                    }
                    i = c[i] || i;
                    var u = a ? "!" + (a + 1) : "";
                    o.splice(0, 0, i + u)
                }
            }
            return o.length ? o.join("~") : null
        }

        var c = {
            UL: 1,
            OL: 2,
            LI: 3,
            INPUT: 4,
            DIV: 5,
            BODY: 6,
            STRONG: 7,
            SPAN: 8,
            FORM: 9,
            BUTTON: 10,
            CAPTION: 11,
            FIELDSET: 12,
            COLGROUP: 13,
            TFOOT: 14,
            LABEL: 15,
            LEGEND: 16,
            THEAD: 17,
            OPTGROUP: 18,
            OPTION: 19,
            SELECT: 20,
            TABLE: 21,
            TBODY: 22,
            IFRAME: 0,
            SCRIPT: 0,
            OBJECT: 0,
            EMBED: 0,
            IMG: 0
        }, s = screen.width, d = screen.height;
        return {
            getRequest: function (e) {
                var o = 1, r = v() || {};
                r.block = e.positionCode, r.screenw = e.screenW, r.screenh = e.screenH, r.browserw = T.page.getViewWidth(), r.browserh = T.page.getViewHeight(), r.browserpx = e.pageX - e.scrollLeft - Math.round(r.browserw / 2), r.browserpy = e.pageY - e.scrollTop, r.pagew = T.page.getWidth(), r.pageh = T.page.getHeight(), r.pagepx = e.pageX - Math.round(r.pagew / 2), r.pagepy = e.pageY, r.ext = "turnurl=" + e.targetUrl + (F.config.clickext || ""), w.getRequest(n.click, r), 1 == o && (o = 2, T.observer.addOne("clickStat.setValue", function (e) {
                    return setTimeout(function () {
                        var o = e.ext.turnurl;
                        r.ext = "turnurl=" + o + F.config.clickext, w.getRequest(pgClick, r), T.observer.remove("clickStat.setValue")
                    }, 100), T.observer.remove("clickStat.setValue"), !1
                }))
            }, send: function (n, i, c) {
                var u = this, l = n.target || n.srcElement || document;
                if (i && i.target && (l = i.target), null == n.pageX && null != n.clientX) {
                    var p = document.documentElement, f = document.body;
                    n.pageX = n.clientX + (p && p.scrollLeft || f && f.scrollLeft || 0) - (p && p.clientLeft || f && f.clientLeft || 0), n.pageY = n.clientY + (p && p.scrollTop || f && f.scrollTop || 0) - (p && p.clientTop || f && f.clientTop || 0)
                }
                if ("undefined" != typeof n.pageX) {
                    var g = T.dom.getAttr(l, "ct") || "";
                    if ((g || (l = r(l))) && ("A" != l.nodeName || !T.dom.hasAttr(l, "data-openurl"))) {
                        var m = !1, v = o(l);
                        ("A" !== l.nodeName || "" === v || e(v, location.href)) && (m = !0);
                        var w = T.dom.getAttr(l, "data-ck");
                        w && T.array.each(w.split("&"), function (e, o) {
                            var n = o.split("=");
                            2 === n.length && (i[n[0]] = n[1])
                        });
                        var h = T.dom.getAttr(l, "data-bid");
                        if (u.getRequest({
                            event: n,
                            eventId: m ? 2 : 1,
                            positionCode: (i ? i.poscode : "") || a(l),
                            targetUrl: m ? "" : v,
                            pageX: n.pageX,
                            pageY: n.pageY,
                            scrollLeft: T.page.getScrollLeft(),
                            scrollTop: T.page.getScrollTop(),
                            screenW: s,
                            screenH: d,
                            appData: i || {}
                        }), h) {
                            var k = {
                                bid: h,
                                nid: T.dom.getAttr(l, "data-nid") || 0,
                                cid: T.dom.getAttr(l, "data-cid") || 0,
                                priority: T.dom.getAttr(l, "data-priority") || 0
                            };
                            if ("vplay_" == F.config.ctrlname) {
                                var y = (i ? i.poscode : "") || a(l);
                                y = y.replace(/#/gi, ""), k.block = y, k.stp = T.dom.getAttr(l, "data-stp"), x.getRequest({
                                    firstname: "ecom_mobile",
                                    secondname: "relate"
                                }, k)
                            } else x.getRequest({}, k)
                        }
                        c && c.call(u, {isButton: m, targetUrl: v})
                    }
                }
            }, init: function () {
                var e = this;
                T.on(document.body, "mousedown", function (o) {
                    var n = o || window.event;
                    e.send(n, {}, function () {
                    })
                })
            }, getElementByXPath: i, getTrueLink: o, getStatTarget: r, getPositionCode: a
        }
    }(), y = function () {
        return function (e) {
            var o = v() || {};
            e = e || {}, e.type = e.type || "show", e.ext = e.ext || [], o.event = e.type + "_" + e.name, o.ext = e.ext.join("*_*"), w.getRequest(n.event, o)
        }
    }(), b = function () {
        return function (e) {
            var o = v() || {};
            e = e || {}, o.mid = e.mid, o.mids = e.mids, o.et = e.et, o.stp = e.stp, w.getRequest(n.guess, o)
        }
    }(), _ = function () {
        return function (e) {
            var o = v() || {};
            e = e || {}, o.flag = e.flag, o.action = e.action, o.mediatype = e.mediatype, w.getRequest(n.action, o)
        }
    }(), I = {
        isseolog: !1, send: function () {
            if (this.isseolog) return !1;
            this.isseolog = !0;
            var e = g(), o = {
                    google: {k: "q"},
                    baidu: {k: "wd"},
                    bing: {k: "q"},
                    soso: {k: "w"},
                    yahoo: {k: "p"},
                    sogou: {k: "query", charset: "gbk"},
                    youdao: {k: "q"},
                    alexa: {k: "q"},
                    163: {k: "q"},
                    lycos: {k: "query"},
                    3721: {k: "name"},
                    search: {k: "p"},
                    zhongsou: {k: "w"},
                    soku: {k: "keyword"},
                    yisou: {k: "q"},
                    so: {k: "q"},
                    baigoogledu: {k: "q"},
                    jike: {k: "q"},
                    gougou: {k: "q"}
                }, n = e.match(/.\:\/\/([^\/]*).*/), r = n && n[1] ? n[1] : "",
                i = {query: "", from: "unknown", charset: "utf8", ref: e, url: location.href, alliance: 0};
            return r && -1 == r.indexOf("fun.tv") ? (T.object.each(o, function (o, n) {
                if (-1 == r.indexOf(n)) return !0;
                i.from = n;
                for (var a = 0; 2 > a; a++) {
                    try {
                        i.query = decodeURIComponent(decodeURIComponent(T.url.getQueryValue(o.k, e) || ""))
                    } catch (c) {
                        i.query = T.url.getQueryValue(o.k, e), i.charset = "gbk"
                    }
                    if (i.query) break;
                    "word" == o.k
                }
                return !1
            }), i.alliance = F.tool.partner ? F.tool.partner.getId() : 0, F.tool.pvManager.add("searchsource", i), void setTimeout(function () {
                F.tool.pvManager.send()
            }, 800)) : e
        }
    }, x = function () {
        return {
            getRequest: function (e, o) {
                e = e || {}, o = o || {}, e.host = "stat.funshion.com", e.firstname = e.firstname || "operation", e.secondname = e.secondname || "blk_click", e.timeout = 3e3, e.protocol = ["dev", "mac", "ver", "nt", "fudid", "sid", "apptype", "app", "uid", "nid", "bid", "cid", "block", "scid", "stp", "schannel", "priority"], e.domain = F.config.protocol + "//" + e.host + "/", e.split = "&";
                var n = F.cookie.get("channelid") || F.cookie.get("alliance_id");
                n || (n = F.partner ? F.partner.getId() : 0), window.vplay && (window.vplay.channel_idt && (o.schannel = window.vplay.channel_idt), window.vplay.galleryid ? o.scid = window.vplay.galleryid : window.vplay.videoid && (o.scid = window.vplay.videoid));
                var i = {
                    dev: (F.config.isFsHost ? "winpc" : "pcweb") + "_" + window.navigator.appVersion + "_NULL",
                    nt: 3,
                    fudid: r.get(),
                    sid: n,
                    apptype: F.config.isFsHost ? "winpc_app_main" : "pcweb_web_main",
                    app: F.config.isFsHost ? "fs" : "www",
                    uid: F.user ? F.user.userid : "",
                    ver: "",
                    block: "",
                    scid: 0,
                    stp: "",
                    schannel: "",
                    mac: ""
                };
                for (var a in i) o[a] || (o[a] = i[a] || "");
                w.getRequest(e, o)
            }
        }
    }(), q = {
        logComScore: function () {
            window._comscore = window._comscore || [], window._comscore.push({c1: "2", c2: "20466236"}), function () {
                var e = document.createElement("script"), o = document.getElementsByTagName("script")[0];
                e.async = !0, e.src = ("https:" == document.location.protocol ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js", o.parentNode.insertBefore(e, o)
            }()
        }, miaozhen: function (e) {
            e = e || {};
            var o = e.yumurl || F.config.protocol + "//g.cn.miaozhen.com/x.gif?k=test&p=test&o=", n = new Image;
            top == self ? o = o + "&nx=" + encodeURIComponent(top.location.href) : o += "&nx=DEFAULT", o += "&nn=APP", n.onload = n.onerror = function () {
            }, n.src = o
        }, ndatasp: function () {
            window.ap_lib && setTimeout(function () {
                var e = document.createElement("script");
                e.type = "text/javascript", e.charset = "UTF-8", e.async = !0, e.src = window.ap_lib, document.getElementsByTagName("head")[0].appendChild(e)
            }, 1e3)
        }, mdatasp: function () {
            window.mz_lib
        }, odatasp: function () {
            if (window.adb_lib) {
                if (window.adb_lib_load) return;
                setTimeout(function () {
                    var e = document.createElement("script");
                    e.type = "text/javascript", e.charset = "UTF-8", e.async = !0, e.src = window.adb_lib, document.getElementsByTagName("head")[0].appendChild(e), window.adb_lib_load = !0
                }, 1e3)
            }
        }, nestle: function () {
            var e = !1, o = function () {
                F.log.send("http://trace2.rtbasia.com/rtbasia_viewability.min.js");
                var o = {OnPage: 1, SameDomainIframe: 2, CrossDomainIframe: 3}, n = function (e) {
                        try {
                            if (window.top == window) return e.OnPage;
                            for (var o = window, n = 0; o.parent != o && 1e3 > n;) {
                                if (o.parent.document.domain != o.document.domain) return e.CrossDomainIframe;
                                o = o.parent
                            }
                            return e.SameDomainIframe
                        } catch (e) {
                        }
                        return e.CrossDomainIframe
                    },
                    r = ["ua=" + encodeURIComponent(navigator.userAgent), "sr=" + screen.width + "x" + screen.height, "i=" + n(o)];
                F.jsonp(F.config.protocol + "//vs.funshion.com/vvs/spiderman?" + r.join("&"), function (e) {
                    if (e && e.length) for (var o = 0; o < e.length; o++) e[o] && e[o].point >= 0 && setTimeout(function (e) {
                        return function () {
                            F.log.send(e.url)
                        }
                    }(e[o]), e[o].point)
                }, "cb"), e = !0
            };
            T.observer.add("webplay.adStart", function (e, n) {
                n = n || {}, "nestle" == n.partner && o()
            })
        }
    };
    F.client.web.getReportData = function () {
        var e = v() || {};
        return e.vvid = f(), e
    }, r.get();
    var R = {pv: h, click: k, event: y, guess: b, coop: q, action: _};
    R.send = function () {
        var e = [];
        return function (o) {
            var n = e.push(document.createElement("img")) - 1;
            e[n].onload = e[n].onerror = function () {
                e[n] = e[n].onload = e[n].onerror = null, delete e[n]
            }, e[n].src = o
        }
    }(), F.namespace("log", R), T.ready(function () {
        F.tool.pvManager.send(), h.init(), k.init(), h.send({needUpdate: !0}), I.send()
    }), T.observer.add("pv", function () {
        h.init(), h.send({needUpdate: !0})
    }), T.observer.add(F.EventCenter.LOG_DOM_CLICK, function (e, o) {
        k.send(o.event, {poscode: o.poscode || "", target: o.target})
    }), T.observer.add("webplay.next", function (e, o) {
        var n = o.videoid || 0, r = o.galleryid;
        if (!r && n) {
            var i = {};
            i.cid = n;
            var a = "";
            i.block = a + "_relateauto", x.getRequest({firstname: "ecom_mobile", secondname: "relate"}, i)
        }
    })
}();
;!function () {
    var e = {
        seoinfo: function () {
            function e(e, o) {
                for (var i = o.length - 1; i >= 0; i--) if (e.indexOf(o[i]) > -1) return !0;
                return !1
            }

            var o = {isseo: !1, isfs: !1};
            if (document.referrer) {
                var i = document.referrer.toLowerCase(), a = i.match(/.\:\/\/([^\/]*).*/), n = a && a[1] || "";
                if (n && -1 == n.indexOf("fun.tv")) {
                    var r = [".google.", ".baidu.", ".soso.com", ".youdao.com", "sogou.com", ".yahoo.", ".bing.com", ".weibo.com", "t.qq.com", "qzone.qq.com", "renren.com", "t.sina.com", "v.360.cn", "so.360.cn", ".soku.com", ".yisou.com", ".baigoogledu.com", ".jike.com", ".gougou.com", ".so.com"],
                        c = ["风行", "%b7%e7%d0%d0", "%e9%a3%8e%e8%a1%8c", "風行", "%efl%d0%d0", "%e9%a2%a8%e8%a1%8c", "fengxing", "feng xing"],
                        s = i;
                    try {
                        s = decodeURIComponent(i)
                    } catch (u) {
                    }
                    o = {isseo: e(n, r), isfs: e(s, c), host: n}
                }
            }
            return o
        }, seo: function () {
            return this.seoinfo().isseo
        }, getTrace: function () {
            var e = "alliance_id", o = "alliance", i = parseInt(T.url.getQueryValue(e) || T.url.getQueryValue(o));
            return isNaN(i) && (i = 0), i
        }, getId: function () {
            var e = this.getTrace();
            if (0 >= e) {
                var o = this.seoinfo();
                if (o.isseo) {
                    if (e = o.isfs ? 69 : 1024, !o.isfs && o.host) {
                        var i = {
                            "video.baidu.com": 155085,
                            "v.baidu.com": 155085,
                            "news.baidu.com": 155086,
                            "tieba.baidu.com": 155087,
                            "image.baidu.com": 155088,
                            "www.soku.com": 155089,
                            "v.sogou.com": 155090,
                            "video.soso.com": 155091,
                            "video.gougou.com": 155093,
                            "v.360.cn": 152055
                        };
                        e = i[o.host] || e
                    }
                    var a = T.g("footer_static"),
                        n = new RegExp("/" + (F.config.media_module || "subject") + "/([0-9]{1,9})", "g"),
                        r = n.exec(window.location.href);
                    if (null != r && null != a) {
                        var c = T.g("sitemapElement");
                        c && F.each(c.getElementsByTagName("a"), function () {
                            var t = n.exec(this.href);
                            null != t && t[1] == r[1] && (e = 60635)
                        })
                    }
                } else e = 0;
                0 == e && parseInt(F.cookie.get("alliance_id")) > 0 && (e = parseInt(F.cookie.get("alliance_id")))
            }
            return e > 0 && this.trace(e), e
        }, trace: function (e) {
            e > 0 && F.tool.cookie.set("alliance_id", e, 1)
        }, getDownloadUrl: function (e) {
            var o = [], i = this.getId();
            return o.push(i > 0 ? "id=" + i : "id=1"), e && o.push("lc=" + e), -1 != F.config.down_url.indexOf("?") ? F.config.down_url + (o.length > 0 ? "&" + o.join("&") : "") : F.config.down_url + (o.length > 0 ? "?" + o.join("&") : "")
        }, registerDownloadClientLink: function (e) {
            var o = F.client.isSetup();
            T.each(T.query(".tool_cli_link", e), function (e) {
                if (!e.isregister && e.tagName && "a" == e.tagName.toLowerCase()) {
                    var i = e.href || F.partner.getDownloadUrl("P08"), a = e.getAttribute("data-mid") || "",
                        n = e.getAttribute("data-vid") || "", r = e.getAttribute("data-definition") || "tv",
                        c = e.getAttribute("data-act");
                    if (a) {
                        var s = "fsp://download/" + a + "/";
                        "play" == c && (s = "fsp://play/" + a + "/"), n && (s += n, s += "/" + r), "0" == a && (s = "javascript:alert('短视频不支持下载咯!')", e.removeAttribute("target")), o ? (e.href = s, T.dom.addClass(e, "cli_setup")) : e.href = i, e.isregister = !0
                    }
                }
            })
        }
    };
    F.namespace("partner", e)
}();
;!function () {
    var o = baidu.lang.createClass(function () {
        this.name = "BaseControl", this.start = function () {
        }, this.stop = function () {
            this.onComplete && this.onComplete.call(this, 5)
        }, this.onComplete = function () {
        }
    }), i = baidu.lang.createClass(function () {
        this.name = "BaiduAlaControl";
        var o = function () {
                this.logLoginError = function () {
                    var o = F.config.statHost + "/business/pclient_matloadlog?rprotocol=1*_*ad_matget=1*_*ad_matload=1*_*uid=0*_*mac=*_*ap=baidu_ad*_*fck=*_*session_id=*_*play_id=*_*ad_id=*_*matid=*_*mick=*_*client=*_*ver=*_*adtype=me*_*videoid=*_*player_ver=*_*platform=pc*_*hashid=*_*ad_order=*_*vlen=*_*req=";
                    this.send(o)
                }, this.logLoginTimeout = function () {
                    var o = F.config.statHost + "/business/pclient_matloadlog?rprotocol=1*_*ad_matget=1*_*ad_matload=1*_*uid=0*_*mac=*_*ap=bd_api_tout*_*session_id=*_*play_id=*_*ad_id=*_*matid=*_*mick=*_*client=*_*ver=*_*adtype=me*_*videoid=*_*player_ver=*_*platform=pc*_*hashid=*_*ad_order=*_*vlen=*_*req=";
                    this.send(o)
                }, this.logLoginSuccess = function () {
                    var o = F.config.statHost + "/business/pclient_matloadlog?rprotocol=1*_*ad_matget=1*_*ad_matload=1*_*uid=0*_*mac=*_*ap=baidu_ala*_*fck=*_*session_id=*_*play_id=*_*ad_id=*_*matid=*_*mick=*_*client=*_*ver=*_*adtype=me*_*videoid=*_*player_ver=*_*platform=pc*_*hashid=*_*ad_order=*_*vlen=*_*req=";
                    this.send(o)
                }, this.logLoginedUser = function () {
                    var o = F.config.statHost + "/business/pclient_matloadlog?rprotocol=1*_*ad_matget=1*_*ad_matload=1*_*uid=0*_*mac=*_*ap=baidu_cookie*_*fck=*_*session_id=*_*play_id=*_*ad_id=*_*matid=*_*mick=*_*client=*_*ver=*_*adtype=me*_*videoid=*_*player_ver=*_*platform=pc*_*hashid=*_*ad_order=*_*vlen=*_*req=";
                    this.send(o)
                }, this.isSend = !1, this.send = function (o) {
                    this.isSend || ((new Image).src = o, this.isSend = !0)
                }
            }, i = new o, a = this,
            e = (F.config.protocol + "//api.open.baidu.com/pae/ecosys/api/check?type=video&fm=fun", "bd_up"), _ = !1,
            n = !1, d = !1, s = function () {
                d || (a.onComplete.apply(a, arguments), d = !0)
            }, c = function () {
                var o = 2e3, a = 0, d = !1, c = function () {
                        n ? i.logLoginedUser() : _ && i.logLoginError()
                    }, l = function () {
                        _ ? i.logLoginSuccess() : n && i.logLoginedUser()
                    },
                    r = F.http.jsonp(F.config.protocol + "//api.open.baidu.com/pae/ecosys/api/check?type=video&fm=fun", function (o) {
                        if (clearTimeout(a), !d) {
                            var i = o;
                            T.isObject(i) && i.data && "1" == i.data.ret ? (l(), s(1), F.cookie.set(e, 1, 1)) : (c(), F.cookie.del(e), s(0))
                        }
                    }, "cb");
                a = setTimeout(function () {
                    d = !0;
                    try {
                        r.abort()
                    } catch (o) {
                    }
                    c(), F.cookie.del(e), s(0)
                }, o)
            };
        this.start = function () {
            var o = window.location.search || "";
            _ = -1 != o.indexOf("fm=ala"), n = F.cookie.get(e), n ? s(1) : _ || s(0), (_ || n) && c()
        }
    }, {superClass: o}).extend({}), a = {control: null};
    a.control = new i, F.namespace("player.WPAdController", a)
}();
;!function () {
    var e = {}, i = {
        lightOn: function (i) {
            e[i] && e[i].lightOn()
        }, lightOff: function (i) {
            e[i] && e[i].lightOff()
        }, add: function (i, o) {
            e[i] = o
        }, remove: function (i) {
            delete e[i]
        }
    }, o = function (e, a) {
        if (o.autoIndex += 1, this.info = {
            type: "",
            videoid: 0,
            next: 1,
            startAd: 1,
            stoppage: 1,
            funshionSetup: F.client.isSetup() ? 1 : 0,
            partner: F.partner ? F.partner.getId() : 0,
            userMac: F.cookie.get("Mac") || "",
            vmis: 0
        }, this.option = {
            target: "html-video-player-layout",
            lightDom: null
        }, this.info = T.extend(this.info, e || {}), this.option = T.extend(this.option, a || {}), this.option.index || (this.option.index = o.autoIndex), this.target = T.g(this.option.target), this.lightDom = T.g(this.option.lightDom) || this.target, this.lightDomAnr = T.dom.getAncestorByClass(this.lightDom, "page-wrap"), this.playerId = "video-player-" + (new Date).getTime() + "_" + this.option.index, this.target) {
            this.__init();
            i.add(this.playerId, this)
        }
    };
    o.autoIndex = -1, o.prototype.__init = function () {
        var e = this, i = e.info, o = [],
            a = F.config.flash_url || F.config.protocol + "//static.funshion.com/main/swf/FunPlayerUi.swf",
            r = F.client.video({mp4: !0}), n = {
                allowScriptAccess: "always",
                wmode: "transparent",
                ver: "10.2",
                allowfullscreen: "true",
                errorMessage: "<div class='mod-player-tip'>抱歉，您需要安装最新版本的Adobe Flash Player！<a target='_blank' href='" + ("https:" == document.location.protocol ? "https://" : "http://") + "get.adobe.com/cn/flashplayer/'>点击下载</a></div>"
            };
        this.h5player = null;
        for (var s in i) o.push(s + "=" + i[s]);
        o.push("vodnum=" + e.playerId), o.push("time=" + ((new Date).getTime() - window.vplayDomReadyEndTime)), o.push("uuid=" + F.math.guid());
        var d = T.url.getQueryValue("fv") || 0;
        F.config.isFsHost || 0 != d || o.push("socket=1"), "vplay_" == F.config.ctrlname && (window.vplay && window.vplay.is_exceed && o.push("http=1"), window.vplay && window.vplay.pgcid && o.push("pgcid=" + window.vplay.pgcid));
        var l = o.join("&");
        switch (r) {
            case"flash":
                T.observer.send("webplay.pageinfo", {
                    time: (new Date).getTime() - window.vplayDomReadyEndTime,
                    utime: 0
                }), window.vplayPlayerInitTime = (new Date).getTime(), T.swf.create(T.extend(n, {
                    id: e.playerId,
                    url: a,
                    width: "100%",
                    height: "100%",
                    vars: l
                }), e.target);
                break;
            case"html5":
                F.load("widget.html5video.html5Video", function () {
                    e.h5player = new this({
                        type: "movie" == e.info.type ? "media" : "video",
                        gtype: parseInt(e.info.gtype) || 0,
                        videoid: i.videoid,
                        galleryid: i.galleryid || "",
                        next: i.nextinfo || "",
                        renderTo: e.target
                    })
                });
                break;
            case"none":
                return T.observer.send("webplay.pageinfo", {
                    time: (new Date).getTime() - window.vplayDomReadyEndTime,
                    utime: 0,
                    error: 2002
                }), void(e.target.innerHTML = "<div class='mod-player-tip'><i class='err'></i>非常抱歉！本视频暂时无法播放</div>")
        }
    }, o.prototype.getSWFPlayerAttr = function (e) {
        var i = this.getPlayer();
        if (i) try {
            return i.getPlayerInfo(e)
        } catch (o) {
            console.log("*** swf　接口异常:" + o)
        }
        return ""
    }, o.prototype.getTime = function () {
        return this.h5player ? this.h5player.getTime() : this.getSWFPlayerAttr("time")
    }, o.prototype.getPlayer = function () {
        return T.swf.getMovie(this.playerId)
    }, o.prototype.lightOn = function () {
        var e = this;
        T.hide(T.g("video-mask")), T.dom.removeClass(e.lightDom, "z-over-mask"), T.browser.ie < 8 && T.dom.removeClass(e.lightDomAnr, "z-over-mask"), T.page.exitFSMode && T.page.exitFSMode();
        var i = T.g("playerWrap");
        i && T.dom.addClass(i, "z-1")
    }, o.prototype.lightOff = function () {
        var e = this, i = T.g("video-mask");
        i || (i = T.dom.create("div", {
            id: "video-mask",
            "class": "z-video-mask",
            style: "position:fixed; _position:absolute; top:0; left:0; width:100%; height:100%; background-color:#000;"
        }), T.dom.insertAfter(i, document.body.lastChild), T.browser.ieTrue < 7 && T.setStyle(i, "height", T.page.getHeight())), T.show(i), T.dom.addClass(e.lightDom, "z-over-mask"), T.browser.ie < 8 && T.dom.addClass(e.lightDomAnr, "z-over-mask"), T.page.enterFSMode && T.page.enterFSMode();
        var o = T.g("playerWrap");
        o && T.dom.removeClass(o, "z-1")
    }, F.namespace("player", "player", o), F.namespace("player", "playerManager", i), T.ready(function () {
        T.each(T.q("tool-video-player"), function (e, i) {
            var a = T.getAttr(e, "data-vid"), r = 1 == T.getAttr(e, "data-vtype") ? "movie" : "http",
                n = T.getAttr(e, "data-vmisid") ? 1 : 0,
                s = {type: r, videoid: parseInt(a), next: 0, startAd: 0, showStop: 1, hidrightmenu: 1, vmis: n},
                d = "0" == T.getAttr(e, "data-auto") ? !1 : !0;
            1 == T.getAttr(e, "data-loop") && (s.loop = 1), 1 == T.getAttr(e, "data-showTopBar") && (s.showTopBar = 1);
            var l = function () {
                return a ? (new o(s, {target: e, index: i}), void(e.onclick = function () {
                })) : void(e.innerHTML = "<div class='mod-player-tip'><i class='err'></i>参数错误，没有获取到视频ID</div>")
            };
            d ? l() : e.onclick = l
        })
    })
}();
;!function () {
    var e = {
        init: function (e) {
            this.option = {
                title: "",
                desc: "",
                summary: "",
                pic: ""
            }, this.option = T.extend(this.option, e || {}), this.summary = this.option.summary, this.title = this.option.title ? this.option.title : document.title, this.desc = this.option.desc || this.option.title || document.title, this.pic = this.option.pic
        }, e: function (e) {
            return encodeURIComponent(e)
        }, url: function (e) {
            var i = window.location.href.split("#")[0];
            return i += (i.match(/\?/) ? "&" : "?") + "f=" + e
        }, pv: function () {
        }, zone: function () {
            var e = F.config.protocol + "//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=";
            return e += this.e(this.url("zone")) + "&title=" + this.title + "&pics=" + this.e(this.pic) + (this.summary ? "&summary=" + this.e(this.summary) : "") + (this.desc ? "&desc=" + this.e(this.desc) : ""), window.open(e, "_blank", "scrollbars=no,width=600,height=450,left=320,top=180,status=no,resizable=yes"), this.pv("zone"), !1
        }, sina: function () {
            var e = window.screen,
                i = F.config.protocol + "//service.weibo.com/share/share.php?appkey=3704997029&ralateUid=1704741001&url=";
            return i += this.e(this.url("sina") + "&time=" + +new Date) + "&title=" + this.e(this.desc) + "&content=utf-8&pic=" + this.e(this.pic), window.open(i, "w", "width=640,height=580,toolbar=no,menubar=no,scrollbars=no,location=yes,resizable=no,status=no,left=" + parseInt((e.width - 640) / 2) + ",top=" + parseInt((e.height - 580) / 2)), this.pv("weibo"), !1
        }, weixin: function () {
            var e = F.config.q + "/ajax/get_qrcode?text=" + encodeURIComponent(window.location.href);
            window.shareWeixinUrl && (e = F.config.q + "/ajax/get_qrcode?text=" + encodeURIComponent(window.shareWeixinUrl));
            var i = ['<div class="wx-wrap fix">', '	<ul class="wx-s-info">', '		<li class="s-tit">' + this.title + "</li>", '		<li class="s-tip s-tip-h">将视频分享给微信好友或微信朋友圈</li>', '		<li class="s-qrcode"><img id="shareWeixinImg" src="' + e + '" width="144" height="144"></li>', '		<li class="s-tip">使用微信扫一扫</li>', "	</ul>", '	<div class="wx-s-step-bg">', '		<div class="wx-s-step"></div>', "	</div>", "</div>"].join("");
            F.load("widget.dialog.dialog", function () {
                this.alert("分享到微信", i, {width: 630, act: !1})
            }), this.pv("weixin")
        }, qq: function () {
            var e = this.e(this.desc), i = this.e(this.url("qqt")), s = "6df7d7131d5c4d5b817ac1f06637b80b",
                o = F.config.wwwHost, n = F.config.protocol + "//v.t.qq.com/share/share.php?";
            n += "title=" + e + "&url=" + i + "&appkey=" + s + "&site=" + o + "&pic=" + this.pic, window.open(n, "转播到腾讯微博", "width=700, height=580, top=180, left=320, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no"), this.pv("tencent")
        }, renren: function () {
            var e = window.screen, i = F.config.protocol + "//widget.renren.com/dialog/share?link=";
            i += this.e(this.url("renren")) + "&title=" + this.e(this.title) + "&content=utf-8&images=" + this.e(this.pic) + (this.summary ? "&description=" + this.e(this.summary) : "") + (this.desc ? "&message=" + this.e(this.desc) : ""), window.open(i, "w", "width=640,height=580,toolbar=no,menubar=no,scrollbars=no,location=yes,resizable=no,status=no,left=" + parseInt((e.width - 640) / 2) + ",top=" + parseInt((e.height - 580) / 2)), this.pv("renren")
        }, kaixin: function () {
            var e = F.config.protocol + "//www.kaixin001.com/rest/records.php?starid=&aid=100025400&style=11";
            e += "url=" + this.e(this.url("kaixin")) + "&content=" + this.e(this.desc) + "  " + this.url("kaixin") + "&pic=" + this.e(this.pic), window.open(e, "_blank", "scrollbars=no,width=600,height=450,left=320,top=180,status=no,resizable=yes"), this.pv("kaixin")
        }
    };
    F.namespace("share", e), T.ready(function () {
        e.init(window.shareInfo || {}), T.each(T.query("[data-share-type]"), function (i) {
            var s = T.dom.getAttr(i, "data-share-type");
            T.on(i, "click", function (i) {
                return T.event.stop(i), window.vplay && window.vplay.switchControl && 0 == window.vplay.switchControl.share ? void F.tool.errModule() : void e[s]()
            })
        });
        var i = T.query(".downloadbtn-wrap")[0];
        if (i) {
            var s = T.query(".yesClient", i)[0], o = T.query(".noClient", i)[0];
            s && o && (T.dom.hide(s), T.dom.hide(o), F.client.isSetup() ? T.dom.show(s) : (T.dom.show(o), T.dom.addClass(i, "nocli")))
        }
        !function () {
            var e = T.get("sites-more-btn"), i = e && e.parentNode.parentNode;
            if (e && i) {
                var s = function (e) {
                    T.dom.hasClass(i, "sites-selected") ? T.dom.removeClass(i, "sites-selected") : T.dom.addClass(i, "sites-selected"), T.dom.hasClass(i, "sites-selected") && T.observer.send(F.EventCenter.EXPAND_ITEM_ON, {item_type: "share"}), e && T.event.stop(T.event.get(e))
                }, o = function () {
                    T.dom.hasClass(i, "sites-selected") && T.dom.removeClass(i, "sites-selected")
                };
                T.observer.add(F.EventCenter.EXPAND_ITEM_ON, function (e, s) {
                    s && "share" != s.item_type && (T.dom.hasClass(i, "sites-selected") ? T.dom.removeClass(i, "sites-selected") : "")
                }), T.un(e, "click", s), T.un(document, "click", o), T.on(e, "click", s), T.on(document, "click", o)
            }
        }()
    })
}();
;window.F = window.F || {}, window.F.tool = window.F.tool || {}, function () {
    function e(e) {
        var i = e && e.dom || document;
        T.each(T.query(".tool-slider", i), function (e) {
            if ("slider" != T.dom.getAttr(e, "data-comtype")) {
                var i = parseInt(T.dom.getAttr(e, "data-margin"));
                isNaN(i) && (i = 20);
                var a = {target: e, container: T.q("mod-wrap-in", e)[0], margin: i}, n = T.query(".inner-wrap", e)[0];
                n && (a.container = n, a.target = a.container.parentNode || e), new o(null, a)
            }
        })
    }

    var i = {target: "", container: "", margin: 20},
        a = ['<div class="slider-btns" bc="btn">', '	<a class="slider-pre-btn"  href="javascript:;" block="videolist_leftright"><i class="ico"></i></a>', '	<a class="slider-next-btn" href="javascript:;" block="videolist_leftright"><i class="ico"></i></a>', "</div>"].join(""),
        o = function (e, o) {
            var n = this, r = baidu.extend(baidu.extend({}, i), o);
            if (n.options = r, n.GUID = T.lang.guid(), n.viewsize = {x: 0, y: 0}, n.size = {
                x: 0,
                y: 0
            }, n.target = T.g(r.target), n.target && "slider" != T.dom.getAttr(n.target, "data-comtype")) {
                n.target.instance = this, n.target.setAttribute("data-comtype", "slider"), n.container = T.g(r.container), T.dom.insertHTML(n.container.parentNode, "beforeEnd", a), n.firstIdx = 0;
                var s = T.dom.children(n.container);
                if (!s.length) return n.target.removeAttribute("data-comtype", "slider"), void(n.target.instance = null);
                var g = Math.floor(n.container.offsetHeight / s[0].offsetHeight);
                if (g = 0 >= g ? 1 : g, n.maxCount = Math.ceil(s.length / g), n.page = 1, n.pagesize = 1, n.pagelineCount = 1, n.pagePage = 1, n.offset = 0, !n.options.itemsize || !n.options.itemsize.x) {
                    var p = T.dom.children(n.container)[0];
                    n.options.itemsize = {x: p.offsetWidth, y: p.offsetHeight}
                }
                n.userload = !1, n.lazypageCache = {}, n._init()
            }
        };
    o.prototype._resetPageInfo = function () {
        var e = this;
        e.page = 1, e.offset = 0;
        var i, a, o;
        e.viewsize = {x: e.target.offsetWidth, y: e.target.offsetHeight}, e.size = {
            x: e.container.offsetWidth,
            y: e.container.offsetHeight
        };
        (e.page - 1) * e.pagesize + 1;
        if (!e.options.itemsize || !e.options.itemsize.x) {
            var n = T.dom.children(e.container)[0];
            e.options.itemsize = {x: n.offsetWidth, y: n.offsetHeight}
        }
        i = e.options.itemsize.x, a = e.options.itemsize.y, o = e.options.margin;
        var r = T.dom.children(e.container);
        if (r.length) {
            var s = Math.floor(e.container.offsetHeight / r[0].offsetHeight);
            s = 0 >= s ? 1 : s, e.maxCount = Math.ceil(r.length / s);
            var g = e.maxCount * (i + o);
            e.pagesize = Math.floor((e.viewsize.x + o) / (o + i)), e.pagelineCount = Math.floor((e.viewsize.y + o) / (o + a)), e.maxPage = Math.ceil(e.maxCount / e.pagesize), g = isNaN(g) ? "0" : g, T.setStyle(e.container, "width", g)
        }
    }, o.prototype.userInit = function (e) {
        var i = this;
        e && (this._userinit = !1, i.lazypageCache = {}), this._userinit || (this._userinit = !0, i._resetPageInfo(), i.userload = !0, i.page = 0, i.next())
    }, o.prototype._init = function () {
        var e, i, a, o = this, n = function () {
            o.lazypageCache = {}, o.viewsize = {
                x: o.target.offsetWidth,
                y: o.target.offsetHeight
            }, o.size = {x: o.container.offsetWidth, y: o.container.offsetHeight};
            var n = (o.page - 1) * o.pagesize + 1;
            e = o.options.itemsize.x, i = o.options.itemsize.y, a = o.options.margin;
            var r = o.maxCount * (e + a);
            o.pagesize = Math.floor((o.viewsize.x + a) / (a + e)), o.pagelineCount = Math.floor((o.viewsize.y + a) / (a + i)), o.maxPage = Math.ceil(o.maxCount / o.pagesize), o.page = Math.ceil(n / o.pagesize) || 0, r = isNaN(r) ? "0" : r, T.setStyle(o.container, "width", r), o.setPage(o.page)
        }, r = function () {
            o.lazyloadPage(o.page)
        };
        o.uiNext = T.query(".slider-next-btn", o.target)[0], o.uiPrev = T.query(".slider-pre-btn", o.target)[0], o.uiNext && T.on(o.uiNext, "click", function (e) {
            isNaN(o.maxPage) && o._resetPageInfo(), o.userload = !0, T.event.stop(e), o.next()
        }), o.uiPrev && T.on(o.uiPrev, "click", function (e) {
            isNaN(o.maxPage) && o._resetPageInfo(), o.userload = !0, T.event.stop(e), o.prev()
        }), T.platform.isIpad && F.TouchHandler.attach(o.container, {
            onTouchMove: function (e) {
                "h" == this.dir && T.event.stop(e)
            }, onTouchEnd: function () {
                var e = this.start, i = this.moved, a = this.distance;
                e.x === i.x || Math.abs(a.x) < Math.abs(a.y) || (i.x < e.x ? o.next() : o.prev())
            }
        }), T.on(window, "resize", n), T.observer.add(F.EventCenter.PAGE_RESPONSE, function () {
            setTimeout(n, 500)
        }), T.on(window, "scroll", r);
        var s = T.query(".mod-vd-i", o.target);
        T.each(s, function (e, i) {
            var a = T.query("img", e)[0];
            a && T.dom.setAttr(a, "_lazyignore", 1), T.dom.setAttr(e, "a", i)
        }), n(), o.setPage(1)
    }, o.prototype.next = function () {
        this.setPage(this.page + 1)
    }, o.prototype.prev = function () {
        this.setPage(this.page - 1)
    }, o.prototype.first = function () {
        this.setPage(1)
    }, o.prototype.last = function () {
        this.setPage(this.maxPage)
    }, o.prototype.setPage = function (e) {
        var i = this;
        i.page = Math.max(1, Math.min(e, i.maxPage));
        var a = -(i.page - 1) * i.pagesize * (i.options.itemsize.x + i.options.margin),
            o = i.viewsize.x + i.options.margin - i.maxCount * (i.options.itemsize.x + i.options.margin),
            n = i.pagesize * (i.options.itemsize.x + i.options.margin);
        a = Math.min(0, Math.max(o, a)), F.tween(i.container, F.math.tweener.easeOutCubic, Math.abs(a - i.offset) / n, {left: a}), i.offset = a, i.lazyloadPage(i.page), i.updateUI(), i.userload = !1
    }, o.prototype.lazyloadPage = function (e) {
        var i = this;
        if (!this.LazyWraper) try {
            this.LazyWraper = F.widget.lazyloading.LazyWraper
        } catch (a) {
        }
        if (this.LazyWraper && (this.LazyWraper.isWraperInPage(i.target) || i.userload) && !i.lazypageCache[e]) {
            if (i.maxPage > 0) {
                var o = T.query(".mod-vd-i", i.target);
                T.each(o, function (a, o) {
                    var n = Math.max(0, (e - 1) * i.pagesize - 1), r = e * i.pagesize;
                    if (i.pagelineCount <= 1) o >= n && r >= o && (i.lazyload(a), T.dom.setAttr(a, "_lazyignore", 1)); else for (var s = (i.page - 1) * i.pagesize, g = 0; g <= i.pagelineCount; g++) n = Math.max(0, g * i.maxCount) + s, r = n + i.pagesize, o >= n && r + 1 > o && i.lazyload(a)
                })
            }
            i.lazypageCache[e] = !0
        }
    }, o.prototype.lazyload = function (e) {
        this.LazyWraper && (this.lazy ? this.lazy.registry(e) : this.lazy = new this.LazyWraper(e)), this.LazyWraper && this.LazyWraper.isWraperInPage(this.target) && T.each(T.query("img", e), function (e) {
            e.instance && e.instance.start()
        })
    }, o.prototype.updateUI = function () {
        var e = this;
        e.maxPage <= 1 ? (T.hide(e.uiPrev), T.hide(e.uiNext)) : e.page <= 1 ? (T.hide(e.uiPrev), T.show(e.uiNext)) : e.page >= e.maxPage ? (T.show(e.uiPrev), T.hide(e.uiNext)) : (T.show(e.uiPrev), T.show(e.uiNext))
    }, o.prototype.toString = function () {
        return "[object Slider]"
    }, o.registry = function (i) {
        e(i)
    }, T.ready(function () {
        setTimeout(e, 500)
    }), T.observer.add(F.EventCenter.REGISTER_SLIDER, e), F.namespace("slider", o)
}();
;!function () {
    var e = function () {
        !function () {
            var e = T.get("so"), n = T.get("soUnit"), r = T.get("soHotWord"), u = T.get("soAutoWord"),
                a = T.get("submit-btn");
            if (e && n) {
                var i = 0, s = 200, c = T.trim(e.value), l = null, d = !1, m = function () {
                    b(), T.trim(e.value) == c && (e.value = ""), T.addClass(n, "show-panel"), y()
                }, f = function (e) {
                    e = e || window.event;
                    var o = e.target || e.srcElement;
                    d = baidu.dom.contains(n, o) && "del" == o.parentNode.className ? !1 : !0
                }, v = function () {
                    b(), d && (i = setTimeout(function () {
                        0 === T.trim(e.value).length && (e.value = c), p(), T.removeClass(n, "show-panel"), e.HOT_FOCUS || T.hide(u), e.AUTO_FOCUS || T.hide(r), o()
                    }, s))
                }, h = function (e) {
                    var o = null;
                    try {
                        o = F.widget.autocomplete.autoComplete
                    } catch (n) {
                    }
                    o && o.setFocus(e)
                }, p = function () {
                    var o = e.value || "";
                    o == c && (o = "0"), a.setAttribute("block", "soframe_2_" + o), e.setAttribute("block", "soframe_1_" + o)
                }, y = function () {
                    p(), e.value && !e.HOT_FOCUS && T.dom.hasClass(n, "show-panel") ? (e.AUTO_FOCUS = !0, T.hide(r), h(!0)) : (e.AUTO_FOCUS = !1, T.hide(u), T.show(r), h(!1)), o()
                }, g = function (o) {
                    o = T.event.get(o);
                    var n = T.trim(e.value);
                    return n && "" != n ? void 0 : (T.event.stop(o), !1)
                }, b = function () {
                    clearTimeout(i)
                };
                l = T.getAttr(e, "soword"), l && (e.value = decodeURIComponent(l)), T.un(document.body, "mousedown", f), T.un(e, "focus", m), T.un(e, "blur", v), T.un(e, "keyup", y), T.un(document.forms.msearch, "submit", g), T.on(document.body, "mousedown", f), T.on(e, "focus", m), T.on(e, "blur", v), T.on(e, "keyup", y), T.on(document.forms.msearch, "submit", g)
            }
        }(), F.load("widget.autocomplete.autoComplete", function () {
            this.show({
                renderTo: "soAutoWord",
                renderContentTo: "soAutoWrap",
                padding: 1,
                listener: "so",
                proxy: F.config.q + "/api/search_hint",
                proxyType: function () {
                    return document.all ? "jsonp" : "ajax"
                },
                filter: "key",
                lineHeight: 32,
                proxyDelay: 500,
                render: function (e) {
                    return e
                },
                handler: function (e, o, n) {
                    o = parseInt(o, 10);
                    var r = e[o];
                    "object" == typeof r && (r = r.value), this.options.listener.value = r, n || document.forms.msearch.submit()
                },
                change: function (e, o, n) {
                    o = parseInt(o, 10);
                    var r = e[o];
                    "object" == typeof r && (r = r.value), n && (this.options.listener.value = r)
                },
                show: function (e) {
                    return e.length ? void 0 : !1
                },
                displayed: function () {
                    o()
                }
            })
        })
    }, o = function () {
        var e = T.get("soWindWrap");
        e.offsetHeight >= 180 ? (T.each(T.query(".material", e), function (e) {
            T.show(e)
        }), T.observer.send("search_couplet_show")) : T.each(T.query(".material", e), function (e) {
            T.hide(e)
        })
    }, n = function (e, o) {
        var n = 0, r = 0, u = function () {
            clearInterval(n), o()
        };
        clearInterval(n), n = setInterval(function () {
            return r += 1, r >= 20 ? void clearInterval(n) : void(e() && u())
        }, 500)
    };
    if (void 0 != typeof T && T.dom) {
        var r = !1, u = 0, a = function () {
            clearTimeout(u), r || (e(), r = !0)
        };
        u = setTimeout(function () {
            T.dom.ready && T.dom.ready.isReady ? a() : n(function () {
                var e = null;
                try {
                    e = T.get("so")
                } catch (o) {
                }
                return e
            }, a)
        }, 500), T.dom.ready && T.dom.ready.isReady ? a() : T.dom.ready(function () {
            a()
        })
    }
}();
;!function () {
    function a(a) {
        if (this.option = a || {}, this.maps = {
            currCls: "current",
            showCls: "block",
            attrTab: "data-tabs",
            attrCon: "data-contents",
            attrAct: "data-actiontype",
            attrScr: "data-scrollbar",
            attrStatic: "data-tabstatic",
            attrAjax: "data-ajax",
            attrIndex: "data-index"
        }, this.option.instance = this, this.tabs = T.query(T.dom.getAttr(this.option, this.maps.attrTab), this.option), this.conts = T.query(T.dom.getAttr(this.option, this.maps.attrCon), this.option), this.contDatas = [], this.supportAjax = 1 == T.dom.getAttr(this.option, this.maps.attrAjax) ? !0 : !1, this.currentIndex = 1 == T.dom.getAttr(this.option, this.maps.attrIndex) ? !0 : !1, this.supportAjax) {
            var s = T.query(".mod-wrap-in-l", this.option);
            s[0] && (this.conts = s)
        }
        if (this.isStatic = "1" == T.dom.getAttr(this.option, this.maps.attrStatic), this.isStatic && this.conts[0]) {
            this.supportAjax = !1;
            for (var i = T.query(".mod-vd-i", this.conts[0]), e = 0; e < i.length; e++) {
                var n = i[e];
                T.dom.removeClass(n, "first");
                var o = n.getAttribute("data-tabindex") || 0;
                "undefined" == typeof this.contDatas[o] && (this.contDatas[o] = [], T.dom.addClass(n, "first")), this.contDatas[o].push(n), 0 != o && T.dom.remove(n)
            }
        }
        this.api = F.config.q + "/api/get_index_tabs/{CATE}/{AREA}/{ID}", this.timer = null, this.sleep = 200, this.ajaxCache = [], this.sliderInstance = null, this.index = 0, this.lazypageCache = {}, this.init()
    }

    a.prototype.onMouseHandler = function (a) {
        var s = this, i = a.currentTarget || a.srcElement || a.target, e = s.tabs.indexOf(i);
        0 > e && (i = i.parentNode, e = s.tabs.indexOf(i)), s.clearTime(), s.timer = F.setTimeout(s.bind, s.sleep, s, e)
    }, a.prototype.clearTime = function () {
        var a = this;
        clearTimeout(a.timer)
    }, a.prototype.selectIndex = function (a) {
        this.bind(a)
    }, a.prototype.reBindEvent = function () {
        var a = this;
        if (this.tabs = T.query(T.dom.getAttr(this.option, this.maps.attrTab), this.option), this.conts = T.query(T.dom.getAttr(this.option, this.maps.attrCon), this.option), this.supportAjax) {
            var s = T.query(".mod-wrap-in-l", this.option);
            s[0] && (this.conts = s)
        }
        var i = T.dom.getAttr(a.option, a.maps.attrAct);
        T.each(a.tabs, function (a) {
            i ? T.un(a, i) : (T.un(a, "mouseover"), T.un(a, "mouseout"))
        }), T.each(a.tabs, function (s) {
            i ? T.on(s, i, T.fn.bind(a.onMouseHandler, a)) : (T.on(s, "mouseover", T.fn.bind(a.onMouseHandler, a)), T.on(s, "mouseout", T.fn.bind(a.clearTime, a)))
        })
    }, a.prototype.handler = function () {
        var a = this;
        a.reBindEvent(), T.on(window, "scroll", function () {
            a.send(a.index, "scroll")
        }), a.send(a.index, "scroll")
    }, a.prototype.bind = function (a) {
        var s = this;
        s.userload = !0, clearTimeout(s.timer), T.each(s.tabs, function (a, i) {
            s.currentIndex && T.dom.removeClass(a, s.maps.currCls + "_" + i), T.dom.removeClass(a, s.maps.currCls)
        }), T.dom.addClass(s.tabs[a], s.maps.currCls), s.currentIndex && T.dom.addClass(s.tabs[a], s.maps.currCls + "_" + a), s.isStatic || s.supportAjax || (T.each(s.conts, function (a) {
            T.dom.removeClass(a, s.maps.showCls)
        }), T.dom.addClass(s.conts[a], s.maps.showCls)), s.send(a), s.userload = !1
    }, a.prototype.onAjaxResult = function (a, s) {
        var i = this, e = this.ajaxCache || {}, n = e[s] || {};
        n.status = 2, n.data = a;
        var o = a + "" || "";
        o && -1 != o.indexOf("<") || (o = "<span>error</span>", n.data = o), this.conts[0] && (this.conts[0].innerHTML = o), i.reInitSlider(s), T.observer.send("playInfo.close")
    }, a.prototype.reInitSlider = function (a) {
        var s = this;
        if (!this.sliderInstance) {
            var i = T.query(".tool-slider", this.option)[0] || this.option;
            if (i && i.instance) {
                console.log("instance", i.instance);
                var e = i.instance.toString ? i.instance.toString() : "";
                -1 != e.indexOf("Slider") ? this.sliderInstance = i.instance : s.lazyloadPage(a)
            }
        }
        if (this.sliderInstance) try {
            this.sliderInstance.userInit(!0)
        } catch (n) {
        } else s.lazypageCache = {}, s.lazyloadPage(a)
    }, a.prototype.ajaxPage = function (a) {
        var s = this.ajaxCache || [], i = this, e = s[a] || {};
        if (s[a] = e, "undefined" == typeof e.status) {
            e.status = 1;
            var n = {};
            n.isfs = F.config.isFsHost ? 1 : 0;
            var o = this.tabs[a], r = o.getAttribute("data-id"), c = o.getAttribute("data-cate"),
                h = o.getAttribute("data-area"), d = this.api;
            d = d.replace("{ID}", r), d = d.replace("{CATE}", c), d = d.replace("{AREA}", h), F.post(d, n, function (a, s) {
                return function (i) {
                    a.onAjaxResult.call(a, i, s)
                }
            }(i, a), {format: "text"})
        } else 2 == e.status && i.onAjaxResult.call(i, e.data, a);
        this.ajaxCache = s
    }, a.prototype.visualAjaxPage = function (a) {
        var s = this, i = this.contDatas[a] || [];
        console.log("visualAjaxPage:", a);
        var e = this.conts[0];
        if (e) {
            for (var n = e.childNodes; n.length > 0;) e.removeChild(n[0]);
            for (var o = 0; o < i.length; o++) e.appendChild(i[o]);
            s.reInitSlider(a)
        }
    }, a.prototype.lazyloadPage = function (a) {
        var s = this, i = s.conts[a];
        if (s.supportAjax && (i = s.conts[0]), s.isStatic && (i = s.conts[0]), i && "1" != i.getAttribute("data-scrollbar")) {
            var e = -1 != (s.option.instance + "").toLowerCase().indexOf("slider");
            if (!e) {
                if (!this.LazyWraper) try {
                    this.LazyWraper = F.widget.lazyloading.LazyWraper
                } catch (n) {
                }
                var o = null;
                s.option && 1 == s.option.nodeType && (o = s.option), this.LazyWraper && (this.LazyWraper.isWraperInPage(o) || s.userload) && (s.lazypageCache[a] || (i && (this.lazy ? this.lazy.registry(i) : this.lazy = new this.LazyWraper(i), T.each(T.query("img", i), function (a) {
                    a.instance && a.instance.start()
                })), s.lazypageCache[a] = !0))
            }
        }
    }, a.prototype.send = function (a, s) {
        var i = this;
        this.index = a;
        var e = T.dom.getAttr(i.option, i.maps.attrScr);
        i.supportAjax ? "scroll" != s && i.ajaxPage(a) : (i.isStatic && "scroll" != s && i.visualAjaxPage(a), i.lazyloadPage(a)), this.onChangeTab && this.onChangeTab.call(this, this.index), 1 == e && "scroll" != s && T.observer.send(F.EventCenter.CHANGE_TAB, {indexNum: a})
    }, a.prototype.init = function () {
        var a = this;
        (a.tabs.length == a.conts.length || a.supportAjax || a.isStatic) && (a.supportAjax && (a.conts[0] && (a.ajaxCache[0] = {
            status: 2,
            data: a.conts[0].innerHTML
        }), a.lazypageCache = {}, a.lazyloadPage(1)), a.handler())
    }, a.registry = function () {
        var s = T.query("div.tool-tab");
        T.each(s, function (s) {
            if (!s.tabsInstance) {
                {
                    new a(s)
                }
                s.tabsInstance = !0
            }
        })
    }, T.dom.ready(function () {
        a.registry()
    }), F.namespace("tab", a)
}();
;!function () {
    var e = ['<div class="noresult">', '	<div class="tit">没找到相关结果</div>', '	<ul class="info">', '		<li class="head">建议</li>', "		<li>1、检查输入是否有误;</li>", "		<li>2、尝试更换同义关键词或者缩短关键词试试;</li>", "		<%if data.cid %>", '		<li>3、去<a href="/channel/<% data.cid %>" block="soresults_video_0_<% data.cindex %>" target="<% data.target %>"><% data.cname %></a>频道，碰碰运气;</li>', "		<%/if%>", "	</ul>", "</div>"].join(""),
        a = function (a) {
            if (this.root = a, this.root && !this.root.instance) {
                this.root.instance = this;
                var n = (this.root.getAttribute("data-mouse") || "click", this.root.getAttribute("data-api") || "");
                n ? -1 == n.indexOf("http://") && (n = F.config.q + n) : n = F.config.q + "/ajax/filter_videos/";
                var i, o = this.root.getAttribute("data-tpl") || "tpl-mod-vd",
                    r = this.root.getAttribute("data-cparams"), c = this.root.getAttribute("data-pagesize") || 20,
                    s = [], d = [], l = {}, u = this, g = [], p = [], h = [], f = 0, v = 0, m = !1,
                    b = '<div class="loading"></div>', j = function (e, a) {
                        console.log("setPage", arguments);
                        var n = a.options.renderTo, i = h.indexOf(n), o = e - 1;
                        v = o, w(i, o), console.log("setPage:tabidx", i)
                    }, x = function (e) {
                        return e = e.replace(/&#60;/gi, "<"), e = e.replace(/&#62;/gi, ">"), e = e.replace(/&#34;/gi, '"'), e = e.replace(/&#39;/gi, "'"), e = e.replace(/&#38;/gi, "&")
                    }, y = function (a, n, r) {
                        console.log("onJSONCallback", arguments);
                        var u = "";
                        if (d[n].jsoncache[r] = a, a.data.length <= 0 || "200" != a.status) {
                            var T = g[n], b = T.getAttribute("data-id") || "", y = T.innerHTML;
                            u = F.tpl.compile(e)({
                                data: {
                                    cid: parseInt(b + "") || 0,
                                    cname: y,
                                    target: F.config.isFsDomain ? "_self" : "_blank",
                                    cindex: n + 1
                                }
                            })
                        } else {
                            for (var M = a.data || [], q = parseInt(a.total) || 0, w = 20 * r + 1, _ = 0; _ < M.length; _++) M[_].index = Math.min(w + _, q), M[_].target = F.config.isFsDomain ? "_self" : "_blank";
                            u = F.tpl.renderFile(o, a)
                        }
                        if (s[n].pagecache[r] = u, n == f && r == v && (m && 0 == n && 0 == r || (p[n].innerHTML = x(u))), !l[n]) {
                            var H = function (e) {
                                return e
                            }, q = parseInt(a.total) || 0, L = Math.ceil(q / c), k = {
                                currentPage: 1,
                                pageSize: c,
                                total: q,
                                pageButtonNumber: 5,
                                pageGroupMode: 1,
                                renderTo: h[n],
                                anchor: "videos",
                                lang: {pre: "<", next: ">", n: H},
                                show: L > 5 ? {next: !0, pre: !0, more: !0} : {next: !1, pre: !1, more: !1},
                                update: function () {
                                    j(this.options.currentPage, this)
                                }
                            };
                            l[n] = new i(k)
                        }
                        A(n)
                    }, M = function (e) {
                        e = e || window.event, T.event.stop(e);
                        var a = e.currentTarget || e.srcElement;
                        f = g.indexOf(a), v = 0;
                        var n = a.getAttribute("data-params");
                        w(f, 0, n)
                    }, q = function (e, a, i) {
                        var o = n;
                        return i || (i = g[e].getAttribute("data-params")), i && (i = i.replace(/p=(\d*)/gi, "p=" + (a + 1)), i && (o += (o.indexOf("?") > 0 ? "&" : "?") + i)), r && (o += (o.indexOf("?") > 0 ? "&" : "?") + r), o
                    }, w = function (e, a, n) {
                        var i = s[e].pagecache[a], r = (d[e].jsoncache[a], !1);
                        if (!i && d[e].jsoncache[a]) try {
                            i = F.tpl.renderFile(o, d[e].jsoncache[a])
                        } catch (c) {
                            r = !0, console.log("tabgroup.tryRenderHTML: error:" + c), d[e].jsoncache[a] = void 0
                        }
                        if (!i || r) {
                            var l = (g[f], q(f, v, n));
                            F.jsonp(l, function (e, a) {
                                return function (n) {
                                    y(n, e, a)
                                }
                            }(e, a))
                        } else p[e].innerHTML = x(i);
                        A(e)
                    }, A = function (e) {
                        f == e && T.each(g, function (e, a) {
                            f != a ? (T.dom.removeClass(g[a], "current"), T.dom.hide(p[a]), T.dom.hide(h[a])) : (T.dom.addClass(g[a], "current"), T.dom.show(p[a]), T.dom.show(h[a]))
                        });
                        var a = d[f].jsoncache[v];
                        e == f && u.onTabData && u.onTabData(a)
                    }, _ = function () {
                        var e = T.query(".content .tab-content", u.root)[0];
                        e && (m = !0), g = T.query(".tab-item", u.root);
                        var a = T.query(".content", u.root)[0], n = T.query(".page", u.root)[0], i = [], o = [];
                        if (T.each(g, function (a, n) {
                            s[n] = {pagecache: {}}, d[n] = {jsoncache: {}}, e ? 0 != n && i.push('<div class="tab-content">' + b + "</div>") : i.push('<div class="tab-content">' + b + "</div>"), o.push('<div class="tab-page"></div>'), T.on(a, "click", T.fn.bind(M, u))
                        }), e && (s[0].pagecache[0] = e.innerHTML), a.innerHTML += i.join(""), n.innerHTML = o.join(""), p = T.query(".tab-content", u.root), h = T.query(".tab-page", u.root), w(0, 0, g[0]), m) {
                            var r = q(0, 0);
                            F.jsonp(r, function (e, a) {
                                return function (n) {
                                    y(n, e, a)
                                }
                            }(0, 0))
                        }
                    };
                F.load("widget.pager.pager", function () {
                    i = this, _()
                }), this.htmlData = s, this.jsonData = d
            }
        };
    a.registry = function () {
        var e = T.query("div.mod-tabgroup");
        T.each(e, function (e) {
            if (!e.instance) {
                new a(e)
            }
        })
    }, T.dom.ready(function () {
        a.registry()
    }), F.namespace("tabgroup", a)
}();
;window.F = window.F || {}, window.F.tool = window.F.tool || {}, F.user = F.tool.user = F.tool.user || {}, function () {
    var purview = function (e, o) {
        this.s = e, this.g = parseInt(o), this.single = {
            login: 1,
            register: 2,
            play: 3,
            download: 4,
            search: 5,
            favourite: 6,
            subscribe: 7,
            tag: 8,
            personal: 9,
            comment: 10,
            topic: 11,
            reply: 12,
            usefull: 13,
            score: 14,
            torrent: 15,
            library: 16,
            picture: 17,
            manage_torrent: 18,
            manage_library: 19,
            manage_comment: 20,
            manage_topic: 21,
            manage_tag: 22,
            manage_publish: 23,
            make_publish: 24,
            manage_user: 25,
            manage_login: 26
        }, this.group = [[1, 30], [2, 15870], [3, 114688], [4, 3670016], [5, 393216], [6, 12582912], [7, 16777216]], this.getPurview = function (e) {
            if ("object" == typeof e) {
                for (var o = {}, i = 0; i < e.length; i++) o[e[i]] = this.getPurview(e[i]);
                return o
            }
            var r = 0;
            r = this.s | this.setGroupPurview();
            var n = this.single[e], s = Math.pow(2, n - 1);
            return (s & r) == s
        }, this.setGroupPurview = function () {
            for (var e = this.g.toString(2), o = e.toString().length, i = [], e = this.strrev(e).toString().split(""), r = 0; o > r; r++) if (1 == parseInt(e[r])) for (var n = 0; n < this.group.length; n++) r + 1 == this.group[n][0] && (i[i.length] = this.group[n][1]);
            for (var s = 0, u = 0; u < i.length; u++) s |= i[u];
            return s
        }, this.strrev = function (e) {
            e = e.toString().split("");
            for (var o = e.length, i = [], r = o - 1, n = 0; r >= 0; r--, n++) i[n] = e[r];
            return i.join("")
        }
    };
    F.tool.user.checkPurview = function (ac, s, g) {
        if (F.cookie.get("accinfo")) var accinfo = eval("(" + F.cookie.get("accinfo") + ")"); else var accinfo = {
            uid: 0,
            g: 0,
            s: 0,
            accid: 0
        };
        s = s || parseInt(accinfo.s), g = g || parseInt(accinfo.g);
        var p = new purview(s || 0, g || 0);
        return p.getPurview(ac)
    }
}(), F.tool.user.userid = 0, F.tool.user.name = "", F.tool.user.update = function () {
    if (F.cookie.get("accinfo")) var accinfo = eval("(" + F.cookie.get("accinfo") + ")"); else var accinfo = {
        uid: 0,
        g: 0,
        s: 0,
        accid: 0
    };
    var me = parseInt(accinfo.uid) || 0;
    me > F.tool.user.userid && (F.tool.user.userid = me, arguments[0] && "login" == arguments[0].type || T.observer.send("login", {}));
    var token = F.cookie.get("sso_token");
    if (!F.user.userid) {
        var clientLoginInfo = null;
        try {
            clientLoginInfo = F.client.loginInfo() || {}
        } catch (e) {
        }
        clientLoginInfo = clientLoginInfo || {}, F.user.userid = clientLoginInfo.userid ? clientLoginInfo.userid : 0
    }
    if (token = token || "", F.tool.user.userid) try {
        F.tool.user.name = decodeURIComponent(accinfo.n)
    } catch (e) {
        F.tool.user.name = ""
    }
    F.client.saveLoginInfo(F.user.userid, token, F.tool.user.name), T.observer.send(F.EventCenter.LOGIN_STATE_CHANGE)
}, F.tool.user.isManage = function () {
    return F.tool.user.update(), F.tool.user.userid ? F.tool.user.checkPurview("manage_library") : !1
}(), F.tool.user.isLogin = function (e, o) {
    var i = 0 != F.tool.user.userid || F.cookie.get("userid");
    return (!i && e || o) && (F.config && F.config.switchControl && 0 == F.config.switchControl.login ? F.tool.errModule() : F.load("widget.login.ajaxLogin", function () {
        this.panel()
    })), i
}, F.tool.user.register = function () {
    F.config && F.config.switchControl && 0 == F.config.switchControl.register ? F.tool.errModule() : F.load("widget.login.ajaxLogin", function () {
        this.panelReg()
    })
}, F.tool.user.isNewUserTag = void 0, F.tool.user.isNewUser = function () {
    if (void 0 == this.isNewUserTag) {
        var e = Number(F.cookie.get("olduser"));
        this.isNewUserTag = e ? !1 : !0, F.cookie.set("olduser", (new Date).valueOf())
    }
    return this.isNewUserTag
}, F.tool.user.isNewUser(), T.observer.remove("login", F.tool.user.update), T.observer.add("login", F.tool.user.update), T.ready(function () {
    F.user.userid ? F.client.login() : F.client.logout()
}), T.observer.add("login", F.client.login), F.namespace("widget.user", "user", F.tool.user);
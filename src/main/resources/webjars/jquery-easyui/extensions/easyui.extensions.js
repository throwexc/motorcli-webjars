/**
* jQuery EasyUI 1.4.1
* Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: jiaogaochao@qq.com
*
* jQuery EasyUI Extensions 1.0 beta
* jQuery EasyUI datagrid 组件扩展
* easyui.extensions.js
* 二次开发 焦高超
* 最近更新：2015-2-3
*
* 依赖项：
*   1、jqueryEasyUI1.4.1
*
* Copyright (c) 2013-2014 Mapuni personal All rights reserved.
* http://www.mapuni.com
*/
//扩展
; (function ($) {
    //  对当前 easyui-datagrid 中进行高亮关键词查询；该方法的 param 可以定义为如下两种类型：
    //      1、String 类型值：表示要对所有列进行的高亮查询关键词；
    //      2、JSON-Object/Arry：表示对特定列进行高亮查询的参数，该对象类型参数包含如下属性：
    //          Key:      表示要进行高亮查询的列；
    //          Value:      表示要进行高亮查询的关键词；
    //          regular:    Boolean 类型值，默认为 false；指示该关键词是否为正则表达式；
    //          ignoreCase: Boolean 类型值，默认为 true；指示高亮查询时是否忽略大小写。
    //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
    var livesearch = function (target, param) {
        var t = $(target), panel = t.datagrid("getPanel"), cells, field, value = param, regular = false, ignoreCase = true, regexp;
        if ($.isArray(param)) {
            $.each(param, function (index, item) {
                if (("Where" in item) && (item.Where == "$like")) {//如果存在Where字段，说明是从自动查询过来的参数。只有查询条件是like时高亮
                    livesearch(target, item);
                } else if (!("Where" in item)) {//如果不存在，则说明是自己传的参数。全部高亮
                    livesearch(target, item);
                }
            });
        } else if ($.isPlainObject(param)) {
            value = param.Value;//高亮值
            field = param.Key;//高亮字段
            regular = param.regular;
            ignoreCase = param.ignoreCase;
            cells = panel.find("div.datagrid-body tr.datagrid-row td[" + (field ? "field='" + field +"'": "field") + "] div.datagrid-cell");
        } else {
            cells = panel.find("div.datagrid-body tr.datagrid-row td[field] div.datagrid-cell");
        }
        regexp = !regular ? new RegExp(value, ignoreCase ? "gm" : "igm") : value;
        if (!cells) return;
        cells.each(function () {
            var cell = $(this);
            cell.find("span.datagrid-cell-hightlight").replaceWith(function () { return $(this).text(); });
            if (!value) { return; }
            var text = cell.html(); if (!text) { return; }
            cell.html(text.replace(regexp, "<span class='datagrid-cell-hightlight'>" + value + "</span>"));
        });
    };
    //扩展methods
    $.extend($.fn.datagrid.methods, {
        //  对当前 easyui-datagrid 中进行高亮关键词查询；该方法的 param 可以定义为如下两种类型：
        //      1、String 类型值：表示要对所有列进行的高亮查询关键词；
        //      2、JSON-Object：表示对特定列进行高亮查询的参数，该对象类型参数包含如下属性：
        //          field:      表示要进行高亮查询的列；
        //          value:      表示要进行高亮查询的关键词；
        //          regular:    Boolean 类型值，默认为 false；指示该关键词是否为正则表达式；
        //          ignoreCase: Boolean 类型值，默认为 true；指示高亮查询时是否忽略大小写。
        //  返回值：返回表示当前 easyui-datagrid 组件的 jQuery 链式对象。
        livesearch: function (jq, param) { return jq.each(function () { livesearch(this, param); }); }
    });
})(jQuery);


//扩展弹窗选择grid，
//jgc 2015/3/9 使用方法和combogrid基本一致
//2015/3/10 已知bug：赋值后，不能显示text值。
(function ($) {
    $.fn.showGridSelector = function (options, params) {

        //如果构造函数第一个入参是字符串，则是方法调用。
        if (typeof options == "string") {
            //尝试到showGridSelector组件中找这个方法
            var caller = $.fn.showGridSelector.methods[options];
            if (caller) {
                //如果找到了这个方法，则调用之
                return caller(this, params);
            }
            else {
                //如果没有找到，则调用validatebox组件的同名方法
                return this.combogrid(options, params);
            }
        }
        options = options || {};
        return this.each(function () {
            var _this = this;
            var data = $.data(this, "showGridSelector");
            var newOptions;
            if (data) {
                newOptions = $.extend(data.options, options);
                data.opts = newOptions;
            } else {
                newOptions = $.extend({}, $.fn.combo.defaults, $.fn.showGridSelector.defaults, $.fn.showGridSelector.parseOptions(this), options);
                $.data(this, "showGridSelector", {
                    options: newOptions
                });
            }
            var hideInput = $("<input type=\"text\" />")
                .attr("name", $(this).attr("name"))
                .appendTo($(this).parent()).hide();
            $.data(this, "inputName", this.name);
            var showInput = $(this).attr("name", "");
            var _textBox = showInput.textbox({
                editable: false,
                icons: [{
                    iconCls: 'icon-add',
                    handler: function (e) {
                        var dataTable = $("<table></table>");
                        var openWindow = $('<div />')
                            .append(dataTable)
                            .window($.extend(newOptions, {
                                onClose: function () {
                                    $(this).window("destroy");
                                }
                            }));
                        //表格
                        var dialogGrid = dataTable.datagrid($.extend({}, newOptions, {
                            title: '',
                            fit: true,
                            fitCounmns: true,
                            idField: newOptions.valueField,
                            border: false,
                            singleSelect: true,
                            onLoadSuccess: function (ajaxdata) {
                                dataTable.datagrid("selectRecord", $("input[name=" + $(_this).data("inputName") + "]").val());
                            },
                            onClickRow: function (index, row) {
                                var selectValue = row[newOptions.valueField];
                                var selectText = row[newOptions.textField];
                                showInput.textbox("setValue", selectText);
                                hideInput.val(selectValue);
                                openWindow.window("close");
                            }
                        }));
                        $.data(this, "dialogGrid", dialogGrid);//保存表格对象
                    }
                }]
            });
        });
    };
    $.fn.showGridSelector.methods = {
        //获取表格对象
        grid: function (target) {
            return $(target).data("dialogGrid");
        },
        setValue: function (target, value) {
            $("input[name=" + $(target).data("inputName") + "]").val(value);
            $(target).textbox("setValue", value);
        },
        getValue: function (target) {
            $("input[name=" + $(target).data("inputName") + "]").val();
        },
        getText: function (target) {
            $(target).textbox("getValue");
        }
    };
    $.fn.showGridSelector.parseOptions = function (target) {
        return $.extend({},
            $.fn.combo.parseOptions(target),//增加validateBox支持
            $.parser.parseOptions(target,
            ["configId", "title"]));
    };
    $.fn.showGridSelector.defaults = {
        title: '请选择',
        width: 550,
        height: 400,
        modal: true
    };
    $.parser.plugins.push('showGridSelector');
})(jQuery);





/**  
 * layout方法扩展  
 * liz 2015-05-26
 * @param {Object} jq  
 * @param {Object} region  
 */
$.extend($.fn.layout.methods, {
    /**  
     * 面板是否存在和可见  
     * @param {Object} jq  
     * @param {Object} params  
     */
    isVisible: function (jq, params) {
        var panels = $.data(jq[0], 'layout').panels;
        var pp = panels[params];
        if (!pp) {
            return false;
        }
        if (pp.length) {
            return pp.panel('panel').is(':visible');
        } else {
            return false;
        }
    },
    /**  
     * 隐藏除某个region，center除外。  
     * @param {Object} jq  
     * @param {Object} params  
     */
    hidden: function (jq, params) {

        return jq.each(function () {
         
            var opts = $.data(this, 'layout').options;
            var panels = $.data(this, 'layout').panels;
            if (!opts.regionState) {
                opts.regionState = {};
            }
            var region = params;
            function hide(dom, region, doResize) {
                var first = region.substring(0, 1);
                var others = region.substring(1);
                var expand = 'expand' + first.toUpperCase() + others;
                if (panels[expand]) {
                    if ($(dom).layout('isVisible', expand)) {
                        opts.regionState[region] = 1;
                        panels[expand].panel('close');
                    } else if ($(dom).layout('isVisible', region)) {
                        opts.regionState[region] = 0;
                        panels[region].panel('close');
                    }
                } else {
                    panels[region].panel('close');
                }
                if (doResize) {
                    $(dom).layout('resize');
                }
            };
            if (region.toLowerCase() == 'all') {
                hide(this, 'east', false);
                hide(this, 'north', false);
                hide(this, 'west', false);
                hide(this, 'south', true);
            } else {
                hide(this, region, true);
            }
        });
    },
    /**  
     * 显示某个region，center除外。  
     * @param {Object} jq  
     * @param {Object} params  
     */
    show: function (jq, params) {
        return jq.each(function () {
            var opts = $.data(this, 'layout').options;
            var panels = $.data(this, 'layout').panels;
            var region = params;

            function show(dom, region, doResize) {
                var first = region.substring(0, 1);
                var others = region.substring(1);
                var expand = 'expand' + first.toUpperCase() + others;
                if (panels[expand]) {
                    if (!$(dom).layout('isVisible', expand)) {
                        if (!$(dom).layout('isVisible', region)) {
                            if (opts.regionState[region] == 1) {
                                panels[expand].panel('open');
                            } else {
                                panels[region].panel('open');
                            }
                        }
                    }
                } else {
                    panels[region].panel('open');
                }
                if (doResize) {
                    $(dom).layout('resize');
                }
            };
            if (region.toLowerCase() == 'all') {
                show(this, 'east', false);
                show(this, 'north', false);
                show(this, 'west', false);
                show(this, 'south', true);
            } else {
                show(this, region, true);
            }
        });
    }
});
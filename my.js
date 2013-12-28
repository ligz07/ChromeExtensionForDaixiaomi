function changeSeclect(select, text)
{
	select.children("option").filter(function(){
			var a = $(this).text();
			return $(this).text() == text;
		}).prop('selected', true);
	var selections = document.getElementsByTagName('select');
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("change", true, true);
	select[0].dispatchEvent(evt);
	return select;
}
var g_config = [
	{reg:/房龄要求/, text:"房龄",run:function(text, selector){
		var patrn = /(\d+)年/;
		var re = patrn.exec(text);
		var mon = '-'+re[1];
		selector.children("input").val(mon);
	}},
	{reg:/(抵押物估值|估值要求|房产估值)/, text:"房屋估值",run:function(text, selector){
		var patrn = /(\d+)万/;
		var re = patrn.exec(text);
		var mon = re[1];
		selector.children("input").val(mon);
	}},
	{reg:/(车龄要求)/, text:"车龄",run:function(text, selector){
			var patrn = /(\d+)年/;
			var re = patrn.exec(text);
			var mon = re[1];
			selector.children("input").val(mon);
		}},
	{reg:/坐落区域/, text:"坐落区域",run:function(text, selector){
		selector.children("div.checkbox").children("input").first().attr('checked',true);
	}},
	{reg:/注册区域/, text:"注册地点",run:function(text, selector){
			selector.children("div.checkbox").children("input").first().attr('checked',true);
		}},
	{reg:/名下本地房产/, text:"坐落区域",run:function(text, selector){
	   selector.children("div.checkbox").children("input").first().attr('checked',true);
			selector.children("input").val(mon);
			changeSeclect(selector.children("select.affect"), "添加与关系");
			var li = $("#rightForm ul li").last();
			var select = li.children("select").first();
			var re = changeSeclect(select, "房屋归属");
			var pp = /本人/;

			if (pp.exec(text))
			{
				li.children("input.radio").first().attr("checked", true);
			}
			else
			{
				li.children("input.radio").last().attr("checked", true);
			}

		}},
	{reg:/抵押物(类型|性质|烈性|类性)/, text:"房产类型",run:function(text, selector){
		var array_check = selector.children("div.checkbox").children('input');
		$(array_check[0]).attr('checked', true);
		$(array_check[1]).attr('checked', true);
		if (/商铺/.exec(text))
		{
			$(array_check[3]).attr('checked', true);
		}
		if (/办公楼/.exec(text))
		{
			$(array_check[4]).attr('checked', true);
		}
		if (/厂房/.exec(text))
		{
			$(array_check[5]).attr('checked', true);
		}
	}},
	{reg:/经营(时间|年限)/, text:"注册经营年限(月)",run:function(text, selector){
		var patrn = /(\d+)年/;
		var re = patrn.exec(text);
		var mon = 0;
		if (re)
		{
			mon = re[1]*12;
		}
		else
		{
			patrn = /(\d+)个月/;
			re = patrn.exec(text);
			if (re)
			{
				mon = re;
			}
			else
			{
				patrn = /半年/;
				if (patrn.exec(text))
				{
					mon = 6;
				}
			}
		}
		
		if (mon != 0)
		{
			selector.children("input").val(mon);
		}
	}},
	{reg:/注册地/, text:"注册地点",run:function(text, selector){
		selector.children("div.checkbox").children("input").first().attr('checked',true);
	}},
	{reg:/工作地点/, text:"工作地点",run:function(text, selector){
			selector.children("div.checkbox").children("input").first().attr('checked',true);
		}},
		{reg:/牌照要求/, text:"车牌",run:function(text, selector){
					selector.children("div.checkbox").children("input").first().attr('checked',true);
				}},
	{reg:/贷款期限/, text:"年龄和贷款年限之和",run:function(text, selector){
	var patrn = /(\d+)年/;
				var re = patrn.exec(text);
				var mon = re[1];
				selector.children("input").val(mon);	
	}},
	{reg:/注册资金/, text:"注册资金",run:function(text, selector){
		var patrn = /(\d+)万/;
					var re = patrn.exec(text);
					var mon = re[1];
					selector.children("input").val(mon);	
		}},
	{reg:/年经营流水/, text:"营业额(年)",run:function(text, selector){
		var patrn = /(\d+)万/;
					var re = patrn.exec(text);
					var mon = re[1];
					selector.children("input").val(mon);	
		}},
	{reg:/月(均对公或对私流水|经营流水)/, text:"营业额(月)",run:function(text, selector){
			var patrn = /(\d+)万/;
						var re = patrn.exec(text);
						var mon = re[1]*10000;
						selector.children("input").val(mon);	
			}},
		{reg:/注册资本/, text:"注册资金",run:function(text, selector){
			var patrn = /(\d+)万/;
						var re = patrn.exec(text);
						var mon = re[1];
						selector.children("input").val(mon);	
			}},
		{reg:/月均流水/, text:"营业额(月)",run:function(text, selector){
						var patrn = /(\d+)万/;
									var re = patrn.exec(text);
									var mon = re[1]*10000;
									selector.children("input").val(mon);	
						}},
	{reg:/年龄(限制|要求|:|：)/, text:"年龄",run:function(text, selector){
				var paa = /(\d+)[^\-]*-(\d+)/;
				var pp = paa.exec(text);
				if (pp)
				{
					var mon = pp[1]+'-'+pp[2];
				}
				else
				{
					var patrn = /(\d+)岁/;
					var re = patrn.exec(text);
					var mon = re[1];
				}
				selector.children("input").val(mon);	
					}},
	{reg:/面积要求/, text:"房屋面积",run:function(text, selector){
		var patrn = /(\d+)平/;
			var re = patrn.exec(text);
			var mon = re[1];
			selector.children("input").val(mon);
		}},
	{reg:/行业(要求|限制)/, text:"行业要求",run:function(text, selector){
		var new_text = text.replace("行业限制：", "");
		selector.children("input").val(new_text);
	}},
	{reg:/收入要求/, text:"银行卡收入",run:function(text, selector){
		var patrn = /(\d+)元/;
		var re = patrn.exec(text);
		var mon = re[1];
		selector.children("input").val(mon);
		changeSeclect(selector.children("select.affect"), "添加与关系");
		var li = $("#rightForm ul li").last();
		var select = li.children("select").first();
		var re = changeSeclect(select, "收入是否含税");
		var pp = /税后/;

		if (pp.exec(text))
		{
			li.children("input.radio").first().attr("checked", true);
		}
		else
		{
			li.children("input.radio").last().attr("checked", true);
		}

	}},
	{reg:/工作年限/, text:"本单位工作年限(月)",run:function(text, selector){
		var patrn = /(\d+)(个月|月)/;
					var re = patrn.exec(text);
					var mon = re[1];
					selector.children("input").val(mon);
	}},
];
function getSelectNameAndFun(innerText)
{
	var x;
	for (x in g_config)
	{
		obj = g_config[x];
		if (innerText.search(obj.reg) != -1)
		{
			return obj;
		}
	}
	return null;
}
$("section.left li label").click(function(event){
	var e = jQuery.Event("click");
	if (event.target.nodeName == "LABEL")
	{
		// alert(event.target.innerText);
		$(".btn.hang").trigger(e);
		var li = $("#rightForm ul li").last();
		var select = li.children("select").first();
		var p = getSelectNameAndFun(event.target.innerText);
		if (p == null)
		{
			alert('can not find this element');
			return ;
		}
		var re = changeSeclect(select, p.text);
		obj.run(event.target.innerText, li);
	}			
});

$(function(){
	var p = $("h2 span").html();
	if (/担保方式: 抵押/.exec(p))
	{
		$(".btn.hang").trigger("click");
		var li = $("#rightForm ul li").last();
		var select = li.children("select").first();
		//var l = changeSeclect(select, "房产是否抵押")；
		select.children("option").filter(function(){
			var a = $(this).text();
			return $(this).text() == "房产是否抵押";
		}).prop('selected', true);
		var selections = document.getElementsByTagName('select');
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("change", true, true);
		select[0].dispatchEvent(evt);
		li.children("input.radio").first().attr("checked",true);
	}
});

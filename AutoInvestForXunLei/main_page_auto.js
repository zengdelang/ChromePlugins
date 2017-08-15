//yyyy-MM-dd
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    return currentdate;
}

var storage = window.localStorage;
if (storage["avfxl_done"] != getNowFormatDate()) 
{
    function clickTagA(e,customId)
    {
        var t = '<span id="'+customId+'"><span>';
        e.append(t);
        $('#'+customId).click();
    }

    var count = 0;
    var intervalID = setInterval(check,1000);
    var trylogin = false;
    function check()
    {
        var display = $('.unsignin').css('display');  
        if(display == 'none')
        {
            if(storage["haslingqu"] == 1)
            {
                clearInterval(intervalID);
                count = 0;
                intervalID = setInterval(tryClick,1000);
            }
            else
            {
                clearInterval(intervalID);
                clickTagA($('.last').children(),"click11");
            }
        }
        else
        {
            if(trylogin == false)
            {
                ++count;
                if(count > 5)
                {
                    clickTagA($('.first').children(),"click100");
                    clearInterval(intervalID);
                }
                else
                {
                     trylogin = true;
                     clickTagA($('.last').children(),"click1111");
                     setTimeout(function() {
                         trylogin = false;
                     }, 2000);
                }
            }
        }
    }

    function tryClick()
    {
        var display = $(".fix_row").find("td:eq(6)").children().find("a:eq(1)").css('display');
        if(display != 'none')
        {
            //结束
            clearInterval(intervalID);
            storage["haslingqu"] = 0;
            storage["avfxl_done"] = getNowFormatDate();
            chrome.extension.sendRequest({greeting: "invest_done"}, function(response) {});
            return;
        }

        display = $('#j_pop_hytq_finish').css('display');
        if(display != 'none')
        {
            //结束
            clearInterval(intervalID);
            storage["haslingqu"] = 0;
            storage["avfxl_done"] = getNowFormatDate();
            chrome.extension.sendRequest({greeting: "invest_done"}, function(response) {});
            return;
        }

        display = $('#j_pop_hytq_touzi').css('display');
        if(display != 'none')
        {
            //结束
            clearInterval(intervalID);
            storage["haslingqu"] = 0;
            storage["avfxl_done"] = getNowFormatDate();
            chrome.extension.sendRequest({greeting: "invest_done"}, function(response) {});
            return;
        }

        clickTagA($(".fix_row").find("td:eq(6)").children().find("a:eq(0)"),"click1");
    }
}

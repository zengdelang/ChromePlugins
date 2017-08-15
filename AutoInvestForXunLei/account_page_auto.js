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
    function check()
    {
        if($('#daysnum').children().length > 0)
        {
            clearInterval(intervalID);
            //clickTagA($('#account_nav').find('a:eq(2)'), "click1");

            count = 0;
            intervalID = setInterval(tryClick,1000);
        }
        else
        {
            ++count;
            if(count > 5)
            {
                clickTagA($('.last').children(),"click11");
                clearInterval(intervalID);
            }
        }
    }

    function tryClick()
    {
        if($('#j_pop_hytq_haslingqu').css("display") == 'none' && $('#j_pop_hytq_lingqu').css("display") == 'none' && $('#j_pop_hytq_touzi').css("display") == 'none')
        {  
            ++count;
            if(count > 6)
            {
                clickTagA($('.last').children(),"click10");
                clearInterval(intervalID);
            }

            clickTagA($('.j_wdtq_btn_linqu'), "click2");
        }  
        else
        {
            if($('#j_pop_hytq_haslingqu').css("display") != 'none')
            {
                //已领取 
                if($('#j_pop_hytq_haslingqu').find('div:eq(1)').find('div:eq(2)').children().text() == "我明白了")
                {
                    clearInterval(intervalID);
                    clickTagA($('.first').children(),"click100");
                    storage["haslingqu"] = 1;
                }
            }

            if($('#j_pop_hytq_lingqu').css("display") != 'none' || $('#j_pop_hytq_touzi').css("display") != 'none')
            {
                //立刻投资
                clearInterval(intervalID);            
                clickTagA($('.first').children(),"click100");
                storage["haslingqu"] = 1;
            }
        }     
    }
}
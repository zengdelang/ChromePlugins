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
            if($('#j_pop_hytq_lingqu').css("display") != 'none' || $('#j_pop_hytq_touzi').css("display") != 'none')
            {
                clearInterval(intervalID);            
                
                var money = null;
                if($('#j_pop_hytq_lingqu').css("display") != 'none')
                {
                    //今天第一次领取的判断要不要投资
                    money = $('.j_pop_hytq_lingqu_shouyi').text();
                }
                else
                {
                    //已领取的判断要不要投资
                    money = $('.j_pop_hytq_touzi_shouyi').text();
                }
                        
                //如果满了4天,2400元,则投标
                if(money == '0.25')
                {
                    storage["invest"] = 1;
                    storage["stopInvest"] = 0;
                }
                else
                {
                    storage["invest"] = 1;
                    storage["stopInvest"] = 1;
                }   
                clickTagA($('.first').children(),"click100");        
            }

            //j_pop_hytq_haslingqu 出现默认投资完成
            //定时查看投资面板是否已经出现
        }     
    }
}
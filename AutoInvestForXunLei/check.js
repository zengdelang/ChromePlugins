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

chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting == "invest_done") {
            storage["avfxl_check_open"] = getNowFormatDate();
        }
    });

var storage = window.localStorage;
if (storage["avfxl_last_open"] == undefined || (Date.parse(new Date()) - storage["avfxl_last_open"]) > 1000 * 60 * 10) {
    storage["avfxl_last_open"] = Date.parse(new Date());
    if (storage["avfxl_check_open"] != getNowFormatDate()) {
        chrome.tabs.create({
            "url": "http://jinrong.xunlei.com/",
            "selected": false
        }, function () {

        });
    }
}

setInterval(function () 
{
    if (storage["avfxl_last_open"] == undefined || (Date.parse(new Date()) - storage["avfxl_last_open"]) > 1000 * 60 * 10) 
    {
        storage["avfxl_last_open"] = Date.parse(new Date());
        if (storage["avfxl_check_open"] != getNowFormatDate()) 
        {
            chrome.tabs.create({
                "url": "http://jinrong.xunlei.com/",
                "selected": false
            }, function () {

            });
        }
    }
}, 1000 * 60 * 10);


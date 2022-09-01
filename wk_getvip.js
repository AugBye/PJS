
/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */
const cookieName = 'wk'
const cookieKey = 'chavy_cookie_wk'
const chavy = init()
const cookieVal = chavy.getdata(cookieKey)

const url = `https://kapi.10010.com/KCard/KCard5GZone/receiveVip`;
const method = `POST`;
const headers = {
'Accept' : `application/json, text/plain, */*`,
'Origin' : `https://txwk.10010.com`,
'Accept-Encoding' : `gzip, deflate, br`,
'Cookie' : cookieVal,
'Content-Type' : `application/x-www-form-urlencoded`,
'Host' : `kapi.10010.com`,
'Connection' : `keep-alive`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.27(0x18001b2f) NetType/WIFI Language/zh_CN`,
'Referer' : `https://txwk.10010.com/`,
'Accept-Language' : `zh-CN,zh-Hans;q=0.9`
};
const body = `vipType=qqyyhh&accountNumber=49211351&channel=wk5g.2`;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
    $done();
}, reason => {
    console.log(reason.error);
    $done();
});

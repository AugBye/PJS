const cookieName = 'xuexi'
const cookieKey = 'chavy_cookie_xuexi'
const chavy = init()
const cookieVal = chavy.getdata(cookieKey)

getsigninfo()
function getsigninfo() {
  let url = {
    url: `https://pc-proxy-api.xuexi.cn/api/score/days/listScoreProgress?sence=score&deviceType=2`,
    headers: {
      Cookie: cookieVal
    }
  }
  url.headers['Host'] = 'pc-proxy-api.xuexi.cn'
  url.headers['Origin'] = 'https://pc.xuexi.cn'
  url.headers['Referer'] = 'https://pc.xuexi.cn/'
  url.headers['Accept'] = 'application/json, text/plain, */*'
  url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'

  chavy.get(url, (error, response, data) => {
  
    var int1 = data.indexOf('totalScore":')+12
    var int2 = data.indexOf(',"taskProgress":[{"displayRuleId":')
    var int3 = data.slice(int1,int2)
    let title = `学习强国`
    let subTitle = `您已完成每日登陆，今日学习积分：${int3}。`
    let detail = ``
    let result = data.indexOf('"每日首次登录积1分。","currentScore":1')
    if (result == -1) subTitle = `每日登陆尚未完成！`
    chavy.msg(title, subTitle, detail)
    chavy.done()
  })
}
function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}

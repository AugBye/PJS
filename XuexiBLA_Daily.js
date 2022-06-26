const cookieName = 'xuexi'
const cookieKey = 'chavy_cookie_xuexi'
const chavy = init()
const cookieVal = chavy.getdata(cookieKey)

getsigninfo()

function sign() {
  let url = {
    url: `https://pc-proxy-api.xuexi.cn/api/score/days/listScoreProgress?sence=score&deviceType=2`,
    headers: {
      Cookie: cookieVal
    }
  }
  url.headers['Origin'] = 'https://pc.xuexi.cn'
  url.headers['Referer'] = 'https://pc.xuexi.cn/'
  url.headers['Accept'] = 'application/json, text/plain, */*'
  url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'

  chavy.get(url, (error, response, data) => {
    let result = JSON.parse(data)
    let title = `${cookieName}`
    // 签到成功
    if (result && result.code == 0) {
      let subTitle = `签到结果: 成功`
      let detail = `本月累计: ${result.data.hadSignDays}/${result.data.allDays}次, 说明: ${result.data.text}`
      chavy.msg(title, subTitle, detail)
    }
    // 签到重复
    else if (result && result.code == 1011040) {
      getsigninfo()
    }
    // 签到失败
    else {
      let subTitle = `签到结果: 失败`
      let detail = `说明: ${result.message}`
      chavy.msg(title, subTitle, detail)
    }
    chavy.log(`${cookieName}, data: ${data}`)
    chavy.done()
  })
}
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
    let title = `${cookieName}`
    let subTitle = `今日已领取强国低保。`
    let detail = ``
    let result = data.indexOf('"每日首次登录积1分。","currentScore":1')
    if (result == -1) subTitle = `未完成强国低保！`
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

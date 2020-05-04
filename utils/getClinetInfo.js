module.exports = (ua) => {
    let agent = ''
    if (/like Mac OS X/.test(ua)) {  
      agent = `iOS${(/CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.'))}`
      agent =`iPhone ${(/iPhone/.test(ua))}`  
      agent = `iPad${/iPad/.test(ua)}`  
    }        
    if (/Android/.test(ua)) {
      agent = `Android ${(/Android ([0-9\.]+)[\);]/.exec(ua)[1])}` 
    }
    if (/webOS\//.test(ua)){
      agent = `webOS ${/webOS\/([0-9\.]+)[\);]/.exec(ua)[1]}`
    }
    if (/(Intel|PPC) Mac OS X/.test(ua)){
      agent = `Mac ${(/(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true)}`
    }
    if (/Windows NT/.test(ua)) {
      agent = `Windows ${(/Windows NT ([0-9\._]+)[\);]/.exec(ua)[1])}`
    }
    if (/PostmanRuntime/.test(ua)) {
      agent = 'Postman'
    }
    return agent
}
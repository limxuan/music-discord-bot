/* eslint-disable no-undef */
class Util {  
    
    static getRandInt (int) {
        return Math.floor(Math.random() * int);
    }
  
  
    static chunk (array, chunkSize){
        const temp = [];
        for(let i = 0; i < array.length; i+= chunkSize){
            temp.push(array.slice(i, i+chunkSize));
        }
        return temp;
    }

    static tn (a,n=1){
      var i = ("     ").repeat(n);
      return a + i.slice(0,i.length-a.length);
    }

    static addZero (a,n=1){
      var i = ("0").repeat(n);
      return i.slice(0,i.length-String(a).length) + String(a);
    }

    static delay (time) {
       return new Promise(function(resolve) { 
           setTimeout(resolve, time)
       });
    }

    static uptime (a) {
    a = parseInt(a);
      var sm = 60,
          sh = sm*60,
          sd = sh*24,
          da = Math.floor(a/sd),
          hr = Math.floor(a%sd/sh),
          mm = Math.floor(a%sh/sm),
          ss = Math.floor(a%sm);
      return `${da>0?da+"d":""} ${hr>0?hr+"hr":""} ${mm>0?mm+"m":""} ${ss>0?ss+"s":a%sm+"s"}`
    }

    static usefulLnk (client){
      const { usefulLink } = require("../bot_setting.json");
      return usefulLink.map(e=>{
        var uri = e.url.includes("{{botId}}") ? e.url.replace(/{{botId}}/g,client.user.id): e.url;
        return `🔹[${e.name}](${uri})`;
      })
    }


    static validURL (str) {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!pattern.test(str);
    }
}

module.exports = Util;
let timePoint = {
  startTime: '2018/11/14 13:00',
  preheatTime: '2018/11/20 13:00',
  firstDay: '2018/11/21 13:00',
  activities: '2018/11/28 13:00',
  lastDay: '2018/11/29 13:00',
}
let imgPic = {
  preheatTime: '/images/black-friday/english-1.png',
  firstDay: '/images/black-friday/english-2.png',
  activities: '/images/black-friday/english-3.png',
  lastDay: '/images/black-friday/english-4.png',
}
let hrefList = {
  preheatTime: '/black-friday-2018?EB-01',
  firstDay: '/black-friday-2018?EB-02',
  activities: '/black-friday-2018?EB-03',
  lastDay: '/black-friday-2018?EB-04',
}

let curHref = window.location.href;
let banner = document.querySelector('.top-banner'),
  header = document.querySelector('.common-header'),
  content = document.querySelector('.content'),
  newFooter = document.querySelector('.newfooter'),
  footer = document.querySelector('.footer'),
  tool = document.querySelector('.slide-tool');
if (curHref.indexOf('black-friday') > -1) {
  banner.style.display = 'none';
  header.style.display = 'none';
  content.style.marginTop = '0';
  newFooter.style.display = 'none';
  footer.style.display = 'none';
  tool.style.display = 'none';
  document.body.scrollTo(0, 0);
  let timer = setInterval(() => {
    let children = document.body.children;
    children = Array.prototype.slice.call(children);
    children.map(child => {
      if (child.children.length && child.children[0].id === 'launcher') {
        child.style.display = 'none';
        setTimeout(() => {
          document.body.scrollTo(0, 0);
        }, 0);
        clearInterval(timer);
        return false;
      }
    })
  }, 100)
} else {
  let curTime = new Date(),
    curTimeStamp = curTime.getTime();
    if (curTimeStamp < getTimeStamp(timePoint.lastDay)) {
      banner.style.display = 'block';
      header.style.top = '80px';
      content.style.marginTop = '160px';
      let wholeTimer = setInterval(() => {
        let curTime = new Date(),
          curTimeStamp = curTime.getTime();
        let a = document.querySelector('.top-banner a'),
          href = a.getAttribute('href'),
          img = document.querySelector('.top-banner img'),
          src = img.getAttribute('src');
        if (curTimeStamp < getTimeStamp(timePoint.preheatTime)) {
          if (src !== imgPic.preheatTime) {
            img.setAttribute('src', imgPic.preheatTime);
          }
          if (href !== hrefList.preheatTime) {
            a.setAttribute('href', hrefList.preheatTime);
          }
        } else if (curTimeStamp < getTimeStamp(timePoint.firstDay)) {
          if (src !== imgPic.firstDay) {
            img.setAttribute('src', imgPic.firstDay);
          }
          if (href !== hrefList.firstDay) {
            a.setAttribute('href', hrefList.firstDay);
          }
        } else if (curTimeStamp < getTimeStamp(timePoint.activities)) {
          if (src !== imgPic.activities) {
            img.setAttribute('src', imgPic.activities);
          }
          if (href !== hrefList.activities) {
            a.setAttribute('href', hrefList.activities);
          }
        } else if (curTimeStamp < getTimeStamp(timePoint.lastDay)) {
          if (src !== imgPic.lastDay) {
            img.setAttribute('src', imgPic.lastDay);
          }
          if (href !== hrefList.lastDay) {
            a.setAttribute('href', hrefList.lastDay);
          }
        } else {
          hide();
          clearInterval(wholeTimer);
        }
      }, 1000)
    }
}

function hide() {
  let banner = document.querySelector('.top-banner'),
    header = document.querySelector('.common-header'),
    content = document.querySelector('.content');
  document.body.removeChild(banner);
  header.style.top = '0px';
  content.style.marginTop = '80px';
}

function timestampToTime(time) {
  var date = new Date(time);
  let Y = date.getFullYear() + '-',
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
    D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ',
    h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':',
    m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return Y + M + D + h + m;
}

function getTimeStamp(time) {
  let date = new Date(time);
  return date.getTime()
}
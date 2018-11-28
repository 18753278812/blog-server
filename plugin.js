// html转义
function unhtml(str) {
  return str ? str.replace(/[<">'&]/g, (a) => {
    return {
      '<': '&lt;',
      '"': '&quot;',
      '>': '&gt;',
      "'": '&#39;',
      '&': '&666;'
    }[a]
  }) : '';
}


// html反转
function enhtml(str) {
  return str ? str.replace(/(&lt;)|(&quot;)|(&gt;)|(&#39;)|(&666;)/g, (a) => {
    return {
      '&lt;': '<',
      '&quot;': '"',
      '&gt;': '>',
      '&#39;': "'",
      '&666;': '&'
    }[a]
  }) : '';
}

module.exports = {
  unhtml,
  enhtml
}
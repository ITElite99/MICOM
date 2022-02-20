function ajax(option) {
    // method, url, data, timeout, success, error
    var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
    var params = parseData(option.data);
    var type = (option.type || 'GET').toUpperCase();
    if (type === 'POST') {
        xhr.open(type, option.url, true);
        //设置表单提交时的内容类型 Content-type数据请求的格式
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(params);
     } else if (type === 'GET') {
        xhr.open(type, option.url + '?' + params, true);
        xhr.send();
     }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200) {
                option.success({
                    data: JSON.parse(xhr.response)
                });
            }else {
                option.error(xhr.status);
            }
        }
    };
    //  设置有效时间
    if (option.timeout) {
        var timer = setTimeout(function () {
            xhr.abort();
            clearTimeout(timer);
        }, option.timeout)
    }
}
   // 将对象转化成用于传输的字符串
function parseData(data) {
    var res = [];
    data.t = new Date().getTime();
    for (var key in data) {
     res.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    return res.join('&');
}


  
   
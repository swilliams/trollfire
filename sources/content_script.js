var input = document.getElementById('input'),
    rootUrl = 'https://raw2.github.com/swilliams/trollfire/master/trollicons',
    trollIconRe = /\[[a-z]+\]/g;

function addIconToInput(icon) {
    input.innerHTML += '[' + icon + ']';
}

function lookupImage(key) {
    var stripped = key.substring(1, key.length - 1);
    var result = trollicons_icons.filter(function(x) {
        return x.key === stripped;
    });
    return result.length === 0 ? null : result[0];
}

function substitute(elem) {
    var html = elem.innerHTML;
    html = html.replace(trollIconRe, function(match) {
        var img = lookupImage(match);
        if (img !== null) {
            var imgSrc = rootUrl + '/' + img.icon;
            return '<img src="' + imgSrc + '" alt="' + match + '" />';
        } 
        return '';
    });
    elem.innerHTML = html;
}

function checkElement(elem) {
    var txt = elem.innerHTML,
        matches = txt.match(trollIconRe);
    if (matches !== null) {
        substitute(elem);
    }
}

function scanWholePage() {
    var results = document.querySelectorAll('.message .body .body');
    for (var idx = 0; idx < results.length; idx++) {
        var elem = results[idx];
        checkElement(elem);
    }
}

function createObserver() {
    var observer = new MutationObserver(function(ms) { 
        ms.forEach(function(m) { 
            var elem = m.addedNodes[0];
            if (elem.nodeType === 1) { //Element
                checkElement(elem);
            }
        }); 
    });
    return observer;
}

window.addEventListener("message", function(event) {
    if (event.data.type && (event.data.type == "trollicon")) {
        addIconToInput(event.data.text);
    }
});

scanWholePage();
var obs = createObserver();
var target = document.getElementById('chat');
var cfg = { childList: true };
obs.observe(target, cfg);

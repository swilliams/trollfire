var tmpl = '<div class="icon $class"><img src="../trollicons/$img" /></div>';
var allTemplates = '';
for (var idx = 0; idx < trollicons_icons.length; idx++) {
    var icon = trollicons_icons[idx].icon,
    mappedTmpl = tmpl.replace('$img', icon).replace('$class', trollicons_icons[idx].key);
    allTemplates += mappedTmpl;
}

var ctr = document.getElementById('container')
ctr.innerHTML = allTemplates;

function sendToCampfire(idx) {
    var icon = trollicons_icons[idx].key;
    chrome.tabs.executeScript({
        code: 'window.postMessage({ type: "trollicon", text: "' + icon + '" }, "*");'
    }, function() {
        window.close();
    });
}

var allIcons = document.getElementsByClassName('icon');

for (var idx = 0; idx < allIcons.length; idx++) {
    var iconTag = allIcons[idx];
    var fn = function() { // closure to let idx not get overwritten by for loop
        var _idx = idx;
        return function() {
            sendToCampfire(_idx);
        }
    }();
    iconTag.onclick = fn;
}

var search = document.getElementById('trollicon-search');

function setStyleForElems(elems, style) {
    for (var idx = 0; idx < elems.length; idx++) {
        var elem = elems[idx];
        elem.style.display = style;
    }
}

function searchChanged(ev) {
    var val = search.value;
    if (val === '') {
        var all = ctr.querySelectorAll('.icon');
        setStyleForElems(all, 'inline-block');
    } else {
        var exclude = '.icon:not([class*=' + val + '])',
            include = '.icon[class*=' + val + ']',
            includeResults = ctr.querySelectorAll(include),
            excludeResults = ctr.querySelectorAll(exclude);
        setStyleForElems(excludeResults, 'none');
        setStyleForElems(includeResults, 'inline-block');
    }
}

search.onkeyup = searchChanged;



var tmpl = '<div class="icon"><img src="../trollicons/$img" /></div>';
    var allTemplates = '';
    for (var idx = 0; idx < trollicons_icons.length; idx++) {
        var icon = trollicons_icons[idx].icon,
        mappedTmpl = tmpl.replace('$img', icon);
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
        var fn = function() {
            var _idx = idx;
            return function() {
                sendToCampfire(_idx);
            }
        }()
        iconTag.onclick = fn;
    }


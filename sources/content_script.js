var input = document.getElementById('input');

function addIconToInput(icon) {
    input.innerHTML += icon;
}
window.addEventListener("message", function(event) {
    if (event.data.type && (event.data.type == "trollicon")) {
        addIconToInput(event.data.text);
    }
});

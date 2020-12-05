class Browser extends Wndw {
    constructor(icon)
    {
        super(icon);
        const i = this;
        var bhtml = '<div class="nav search-bar">\
        <input type="text" spellcheck="false"/>\
        </div>\
        <iframe class="web-area" type="text/html" src="welcome_browser.html"></iframe>';
        this.window.insertAdjacentHTML('beforeend', bhtml);

        /*this.window.children[this.window.children.length - 2].onsubmit = function() {
            console.log("submitting");
            var l = i.window.children[i.window.children.length - 2].children[0].value;
            i.window.children[i.window.children.length - 1].src = l;
        }*/

        this.window.children[this.window.children.length - 2].children[0].addEventListener('pointerover', function() {
            i.window.children[i.window.children.length - 2].children[0].focus();
        });

        this.window.children[this.window.children.length - 1].onchange = function() {
            console.log("changing");
            var l = i.window.children[i.window.children.length - 1].src;
            i.window.children[i.window.children.length - 2].children[0].value = l;
        }

        this.window.children[this.window.children.length - 2].children[0].addEventListener('keypress', function(event) {
            var key = event.key;
            if(key == "Enter")
            {
                //console.log(i.window.children[i.window.children.length - 2]);
                //i.window.children[i.window.children.length - 2].submit();
                console.log("submitting");
                var l = i.window.children[i.window.children.length - 2].children[0].value;
                //i.window.children[i.window.children.length - 1].src = l;
                /*var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    i.window.children[i.window.children.length - 1].innerHTML = this.responseText;
                }
                xhttp.open('GET', l, true);
                //xhttp.setRequestHeader('Content-Type', 'application/json');
                //xhttp.setResponseHeader('Access-Control-Allow-Origin', '*');
                //xhttp.setRequestHeader('Access-Control-Allow-Method', "GET");
                xhttp.send();*/
                var l = i.window.children[i.window.children.length - 2].children[0].value;
                i.window.children[i.window.children.length - 1].src = l;
            }
        });

    }
}
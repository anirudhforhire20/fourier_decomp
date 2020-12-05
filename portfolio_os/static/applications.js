class textFile extends Wndw {
    constructor(icon)
    {
        super(icon);
        const i = this;
        var fhtml = '<div class="search-bar">\
        <div style="width: 95%; height: 100%; position: relative;"></div>\
        <div class="btn-group">\
            <button class="btn save">Save</button>\
            </div>\
        </div>\
        <embed class="web-area" src="file.html" type="text/html">';
        i.window.insertAdjacentHTML('beforeend', fhtml);
    }
}

class textEditor extends Wndw {
    constructor(icon)
    {
        super(icon);
        const i = this;
        var fhtml = '<div class="search-bar">\
        <div style="width: 95%; height: 100%; position: relative;"></div>\
        <div class="btn-group">\
            <button class="btn save">Save</button>\
            </div>\
        </div>\
        <div style="width: 100%; height: 10px; border: 0px; padding: 0px; margin: 0px; position: relative; background-color: white";></div>\
        <div class="text-editor"><p tabindex="0"><span class="text"></span><span class="buffer-bar">.</span></p></div>';
        i.window.insertAdjacentHTML('beforeend', fhtml);

        i.window.children[i.window.children.length - 1].children[0].addEventListener('pointermove', function() {
            if(document.getElementById("homescreen").children[document.getElementById("homescreen").children.length - 1] == i.window)
            {
                //console.log("setting");
                i.window.children[i.window.children.length - 1].children[i.window.children[i.window.children.length - 1].children.length - 1].focus();
                i.focused = true;
                console.log(i.window.children[i.window.children.length - 1].children[i.window.children[i.window.children.length - 1].children.length - 1]);
            }
        });

        i.window.addEventListener('pointermove', function() {
            if(document.getElementById("homescreen").children[document.getElementById("homescreen").children.length - 1] == i.window)
            {
                //console.log("setting");
                i.window.children[i.window.children.length - 1].children[i.window.children[i.window.children.length - 1].children.length - 1].focus();
                i.focused = true;
                console.log(i.window.children[i.window.children.length - 1].children[i.window.children[i.window.children.length - 1].children.length - 1]);
            }
        });

        //DOESN'T WORK
        /*i.window.children[i.window.children.length - 1].children[0].onload = function() {
            console.log("load");
            if(document.getElementById("homescreen").children[document.getElementById("homescreen").children.length - 1] == i.window)
            {
                i.window.children[i.window.children.length - 1].children[0].focus();
                i.focused = true;
                console.log("inside");
            }
        }*/
        i.window.children[i.window.children.length - 1].children[i.window.children[i.window.children.length - 1].children.length - 1].addEventListener('focus', function() {
            console.log("focus");
            //i.focused = false;
        });
        i.window.children[i.window.children.length - 1].children[i.window.children[i.window.children.length - 1].children.length - 1].addEventListener('keydown', function(event) {
            console.log(i.window.children[i.window.children.length - 1].children[i.window.children[i.window.children.length - 1].children.length - 1]);
            if(i.focused == true)
            {
                //console.log("writing");
                var cli = i.window.children[i.window.children.length - 1].children[i.window.children[i.window.children.length - 1].children.length - 1];
                var key = event.key;
                console.log(cli);
                if(key == "Backspace")
                {
                    var input = cli.children[0].innerHTML;
                    //console.log(input);
                    var final_input = input.slice(0, -1);
                    //cli.innerText = "";
                    cli.children[0].innerText = final_input;

                }
                else if(key == "Enter")
                {
                    //console.log(i.window.children[i.window.children.length - 1].children[0])
                    //i.Interpreter.input(cli.children[2].innerText);
                    //i.Interpreter.interpret();
                    cli.children[0].insertAdjacentHTML('beforeend', '<br>');
                    i.window.children[i.window.children.length - 1].children[i.window.children[i.window.children.length - 1].children.length - 1].focus();
                }
                else
                {
                    console.log(cli.children[0], cli);
                    cli.children[0].insertAdjacentText('beforeend', key);
                }
            }
            //console.log(i.focused);
        });
    }
}
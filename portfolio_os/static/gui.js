class icon {
    relpos = {
        x : 0,
        y : 0
    };
    icon;
    window = null;
    hoverover;
    click;
    grab;
    drag;
    type;
    constructor(type, name)
    {
        const i = this;
        i.type = type;
        i.name = name;
        var icon = document.createElement('div');
        var img = document.createElement('img')
        img.setAttribute('src', iconIMG[i.type]);
        img.ondragstart = function() {return false};
        img.style.position = "relative";
        img.style.width = "100%";
        img.style.height = "auto";
        icon.appendChild(img);
        var n = document.createElement('div');
        n.setAttribute('class', 'text-icon');
        n.style.position = "relative";
        n.innerHTML = i.name;
        icon.appendChild(n);
        this.icon = icon;
        if(homescreen.icons.length != 0)
        {
            icon.setAttribute('id', "icon-" + (homescreen.icons.length + 1).toString());
            icon.setAttribute('class', 'icon');
            icon.style.left = parseInt(document.defaultView.getComputedStyle(homescreen.icons[homescreen.icons.length - 1]).left.split('px')[0]).toString() + "px";
            icon.style.top = (parseInt(document.defaultView.getComputedStyle(homescreen.icons[homescreen.icons.length - 1]).top.split('px')[0]) + 80).toString() + "px";
            document.getElementById("homescreen").appendChild(icon);
            homescreen.icons.push(icon);    
        }
        else
        {
            icon.setAttribute('id', "icon-" + (homescreen.icons.length + 1).toString());
            icon.setAttribute('class', 'icon');
            document.getElementById("homescreen").appendChild(icon);
            console.log(icon.style.left, icon.style.top);
            homescreen.icons.push(icon);
        }
        icon.addEventListener('pointerenter', function() {
            i.hoverover = true;
        });
        icon.addEventListener('pointleave', function() {
            i.hoverover = false;
            i.grab = false;
        });
        icon.addEventListener('pointermove', function(event) {
            if(i.grab == true)
            {
                i.drag = true;
                i.icon.style.left = (event.clientX + i.relpos.x).toString() + "px";
                i.icon.style.top = (event.clientY + i.relpos.y).toString() + "px";
            }
        });
        icon.addEventListener('pointerdown', function(event) {
            console.log("pointerdown");
            i.grab = true;
            var l = parseFloat(document.defaultView.getComputedStyle(i.icon).left.split('px')[0]);
            var t = parseFloat(document.defaultView.getComputedStyle(i.icon).top.split('px')[0]);
            var relpos = [l - event.clientX, t - event.clientY];
            i.relpos.x = relpos[0];
            i.relpos.y = relpos[1];
        });
        icon.addEventListener('pointerup', function() {
            console.log("pointerup")
            i.grab = false;
        });
        icon.addEventListener('click', function() {
            if(i.drag != true)
            {
                if(i.window == null)
                {
                    if(i.type == "terminal")
                    {
                        var t = new Terminal(i);
                        t.Interpreter = new Interpreter(t);
                        i.window = t;
                    }
                    else if(i.type == "browser")
                    {
                        var b = new Browser(i);
                        i.window = b;
                    }
                    else if(i.type == "textFile")
                    {
                        var t = new textFile(i);
                        i.window = t;
                    }
                    else if(i.type == "textEditor")
                    {
                        var t = new textEditor(i);
                        i.window = t;
                    }
                    else if(i.type == "Finder")
                    {
                        var f = new Finder(i);
                        i.window = f;
                    }
                    //console.log(i);
                    //var w =  new wnd(i);
                    //i.window = w;
                }
                else
                {
                    document.getElementById("homescreen").appendChild(i.window.window); 
                    //i.window.window.style.transitionDuration = "250ms";
                    setTimeout(function() {
                        i.window.window.style.width = i.window.w;
                        i.window.window.style.height = i.window.h;
                        i.window.window.style.left = i.window.lastpos.x
                        i.window.window.style.top = i.window.lastpos.y;
                        i.window.window.style.opacity = "1";
                    },100);
                    //i.window.window.style.transitionDuration = "0ms";
                    /*if(homescreen.windows.length > 1)
                    {
                        i.window.topstack = true;
                        document.getElementById(i.window.window.id).remove();
                        document.getElementById("homescreen").appendChild(i.window.window);
                        i.window.topstack = false;
                    }*/
                }
            }
            else
            {
                i.drag = false;
            }
        });
            
    }
};

class Wndw {
    div_id;
    relpos = {
        x : 0,
        y : 0
    };
    lastpos = {
        x : "100px",
        y : "100px"
    };
    w = "75%";
    h = "75%";
    icon;
    window;
    grab;
    hoverover;
    topstack = false;
    max = false;
    hide = false;
    maximize = false;
    delete = false;
    constructor(icon)
    {
        const i = this;
        i.icon = icon;
        var window = document.createElement('div');
        var nav = document.createElement('div');
        nav.setAttribute('class', 'nav');
        var btng = document.createElement('div');
        btng.setAttribute('class', 'btn-group');
        var btnex = document.createElement('div');
        btnex.setAttribute('class', 'btn btn-exit');
        var btnhd = document.createElement('div');
        btnhd.setAttribute('class', 'btn btn-hide');
        var btnmx = document.createElement('div');
        btnmx.setAttribute('class', 'btn btn-max');
        btng.appendChild(btnex);
        btng.appendChild(btnhd);
        btng.appendChild(btnmx);
        nav.appendChild(btng);
        window.appendChild(nav);
        this.window = window;
        if(homescreen.windows.length != 0)
        {
            window.setAttribute('id', "window-" + (homescreen.windows.length + 1).toString());
            window.setAttribute('class', 'window');
            document.getElementById("homescreen").appendChild(window);
            //window.style.left = "0%"
            //window.style.top = "40%"
            //console.log(window.style.left, window.style.top);
            window.style.left = "250px";
            window.style.top = "250px";
            window.style.width = "50%";
            window.style.height = "50%";
            window.style.opacity = "1";
            //window.style.transitionDuration = "0s";
            homescreen.windows.push(window);    
        }
        else
        {
            window.setAttribute('id', "window-" + (homescreen.windows.length + 1).toString());
            window.setAttribute('class', 'window');
            document.getElementById("homescreen").appendChild(window);
            //console.log(i.icon.icon.id);
            //window.style.left = "0%";
            //window.style.top = "40%"
            //console.log(window.style.left, window.style.top);
            window.style.left = "250px";
            window.style.top = "250px";
            window.style.width = "50%";
            window.style.height = "50%";
            window.style.opacity = "1";
            //window.style.transitionDuration = "0s";
            homescreen.windows.push(window);
            
        }
        //window.style.transitionDuration = "0ms";
        i.div_id = window.id
        window.addEventListener('pointerenter', function() {
            i.hoverover = true;
        });
        window.addEventListener('pointleave', function() {
            i.hoverover = false;
            i.grab = false;
        });
       nav.addEventListener('pointermove', function(event) {
            if(i.grab == true)
            {
                window.style.transitionDuration = "0ms";
                i.window.style.left = (event.clientX + i.relpos.x).toString() + "px";
                i.window.style.top = (event.clientY + i.relpos.y).toString() + "px";
                i.lastpos.x = (event.clientX + i.relpos.x).toString() + "px";
                i.lastpos.y = (event.clientY + i.relpos.y).toString() + "px";
            }
        });
        nav.addEventListener('pointerdown', function(event) {
            console.log("pointerdown");
            i.grab = true;
            var l = parseInt(document.defaultView.getComputedStyle(i.window).left.split('px')[0]);
            var t = parseInt(document.defaultView.getComputedStyle(i.window).top.split('px')[0]);
            var relpos = [l - event.clientX, t - event.clientY];
            i.relpos.x = relpos[0];
            i.relpos.y = relpos[1];

        });
        window.addEventListener('pointerup', function() {
            console.log("pointerup")
            i.grab = false;
            window.style.transitionDuration = "250ms";
        });
        window.addEventListener('click', async function() {
            document.getElementById("homescreen").appendChild(window);
            if(i.hide == true)
            {
                //window.style.transitionDuration = "250ms";
                setTimeout(function() {
                    window.style.opacity = "0";
                    window.style.width = "0%";
                    window.style.height = "0%";
                    window.style.left = "50vw";
                    window.style.top = "100vh";
                },100);
                //window.style.transitionDuration = "0ms";
                i.hide = false;
            }
            else if(i.maximize == true)
            {
               //window.style.transitionDuration = "250ms";
                setTimeout(function() {
                    if(i.max == false)
                    {
                        window.style.width = "100%";
                        window.style.height = "100%";
                        window.style.left = "0px";
                        window.style.top = "0px";
                        i.max = true;
                    }
                    else
                    {
                        window.style.width = i.w;
                        window.style.height = i.h;
                        window.style.left = i.lastpos.x;
                        window.style.top = i.lastpos.y;
                        i.max = false;
                    }
                },100);
                //window.style.transitionDuration = "0ms";
                i.maximize = false;
            }
            else if(i.delete == true)
            {
                document.getElementById(window.id).remove();
                homescreen.windows.pop(window);
                i.icon.window = null;
            }
        });
        btnex.addEventListener('click', function() {
            i.delete = true;
        });
        btnhd.addEventListener('click', function() {
            i.hide = true;
        });
        btnmx.addEventListener('click', function() {
            i.maximize = true;
        });

    }
    get getWindow()
    {
        return this.window;
    }
    get getLastPos()
    {
        return this.lastpos;
    }
    get getW()
    {
        return this.w;
    }
    get getH()
    {
        return this.h;
    }
};

class Terminal extends Wndw {
    Interpreter = null;
    focused = false;
    location = null;
    constructor(icon)
    {
        super(icon);
        const i = this;
        //this.window.window = this.getWindow;
        //this.window.w = this.getW;
        var html = '<div style="width: 100%; height: 10px; border: 0px; padding: 0px; margin: 0px; position: relative;"></div>\
        <div class="cli">\
            <p tabindex="0"><span class="success">root38467.user:</span>\
                <span class="directory">directory/subdirectory<span class="text">$</span></span>\
                <span class="text"></span><span class="buffer-bar">||</span>\
            </p>\
        </div>';
        //console.log()
        this.window.insertAdjacentHTML('beforeend',html);
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
                if(key == "Backspace")
                {
                    var input = cli.children[2].innerHTML;
                    //console.log(input);
                    var final_input = input.slice(0, -1);
                    //cli.innerText = "";
                    cli.children[2].innerText = final_input;

                }
                else if(key == "Enter")
                {
                    //console.log(i.window.children[i.window.children.length - 1].children[0])
                    i.Interpreter.input(cli.children[2].innerText);
                    i.Interpreter.interpret();
                    i.window.children[i.window.children.length - 1].children[i.window.children[i.window.children.length - 1].children.length - 1].focus();
                }
                else
                {
                    console.log(cli.children[2], cli);
                    cli.children[2].insertAdjacentText('beforeend', key);
                }
            }
            //console.log(i.focused);
        });
    }
    log(logstring)
    {
        const i = this;
        var cli = i.window.children[i.window.children.length - 1].children[i.window.children[i.window.children.length - 1].children.length - 1];
        console.log(cli);
        //i.window.children[i.window.children.length - 1].innerHTML = "";
        var buffer_clone =  cli.children[3].cloneNode(true);
        cli.children[3].remove();
        //console.log(input);
        //var final_input = input.slice(0, -1);
        //cli.innerText = "";
        var prev = '<p class="text">' + cli.innerText + '</p>';
        cli.children[2].innerHTML = "";
        cli.appendChild(buffer_clone);
        i.window.children[i.window.children.length - 1].insertAdjacentHTML('beforeend', prev);
        i.window.children[i.window.children.length - 1].insertAdjacentHTML('beforeend', logstring);
        //i.window.children[i.window.children.length - 1].insertAdjacentHTML('beforeend', '<br>');
        i.window.children[i.window.children.length - 1].insertAdjacentElement('beforeend', cli);
        //cli.children[2].innerText = logstring;
    }
}

var homescreen = {
    icons : [],
    windows : []
};

var iconIMG = {
    "terminal" : "../static/icons/terminal.png",
    "browser" : "../static/icons/browser.png",
    "textFile" : "../static/icons/exefile.png",
    "textEditor" : "../static/icons/textEditor.jpg",
    "Finder" : "../static/icons/folder.webp"
};

/*var icon1 = new icon("terminal");
var icon2 = new icon("browser");
var icon3 = new icon("textFile");
var icon4 = new icon("textEditor");
var icon5 = new icon("Finder");*/
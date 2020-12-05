class Finder extends Wndw {
    address = "home";
    constructor(icon)
    {
        super(icon);
        const i = this;
        var fhtml = '<div class="search-bar">\
        <div style="width: 90%; height: 100%; position: relative;"></div>\
        <!--<div class="btn-group">\
            <button class="btn save">Open</button>\
        </div>-->\
    </div>\
    <div class="finder-window">\
        <div class="navigator"></div>\
        <div class="finder">\
            <ul class="list">\
            </ul>\
        </div>\
    </div>';
        i.window.insertAdjacentHTML('beforeend', fhtml);
        var finder_win = i.window.children[i.window.children.length - 1]
        var finder = finder_win.children[1].children[0];
        function disp_list(path_list)
        {
            console.log("clearing buffer");
            finder.innerHTML = "";
            for(var i in path_list)
            {
                var path = path_list[i];
                console.log(path);
                var item = document.createElement('li')
                item.style.position = "relative";
                if(path.type == "directory")
                {
                    var img = document.createElement('img');
                    img.src = iconIMG['Finder'];
                    img.style.position = "relative";
                    img.setAttribute('class', 'icon');
                    item.appendChild(img);
                    var n = document.createElement('div');
                    n.style.color = "white";
                    n.style.fontWeight = "100px";
                    n.style.position = "relative";
                    n.innerHTML = path.name
                    item.appendChild(n);
                    item.onclick = function() {
                        console.log("item clicked");
                        disp_list(path.contents);
                    }
                }
                else
                {
                    var img = document.createElement('img');
                    img.src = iconIMG['textFile'];
                    img.style.position = "relative";
                    img.setAttribute('class', 'icon');
                    item.appendChild(img);
                    var n = document.createElement('div');
                    n.setAttribute('class', 'icon-text');
                    n.style.color = "white";
                    //n.style.fontWeight = "100px";
                    n.style.position = "relative";
                    n.innerHTML = path.name;
                    item.appendChild(n);
                    item.onclick = function() {
                        setTimeout(function() {
                            console.log("file clicked");
                            var wn = new textFile(null);
                            homescreen.windows.push(wn.windows);
                        },100);
                    }
                }
                finder.appendChild(item);    
            }
        }
        disp_list(disk.contents);
    }
}
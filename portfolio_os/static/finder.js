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
            <div class="list">\
            </div>\
        </div>\
    </div>';
        i.window.insertAdjacentHTML('beforeend', fhtml);
        var finder_win = i.window.children[i.window.children.length - 1]
        var finder = finder_win.children[1].children[0];
        i.loc = {};
        function disp_list(path_list)
        {
            //console.log("clearing buffer");
            finder.innerHTML = "";
            //console.log(path_list);
            for(var j in path_list)
            {
                var path = path_list[j];
                //console.log(path);
                var item = document.createElement('div')
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
                    img.id = path.contents;
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
                    console.log(path.contents);
                    item.appendChild(n);
                    //var wn = new textFile(null, path.contents);
                    //homescreen.windows.push(wn.windows);
                    img.onclick = function() {
                        const img = this;
                        setTimeout(function() {
                            //console.log(img);
                            //console.log(loc);
                            var wn = new textFile(null, img.id);
                            homescreen.windows.push(wn.windows);
                        },100);
                    }
                }
                //console.log(item);
                finder.appendChild(item);   
                //finder.focus(); 
            }
        }
        //console.log(disk[].contents);
        disp_list(disk);
    }
}

var bootScreen = document.getElementById('boot');

setTimeout(function() {
    var item = '<p><span class="text">bootloader initiated... </span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
}, 1000);

setTimeout(function() {
    var item = '<p><span class="text">booting... </span></p><br>';
    bootScreen.insertAdjacentHTML('beforeend', item);
}, 1100);

var p = document.createElement('p');
setTimeout(function() {
    p.innerHTML = '<span class="text">systems check  </span>'
    bootScreen.insertAdjacentElement('beforeend', p);
    //bootScreen.insertAdjacentHTML('beforeend', '<br>');
}, 2200);

setTimeout(function() {
    var item = '<span class="warning">0</span><span class="warning">% </span><span class="loader"></span>';
    p.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 3200);

setTimeout(function() {
    var Id = setInterval(function() {
        var progress_num = parseInt(p.children[1].innerHTML);
        //var progress_bar = p.children[3].innerHTML;
        if(progress_num == 100)
        {
            clearInterval(Id);
        }
        else
        {
            p.children[1].innerHTML = (progress_num + 1).toString();
            if(progress_num % 2 == 0)
            {
                p.children[3].innerHTML += "|";
            }
        }
    }, 10);
}, 3320);

setTimeout(function() {
    var item = '<p><span class="text">system </span></p><br>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 4322);

setTimeout(function() {
    var item = '<span class="success">[OK]</span>';
    //console.log(bootScreen.children);
    bootScreen.children[bootScreen.children.length - 2].insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 4392);

setTimeout(function() {
    var item = '<p><span class="text">status check noose./sda/disk.js   </span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 4412);

setTimeout(function() {
    var item = '<span class="text">status... </span><span class="success">[OK]</span>';
    bootScreen.children[bootScreen.children.length - 2].insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 4465);

setTimeout(function() {
    var item = ' <p><span class="text">status check noose./sda/filesystem.js   </span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 4522);

setTimeout(function() {
    var item = '<span class="text">status... </span><span class="success">[OK]</span>';
    bootScreen.children[bootScreen.children.length - 2].insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 4592);

setTimeout(function() {
    var item = '<p><span class="text">status check noose./root/grub/terminal/terminal_mapper/noose/ns.interpreter/ns.schema.js   </span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5022);

setTimeout(function() {
    var item = '<span class="text">status... </span><span class="success">[OK]</span>';
    bootScreen.children[bootScreen.children.length - 2].insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5092);

setTimeout(function() {
    var item = '<p><span class="text">status check noose./root/grub/terminal/ns.parse/sequence.js   </span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5152);

setTimeout(function() {
    var item = '<span class="text">status... </span><span class="success">[OK]</span>';
    bootScreen.children[bootScreen.children.length - 2].insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5192);

setTimeout(function() {
    var item = '<p><span class="text">status check noose./root/terminal.js   </spam></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5215);

setTimeout(function() {
    var item = '<span class="text">status... </span><span class="success">[OK]</span>';
    bootScreen.children[bootScreen.children.length - 2].insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5262);

setTimeout(function() {
    var item = '<p><span class="text">status check noose./root/finder.js   </span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5352);

setTimeout(function() {
    var item = '<span class="text">status... </span><span class="success">[OK]</span>';
    bootScreen.children[bootScreen.children.length - 2].insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5392);

setTimeout(function() {
    var item = '<p><span class="text">status check noose./root/application.js   </span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5422);

setTimeout(function() {
    var item = '<span class="text">status... </span><span class="success">[OK]</span>';
    bootScreen.children[bootScreen.children.length - 2].insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5472);

setTimeout(function() {
    var item = '<p><span class="text">status check noose./root/browser.js   </span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5499);

setTimeout(function() {
    var item = '<span class="text">status... </span><span class="success">[OK]</span>';
    bootScreen.children[bootScreen.children.length - 2].insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5550);

setTimeout(function() {
    var item = '<p><span class="text">status check noose./root/gui.js   </span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5552);

setTimeout(function() {
    var item = '<span class="text">status... </span><span class="success">[OK]</span>';
    bootScreen.children[bootScreen.children.length - 2].insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5592);

setTimeout(function() {
    var item = '<p><span class="text">status check... </span></p><br>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5629);

setTimeout(function() {
    var item = '<span class="success">[OK]</span>';
    bootScreen.children[bootScreen.children.length - 3].insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5690);

setTimeout(function() {
    var item = '<p><span class="text">loading files... </span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5720);

setTimeout(function() {
    var item = '<p><span class="text">./root/home/feedback.log... </span><span class="success">[DONE]</span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5750);

setTimeout(function() {
    var item = '<p><span class="text">./root/home/simulator.js... </span><span class="success">[DONE]</span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5800);

setTimeout(function() {
    var item = '<p><span class="text">./root/home/vse.htm... </span><span class="success">[DONE]</span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5850);

setTimeout(function() {
    var item = '<p><span class="text">./root/home/pyV.htm... </span><span class="success">[DONE]</span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5900);

setTimeout(function() {
    var item = '<p><span class="text">./root/home/resume.pdf... </span><span class="success">[DONE]</span></p><br>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 5950);

setTimeout(function() {
    var item = '<p><span class="error">[MALFUNCTION DETECTED]</span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 6950);

setTimeout(function() {
    var item = '<p><span class="error">Error: </span><span class="text">spoiled memory 0xff82aa66d981ffe  </span><span class="error">[COMPROMISED]</span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 7050);

setTimeout(function() {
    var item = '<p><span class="error">Error: </span><span class="text"> 0xff82aa66d981ffe 1x031381101f2o998q7g 97x8u293829288cc882vv98c82v29v98vvv298v3987v 98r2rb92849x83742\
    42988a983xc09.9482.018108xx..x.x3982x.x833 7492749383.320742.zxx37493.x347629f387df3746cz43844.4287585</span></p>';
    bootScreen.insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 7420);

setTimeout(function() {
    var item = '<span class="text">\
    0010100101001001010101010010100100101010100101001001010010010101010000101100101010101001010101000101010100101010010001010010100010010100101010010010101010010101001\
    1001010100100101010101010000101101001101010100101010101001001010101010101010101001001010100110101010010101010101001001010100101010101010010100101010100100101010101010101\
    1001010101001010101010010010101001001101001001010100010101010010010101010010101010100101010101010010101010010100101010001010101010100101001010100101010101010011001010101010\
    0101010101001010101001010110100101001010100100101010100101010100100101101001010100101100101010101001010010010101010100100101001100101001010100101001010101010101001011100001\
    00101101001010011010010110101001010101010010100101010101010101001010101001010101001010100101001010011010010010101001010101010101001000100101010010010101010010010010110010100</span>';
    //console.log(bootScreen.children[bootScreen.children.length - 1]);
    bootScreen.children[bootScreen.children.length - 1].insertAdjacentHTML('beforeend', item);
    //console.log(p);
}, 7440);

setTimeout(function() {
    var item = '<p><span class="text">\
    0010100101001001010101010010100100101010100101001001010010010101010000101100101010101001010101000101010100101010010001010010100010010100101010010010101010010101001\
    1001010100100101010101010000101101001101010100101010101001001010101010101010101001001010100110101010010101010101001001010100101010101010010100101010100100101010101010101\
    1001010101001010101010010010101001001101001001010100010101010010010101010010101010100101010101010010101010010100101010001010101010100101001010100101010101010011001010101010\
    0101010101001010101001010110100101001010100100101010100101010100100101101001010100101100101010101001010010010101010100100101001100101001010100101001010101010101001011100001\
    00101101001010011010010110101001010101010010100101010101010101001010101001010101001010100101001010011010010010101001010101010101001000100101010010010101010010010010110010100\
    001010100001010100101000010100010010101000101010010010100100001010001010100101010010010100010010101000101010010101010010100010101010010010100101001010010101010010101011001101\
    0010100101001001010101010010100100101010100101001001010010010101010000101100101010101001010101000101010100101010010001010010100010010100101010010010101010010101001\
    1001010100100101010101010000101101001101010100101010101001001010101010101010101001001010100110101010010101010101001001010100101010101010010100101010100100101010101010101\
    1001010101001010101010010010101001001101001001010100010101010010010101010010101010100101010101010010101010010100101010001010101010100101001010100101010101010011001010101010\
    0101010101001010101001010110100101001010100100101010100101010100100101101001010100101100101010101001010010010101010100100101001100101001010100101001010101010101001011100001\
    00101101001010011010010110101001010101010010100101010101010101001010101001010101001010100101001010011010010010101001010101010101001000100101010010010101010010010010110010100\
    001010100001010100101000010100010010101000101010010010100100001010001010100101010010010100010010101000101010010101010010100010101010010010100101001010010101010010101011001101\
    0010100101001001010101010010100100101010100101001001010010010101010000101100101010101001010101000101010100101010010001010010100010010100101010010010101010010101001\
    1001010100100101010101010000101101001101010100101010101001001010101010101010101001001010100110101010010101010101001001010100101010101010010100101010100100101010101010101\
    1001010101001010101010010010101001001101001001010100010101010010010101010010101010100101010101010010101010010100101010001010101010100101001010100101010101010011001010101010\
    0101010101001010101001010110100101001010100100101010100101010100100101101001010100101100101010101001010010010101010100100101001100101001010100101001010101010101001011100001\
    00101101001010011010010110101001010101010010100101010101010101001010101001010101001010100101001010011010010010101001010101010101001000100101010010010101010010010010110010100\
    001010100001010100101000010100010010101000101010010010100100001010001010100101010010010100010010101000101010010101010010100010101010010010100101001010010101010010101011001101\
    0010100101001001010101010010100100101010100101001001010010010101010000101100101010101001010101000101010100101010010001010010100010010100101010010010101010010101001\
    1001010100100101010101010000101101001101010100101010101001001010101010101010101001001010100110101010010101010101001001010100101010101010010100101010100100101010101010101\
    1001010101001010101010010010101001001101001001010100010101010010010101010010101010100101010101010010101010010100101010001010101010100101001010100101010101010011001010101010\
    0101010101001010101001010110100101001010100100101010100101010100100101101001010100101100101010101001010010010101010100100101001100101001010100101001010101010101001011100001\
    00101101001010011010010110101001010101010010100101010101010101001010101001010101001010100101001010011010010010101001010101010101001000100101010010010101010010010010110010100\
    001010100001010100101000010100010010101000101010010010100100001010001010100101010010010100010010101000101010010101010010100010101010010010100101001010010101010010101011001101\
    0010100101001001010101010010100100101010100101001001010010010101010000101100101010101001010101000101010100101010010001010010100010010100101010010010101010010101001\
    1001010100100101010101010000101101001101010100101010101001001010101010101010101001001010100110101010010101010101001001010100101010101010010100101010100100101010101010101\
    1001010101001010101010010010101001001101001001010100010101010010010101010010101010100101010101010010101010010100101010001010101010100101001010100101010101010011001010101010\
    0101010101001010101001010110100101001010100100101010100101010100100101101001010100101100101010101001010010010101010100100101001100101001010100101001010101010101001011100001\
    00101101001010011010010110101001010101010010100101010101010101001010101001010101001010100101001010011010010010101001010101010101001000100101010010010101010010010010110010100\
    001010100001010100101000010100010010101000101010010010100100001010001010100101010010010100010010101000101010010101010010100010101010010010100101001010010101010010101011001101\
    0010100101001001010101010010100100101010100101001001010010010101010000101100101010101001010101000101010100101010010001010010100010010100101010010010101010010101001\
    1001010100100101010101010000101101001101010100101010101001001010101010101010101001001010100110101010010101010101001001010100101010101010010100101010100100101010101010101\
    1001010101001010101010010010101001001101001001010100010101010010010101010010101010100101010101010010101010010100101010001010101010100101001010100101010101010011001010101010\
    0101010101001010101001010110100101001010100100101010100101010100100101101001010100101100101010101001010010010101010100100101001100101001010100101001010101010101001011100001\
    00101101001010011010010110101001010101010010100101010101010101001010101001010101001010100101001010011010010010101001010101010101001000100101010010010101010010010010110010100\
    001010100001010100101000010100010010101000101010010010100100001010001010100101010010010100010010101000101010010101010010100010101010010010100101001010010101010010101011001101\
    0010100101001001010101010010100100101010100101001001010010010101010000101100101010101001010101000101010100101010010001010010100010010100101010010010101010010101001\
    1001010100100101010101010000101101001101010100101010101001001010101010101010101001001010100110101010010101010101001001010100101010101010010100101010100100101010101010101\
    1001010101001010101010010010101001001101001001010100010101010010010101010010101010100101010101010010101010010100101010001010101010100101001010100101010101010011001010101010\
    0101010101001010101001010110100101001010100100101010100101010100100101101001010100101100101010101001010010010101010100100101001100101001010100101001010101010101001011100001\
    00101101001010011010010110101001010101010010100101010101010101001010101001010101001010100101001010011010010010101001010101010101001000100101010010010101010010010010110010100\
    001010100001010100101000010100010010101000101010010010100100001010001010100101010010010100010010101000101010010101010010100010101010010010100101001010010101010010101011001101</span></p>';
    //console.log(bootScreen.children[bootScreen.children.length - 1]);
    //bootScreen.children[bootScreen.children.length - 1].insertAdjacentHTML('beforeend', item);
    //console.log(p);
    bootScreen.innerHTML = item;
}, 7430);

setTimeout(function() {
    bootScreen.innerHTML = "";
},7500)

setTimeout(function() {
    var item = '<div style="width: 100vw; height: 100vh; background-color: black;">\
    <div class="logo" style="margin-left: 28%; margin-top: 10%;">Noose</div>\
    <div style="background-color: white; width: 0px; height: 2px; margin-left: 28%; margin-top: 2%;"></div>\
</div>';
    bootScreen.innerHTML = item;
},7510)

setTimeout(function() {
    document.styleSheets[1].disabled = true;
    var progress_bar = 1;
    var id = setInterval(function() {
        if(progress_bar == 550)
        {
            clearInterval(id);
        }
        else
        {
            bootScreen.children[0].children[1].style.width = progress_bar.toString() + "px";
        }
        progress_bar += 1;
    }, 10);
},8510);


setTimeout(function() {
    var loadSc = document.createElement('div');
    loadSc.setAttribute('id', 'homescreen');
    loadSc.setAttribute('class', 'homescreen');
    loadSc.style.backgroundImage = 'url(../static/wallpaper/wallpaper1.jpg)';
    loadSc.style.backgroundSize = 'cover';

    var hpanel = document.createElement('div');
    hpanel.setAttribute('id', 'homepanel');
    hpanel.setAttribute('class', 'homepanel');
    var clock = document.createElement('div');
    clock.style.position = "relative";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    setInterval(function() {
        var today = new Date();
        var hour = today.getHours();
        var minute = today.getMinutes();
        if(hour < 10)
        {
            hour = "0" + hour.toString();
        }
        else
        {
            hour = hour.toString();
        }
        if(minute < 10)
        {
            minute = "0" + minute.toString();
        }
        else
        {
            minute = minute.toString();
        }
        clock.innerHTML = months[today.getMonth()] + " " + today.getDate().toString() + " " + hour + ":" + minute
    }, 1000);
    var div1 = document.createElement('div');
    div1.style.width = "33%";
    div1.style.height = "100%";
    div1.style.position = "relative";
    div1.style.display = "flex";
    div1.style.alignItems = "center";
    var div2 = div1.cloneNode(false);
    var div3 = div1.cloneNode(false);
    var cdiv1 = div1.cloneNode();
    div2.appendChild(cdiv1);
    div2.appendChild(clock);
    hpanel.appendChild(div1);
    hpanel.appendChild(div2);
    hpanel.appendChild(div3);
    document.body.appendChild(hpanel);
    document.body.appendChild(loadSc);


    console.log("starting program");
    var icon1 = new icon("terminal", "Terminal");
    var icon2 = new icon("browser", "Browser");
    var icon4 = new icon("textEditor", "feedback.log");
    var icon5 = new icon("Finder", "Finder");
    var icon3 = new icon("textFile", "do not open");
},14000);
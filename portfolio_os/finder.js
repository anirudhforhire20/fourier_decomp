class Finder extends Wndw {
    address = "home";
    constructor(icon)
    {
        super(icon);
        const i = this;
        var fhtml = '<div class="search-bar">\
        <div style="width: 90%; height: 100%; position: relative;"></div>\
        <div class="btn-group">\
            <button class="btn save">Open</button>\
        </div>\
    </div>\
    <div class="finder-window">\
        <div class="navigator"></div>\
        <div class="finder">\
            <ul class="list">\
            </ul>\
        </div>\
    </div>';
        i.window.insertAdjacentHTML('beforeend', fhtml);
    }
}
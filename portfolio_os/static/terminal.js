var Mapper = [
    {
        "keyword": "kernel.exit",
        "type": "execute",
        "command" : function(params, i) {
            var window = i.app;
            var loghtml = '<p>\
            <span class="text">exiting terminal</span>\
            </p>';
            window.log(loghtml);
            setTimeout(function() {
                window.btnex.click();
            }, 300);
        }
    },
    {
        "keyword": "kernal",
        "type" : "class",
        "submap": [
            {
                "keyword": "-v",
                "type": "execute",
                "command": function(params, i) {
                    var window = i.app;
                    var loghtml = '<p>\
                    <span class="text">v0.1.0</span>\
                    </p><br>';
                    window.log(loghtml);
                }
            }
        ]
    },
    {
        "keyword": "system.reboot",
        "type": "execute",
        "command": function(params, i) {
            var loghtml = '<p>\
            <span class="text">rebooting system...</span>\
            </p>';
            i.app.log(loghtml);
            setTimeout(function() {
                window.location.reload();
            }, 300);
        }
    },
    {
        "keyword": "system.info",
        "type": "execute",
        "command": function(params, i) {
            var window = i.app;
            var loghtml = '<p>\
            <span class="text">---System Information---</span><br>\
            <span class="text">Object OS versiom: Noose OOS v0.1.1</span><br>\
            <span class="text">Image machine:' + navigator.appName.toString() + '</span><br>\
            <span class="text">Image version: ' + navigator.appVersion.toString() +'</span></p>';
            window.log(loghtml);
        }
    },
    {
        "keyword": "cd",
        "type": "execute",
        "param": true,
        "command": function(params, i) {
            var words = params.split("/")
            console.log(words);
            const I = i;
            if(true)
            {
                function fs(filemap, words, index=0)
                {
                    if(words[index])
                    {
                        for(var map of filemap)
                        {
                            if(map.name == words[index])
                            {
                                if(map.type == "directory")
                                {
                                    if(words[index + 1])
                                    {
                                        fs(map.contents, words, index + 1);
                                    }
                                    else
                                    {
                                        var dir = "";
                                        for(var i = 0; i <= index; i++)
                                        {
                                            if(i == index)
                                            {
                                                dir += words[i];
                                            }
                                            else
                                            {
                                                dir += words[i] + "/";
                                            }
                                        }
                                        I.app.log("");
                                        I.app.dir = dir;
                                        return 0;
                                    }
                                }
                            }
                        }
                        var loghtml = '<p>\
                        <span class="text">No such directory exists</span>\
                        </p>';
                        I.app.log(loghtml);
                    }
                    else
                    {
                        var loghtml = '<p>\
                        <span class="text">No such directory exists</span>\
                        </p>';
                        I.app.log(loghtml);
                    }
                }
            }
            fs(disk, words, 0);
        }
    }
];

class Interpreter {
    execution_seq = [];
    buffer = "";
    constructor(app)
    {
        this.app = app;
    }
    interpret()
    {
        console.log("interpreting");
        const i = this;
        var words = i.buffer.split(" ");
        function iter(words, submapper, index=0)
        {
            //console.log(words, index)
            if(words[index])
            {
                //console.log(submapper);
                if(submapper.length != 0)
                {
                    for(var map of submapper)
                    {
                        console.log(map);
                        if(map["keyword"] == words[index])
                        {
                            if(map["type"] == "execute")
                            {
                                console.log(words[index + 1]);
                                if("param" in map)
                                {
                                    if(words[index + 1])
                                    {
                                        i.execution_seq.push({"cmd" : map["command"], "param" : words[index + 1]});
                                        return 0;
                                    }
                                    else
                                    {
                                        var loghtml = '<p>\
                                        <span class="text">Missing parameters</span>\
                                        </p>';
                                        i.app.log(loghtml);
                                    }
                                }
                                else
                                {
                                    i.execution_seq.push({"cmd" : map["command"], "param" : null /*words[index + 1].split("--")[1]*/});
                                    return 0;
                                }
                            }
                            else
                            {
                                iter(words, map["submap"], index + 1);
                            }
                        }
                    }
                    var loghtml = '<p>\
                    <span class="text">No such command exists</span>\
                    </p>';
                    i.app.log(loghtml);
                }
                else
                {
                    var loghtml = '<p>\
                    <span class="text">No such command exists</span>\
                    </p>';
                    i.app.log(loghtml);
                }
            }
            else
            {
                var loghtml = '<p>\
                <span class="text">No such command exists</span>\
                </p>';
                i.app.log(loghtml);
            }
        }
        iter(words, Mapper, 0);
    }
    input(inputstring)
    {
        console.log("inputting");
        this.buffer = inputstring;
    }
    execute()
    {
        for(var command of this.execution_seq)
        {
            const i = this;
            command["cmd"](command["param"], i);
        }
        this.execution_seq = [];
    }
};


var Mapper = [];

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
            console.log(words)
            if(words[index])
            {
                console.log(submapper);
                if(submapper.length != 0)
                {
                    for(var map of submapper)
                    {
                        if(map["keyword"] == words[index])
                        {
                            if(map["type"] == "execute")
                            {
                                if(words[index + 1])
                                {
                                    if(/^--/.test(words[index + 1]))
                                    {
                                        i.execution_seq.push({"cmd" : map["command"], "param" : words[index + 1].split("--")[1]});
                                    }
                                }
                            }
                            else
                            {
                                iter(words, map["submap"], index + 1);
                            }
                        }
                    }
                }
                else
                {
                    var loghtml = '<p>\
                    <span class="text">No such command exists</span>\
                    </p><br>';
                    i.app.log(loghtml);
                }
            }
            else
            {
                var loghtml = '<p>\
                <span class="text">No such command exists</span>\
                </p><br>';
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
            command["cmd"](command["param"]);
        }
    }
};


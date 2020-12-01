class dF 
/*This class is an extension of the backend API and contains
methods and classes to render and generate quries for backend.
The purpose of this API extension is to reduce the # of requests and server load*/
{
    constructor(db_name, db_config)
    {
        const dF = this;
        this.db_config = db_config;
        var offset = new XMLHttpRequest();
        offset.open("GET", "/api/offset");
        offset.send();

        class cellStack
            //This class keeps track of changes made to db and generates query batches
            {
                constructor(db_name)
                {
                    class _newStack
                    {
                        constructor()
                        {
                            this.app_stack = [];
                            this.edit_stack = [];
                            this.del_stack = [];
                        }
                    }

                    class _prevStack
                    {
                        constructor()
                        {
                            this.app_stack = [];
                            this.edit_stack = [];
                            this.del_stack = [];
                        } 
                    }

                    const cS = this;
                    cS.stack = [];
                    cS._db_name = db_name;
                    cS._new_stack = new _newStack();
                    cS._prev_stack = new _prevStack();

                    
                }
                
                async load()
                //loads from db
                {
                    const cS = this;
                    var load_req = new XMLHttpRequest();
                    var query_code;
                    for(var i = 0; i < dF.db_config.length; i++)
                    {
                        var data = dF.db_config[i]
                        if(data["name"] == cS._db_name.toString())
                        {
                            var actions = data["actions"];
                            for(var j in actions)
                            {
                                var action = actions[j];
                                if(action["name"] == "read")
                                {
                                    query_code = action["query_code"];
                                }
                            }
                        }
                        
                    }

                    let promise = new Promise(function(resolve,reject) {
                        load_req.onreadystatechange = function() {
                            if(this.readyState == 4 && this.status == 200)
                            {
                                var res = JSON.parse(this.responseText);
                                if (res["read"][0]["data"].length != 0)
                                {
                                    for(var i = 0; i < res["read"][0]["data"].length; i++)
                                    {
                                        cS._prev_stack.app_stack.push(res["read"][0]["data"][i]);
                                        cS.stack.push(res["read"][0]["data"][i]);
                                    }
                                }
                                resolve(res["read"][0]["data"]);
                                //resolve(data);
                            }
                        }
                        load_req.open("POST", "/api");
                        load_req.setRequestHeader("Content-Type", "application/json");
                        load_req.send(JSON.stringify([{
                            "query_code": query_code,
                            "ref_data": [[null]]
                        }]));
                    });
                    return await promise
                    
                }

                append(data)
                //appends new entries to db
                {
                    const cS = this;
                    cS._new_stack.app_stack.push(data);
                    cS.stack.push(data);
                }

                edit(index, new_data)
                //edit data in the stack
                {
                    const cS = this;
                    console.log(cS.stack[index]);
                    if(cS._prev_stack.app_stack.includes(cS.stack[index]))
                    {
                        console.log([cS.stack[index], cS.stack[index][0]]);
                        if(cS._prev_stack.edit_stack.includes([cS.stack[index], cS.stack[index][0]]))
                        {
                            console.log("inside");
                            var _index = cS._prev_stack.edit_stack.indexOf([cS.stack[index], cS.stack[index][0]]);
                            var index_ = cS._prev_stack.app_stack.indexOf(cS.stack[index]);
                            cS._prev_stack.edit_stack[_index] = [new_data, cS.stack[index][0]];
                            //cS._prev_stack.edit_stack[_index][1] = cS.stack[index][0];
                            cS._prev_stack.app_stack[index_] = new_data;
                            cS.stack[index] = new_data;
                        }
                        else
                        {
                            cS._prev_stack.edit_stack.push([new_data, cS.stack[index][0]]);
                            var _index = cS._prev_stack.app_stack.indexOf(cS.stack[index]);
                            cS._prev_stack.app_stack[_index] = new_data;
                            cS.stack[index] = new_data;
                        }
                    }
                    else if(cS._new_stack.app_stack.includes(cS.stack[index]))
                    {
                        if(cS._new_stack.edit_stack.includes(cS.stack[index]))
                        {
                            var _index = cS._new_stack.edit_stack.indexOf(cS.stack[index]);
                            var index_ = cS._new_stack.app_stack.indexOf(cS.stack[index]);
                            cS._new_stack.edit_stack[_index] = new_data;
                            cS._new_stack.app_stack[index_] = new_data;
                            cS.stack[index] = new_data;
                        }
                        else
                        {
                            var index_ = cS._new_stack.app_stack.indexOf(cS.stack[index]);
                            cS._new_stack.app_stack[index_] = new_data;
                            cS._new_stack.edit_stack.push(new_data);
                            cS.stack[index] = new_data;
                        }
                    }
                }

                delete(index)
                //deletes data from stack
                {
                    const cS = this;
                    if(cS._prev_stack.app_stack.includes(cS.stack[index]))
                    {
                        if(cS._prev_stack.edit_stack.length != 0)
                        {
                            for(var i in cS._prev_stack.edit_stack)
                            {
                                if(cS._prev_stack.edit_stack[i].includes(cS.stack[index]))
                                {

                                    cS._prev_stack.app_stack.splice(cS._prev_stack.app_stack.indexOf(cS.stack[index]), 1);
                                    cS._prev_stack.edit_stack.splice(cS._prev_stack.edit_stack.indexOf([cS._prev_stack.edit_stack[i] ,cS.stack[index]]), 1);
                                    cS._prev_stack.del_stack.push(cS.stack[index]);
                                    cS.stack.splice(index, 1);
                                }
                                else
                                {
                                    cS._prev_stack.app_stack.splice(cS._prev_stack.app_stack.indexOf(cS.stack[index]), 1);
                                    cS._prev_stack.del_stack.push(cS.stack[index]);
                                    cS.stack.splice(index, 1);
                                }
                                
                            }
                        }
                        else
                            {
                                cS._prev_stack.app_stack.splice(cS._prev_stack.app_stack.indexOf(cS.stack[index]), 1);
                                cS._prev_stack.del_stack.push(cS.stack[index]);
                                cS.stack.splice(index, 1);
                            }
                    }

                    else if(cS._new_stack.app_stack.includes(cS.stack[index]))
                    {
                        if(cS._new_stack.edit_stack.includes(cS.stack[index]))
                        {
                            cS._new_stack.app_stack.splice(cS._new_stack.app_stack.indexOf(cS.stack[index]), 1);
                            //cS._new_stack.edit_stack.pop(cS.stack[index]);
                            cS._new_stack.del_stack.push(cS.stack[index]);
                            cS.stack.splice(index, 1);
                        }
                        else
                        {
                            cS._new_stack.app_stack.splice(cS._new_stack.app_stack.indexOf(cS.stack[index]), 1);
                            cS._new_stack.del_stack.push(cS.stack[index]);
                            cS.stack.splice(index, 1);
                        }
                    }
                }

                export_csv(link)
                //exports stack to csv
                {
                    const rows = this.stack;
                    let csvContent = "data:text/csv;charset=utf-8,";
                    for(var table of dF.db_config)
                    {
                        if(table["name"] == this._db_name)
                        {
                            csvContent += table["params"] + "\n";
                        }
                    }
                    csvContent += rows.map(e => e.join(",")).join("\n");
                    var encodedUri = encodeURI(csvContent);
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", this._db_name.toString() + "_data.csv");
                }

                async commit()
                //This method generates appropriate queries
                {
                    const cS = this;
                    var queries = [];
                    for(var i = 0; i < dF.db_config.length; i++)
                    {
                        if(cS._db_name.toString() == dF.db_config[i]["name"])
                        {
                            var _data = dF.db_config[i];
                            var actions = _data["actions"];
                            var len = _data["actions"].length;
                            for(var j = 0; j < len; j++)
                            {
                                var action = actions[j];
                                if(action["name"] == "edit")
                                {
                                    var query_code = action["query_code"];
                                    var ref_data = [];
                                    for(var k in cS._prev_stack.edit_stack)
                                    {
                                        var new_data = [];
                                        var edit_st = cS._prev_stack.edit_stack[k][0];
                                        var ref = cS._prev_stack.edit_stack[k][1];
                                        console.log(edit_st, ref);
                                        for(var l in edit_st)
                                        {
                                            new_data.push(edit_st[l]);
                                        }
                                        new_data.push(ref);
                                        console.log(new_data);
                                        ref_data.push(new_data);
                                    }
                                    
                                    for(var data_ in ref_data)
                                    {
                                        queries.push({
                                            "query_code": query_code,
                                            "ref_data": [ref_data[data_]]
                                        });
                                    }
                                }

                                if(action["name"] == "delete")
                                {
                                    var query_code = action["query_code"];
                                    var ref_data = [];
                                    for(var data in cS._prev_stack.del_stack)
                                    {
                                        ref_data.push([cS._prev_stack.del_stack[data][0]]);
                                    }
                                    for(_data in ref_data)
                                    {
                                        queries.push({
                                            "query_code": query_code,
                                            "ref_data": [ref_data[_data]]
                                        });
                                    }
                                }

                                if(action["name"] == "append")
                                {
                                    var query_code = action["query_code"];
                                    var ref_data = [];
                                    for(var data in cS._new_stack.app_stack)
                                    {
                                        ref_data.push(cS._new_stack.app_stack[data]);
                                    }
                                    for(var _data in ref_data)
                                    {
                                        queries.push({
                                            "query_code": query_code,
                                            "ref_data": [ref_data[_data]]
                                        });
                                    }
                                }
                            } 
                        }
                    }
                    let promise = new Promise(function(resolve, reject) {
                        var db_req = new XMLHttpRequest();
                        db_req.onreadystatechange = function() {
                            if(this.status == 200 && this.readyState == 4)
                            {
                                var res = JSON.parse(this.responseText);
                                console.log(res);
                                cS._prev_stack.edit_stack = [];
                                cS._prev_stack.del_stack = [];
                                for(var i in cS._new_stack.app_stack)
                                {
                                    cS._prev_stack.app_stack.push(cS._new_stack.app_stack[i]);
                                }
                                cS._new_stack.app_stack = [];
                                cS._new_stack.edit_stack = [];
                                cS._new_stack.del_stack = [];
                                resolve(cS.stack);
                            }
                        }   
                        db_req.open("POST", "/api");
                        db_req.setRequestHeader("Content-Type", "application/json");
                        db_req.send(JSON.stringify(queries));
                    });

                    return await promise;
                    
                }
            }
            dF.cellStack = new cellStack(db_name);
    }
}


//--------------------------------------------------------------------------------------------------------------
//Renderer methods

function r_load(ob)
//loads data from stack and displays to renderer
{
    var promise = new Promise(function(resolve, reject){
        resolve(ob.cellStack.load());
    });

    promise.then(function(res){
        var content = '';
            if(document.getElementById("table-body").innerHTML == "")
            {
                for(var i in res)
                {
                    var _num = parseInt(i) + 1;
                    content += '<tr id="entry-' + _num.toString() + '">';
                    content += '<th scope="row">' + _num.toString() + '</th>';
                    for(var j in res[i])
                    {
                        var num = parseInt(j) + 1;
                        content += '<td><input class="field" name="df-' + num.toString() + '" type="text" value="' + res[i][j] + '" onchange="Edit(this, ob)"/>' + '</td>';
                    };
                    content += '<th  scope="row"><input id="checkbox-' + _num.toString() + '" class="hidden-checkbox" type="checkbox"/></th>';
                    content += '</tr>';
                }
            }
            else
            {
                var index = document.getElementById("table-body").children.length;
                for(var i in res)
                {
                    var _num = parseInt(i) + index;
                    content += '<tr id="entry-' + _num.toString() + '">';
                    content += '<th scope="row">' + _num.toString() + '</th>';
                    for(var j in res[i])
                    {
                        var num = parseInt(j) + 1;
                        content += '<td><input class="field" name="df-' + num.toString() + '" type="text" value="' + res[i][j] + '" onchange="Edit(this, ob)"/>' + '</td>';
                    }
                    content += '<th  scope="row"><input id="checkbox-' + _num.toString() + '" class="hidden-checkbox" type="checkbox"/></th>';
                    content += '</tr>';
                }
            }

        document.getElementById("table-body").insertAdjacentHTML("beforeend", content);
    });
}

function Add(ob, db_config)
//This method adds new cell
{
    var index = document.getElementById("table-body").children.length + 1;
    var content = '<tr id="entry-' + index.toString() + '">';
    content += '<th scope="row">' + index.toString() + '</th>';
    var table_name = document.getElementById("table-options").value;
    var data = [];
    for(var i in db_config)
    {
        if(db_config[i]["name"] == table_name)
        {
            for(var j in db_config[i]["params"])
            {
                var num = parseInt(j) + 1;
                content += '<td><input class="field" name="df-' + num.toString() +'" onchange="Edit(this, ob)"/></td>';
                data.push(null);
            }
        }
    }
    content += '<th  scope="row"><input id="checkbox-' + index.toString() + '" class="hidden-checkbox" type="checkbox"/></th>';
    content += '</tr>';
    document.getElementById("table-body").insertAdjacentHTML("beforeend", content);
    ob.cellStack.append(data);
}

function Edit(dom_obj, ob)
//This function edits data on the renderer
{
    var node1 = dom_obj.parentElement;
    var node2 = node1.parentElement;

    var id_string = node2.id.slice(6, node2.id.length);
    var index = parseInt(id_string);

    data_list = [];
    for(child of node2.children)
    {
        if(child.nodeName == "TD")
        {
            var inp = child.children[0];
            console.log(inp);
            if(inp.value == "")
            {
                data_list.push(null);
            }
            else
            {
                data_list.push(inp.value);
            }
        }
    }

    ob.cellStack.edit(index - 1, data_list);
}

function Del(ob, dom_obj)
//This function deletes data from renderer
{
    var node1 = dom_obj.parentElement;
    var node2 = node1.parentElement;

    var id_string = node2.id.slice(6, node2.id.toString().length);
    var index = parseInt(id_string);
    console.log(index, id_string);
    console.log(node2);
    node2.remove();
    ob.cellStack.delete(index - 1);

    //RECALCULATING INDEXES
    var content = '';
        for(var i in ob.cellStack.stack)
        {
            var _num = parseInt(i) + 1;
            var res = ob.cellStack.stack;
            content += '<tr id="entry-' + _num.toString() + '">';
            content += '<th scope="row">' + _num.toString() + '</th>';
            for(var j in res[i])
            {
                var num = parseInt(j) + 1;
                content += '<td><input class="field" name="df-' + num.toString() + '" type="text" value="' + res[i][j] + '" onchange="Edit(this, ob)"/>' + '</td>';
            }
            content += '<th  scope="row"><input id="checkbox-' + _num.toString() + '" class="hidden-checkbox" type="checkbox"/></th>';
            content += '</tr>';
        }
        document.getElementById("table-body").innerHTML = content;
}

function ApplyChanges(ob)
//This function applies changes to the stack and db
{
    var promise = new Promise(function(resolve, reject) {
        resolve(ob.cellStack.commit());
    });
    promise.then(function(res) {
        //recalculating indexes
        var content = '';
        for(var i in res)
        {
            var _num = parseInt(i) + 1;
            content += '<tr id="entry-' + _num.toString() + '">';
            content += '<th scope="row">' + _num.toString() + '</th>';
            for(var j in res[i])
            {
                var num = parseInt(j) + 1;
                content += '<td><input class="field" name="df-' + num.toString() + '" type="text" value="' + res[i][j] + '" onchange="Edit(this, ob)"/>' + '</td>';
            }
            content += '<th  scope="row"><input id="checkbox-' + _num.toString() + '" class="hidden-checkbox" type="checkbox"/></th>';
            content += '</tr>';
        }
        document.getElementById("table-body").innerHTML = content;
    });
}

//------------------------------------------------------------------------------------------------------------------
//This part of the script contains renderer methods and init

 
function select_gen(db_config) 
    //This function generates tables select
    //start sequence 1
    {

        var table_select_1 = '\
                    <div id="table-select">\
                        <h1>Select a table</h1>\
                        <select id="table-options" class="form-control-sm">';

                    var options_string = '';
                    for(var i in db_config)
                    {
                        options_string += '<option value="' + db_config[i]["name"] + '">' + db_config[i]["name"] + '</option>';
                        if(db_config[i]["name"] == "base_rate")
                        {
                            options_string += '<option value="' + db_config[i]["name"] + '" selected>' + db_config[i]["name"] + '</option>';
                        }
                    }

                    var table_select_2 = '\
                        </select>\
                    </div>\
                    ';
        
        document.body.insertAdjacentHTML("beforeend", table_select_1 + options_string + table_select_2);
        document.body.insertAdjacentHTML("beforeend", '<div id="table-cont"></div>');
    }

function init_table(ob, db_config)
    //This function creates table layout and data types
    //this function also calls the main stack class
    {
        var table_name = document.getElementById("table-options").value;
        var table = '\
            <div class="container" style="height: 50%; overflow-y: scroll;">\
    \
            <div class="row">\
                <table id="buffer-table" class="table table-striped col">\
                    <thead id="table-head">\
                    </thead>\
        \
                    <tbody id="table-body"></tbody>\
                </table>\
            </div>\
    \
            <div class="row">\
                <div class="col">\
                    <button id="add" type="button" class="btn btn-primary">Add</button>\
                    <button id="load" type="button" class="btn btn-primary">Load</button>\
                </div>\
                <div class="col-4"></div>\
                <div id="anim1" class="btn-group col">\
                    <button id="edit" type="button" class="btn btn-secondary">Edit</button>\
                    <button id="del" type="button" class="btn btn-secondary">Delete</button>\
                    <button id="apply-changes" type="button" class="btn btn-primary">Apply changes</button>\
                </div>\
            </div>\
            <a id="excel" onclick="export_excel(this)">Export excel</a>\
            <a id="csv" onclick="ob.cellStack.export_csv(this)">Export CSV</a>\
        </div>\
\
        <div id="result-calc">\
        <h1>int_period id</h1>\
        <input type="number" id="tranche-id"/>\
        <button id="calc">Calculate</button>\
        </div>\
        ';
        document.getElementById("table-cont").innerHTML = "";
        document.getElementById("table-cont").innerHTML = table;
        document.getElementById("calc").addEventListener("click", function() {
            var _id = document.getElementById("tranche-id").value;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.status == 200 && this.readyState == 4)
                {
                    window.alert(JSON.parse(this.responseText));
                }
            }
            xhttp.open("POST", "/api/calc");
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(_id));
        })
        var thead_content = '<tr>';
        thead_content += '<th scope="col">#</th>';
        for(var i in db_config)
        {
            if(db_config[i]["name"] == table_name)
            {
                for(var j in db_config[i]["params"])
                {
                    thead_content += '<th scope="col">' + db_config[i]["params"][j] + '</th>';
                }
            }
        }
        thead_content += '<th scope="col"></th>';
        thead_content += '</tr>';
        document.getElementById("table-head").innerHTML = thead_content;
        var ob = new dF(table_name, db_config);
        return ob;
    }

function export_excel(link)
{
    var table_export = document.getElementById("buffer-table").innerHTML;
    let excelContent = "data:application/vnd.ms-excel;charset=utf-8," + encodeURIComponent(table_export);
    var encodedUri = encodeURI(excelContent);
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", ob.cellStack._db_name.toString() + "_data.xlsx");
}
var ob;
var promise = new Promise(function(resolve, reject) {
var auth_req = new XMLHttpRequest();
auth_req.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200)
    {
        var res = JSON.parse(this.responseText);
        resolve(res);
    }
}
auth_req.open("POST", "/api/auth");
auth_req.setRequestHeader("Content-Type", "application/json");
auth_req.send();
});
promise.then(function(res) {
    var db_config = res;
    select_gen(db_config);
    ob = init_table(ob, db_config);

    document.getElementById("del").addEventListener("click", function() {
        var check_list = document.getElementsByClassName("hidden-checkbox");
        for(var i in check_list)
        {
            if(check_list[i].checked)
            {
                Del(ob,check_list[i]);
            }
        }
    });
    document.getElementById("load").addEventListener("click", function() {
        r_load(ob);
    });
    document.getElementById("add").addEventListener("click", function() {
        Add(ob, db_config);
    });
    document.getElementById("apply-changes").addEventListener("click", function() {
        ApplyChanges(ob);

    });

    document.getElementById("table-options").addEventListener("change", function() {
        ob = init_table(ob, db_config);
        document.getElementById("del").addEventListener("click", function() {
            var check_list = document.getElementsByClassName("hidden-checkbox");
            for(var i in check_list)
            {
                if(check_list[i].checked)
                {
                    Del(ob,check_list[i]);
                }
            }
        });
        document.getElementById("load").addEventListener("click", function() {
            r_load(ob);
        });
        document.getElementById("add").addEventListener("click", function() {
            Add(ob, db_config);
        });
        document.getElementById("apply-changes").addEventListener("click", function() {
            ApplyChanges(ob);
        });
    });
});
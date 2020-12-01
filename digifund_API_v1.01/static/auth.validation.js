function signup(form)
{

    document.getElementById("fname-err").innerHTML = "";
    document.getElementById("lname-err").innerHTML = "";
    document.getElementById("email-err").innerHTML = "";
    document.getElementById("uname-err").innerHTML = "";
    document.getElementById("password-confirm-err").innerHTML = "";
    document.getElementById("password-err").innerHTML = "";


    if(form["fname"].value == "")
    {
        document.getElementById("fname-err").innerHTML = "This field cannot be empty";
        document.getElementById("fname-err").hidden = false;
        return false;
    }
    if(form["fname"].value.length > 20)
    {
        document.getElementById("fname-err").innerHTML = "This field can only be 20 characters long";
        document.getElementById("fname-err").hidden = false;
        return false;
    }
    if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/.test(form["fname"].value))
    {
        document.getElementById("fname-err").innerHTML = "Improper field format";
        document.getElementById("fname-err").hidden = false;
        return false;
    }


    if(form["lname"].value == "")
    {
        document.getElementById("lname-err").innerHTML = "This field cannot be empty";
        document.getElementById("lname-err").hidden = false;
        return false;
    }
    if(form["lname"].value.length > 20)
    {
        document.getElementById("lname-err").innerHTML = "This field can only be 20 characters long";
        document.getElementById("lname-err").hidden = false;
        return false;
    }
    if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/.test(form["lname"].value))
    {
        document.getElementById("lname-err").innerHTML = "Improper field format";
        document.getElementById("lname-err").hidden = false;
        return false;
    }


    if(form["email"].value == "")
    {
        document.getElementById("email-err").innerHTML = "This field cannot be empty";
        document.getElementById("email-err").hidden = false;
        return false;
    }
    /*if(form["email"].value.length > 20)
    {
        document.getElementById("email-err").innerHTML = "This field can only be 20 characters long";
        document.getElementById("email-err").hidden = false;
        return false;
    }*/
    if(/[ `!#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/.test(form["email"].value))
    {
        document.getElementById("email-err").innerHTML = "Improper field format";
        document.getElementById("email-err").hidden = false;
        return false;
    }


    if(form["uname"].value.length > 20)
    {
        document.getElementById("uname-err").innerHTML = "This field can only be between 8 to 20 characters";
        document.getElementById("uname-err").hidden = false;
        return false;
    }
    if(/[ `!#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/.test(form["uname"].value))
    {
        document.getElementById("uname-err").innerHTML = "Improper field format";
        document.getElementById("uname-err").hidden = false;
        return false;
    }


    if(form["password"].value == "")
    {
        document.getElementById("password-err").innerHTML = "This field cannot be empty";
        document.getElementById("password-err").hidden = false;
        return false;
    }
    if(form["password"].value.length > 20 || form["password"].value.length < 8)
    {
        document.getElementById("password-err").innerHTML = "This field can only be between 8 to 20 characters";
        document.getElementById("password-err").hidden = false;
        return false;
    }
    if(/[ `$%^&*()+\=\[\]{};':"\\|,<>\/?~]/.test(form["password"].value))
    {
        document.getElementById("password-err").innerHTML = "Improper field format";
        document.getElementById("password-err").hidden = false;
        return false;
    }


    if(form["password-confirm"].value != form["password"].value)
    {
        document.getElementById("password-confirm-err").innerHTML = "Passwords do not match";
        document.getElementById("password-confirm-err").hidden = false;
        return false;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200)
        {
            var res = JSON.parse(this.responseText);
            if(res["email"] == true)
            {
                document.getElementById("email-err").innerHTML = "This email already exists";
            }
            if(res["uname"] == true)
            {
                document.getElementById("uname-err").innerHTML = "This username already exists";
            }
            if(res["email"] == false && res["uname"] == false)
            {
                console.log("form is being submitted");
                form.submit();
            }
        }
    }

    xhttp.open("POST", "/checkuser");
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify({"email": form["email"].value, "uname": form["uname"].value}));
}

function login(form)
{
    if(form["uname"].value == "")
    {
        document.getElementById("uname-err").innerHTML = "This field cannot be empty";
        document.getElementById("uname-err").hidden = false;
        return false;
    }
    /*if(form["uname"].value.length > 20 || form["uname"].value.length < 5)
    {
        document.getElementById("uname-err").innerHTML = "This field can only be between 8 to 20 characters";
        document.getElementById("uname-err").hidden = false;
        return false;
    }*/
    if(/[ `!#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/.test(form["uname"].value))
    {
        document.getElementById("uname-err").innerHTML = "Improper field format";
        document.getElementById("uname-err").hidden = false;
        return false;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200)
        {
            var res = JSON.parse(this.responseText);
            if(res == 404 || res == 401)
            {
                document.getElementById("uname-err").innerHTML = "Incorrect email/username or password";
            }
            else
            {
                form.submit();
            }
        }
    }

        xhttp.open("POST", "/login");
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify({"uname": form["uname"].value, "password": form["password"].value}));
}

function email_auth(form)
        {
            var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200)
            {
                var res = JSON.parse(this.responseText);
                if(res == 404)
                {
                    document.getElementById("auth-err").innerHTML = "The code you entered is incorrect";
                }
                else{
                    window.location.href = res;
                }
            }
        }
        xhttp.open("POST", "/authentication");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({
            "auth_code": form["auth-code"].value
        }));
        }

        function resend() { location.reload(); }


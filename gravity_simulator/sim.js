var b1 = new freeBody;
b1.mass = 2;
b1.radius = 20;
b1.transform.position = {
    x : 200,
    y : 500
};

var b4 = new freeBody;
b4.mass = 1;
b4.radius = 10;
b4.transform.position = {
    x : 100,
    y : 300
};

var b2 = new freeBody;
b2.mass = 2;
b2.radius = 20;
b2.transform.position = {
    x : 300,
    y : 300
};

var b3 = new freeBody;
b3.mass = 50;
b3.radius = 50;
b3.transform.position = {
    x : 500,
    y : 200
};

var b5 = new freeBody;
b5.mass = 1;
b5.radius = 10;
b5.transform.position = {
    x : 100,
    y : 200
};

b1.create();
b2.create();
b3.create();
b4.create();
b5.create();


PhyxEngine.Time.runTime = 98000;
PhyxEngine.Forces.gForce.GConst = 10;
PhyxEngine.Forces.emForce.emConst = 2;
PhyxEngine.Space.scale = 1;
PhyxEngine.Renderer.Start();
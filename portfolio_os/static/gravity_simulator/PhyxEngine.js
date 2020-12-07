//Phyx Simulator v0.1
//A 2d free-body classical mechanics simulator
//This physics simulator simulates an N-body scenario where initial conditions are given

class freeBody {
    //This class contains all properties and methods
    //for the free body
    mass = 1;
    radius = 1;
    //radius is used to make a spherical approximation
    elasticity = 1;
    coefficientFriction = 0.5;
    //For electromagnetic phenomenon
    transform = {
        position : {
            x : 0,
            y : 0
        },
        rotation : {
            z : 0
        //Net force in the x-y plane cause net Torque along the z-axis
        }
    };
    velocity = {
        x : 0,
        y : 0
    };
    netForce = {
        x : 0,
        y : 0
    };
    create()
    {
        PhyxEngine.Renderer.bodies.push(this);
    }
}

var PhyxEngine = {
    Forces : {
        gForce : {
            GConst : 1,
            magnitude : function(body, fbody) {
                if(fbody == body)
                {
                    console.log("Cannot calculate force for singular body");
                }
                else
                {
                    var pos = body.transform.position;
                    var fpos = fbody.transform.position;
                    var mag = Math.sqrt(Math.pow(fpos.x - pos.x, 2) + Math.pow(fpos.y - pos.y, 2));
                    if(mag > 0)
                    {
                        var unitVector = [(fpos.x - pos.x)/mag, (fpos.y - pos.y)/mag];
                        var forceMag = PhyxEngine.Forces.gForce.GConst*body.mass*fbody.mass/Math.pow(mag, 2);
                        var force = {
                            x : forceMag*unitVector[0],
                            y : forceMag*unitVector[1]
                        };
                        return force;
                    }
                    else
                    {
                        //console.log("inside");
                        return {
                            x : 0,
                            y : 0
                        };
                    }
                }
            }
        },
        emForce : {
            emConst : 1,
            emEffectMargin : 0,
            magnitude : function(body, fbody) {
                if(fbody == body)
                {
                    console.log("Cannot calculate force for singular body");
                }
                else
                {
                    var pos = body.transform.position;
                    var fpos = fbody.transform.position;
                    var dist = Math.sqrt(Math.pow(fpos.x - pos.x, 2) + Math.pow(fpos.y - pos.y, 2));
                    //console.log(dist, body.radius + fbody.radius);
                    if(dist <= (body.radius + fbody.radius))
                    {
                        //console.log(dist, body.radius + fbody.radius);
                        //console.log(dist, pos);
                        //console.log("collision detected");
                        //Calculation of this force is only possible through Newton's second law
                        //Electromagnetism is responsible to tangential and normal forces
                        //maximum normak force
                        var force = Math.exp(PhyxEngine.Forces.emForce.emConst*(body.radius + fbody.radius - dist));
                        return {
                            force : {
                                x : PhyxEngine.Forces.gForce.magnitude(fbody, body).x*force,
                                y : PhyxEngine.Forces.gForce.magnitude(fbody, body).y*force
                            },
                            velocity : {
                                x : 0,
                                y : 0
                            }
                        };
                    }
                    else
                    {

                        return {
                            force : {
                                x : 0,
                                y : 0
                            },
                            velocity : {
                                x : 0,
                                y : 0
                            }
                        };
                    }
                }
            }
        }
    },
    Space : {
        maxAllowedX : 1280,
        maxAllowedY : 700,
        maxAllowedScale : 10,
        minAllowedScale : 1,
        scale : 1
    },
    Time : {
        timeDelta : 1,
        time : 0,
        runTime : 0,
        maxRunTime : 98000,
        minTimeDelta : 1,
        maxTimeDelta : 1000
    },
    Renderer : {
        canvas : {
            position : {
                x : 0,
                y : 0
            },
            mouseDown: true,
            mouseMove: false,
            canvas : null
        },
        bodies : [],
        frameCount : 1,
        Start : function() {
            /*for(pkey in PhyxEngine)
            {
                for(ckey in PhyxEngine[pkey])
                {
                    if(PhyxEngine[pkey][ckey] === null || PhyxEngine[pkey][ckey] <= 0)
                    {
                        //Program will not start with bad values
                        console.log("Null key error: PhyxEngine." + pkey + "." + ckey + " cannot be null or negative");
                        console.log("Terminating program...");
                        return -1;
                    }
                }
            }*/
            console.log("Creating world");
            var canvas = document.createElement("canvas");
            canvas.width = "1280";
            canvas.height = "700";
            canvas.style.backgroundColor = "grey";
            PhyxEngine.Renderer.canvas.canvas = canvas;
            canvas.onmousemove = function(event) {
                PhyxEngine.Renderer.canvas.mouseMove = true;
                PhyxEngine.Renderer.canvas.position.x = event.clientX;
                PhyxEngine.Renderer.canvas.position.y = event.clientY;
            }
            canvas.onmousedown = function(event) {
                var obj = new freeBody;
                obj.create();
                var X = 0;
                var Y = 0;
                var id = setInterval(function() {
                    if(PhyxEngine.Renderer.canvas.mouseDown == false)
                    {
                        //obj.velocity.x = X;
                        //obj.velocity.y = Y;
                        PhyxEngine.Renderer.canvas.mouseDown = true;
                        clearInterval(id);
                    }
                    else
                    {
                        //X = (event.clientX - PhyxEngine.Renderer.canvas.position.x)/(0.001);
                        //Y = (event.clientY - PhyxEngine.Renderer.canvas.position.y)/(0.001);
                        obj.transform.position = PhyxEngine.Renderer.canvas.position;
                        obj.mass += 0.1;
                        obj.radius += 0.1;
                    }
                }, 1);
            }
            canvas.onmouseup = function() {
                PhyxEngine.Renderer.canvas.mouseMove = false;
                PhyxEngine.Renderer.canvas.mouseDown = false;
            }
            document.body.appendChild(canvas);
            console.log("World Created");

            var refreshId = setInterval(function() {
                if((PhyxEngine.Time.timeDelta/1000)*PhyxEngine.Renderer.frameCount >= PhyxEngine.Time.runTime)
                {
                    console.log("Simulation Finished");
                    clearInterval(refreshId);
                }
                else
                {
                    var ctx = canvas.getContext('2d');
                    //Clearing buffer
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    //Declaring variable buffer
                    var variableBuffer =[];
                    if(PhyxEngine.Renderer.bodies != [])
                    {
                        for(body of PhyxEngine.Renderer.bodies)
                        {
                            //Performing all forces and torque calculations
                            //emForce.magnitude() sets velocity according to elasticity
                            var netForce = {
                                x : 0,
                                y : 0
                            };
                            var netV = {
                                x : 0,
                                y : 0
                            };
                            if(PhyxEngine.Renderer.bodies.length > 1)
                            {
                                for(fbody of PhyxEngine.Renderer.bodies)
                                {
                                    if(body != fbody)
                                    {
                                        var gforce = PhyxEngine.Forces.gForce.magnitude(body, fbody);
                                        var emforce = PhyxEngine.Forces.emForce.magnitude(body, fbody);
                                        //console.log(emforce.force);
                                        //emForce sets velocity according t;\o elasticity
                                        netForce.x += gforce.x + emforce.force.x;
                                        netForce.y += gforce.y + emforce.force.y;
                                        netV.x += emforce.velocity.x;
                                        netV.y += emforce.velocity.y;
                                    }
                                }
                            }
                            //var emag = Math.sqrt(Math.pow(emforce.force.x, 2) + Math.pow(emforce.force.y, 2));
                            //var gmag = Math.sqrt(Math.pow(gforce.x, 2) + Math.pow(gforce.y, 2));
                            //var mag = Math.sqrt(Math.pow(netForce.x, 2) + Math.pow(netForce.y, 2));
                            //console.log(emag, gmag);
                            var lenScale = PhyxEngine.Space.scale*10;
                            var accel = {
                                x : netForce.x/body.mass,
                                y : netForce.y/body.mass
                            };
                            var velX = accel.x*PhyxEngine.Time.timeDelta/1000 + body.velocity.x + netV.x;
                            var velY = accel.y*PhyxEngine.Time.timeDelta/1000 + body.velocity.y + netV.y;
                            variableBuffer.push({
                                object : body,
                                velocity : {
                                    x : velX,
                                    y : velY
                                },
                                position : {
                                    x : body.transform.position.x + velX + 0.5*accel.x*Math.pow(PhyxEngine.Time.timeDelta/1000, 2),
                                    y : body.transform.position.y + velY + 0.5*accel.y*Math.pow(PhyxEngine.Time.timeDelta/1000, 2)
                                },
                                netForce : netForce
                            });
                            //body.velocity.x += accel.x*PhyxEngine.Time.timeDelta/1000;
                            //body.velocity.y += accel.y*PhyxEngine.Time.timeDelta/1000;
                            /*body.transform.position = {
                                x : body.transform.position.x + body.velocity.x*PhyxEngine.Time.timeDelta/1000 + 0.5*accel.x*Math.pow(PhyxEngine.Time.timeDelta/1000, 2),
                                y : body.transform.position.y + body.velocity.y*PhyxEngine.Time.timeDelta/1000 + 0.5*accel.y*Math.pow(PhyxEngine.Time.timeDelta/1000, 2)
                            };*/
                        }
                        for(variable of variableBuffer)
                        {
                            //Updating simulation state
                            var body = variable.object;
                            body.velocity = variable.velocity;
                            body.transform.position = variable.position;
                            body.netForce = variable.netForce;
                            //console.log(body.netForce);

                            //Rendering the objects to canvas
                            ctx.beginPath();
                            ctx.fillStyle = "white";
                            var pos = body.transform.position;
                            ctx.arc(pos.x, pos.y, body.radius, 0, 2*Math.PI);
                            ctx.fill();
                        }
                        ctx.closePath();

                        //Incrementing time and frame count
                        PhyxEngine.Time.time += PhyxEngine.Time.timeDelta;
                        PhyxEngine.Renderer.frameCount += 1;
                    }
                }
            }, PhyxEngine.Time.timeDelta); 
        }
    }
}

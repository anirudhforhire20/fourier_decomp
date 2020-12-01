//Phyx Simulator v0.1
//A 2d free-body classical mechanics simulator
//This physics simulator simulates an N-body scenario where initial conditions are given

class freeBody {
    //This class contains all properties and methods
    //for the free body
    mass = 1;
    radius = 1;
    //radius is used to make a spherical approximation
    elasticity = 0;
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
                    if(dist <= body.radius + fbody.radius)
                    {
                        //console.log("collision detected");
                        //Calculation of this force is only possible through Newton's second law
                        //Electromagnetism is responsible to tangential and normal forces
                        //maximum normak force

                        var normV = [pos.x - fpos.x, pos.y - fpos.y];
                        var dot = normV[0]*body.velocity.x + normV[1]*body.velocity.y;
                        var vmag = Math.sqrt(Math.pow(body.velocity.x, 2) + Math.pow(body.velocity.y, 2));
                        var nmag = Math.sqrt(Math.pow(normV[0], 2) + Math.pow(normV[1], 2));
                        var ang = dot/(vmag*nmag);
                        var projectMag = Math.sqrt(Math.pow(body.velocity.x, 2) + Math.pow(body.velocity.y, 2))*Math.sin(Math.acos(ang));
                        var projectV = {
                            x : -projectMag*normV[0]/Math.sqrt(Math.pow(normV[0], 2) + Math.pow(normV[1], 2)),
                            y : -projectMag*normV[1]/Math.sqrt(Math.pow(normV[0], 2) + Math.pow(normV[1], 2))
                        };
                        var fdot = -normV[0]*fbody.velocity.x + -normV[1]*fbody.velocity.y;
                        var fvmag = Math.sqrt(Math.pow(fbody.velocity.x, 2) + Math.pow(fbody.velocity.y, 2));
                        var fang = fdot/(fvmag*nmag);
                        var fprojectMag = Math.sqrt(Math.pow(body.velocity.x, 2) + Math.pow(body.velocity.y, 2))*Math.sin(Math.acos(fang));
                        var fprojectV = {
                            x : fprojectMag*normV[0]/Math.sqrt(Math.pow(normV[0], 2) + Math.pow(normV[1], 2)),
                            y : fprojectMag*normV[1]/Math.sqrt(Math.pow(normV[0], 2) + Math.pow(normV[1], 2))
                        };

                        var P = body.mass*projectMag + fbody.mass*fprojectMag;
                        var A = (fbody.mass*fbody.mass/body.mass) + fbody.mass;
                        var B = 2*fbody.mass*P/body.mass;
                        var Phi = body.elasticity;
                        //console.log(projectV, fprojectV, fang, ang);
                        
                        var projectVFM = (B + Math.sqrt(B*B + 4*A*Phi))/(2*A);
                        var projectNVF = {
                            x : body.velocity.x - projectV.x, 
                            y : body.velocity.y - projectV.y
                        };
                        var projectVF = {
                            x : normV[0]*projectVFM,
                            y : normV[1]*projectVFM
                        };

                        var VNet = {
                            x : projectVF.x + projectNVF.x,
                            y : projectVF.y + projectNVF.y
                        };

                        var force = {
                            x : 1*body.mass*(VNet.x - body.velocity.x)/(PhyxEngine.Time.timeDelta),
                            y : 1*body.mass*(VNet.y - body.velocity.y)/(PhyxEngine.Time.timeDelta)
                        };

                        console.log(force);

                        return {
                            force : force,
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
                        for(fbody of PhyxEngine.Renderer.bodies)
                        {
                            if(body != fbody)
                            {
                                var gforce = PhyxEngine.Forces.gForce.magnitude(body, fbody);
                                var emforce = PhyxEngine.Forces.emForce.magnitude(body, fbody);
                                //emForce sets velocity according t;\o elasticity
                                netForce.x += gforce.x + emforce.force.x;
                                netForce.y += gforce.y + emforce.force.y;
                                netV.x += emforce.velocity.x;
                                netV.y += emforce.velocity.y;
                            }
                        }
                        var emag = Math.sqrt(Math.pow(emforce.force.x, 2) + Math.pow(emforce.force.y, 2));
                        var gmag = Math.sqrt(Math.pow(gforce.x, 2) + Math.pow(gforce.y, 2));
                        var mag = Math.sqrt(Math.pow(netForce.x, 2) + Math.pow(netForce.y, 2));
                        //console.log(emag, gmag);
                        var lenScale = PhyxEngine.Space.scale*10;
                        var accel = {
                            x : lenScale*netForce.x/body.mass,
                            y : lenScale*netForce.y/body.mass
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
            }, PhyxEngine.Time.timeDelta); 
        }
    }
}

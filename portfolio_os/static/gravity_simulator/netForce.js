var buffer = [];

setInterval(function() {
    for(body of PhyxEngine.Rederer.bodies)
    {
        if(buffer == [])
        {
            buffer.push({
                body : body,
                velocity : body.velocity
            });
        }
        else
        {
            var v1 = body.velocity;
            for(pbody of buffer)
            {
                if(pbody == body)
                {
                    var v2 = pbody.velocity;
                    var deltaV = {
                        x : v1.x - v2.x,
                        y : v1.y - v2.y
                    };
                    var netForce = {
                        x : body.mass*deltaV.x/PhyxEngine.Time.timeDelta,
                        y : body.mass*deltaV.y/PhyxEngine.Time.timeDelta
                    };
                    body.netForce = netForce;
                    pbody.velocity = v1;
                }
            }
        }
    }
}, PhyxEngine.Time.timeDelta);
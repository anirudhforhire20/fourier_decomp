from renderer import Renderer
from objects import * 

vector1 = Vector2(-1,1)
vector2 = Vector2(4,1) + vector1*3
vector3 = Vector2(3,2.5)

renderer = Renderer(1000, 500, 1)
renderer.draw(vector1, Coordinate2(4,3))
renderer.draw(vector2)
renderer.draw(vector3, Coordinate2(2.3,-4.5))
#print(renderer.objects)
renderer.render()


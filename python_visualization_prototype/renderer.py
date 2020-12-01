from objects import Coordinate2, Vector2
from graphics import *

class Renderer:
    def __init__(self,width, height, scale):
        self.width = width
        self.height = height
        self.scale = scale
        self.objects = []
    def draw(self, Object, coordinate=Coordinate2(0,0)):
        self.objects.append([Object, coordinate])
    def render(self):
        def main():
            win = GraphWin("Visualize", self.width, self.height)
            win.setCoords(0,0,self.width, self.height)
            centerX = self.width/2
            centerY = self.height/2
            Scale = self.scale*50
            win.setBackground("black")
            for j in range(self.height//Scale):
                axisX = Line(Point(0, 0 + j*Scale), Point(self.width, 0 + j*Scale))
                axisX.setWidth(1)
                axisX.setFill("grey")
                axisX.draw(win)
            for j in range(self.width//Scale):
                axisY = Line(Point(0 + j*Scale, 0), Point(0 + j*Scale, self.height))
                axisY.setWidth(1)
                axisY.setFill("grey")
                axisY.draw(win)
            
            for Object in self.objects:
                if type(Object[0]) == Coordinate2:
                    center = Coordinate2(centerX, centerY)
                    point = Object[0]*Scale + center
                    c = Circle(Point(point.x, point.y), 2)
                    c.setFill("white")
                    c.draw(win)
                elif type(Object[0]) == Vector2:
                    center = Vector2(centerX, centerY)
                    coordinate = Object[1]*Scale + Coordinate2(center.x, center.y)
                    vector = Object[0]*Scale
                    startvec = Vector2(coordinate.x, coordinate.y)
                    endvec = startvec + vector
                    aLine = Line(Point(startvec.x, startvec.y), Point(endvec.x, endvec.y))
                    aLine.setArrow("last")
                    aLine.setWidth(1)
                    aLine.setOutline("white")
                    aLine.setFill("white")
                    aLine.draw(win)
            win.getMouse()
            win.close()
            
        main()
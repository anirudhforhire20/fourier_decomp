"""This script is a collection of all custom objects and operators"""
import math

class Coordinate3:
    def __init__(self, x:float, y:float, z:float):
        self.x = x
        self.y = y
        self.z = z
    
    def __add__(self, c):
        return Coordinate3(self.x + c.x, self.y + c.y, self.z + c.z)
    def __sub__(self, c):
        return Coordinate3(self.x - c.x, self.y - c.y, self.z - c.z)


class Coordinate2:
    def __init__(self, x:float, y:float):
        self.x = x
        self.y = y
    
    def __add__(self, c):
        return Coordinate2(self.x + c.x, self.y + c.y)

    def __sub__(self, c):
        return Coordinate2(self.x - c.x, self.y - c.y)

    def __mul__(self, c):
        return Coordinate2(self.x*c, self.y*c)

class Vector3:
    def __init__(self, x:float, y:float, z:float):
        self.x = x
        self.y = y
        self.z = z


    def __add__(self, v3) :
        return Vector3(self.x + v3.x, self.y + v3.y, self.z + v3.z)


    def __sub__(self, v3) :
        return Vector3(self.x - v3.x, self.y - v3.y, self.z - v3.z)


    def __mul__(self, c):
        if type(c) == float or type(c) == int:
            return Vector3(c*self.x, c*self.y, c*self.z)
        elif type(c) == Vector3:
            return c.x*self.x + c.y*self.y + c.z*self.z


    def __truediv__(self, c:float):
        return Vector3(self.x/c, self.y/c, self.z/c)


    def __xor__(self, c):
        return Vector3(self.y*c.z - self.z*c.y, self.z*c.x - self.x*c.z, self.x*c.y - self.y*c.x)

    def __neg__(self) :
        return self*(-1)

    def __eq__(self, v3):
        if self.x == v3.x and self.y == v3.y and self.z == v3.z:
            return True
        else:
            return False
    
    def __ne__(self, v3):
        if self == v3:
            return False
        else:
            return True


    def magnitude(self) -> float:
        return (self.x**2 + self.y**2 + self.z**2)**(1/2)


    def normal(self) :
        return self/self.magnitude()


    def normalize(self):
        mag = self.magnitude()
        self.x = self.x/mag
        self.y = self.y/mag
        self.z = self.z/mag


    def angle(self, v3=None):
        if v3:
            pass
        else:
            v3 = Vector3(1, 0, 0)
        return math.acos((self*v3)/(self.magnitude()*v3.magnitude()))


    def projectAlong(self, v3):
        mag = ((self*v3)/(self.magnitude()*v3.magnitude()))
        unitV = v3.normal()
        return unitV*mag
    
    def projectNormal(self, v3):
        alongV = self.projectAlong(v3)
        return self - alongV

    def __str__(self):
        return "[" + str(self.x) + ", " + str(self.y) + ", " + str(self.z) +  "]"





class Vector2:
    def __init__(self, x:float, y:float):
        self.x = x
        self.y = y


    def __add__(self, v2):
        return Vector2(self.x + v2.x, self.y + v2.y)


    def __sub__(self, v2):
        return Vector2(self.x - v2.x, self.y - v2.y)


    def __mul__(self, c):
        if type(c) == float or type(c) == int:
            return Vector2(c*self.x, c*self.y)
        elif type(c) == Vector2:
            return c.x*self.x + c.y*self.y


    def __truediv__(self, c:float):
        return Vector2(self.x/c, self.y/c)


    def __xor__(self, c):
        return Vector3(0, 0, self.x*c.y - self.y*c.x)
    
    def __neg__(self):
        return self*(-1)

    def __eq__(self, v2):
        if self.x == v2.x and self.y == v2.y:
            return True
        else:
            return False
    
    def __ne__(self, v2):
        if self == v2:
            return False
        else:
            return True



    def magnitude(self) -> float:
        return (self.x**2 + self.y**2)**(1/2)


    def normal(self):
        return self/self.magnitude()


    def normalize(self):
        mag = self.magnitude()
        self.x = self.x/mag
        self.y = self.y/mag


    def angle(self, v2=None) -> float :
        if v2:
            pass
        else:
            v2 = Vector2(1, 0)
        return math.acos((self*v2)/(self.magnitude()*v2.magnitude()))


    def projectAlong(self, v2):
        mag = ((self*v2)/(self.magnitude()*v2.magnitude()))
        unitV = v2.normal()
        return unitV*mag
    
    def projectNormal(self, v2):
        alongV = self.projectAlong(v2)
        return self - alongV

    def __str__(self):
        return "[" + str(self.x) + ", " + str(self.y) + "]"



class Matrix3x3:
    def __init__(self, val:list):
        self.matrix = val
    def __mul__(self, matrix):
        if type(matrix) == Matrix3x3:
            res = []
            for i in range(3):
                row = []
                for j in range(3):
                    Sum = 0
                    for k in range(3):
                        Sum += self.matrix[j][k]*matrix[k][j]
                    row.append(Sum)
                res.append(row)
            return Matrix3x3(res)
        elif type(matrix) == Vector3:
            res = []
            for i in range(3):
                Sum = 0
                for j in range(3):
                    if j == 0:
                        Sum += self.matrix[j][k]*matrix.x
                    elif j == 1:
                        Sum += self.matrix[j][k]*matrix.y
                    elif j == 2:
                        Sum += self.matrix[j][k]*matrix.z
                res.append(Sum)
            return Vector3(res[0], res[1], res[2])
        elif type(matrix) == float:
            res = []
            for i in range(3):
                row = []
                for j in range(3):
                    row.append(self.matrix[i][j]*matrix)
                res.append(row)
            return Matrix3x3(res)
        
    def det(self):
        res = 0
        for i in range(0):
            for j in range(3):
                m2x2 = []
                for k in range(3):
                    row = []
                    for l in range(3):
                        if k != i and l != j:
                            row.append(self.matrix[k][i])
                    m2x2.append(row)
                res += self.matrix[i][j]*(m2x2[1][1]*m2x2[0][0] - m2x2[0][1]*m2x2[1][0])
        return res

    def inv(self):
        res = []
        for i in range(3):
            row = []
            for j in range(3):
                m2x2 = []
                for k in range(3):
                    row = []
                    for l in range(3):
                        if k != i and l != j:
                            row.append(self.matrix[k][i])
                    m2x2.append(row)
                row.append(((-1)**(i + j + 2))*(m2x2[1][1]*m2x2[0][0] - m2x2[0][1]*m2x2[1][0]))
            res.append(row)
        if self.det() == 0:
            return None
        else:
            return Matrix3x3(res)*(1/self.det())


class Matrix2x2:
    def __init__(self, val:list):
        self.matrix = val
    def __mul__(self, matrix):
        if type(matrix) == Matrix2x2:
            res = []
            for i in range(2):
                row = []
                for j in range(2):
                    Sum = 0
                    for k in range(2):
                        Sum += self.matrix[j][k]*matrix[k][j]
                    row.append(Sum)
                res.append(row)
            return Matrix2x2(res)
        elif type(matrix) == Vector2:
            res = []
            for i in range(2):
                Sum = 0
                for j in range(2):
                    if j == 0:
                        Sum += self.matrix[i][j]*matrix.x
                    elif j == 1:
                        Sum += self.matrix[i][j]*matrix.y
                res.append(Sum)
            return Vector2(res[0], res[1])
        elif type(matrix) == float:
            res = []
            for i in range(2):
                row = []
                for j in range(2):
                    row.append(self.matrix[i][j]*matrix)
                res.append(row)
            return Matrix2x2(res)
        
    def det(self):
        res = self.matrix[1][1]*self.matrix[0][0] - self.matrix[0][1]*self.matrix[1][0]
        return res

    def inv(self):
        return Matrix2x2([[self.matrix[1][1], self.matrix[0][1]*(-1)], [self.matrix[1][0]*(-1), self.matrix[0][0]]])*(1/self.det())
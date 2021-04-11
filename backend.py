import numpy as np
from PIL import Image
import random

def midPointCircleDraw(x_centre, y_centre, r):
    newPoints = []

    x = r
    y = 0
    newPoints.append([x + x_centre,y + y_centre])
    if (r > 0) :
        newPoints.append([ x + x_centre,-y + y_centre])
        newPoints.append([ y + x_centre, x + y_centre])
        newPoints.append([ -y + x_centre,x + y_centre])

    P = 1 - r

    while x > y:
        y += 1
		# Mid-point inside or on the perimeter
        if P <= 0:
            P = P + 2 * y + 1
		# Mid-point outside the perimeter
        else:
            x -= 1
            P = P + 2 * y - 2 * x + 1

		# All the perimeter points have
		# already been printed
        if (x < y):
            break

		# Printing the generated point its reflection
		# in the other octants after translation
        newPoints.append([ x + x_centre, y + y_centre])
        newPoints.append([ -x + x_centre, y + y_centre])
        newPoints.append([ x + x_centre, -y + y_centre])
        newPoints.append([ -x + x_centre, -y + y_centre])

		# If the generated point on the line x = y then
		# the perimeter points have already been printed
        if x != y:
            newPoints.append([ y + x_centre, x + y_centre])
            newPoints.append([ -y + x_centre, x + y_centre])
            newPoints.append([ y + x_centre, -x + y_centre])
            newPoints.append([ -y + x_centre, -x + y_centre])
    return newPoints

# Driver Code
if __name__ == '__main__':

    # Create a 1024x1024x3 array of 8 bit unsigned integers
    imageData = np.zeros( (1024,1024,3), dtype=np.uint8 )

    color = [random.randint(0, 255),random.randint(0, 255),random.randint(0, 255)]
    originX = 512
    originY = 512
    radius = 3
    y = 0
    x = 0
    for y in range(-radius,radius):
        for x in range(-radius,radius):
            if(x*x+y*y <= radius*radius):
                imageData[originX+x, originY+y] = color
    image = Image.fromarray(imageData)
    image.show()
    image.save(str(random.randint(0,500000))+'.jpg')

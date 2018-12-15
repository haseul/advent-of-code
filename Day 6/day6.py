
def distance(xy, ab):
    return (abs(xy[0] - ab[0]) + abs(xy[1] - ab[1]))

def main():
    with open(file="input.txt", mode='r', encoding='utf-8') as file:
        inputText = file.read()

    lines = inputText.split("\n")

    points = []
    for line in lines:
        x = int(line.split(",")[0].strip())
        y = int(line.split(",")[1].strip())
        points.append((x, y))

    scores = {}
    regionSize = 0
    for i in range(len(points)):
        scores[i] = 0
    for xpoint in range(500):
        for ypoint in range(500):
            closestPoint = points[0]
            tie = False
            totalDistance = 0
            for point in points:
                totalDistance += distance(point, (xpoint, ypoint))
                if distance(point, (xpoint, ypoint)) < distance(closestPoint, (xpoint, ypoint)):
                    closestPoint = point
                    tie = False
                elif distance(point, (xpoint, ypoint)) == distance(closestPoint, (xpoint, ypoint)):
                    tie = True
            if totalDistance < 10000:
                regionSize += 1
            if not tie:
                scores[points.index(closestPoint)] += 1

    infPoints = set()
    for xpoint in range(-250, 750):
        for ypoint in [-1000, 1000]:
            closestPoint = points[0]
            for point in points:
                if distance(point, (xpoint, ypoint)) < distance(closestPoint, (xpoint, ypoint)):
                    closestPoint = point
            infPoints.add(points.index(closestPoint))

    for ypoint in range(-250, 750):
        for xpoint in [-1000, 1000]:
            closestPoint = points[0]
            for point in points:
                if distance(point, (xpoint, ypoint)) < distance(closestPoint, (xpoint, ypoint)):
                    closestPoint = point
            infPoints.add(points.index(closestPoint))

    highScore = None
    for k, v in scores.items():
        if k not in infPoints and (highScore is None or v > highScore):
            highScore = v

    print(highScore)
    print(regionSize)

if __name__ == "__main__":
    main()

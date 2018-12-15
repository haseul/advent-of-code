
def main():
    with open(file="input.txt", mode='r', encoding="utf-8") as file:
        inputText = file.read()

    partOne(inputText)
    partTwo(inputText)


def partOne(inputText):
    i = 0
    while i < len(inputText):
        if i < 0:
            i = 0
        if i == len(inputText) - 1:
            break

        char = inputText[i]
        if char == oppositeCase(inputText[i+1]):
            inputText = inputText[:i] + inputText[i+2:]
            i-=2
        i+=1

    print(len(inputText))


def partTwo(inputText):
    minlength = None
    lowerAlphabet = "abcdefghijklmnopqrstuvwxyz"
    upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for lower, upper in zip(lowerAlphabet, upperAlphabet):
        newText = inputText.replace(lower, '').replace(upper, '')
        i = 0
        while i < len(newText):
            if i < 0:
                i = 0
            if i == len(newText) - 1:
                break

            char = newText[i]
            if char == oppositeCase(newText[i+1]):
                newText = newText[:i] + newText[i+2:]
                i-=2
            i+=1

        if not minlength or len(newText) < minlength:
            minlength = len(newText)
    
    print(minlength)


def oppositeCase(char):
    if char.isupper():
        return char.lower()
    if char.islower():
        return char.upper()

if __name__ == "__main__":
    main()


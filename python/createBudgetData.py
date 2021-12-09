import json

months = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"]
budgetData = {"year": 2021, "data": {}, "id": 1}


def createRandomCategories(num, isIncome):
    returnedDict = {"categories": {}, "total": 0}
    cats = []
    if isIncome:
        cats = ["work", "dividends"]
    else:
        cats = ["rent", "food", "electricity", "gas", "cell",
                "pet food", "cheez-its", "video games", "fast food", "liquor"]
    for i in range(0, num):
        # amount = round(((i + 25) / (num ** 2)) * 100, 2)
        amount = round((i + (2 * num)) / (num ** 2) * 500, 2)
        returnedDict["categories"][cats[i]] = amount
        returnedDict["total"] = round(returnedDict["total"] + amount, 2)
    return returnedDict


for i in range(0, 12):
    budgetData["data"][months[i]] = {"income": createRandomCategories(2, True),
                                     "expenses": createRandomCategories(1 + (37 % (i + 1)), False)}

with open("dbNew.json", "w") as out_file:
    json.dump(budgetData, out_file, indent=2)

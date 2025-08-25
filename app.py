from flask import Flask, render_template, url_for, request, make_response, redirect,jsonify


app = Flask(__name__)

class Clothe:

    def __init__(self,id,name,price,ctg):
        self.id = id
        self.name = name
        self.price = price
        self.ctg = ctg

    def getPrice(self):
        return self.price
    def getName(self):
        return self.name
    
    def toDict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "ctg": self.ctg

        }


clothes = [Clothe(1,"NikeM4",50,"sport"),Clothe(2,"Zara",200,"expensive"),Clothe(3,"North Ocean",150,"cold")]


@app.route("/ssr")
def home():
    return render_template('clothes.html',clothes=clothes)

@app.route("/getclothes")
def getClothes():
    clothesDict = [c.toDict() for c in clothes]
    return jsonify(clothesDict)

@app.route("/clothe/<id>")
def clothe(id):
    return render_template("clothe.html")

@app.route("/ssr/clothe/<id>")
def info(id):
    print(id)
    selected_clothe = clothes[0]
    for clothe in clothes:
        print("Clothe id:" ,clothe.id)
        print("Clothe id:" ,clothe.id, id)
        print(clothe.id == id)
        if int(clothe.id) == int(id):
            print("hi")
            selected_clothe = clothe
            selected_clothe = selected_clothe.toDict()
            return jsonify(selected_clothe)

    return redirect(url_for('home'))
    
    


if __name__ == "__main__":
    app.run(debug=True)
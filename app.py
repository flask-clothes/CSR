from flask import Flask, render_template, url_for, request, make_response, redirect, jsonify, abort


app = Flask(__name__)

myToken = "myToken"

users = {
    'joao': '2708',
    'vih': '0305'
}


class Clothe:

    def __init__(self, id, name, price, ctg, imgurl):
        self.id = id
        self.name = name
        self.price = price
        self.ctg = ctg
        self.imgurl = imgurl

    def getPrice(self):
        return self.price

    def getName(self):
        return self.name

    def toDict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "ctg": self.ctg,
            "imgurl": self.imgurl
        }


clothes = [Clothe(1, "Nike Shoes", 50, "sport", "/static/assets/products/green_nike_shoes.jpeg"), Clothe(
    2, "Moletom Cinza", 200, "expensive", "/static/assets/products/grey.jpeg"), Clothe(3, "Camisa de compressão Nike", 150, "cold", "/static/assets/products/nike_compression_tshirt.jpeg")]


@app.route("/")
def default():
    return redirect(url_for("login"))


@app.route("/login", methods=["POST", "GET"])
def login():

    method = request.method
    print(method)
    if method == "POST":
        name = request.form.get("name")
        password = request.form.get("password")
        print(password, name)
        if ((name in users.keys()) and password == users[name]):
            resp = make_response(redirect(url_for("home")))
            resp.set_cookie("token", myToken, 60)
            return resp
        msg = "Ops, você errou algum campo, tente novamente"

        return render_template("login.html", msg=msg)

    return render_template("login.html")


@app.route("/csr")
def home():
    print("Token: ", request.cookies.get("token"))
    if request.cookies.get("token") == myToken:
        return render_template('clothes.html', clothes=clothes)
    abort(403)


@app.errorhandler(403)
def unathorizedPage(error):
    return render_template("403.html")


@app.route("/getclothes")
def getClothes():
    clothesDict = [c.toDict() for c in clothes]
    return jsonify(clothesDict)


@app.route("/clothe/<id>")
def clothe(id):
    return render_template("clothe.html")


@app.route("/deletecookies")
def deletingCookies():
    response = make_response("Deleting")
    response.delete_cookie("user")
    response.delete_cookie("token")
    return response


@app.route("/ssr/clothe/<id>")
def info(id):
    print(id)
    selected_clothe = clothes[0]
    for clothe in clothes:
        print("Clothe id:", clothe.id)
        print("Clothe id:", clothe.id, id)
        print(clothe.id == id)
        if int(clothe.id) == int(id):
            print("hi")
            selected_clothe = clothe
            selected_clothe = selected_clothe.toDict()
            return jsonify(selected_clothe)

    return jsonify({"error": "not found"})


if __name__ == "__main__":
    app.run(debug=True)

let myCard = '<div class="card">'
let fatherElement = document.getElementById('clothes')



const fetchingData = async () => {
    const res = await fetch("/getclothes")
    const data = res.json()
    return data
}

async function main(){
    console.log("Hi")
    let myData =  await fetchingData()
    console.log(myData)
    myData.forEach(e => {
        myCard += `
        <div class="card--img--space">
            <img src="${e.imgurl}"></img>
        </div>
        <div class="card--content">
        <p class="name">${e.name}</p>
        <p class="price">R$ ${e.price}</p>
        <a href="/clothe/${e.id}">
        <button class="card--button">Comprar</button>
        </a>
        </div>
        `
        myCard+= "</div>"
        
        console.log("hi again")
        fatherElement.innerHTML += myCard
        myCard = '<div class="card">'

    });
}
main()

let myOtherCard = '<div class="card--see--detail">'
let otherFatherElement = document.getElementById('clothe')

const fetchingOtherData = async (i) => {
    const res = await fetch(`/ssr/clothe/${i}`)
    const data = res.json()
    return data
}

async function notmain(i){
    const id = parseInt(location.pathname.split("/")[2])

    console.log("ID: ", id,id!=NaN)
    
    if(!isNaN(id)){
    let myData =  await fetchingOtherData(id)
    console.log(myData)

    myOtherCard += `
        <div class="card--see--detail--img--space">
            <div class="card--img">
                <img src="${myData.imgurl}"></img>
            </div>
        </div>
        <div class="card--see--detail--content">
        <h1>${myData.name}</h1>
        <p>${myData.price}</p>
        <a href="/clothe/${myData.id}">
        <button class="card--button">Comprar</button>
        </a>
        </div>
         `
        myOtherCard+= "</div>"
        
        console.log("hi again")
        otherFatherElement.innerHTML += myOtherCard
        myOtherCard = '<div class="card">'

    ;}
}



notmain()


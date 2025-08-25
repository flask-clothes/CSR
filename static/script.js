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
        myCard += `<p>${e.name}</p>
         <p>${e.price}</p>
         <a href="/ssr/clothe/${e.id}">
         <button class="card--button">Comprar</button>
         </a>
         `
        myCard+= "</div>"
        
        console.log("hi again")
        fatherElement.innerHTML += myCard
        myCard = '<div class="card">'

    });
}

let myOtherCard = '<div class="card">'
let otherFatherElement = document.getElementById('clothe')

const fetchingOtherData = async (i) => {
    const res = await fetch(`/ssr/clothe/${i}`)
    const data = res.json()
    return data
}

async function notmain(i){
    const id = parseInt(location.pathname.split("/")[2])

    console.log("Hi")
    if(id != NaN){
    let myData =  await fetchingOtherData(id)
    console.log(myData)
    myData.forEach(e => {
        myOtherCard += `<p>${e.name}</p>
         <p>${e.price}</p>
         <a href="/clothe/${e.id}">
         <button class="card--button">Comprar</button>
         </a>
         `
        myOtherCard+= "</div>"
        
        console.log("hi again")
        otherFatherElement.innerHTML += myOtherCard
        myOtherCard = '<div class="card">'

    });}
}



notmain()


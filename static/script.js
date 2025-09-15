let myCard = '<div class="card">'
let fatherElement = document.getElementById('clothes')
const ctg_btnsForm = document.getElementById("ctg_btnsForm")

if(ctg_btnsForm){
ctg_btnsForm.addEventListener("click",(e)=>{
    e.preventDefault()
    
})}


const fetchingFilteredClothes =async (ctg)=>{
    return await fetch(`/getfilteredclothes/${ctg}`).then(res=> res.json()) 
}

const fetchingData = async () => {
    const res = await fetch("/getclothes")
    const data = res.json()
    return data
}
const constructBtns = (ctgs) =>{
        
        for (ctg of ctgs){
            ctg_btnsForm.innerHTML += `
            
            <button name="ctg" class="ctgBtn" id=btn_${ctg}>${ctg.toUpperCase()}</button>
            `
        }
        const ctg_btns = document.querySelectorAll(".ctgBtn")
        console.log("CTGBTNS: ",ctg_btns)
        ctg_btns.forEach((btn)=>{
        btn.addEventListener("click",async (e)=>{
        let btnCtg = btn.id.slice(4)
        filtered = await fetchingFilteredClothes(btnCtg)
        drawing(filtered)
        console.log(btnCtg)
})
})
    }
const fetchingCtgButtons = async () =>{
    data = await fetch("/getctgs").then(res=> res.json())
    constructBtns(await data)

    
    
}



async function main(){
    console.log("Hi")
    fetchingCtgButtons()
    let data =  await fetchingData()
    console.log(data)
    drawing(data)
}
main()

const drawing = async (data) => {
    fatherElement.innerHTML = ""
    data.forEach(e => {
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
    let data =  await fetchingOtherData(id)
    console.log(data)

    myOtherCard += `
        <div class="card--see--detail--img--space">
            <div class="card--img">
                <img src="${data.imgurl}"></img>
            </div>
        </div>
        <div class="card--see--detail--content">
        <h1>${data.name}</h1>
        <p>R$ ${data.price}</p>
        <div class="buttons--space">
        <a href="/clothe/${data.id}">
        <button class="card--button">Comprar</button>
        
        </a>
        <button class="card--button">Adicionar ao carrinho</button>
        </div>
        </div>
         `
        myOtherCard+= "</div>"
        
        console.log("hi again")
        otherFatherElement.innerHTML += myOtherCard
        myOtherCard = '<div class="card">'

    ;}
}



notmain()


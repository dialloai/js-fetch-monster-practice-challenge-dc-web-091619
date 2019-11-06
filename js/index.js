document.addEventListener("DOMContentLoaded",() => {


 fetchMonsters()   

 let form = document.querySelector('#create-monster')
 form.addEventListener("submit", newMonster)

 let forwardButton = document.querySelector("#forward")
 forwardButton.addEventListener("click", forwardButtonNew)

 let backButton = document.querySelector("#back")
 backButton.addEventListener("click", backButtonNew)

})

let pageNumbers= 0


function fetchMonsters(){
    let div= document.querySelector("#monster-container")
    div.innerHTML=''

fetch (`http://localhost:3000/monsters/?_limit=50&_page=${pageNumbers}`)
.then(response => response.json())
.then(monsterArray => monsterArray.forEach((monsterObject) => renderMonsters(monsterObject)))
}
function renderMonsters(monsterObject){
let container= document.querySelector('#monster-container')

let div=document.createElement('div')

let h2=document.createElement('h2')
h2.innerText= monsterObject.name

let h4=document.createElement('h4')
h4.innterText=monsterObject.age

let pTag=document.createElement('p')
pTag.innerText=monsterObject.description

container.appendChild(div)

div.append(h2, h4, pTag)



}

function newMonster(event){
event.preventDefault()

// let nameInput =document.querySelector('#name-input-id').value

// let ageInput= document.querySelector('#age-input-id').value

// let descriptionInput= document.querySelector('#description-input-id').value

let name= event.target.name.value
let age= event.target.age.value
let description= event.target.description.value

fetch ('http://localhost:3000/monsters', {
method:'POST',
headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
},
body: JSON.stringify({ 
"name": name,
"age": age,
"description": description
})
}).then (response => response.json())
.then(newMonsterObject => renderMonsters(newMonsterObject))
}


function forwardButtonNew(event){
    pageNumbers++
    fetchMonsters()
}

function backButtonNew(event){
    pageNumbers--
    fetchMonsters()
}
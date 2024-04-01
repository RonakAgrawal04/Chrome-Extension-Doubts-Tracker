let myDoubts = []
let oldDoubts = []
const inputElem = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const doubtsFromLocalStorage=JSON.parse( localStorage.getItem("myDoubts"))

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myDoubts.push(tabs[0].url)
        localStorage.setItem("myDoubts", JSON.stringify(myDoubts))
        render(myDoubts)
    })
    
})

if(doubtsFromLocalStorage){
    myDoubts = doubtsFromLocalStorage
    render(myDoubts)
}

function render(doubts){
    let listItems = ""
    for(let i=0;i<doubts.length;i++){
        listItems += `
        <li>
            <a target = '_blank' href='${doubts[i]}'> 
                ${doubts[i]}
            </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myDoubts = []
    render(myDoubts)
})


inputBtn.addEventListener("click", function() {
    myDoubts.push(inputElem.value)
    localStorage.setItem("myDoubts",JSON.stringify(myDoubts))
    inputElem.value = ""
    render(myDoubts)
})


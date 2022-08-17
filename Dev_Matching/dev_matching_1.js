const SearchInputForm = document.getElementsByClassName("SearchInput");
const SearchInput = document.querySelector(".SearchInput__input");
const Suggestion = document.querySelector(".Suggestion ul");
const SelectedLanguageList = document.querySelector(".SelectedLanguage ul");

let listNum = 0
let listLength = 0
let renderedList = []
let selectedList = ""
let selectedLanguages = []

// fetch
SearchInput.addEventListener("input", (e)=>{
    let keyword = e.target.value
    let prevKeyword = keyword
    setTimeout(()=>{
        if(prevKeyword === e.target.value){
            if(keyword === ""){
                Suggestion.innerHTML=""
                return
            }
            else{
                Suggestion.innerHTML=""
                fetch("https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword="+keyword)
                .then(res => res.json())
                .then(text => {
                    listLength = text.length
                    renderedList = text
                    text.map((t,i) => {
                        const li = document.createElement("li");
                        if(i === listNum){
                            selectedList = t
                            li.setAttribute('class', 'Suggestion__item--selected')
                        }
                        li.innerHTML = `${t}`
                        Suggestion.appendChild(li)
                    })
                })
            }    
        }     
    else{
        this.clearTimeout()
    }
},1000)                                                              
})

SearchInput.addEventListener('keydown', e => {
    if(e.key === 'ArrowDown'){
        if(listNum < listLength-1){
            listNum ++    
        }
        else{
            listNum = 0
        }
    }
    else if(e.key=== 'ArrowUp'){
        if(listNum > 0){
            listNum--    
        }
        else{
            listNum = listLength -1
        }
    }
    else{
        return
    }
    Suggestion.innerHTML=""
    renderedList.map((t,i) => {
        const li = document.createElement("li");
        if(i === listNum){
            selectedList = t
            li.setAttribute('class', 'Suggestion__item--selected')
        }
        li.innerHTML = `${t}`
        Suggestion.appendChild(li)
    })
})

SearchInput.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        e.preventDefault();
        alert(selectedList)
        if(selectedLanguages.includes(selectedList)){
            selectedLanguages = selectedLanguages.filter(e => e !== selectedList)
        }
        selectedLanguages.push(selectedList)
    }
    
    SelectedLanguageList.innerHTML=""
    selectedLanguages.map(e => {
        const li = document.createElement("li")
        li.innerHTML=e
        SelectedLanguageList.appendChild(li)
    })
})

Suggestion.addEventListener('click', (e)=>{
    const target = e.path[0].innerText
    alert(target)
    if(selectedLanguages.includes(target)){
        selectedLanguages = selectedLanguages.filter(e => e !== target)
    }
    selectedLanguages.push(target)

    SelectedLanguageList.innerHTML=""
    selectedLanguages.map(e => {
        const li = document.createElement("li")
        li.innerHTML=e
        SelectedLanguageList.appendChild(li)
    })
})


// 
let difficultyValue = 11;
let filter;
let TwoTypeFilter = ['All',difficultyValue]
let championTypeFiltered;
let championDifficultyFiltered = [];
let difficultyValueMin = 0;

async function renderChampions(filter) {
    const champions = await fetch("http://ddragon.leagueoflegends.com/cdn/12.7.1/data/en_US/champion.json")
    const championsData = await champions.json();
    const championValues = Object.values(championsData)
    const championValueData= championValues[3]
    championValuesIntoArray = Object.values(championValueData)
    const championsEl = document.querySelector(".champions")
    championsEl.innerHTML = championValuesIntoArray.map((champion) => championHTML(champion) ).join("")
    


    // championsEl.innerHTML = championValuesIntoArray.filter((champion) => (champion.info.difficulty <= TwoTypeFilter[1])).map(champion => championHTML(champion) ).join("")


    if (TwoTypeFilter[0] === 'All'){
        championsEl.innerHTML = championValuesIntoArray.map((champion) => championHTML(champion) ).join("")
    }else {
        championTypeFiltered = championValuesIntoArray.filter((champion) => (champion.tags.includes(`${TwoTypeFilter[0]}`) && (champion.info.difficulty <= TwoTypeFilter[1] && champion.info.difficulty > difficultyValueMin)))
        championsEl.innerHTML = championTypeFiltered.map(champion => championHTML(champion) ).join("") 
    }

    // } else if (filter === `${filter}`){
        // championTypeFiltered = championValuesIntoArray.filter((champion) => (champion.tags.includes(`${TwoTypeFilter[0]}`)))
    // }

    // if (difficultyValue === 3){
        // championDifficultyFiltered = championValuesIntoArray.filter((champion) => (champion.info.difficulty <= TwoTypeFilter[1]))
    // } else if (difficultyValue === 7){
        // championDifficultyFiltered = championValuesIntoArray.filter((champion) => (champion.info.difficulty == TwoTypeFilter[1]))
    // } else if (difficultyValue === 10){
        // championDifficultyFiltered = championValuesIntoArray.filter((champion) => (champion.info.difficulty == TwoTypeFilter[1]))
    // }

    // let championCombinedFilter = championDifficultyFiltered.concat(championTypeFiltered)

    // championsEl.innerHTML = championCombinedFilter.map(champion => championHTML(champion) ).join("")
    // championTypeFiltered.map(champion => championHTML(champion) ).join("")    
}

function championFilter(event){
    renderChampions(event.target.textContent)
    TwoTypeFilter[0] = (event.target.textContent)
}


function filterDifficulty(event){
    difficulty = event.target.value
    if (difficulty === "Easy"){
        difficultyValue = 3
        difficultyValueMin = 0
    } else if (difficulty === "Medium"){
        difficultyValue = 7
        difficultyValueMin = 3
    } else if (difficulty === "Hard"){
        difficultyValue = 10
        difficultyValueMin =7
    }
    TwoTypeFilter[1] = difficultyValue
    renderChampions()
}

renderChampions()



function championHTML (champion){
    return `
    <div class="champion">
    <figure class="champion--wrapper">
    <a href="#"><img src="./league/12.6.1/img/champion/${champion.id}.png" alt="" class="champion__pic"></a>
    </figure>
    <h2 class="champion__name">${champion.id}</h2>
    </div>`
}

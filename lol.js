let difficultyValue = 11;
let filter;
let TwoTypeFilter = ['All',difficultyValue]
let championTypeFiltered;
let championDifficultyFiltered = [];
let difficultyValueMin = 0;
let championInfo = false;

async function renderChampions(filter) {
    const champions = await fetch("http://ddragon.leagueoflegends.com/cdn/12.7.1/data/en_US/champion.json")
    const championsData = await champions.json();
    const championValues = Object.values(championsData)
    const championValueData= championValues[3]
    championValuesIntoArray = Object.values(championValueData)
    const championsEl = document.querySelector(".champions")
    const championsInfoEl = document.querySelector(".champion__info-query")
    
    if (TwoTypeFilter[0] === 'All'){
        championsEl.innerHTML = championValuesIntoArray.filter((champion) => (champion.info.difficulty <= TwoTypeFilter[1] && champion.info.difficulty > difficultyValueMin)).map((champion) => championHTML(champion) ).join("")
    }else {
        championTypeFiltered = championValuesIntoArray.filter((champion) => (champion.tags.includes(`${TwoTypeFilter[0]}`) && (champion.info.difficulty <= TwoTypeFilter[1] && champion.info.difficulty > difficultyValueMin)))
        championsEl.innerHTML = championTypeFiltered.map(champion => championHTML(champion) ).join("") 
    }
    console.log(championValuesIntoArray)

    championsInfoEl.innerHTML = championValuesIntoArray.map(test => championInfoHTML(test) ).join("")
    console.log(championsInfoEl.innerHTML)
}


renderChampions()

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

function championHTML (champion){
    return `
    <div class="champion">
    <figure class="champion--wrapper">
        <a href="#"><img src="./league/12.6.1/img/champion/${champion.id}.png" alt="" class="champion__pic cursor" onclick="toggleChampionInfo()"></a>
    </figure>
    <h2 class="champion__name">${champion.id}</h2>
    </div>`
}

function toggleChampionInfo() {
    if (championInfo){
        championInfo = false
        return document.body.classList.remove("champion__info--open")
    }
    championInfo = true
    document.body.classList += " champion__info--open"
}

function championInfoHTML (test){
    
    return `
    <div class="champion__info-query">
    <figure class="champion__splash-art-background--container">
        <img src="./league/img/champion/splash/${test.id}_0.jpg" alt="" class="champion__splash-art--background">
    </figure>
    <div class="champion__info--container">
        <div class="champion__splash-art">
            <figure class="champion__splash-art--container">
                <img src="./league/img/champion/splash/${test.id}_0.jpg" alt="" class="champion__splash-art">
            </figure>
        </div>
        <div class="champion__info--wrapper">
            <div class="champion__info">
                <h2 class="champion__info--title">Title</h2>
                <h1 class="champion__info--name">${test.id}</h1>
                <p class="champion__info--para">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim hic
                    officia in aspernatur, nesciunt ea? Commodi ex repudiandae assumenda, deserunt aperiam error nobis
                    enim pariatur itaque! Quibusdam mollitia aspernatur id!
                </p>
            </div>
        </div>
    </div>
</div>       
    `
}
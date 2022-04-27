let champion;
let championValuesIntoArray = renderChampions();

async function renderChampions(filter) {
    const champions = await fetch("http://ddragon.leagueoflegends.com/cdn/12.7.1/data/en_US/champion.json")
    const championsData = await champions.json();
    const championValues = Object.values(championsData)
    const championValueData= championValues[3]
    championValuesIntoArray = Object.values(championValueData)
    const championsEl = document.querySelector(".champions")
    championsEl.innerHTML = championValuesIntoArray.map((champion) => championHTML(champion) ).join("")


    if (filter === 'All'){
        championsEl.innerHTML = championValuesIntoArray.map((champion) => championHTML(champion) ).join("")
    } else if (filter === "Assassin"){
        championsEl.innerHTML = championValuesIntoArray.filter((champion) => (champion.tags.includes("Assassin"))).map(champion =>championHTML(champion) ).join("")
    } else if (filter === "Fighter"){
        championsEl.innerHTML = championValuesIntoArray.filter((champion) => (champion.tags.includes("Fighter"))).map(champion =>championHTML(champion) ).join("")
    } else if (filter === "Mage"){
        championsEl.innerHTML = championValuesIntoArray.filter((champion) => (champion.tags.includes("Mage"))).map(champion =>championHTML(champion) ).join("")
    } else if (filter === "Marksman"){
        championsEl.innerHTML = championValuesIntoArray.filter((champion) => (champion.tags.includes("Marksman"))).map(champion =>championHTML(champion) ).join("")
    } else if (filter === "Tank"){
        championsEl.innerHTML = championValuesIntoArray.filter((champion) => (champion.tags.includes("Tank"))).map(champion =>championHTML(champion) ).join("")
    } else if (filter === "Support"){
        championsEl.innerHTML = championValuesIntoArray.filter((champion) => (champion.tags.includes("Support"))).map(champion =>championHTML(champion) ).join("")
    }
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

function championFilter(event){
    renderChampions(event.target.textContent)
}

function filterDifficulty(event){
    console.log(event)
}


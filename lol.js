async function main() {
    const champions = await fetch("http://ddragon.leagueoflegends.com/cdn/12.7.1/data/en_US/champion.json")
    const championsData = await champions.json();
    const championValues = Object.values(championsData)
    const championValueData= championValues[3]
    const championValuesIntoArray = Object.values(championValueData)
    console.log(championValuesIntoArray)
    const championsEl = document.querySelector(".champions")
    championsEl.innerHTML = championValuesIntoArray.map((champion) => championHTML(champion) ).join("")
}

main()

function championHTML (champion){
    return `
    <div class="champion">
    <figure class="champion--wrapper">
    <a href="#"><img src="./league/12.6.1/img/champion/${champion.id}.png" alt="" class="champion__pic"></a>
    </figure>
    <h2 class="champion__name">${champion.id}</h2>
    </div>`
}

function dropdown() {
    document.getElementById("search__dropdown-list").classList.toggle("show");
  }


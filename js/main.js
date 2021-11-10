// import statements have to go at the top
import { getData } from "./components/TheDataMiner.js";

(() => {
    const   theTeam = document.querySelector("#team-members"),
            theTemplate = document.querySelector("#bio-template").content;

    function buildTeam(info) {
        info.forEach(person => {
            let panel = theTemplate.cloneNode(true),
                memberInfo = panel.firstElementChild.children;

            // add the custom data attribute value to the section tag inside the template
            panel.firstElementChild.dataset.key = person.id;

            memberInfo[0].querySelector('img').src = `images/${person.biopic}`;
            memberInfo[1].textContent = person.name;
            memberInfo[2].textContent = person.role;
            memberInfo[3].textContent = person.nickname;

            // put the virtual panel in the team section in our HTML page
            theTeam.appendChild(panel);
        })
    }

    function getMoreData(event) {
        if (event.target.closest("section").dataset.key) {
            let key = event.target.closest("section").dataset.key;

            // getData({id: key}, function(data) {
            //     // execute this line as the callback in DataMiner
            //     console.log(data);
            // })

            getData({id: key},  showPortfolioData);
        }
    }

    function showPortfolioData(data) {
        // show the portfolio piece somewhere in your UI
        console.log(data);
    }

    // when we click on a bio panel, we want to retrieve the custom data attribute that refers to the row of data that represents this person in the DB
    // we then pass that ID to our data miner, which in turn passes it to index.php as the query string parameter
    theTeam.addEventListener("click", getMoreData);

    // pass the buildTeam function to our data miner as a callback
    getData(null, buildTeam);
})()

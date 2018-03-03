const apiKey = "32e3926a4b364bce99b74b088f73bdfc";
const defaultSource = "the-washington-post";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
        .then(res => {
            console.log("Service Worker registered!", res);
        })
        .catch(err => {
            console.log("err", err);
        });
}

function fetchAllData() {
    getSources();
    getNews();
}

function getSources() {
    fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector(`.sourcesShower`).innerHTML = data.sources.map(source => `<li class="mdl-menu__item" onClick="getNews('${source.id}')">${source.name}</li>`).join("");
        })
        .catch(err => {
            console.log(err);
        });
}

function getNews(source = defaultSource) {
    getElement("#news").innerHTML = `<div class="mdl-spinner mdl-js-spinner is-active"></div>`;
    fetch(`https://newsapi.org/v1/articles?source=${source}&apiKey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            getElement("#news_source").innerHTML = makeWordsLookBetter(source);
            getElement("#news").innerHTML = data.articles.map(eachNews => `
                    <div class="col-lg-3 col-md-4 col-sm-6 eachNewsContainer">
                        <a href=${eachNews.url} target="_blank">
                            <h3>${eachNews.title}</h3>
                            <img src=${eachNews.urlToImage} />
                            <p>${eachNews.description}</p>    
                        </a>
                    </div>`);
        })
        .catch(err => {
            getElement("#news").innerHTML = `<p id="source_error_shower"><i class="far fa-frown"></i> News is currently not available from the selected source!</p>`;
        })
}

function getElement(idORClass) {
    return document.querySelector(`${idORClass}`);
}

function makeWordsLookBetter(words) {
    return words.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}
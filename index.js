const API_KEY="222792cd7afa4ebd9d3f3a8e280e2dab";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews (query) {
    const res= await fetch (`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    // console.log(data);
    bindData(data.articles); //bindData is concept in JS
}
//making the clone of card in template and insert in div container for cards
function bindData(articles) {
    const cardContainer= document.getElementById('card-container');
    const templateCard=document.getElementById('template-news-card');

    cardContainer.innerHTML='';

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone= templateCard.content.cloneNode(true);
        fillDataIncard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
}
 function fillDataIncard(cardClone,article) {
    const newsImg= cardClone.querySelector("#news-img");
    const newsTitle= cardClone.querySelector("#news-title");
    const newsSource= cardClone.querySelector("#news-source");
    const newsDesc= cardClone.querySelector("#news-desc");

    newsImg.src=article.urlToImage;
    newsSource.innerHTML=article.source.name;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML =article.description;
 

 cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url,"_blank");
 });
 }

 function onNavItemClick(id) {
    fetchNews(id);
 }

 const searchButton=document.getElementById('search-button');
 const searchInput=document.getElementById('search-input');
 searchButton.addEventListener('click', ()=>{
    const query=searchInput.value;
    if(!query) return;
    fetchNews(query);
 });
var totalRecords = 15;
var ItemsInPage = 5;
var totalpages = totalRecords / ItemsInPage;
var prev = 1;
var Data;

var url =
    "https://www.googleapis.com/youtube/v3/search?key=AIzaSyAW5-STgRz_YkIW_3u7Zz0FiCfpdpLHknc&type=video&part=snippet&maxResults=15&q=${searchQuery}";

window.onresize = () => {
    renderingFunc();
};

function renderSearch() {
    const apiKey = "AIzaSyAW5-STgRz_YkIW_3u7Zz0FiCfpdpLHknc";
    const searchQuery = document.getElementById("search_value").value;
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=20&q=${searchQuery}`
    )
    .then((res) => res.json())
    .then((data) => {
        (Data = data), renderingFunc();
    });
}

function renderingFunc() {
    document.getElementById("resultDiv").style.justifyContent = "space-between";
    ItemsInPage = 5;
    totalpages = totalRecords / ItemsInPage;
    displayPage();
    displayData(1);
}

function displayPage() {
    let pageDiv = document.getElementsByClassName("page")[0];
    pageDiv.innerHTML = "";

    let pagenum = ``;
    for (let i = 1; i <= totalpages; i++) {
        pagenum += `<button class="page" id= ${i} onclick=displayData(${i})>${i}</button>`;
    }
    pageDiv.innerHTML += pagenum;
}

function displayData(start) {
    let result = document.getElementById("resultDiv");
    setPage(start);
    let currentStart = (start - 1) * ItemsInPage;
    let currentEnd = currentStart + ItemsInPage;
    if (currentStart >= 0 && currentEnd <= Data.items.length) {
        video = "";
        for (item of Data.items.slice(currentStart, currentEnd)) {
            let snippet = item.snippet;
            let thumb = snippet.thumbnails.medium;
            video += `<div class="video">
              <div>
                  <a href="https://www.youtube.com/watch?v=${item.id.videoId}"><img class="thumb" src='${thumb.url}' width=${thumb.width} height=${thumb.height}> </a>
              </div>
              <div class="yt_title">
                  <h3><a href="https://www.youtube.com/watch?v=${item.id.videoId}">${snippet.title}</a></h3>
              </div>
              <div class="desc">
                  <p>${snippet.description}</p>
              </div>
              <div class="date">
                  <p><a href="https:youtube.com/watch?v={{id.videoId}}">${snippet.publishedAt}</a></p>
              </div>
              <div class="channelId">
                  <h4><a href="https://www.youtube.com/channel/${snippet.channelId}">${snippet.channelTitle}</a></h4>
              </div>
            </div>
            <br>`;
        }
        resultDiv.innerHTML = video;
    }
}

function setPage(start) {
    let previous = document.getElementById(prev).style;
    previous.backgroundColor = "white";
    previous.color = "black";
    previous.fontSize = "small";

    prev = start;

    let currentPage = document.getElementById(start).style;
    currentPage.backgroundColor = "#FF0000";
    currentPage.color = "white";
    currentPage.fontSize = "medium";
}

document.getElementById("search-btn").addEventListener('click', function () {
    console.log("button clicked");
    document.getElementById("load").classList.toggle('tog');
});


var slideshowContainer = document.getElementsByClassName("slideshow-container")[0];

var keyWord = "";
var category = "";

function selected(){
    switch(document.getElementsByClassName("selected")[0].innerHTML){
        case "Home": keyWord =  "&q=a"; category = "&category=general";break
        case "Politics": keyWord =  "&q=politics"; category = "&category=general";break
        case "Society": keyWord =  "&q=entertainment"; category = "&category=entertainment";break
        case "Economy":keyWord =  "&q=economy"; category = "&category=business";break
        case "Science": keyWord =  "&q=science"; category = "&category=science";break
        case "Sport": keyWord =  "&q=sport"; category = "&category=sports";break
        case "Football": keyWord =  "&q=football"; category = "&category=sports";break
        case "Tennis": keyWord =  "&q=tennis"; category = "&category=sports";break
        case "Basketball": keyWord =  "&q=basketball"; category = "&category=sports";break
        case "Other": keyWord =  "&q=sport"; category = "&category=sports";break
        case "Health": keyWord =  "&q=health"; category = "&category=health";break
        case "Lifestyle": keyWord =  "&q=lifestyle";category = "&category=entertainment";break
        case "Technology": keyWord =  "&q=technology";category = "&category=technology";break
    }
}
selected();


var urlSlider = "http://newsapi.org/v2/top-headlines?apiKey=c5513454f4d94b9fbca2b31ce9b4f1a6&country=gb";
if(category != ""){
    urlSlider += category;
}
// if(category === "&category=sports"){
//     urlSlider += keyWord;
// }

fetch(urlSlider)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return JSON.parse(JSON.stringify(data));
    })
    .then((jsObjectData) => {
        var articles = jsObjectData["articles"];
        var numOfPages = parseInt(jsObjectData["totalResults"]/9)+1;
        var mySlides = document.createElement("div");
        mySlides.classList.add("mySlides" ,"fade");

        for(let i = 0; i< articles.length; i++){
            if(i >= 12){
                break;
            }

            var slider = document.createElement("div");
            slider.className = "slider";

            var content = document.createElement("div");
            content.classList.add("content","clicable","border");

            var title = document.createElement("h1");
            title.innerHTML = `${articles[i]["title"]}`

            var readMore = document.createElement("a");
            readMore.setAttribute("href",`${articles[i]["url"]}`)
            readMore.className = "readMoreBtn";
            readMore.innerHTML = "Read more"

            var img = document.createElement("img");
            img.setAttribute("src",`${articles[i]["urlToImage"]}`);
            img.setAttribute("alt" , "news");
            img.classList.add("backgroundImg");

            content.appendChild(title);
            content.appendChild(readMore);
            content.appendChild(img);
            content.addEventListener("click", () => {
                    
                var fullScreen = document.getElementById("myFullScreen");
                fullScreen.classList.add("block");
                fullScreen.children[1].innerHTML = `
                    <img src="${articles[i]["urlToImage"]}" alt="something">
                    <h1>${articles[i]["title"]}</h1> `
                fullScreen.children[2].innerHTML = `
                    <p>${articles[i]["content"].split("[+")[0]} <button><a href="${articles[i]["url"]}">Read More</a></button></p>
                    
                `
            })

            slider.appendChild(content);
            mySlides.appendChild(slider);

            if((i+1)%3 === 0){
                slideshowContainer.appendChild(mySlides);
                mySlides = document.createElement("div")
                mySlides.classList.add("mySlides" ,"fade");
            }
        }
    })
    .then(() => {
        var animate;

        var slideIndex = 0;
        showSlides();

        function showSlides() {
            var i;
            var slides = document.getElementsByClassName("mySlides");

            for (i = 0; i < slides.length; i++) {
                slides[i].classList.add("none");
                slides[i].classList.remove("flex");
            }
            slideIndex++;
            if (slideIndex > slides.length) {slideIndex = 1}    

            slides[slideIndex-1].classList.add("flex");  
            slides[slideIndex-1].classList.remove("none");  

            animate = setTimeout(showSlides, 3500); // Change image every 3.5 seconds
        }

        var prev = document.getElementsByClassName("prev")[0];
        var next = document.getElementsByClassName("next")[0];

        prev.addEventListener("click", function(e){
            if(slideIndex==1){
                slideIndex=3;
            }
            else if(slideIndex==2){
                slideIndex=4;
            }
            else{
                slideIndex=slideIndex-2;
            }
            clearTimeout(animate);
            showSlides();
        });

        next.addEventListener("click", function(e){
            clearTimeout(animate);
            showSlides();
        });
    })
    .catch((error) =>{
        console.error(error)
    })

var urlLatestNews = "https://newsapi.org/v2/everything?apiKey=c5513454f4d94b9fbca2b31ce9b4f1a6&sortBy=publishedAt&language=en";
urlLatestNews += keyWord;

fetch(urlLatestNews)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return JSON.parse(JSON.stringify(data));
    })
    .then((jsObjectData) => {
        var articles = jsObjectData["articles"];

        for(let i = 0; i< 3; i++){

            var content = document.createElement("div");
            content.classList.add("content","clicable","border");

            var title = document.createElement("h6");
            title.innerHTML = `${articles[i]["title"]}`

            var img = document.createElement("img");
            img.setAttribute("src",`${articles[i]["urlToImage"]}`);
            img.setAttribute("alt" , "bestNews");
            img.classList.add("backgroundImg");

            content.appendChild(img);
            content.appendChild(title);
            content.addEventListener("click", () => {
                    
                var fullScreen = document.getElementById("myFullScreen");
                fullScreen.classList.add("block");
                fullScreen.children[1].innerHTML = `
                    <img src="${articles[i]["urlToImage"]}" alt="something">
                    <h1>${articles[i]["title"]}</h1> `
                fullScreen.children[2].innerHTML = `
                    <p>${articles[i]["content"].split("[+")[0]} <button><a href="${articles[i]["url"]}">Read More</a></button></p>
                    
                `
            })

            document.getElementById("best").appendChild(content);

        }
    })

    
var urlTopRated = "https://newsapi.org/v2/everything?apiKey=c5513454f4d94b9fbca2b31ce9b4f1a6&sortBy=popularity&pageSize=6&page=1"

urlTopRated += keyWord;

fetch(urlTopRated)
    .then((response) =>{
        return response.json();
    })
    .then((data) => {
        return JSON.parse(JSON.stringify(data));
    })
    .then((jsObjectData) =>{
        var articles = jsObjectData["articles"];


        var row = document.createElement("div");
        row.classList.add("row");
        for(let i = 0; i < articles.length; i++){

            var con = document.createElement("div");
            con.classList.add("content","clicable","border")
            
            var img = document.createElement("img");
            img.setAttribute("src",`${articles[i]["urlToImage"]}`)
            img.setAttribute("alt","news");
            
            var text = document.createElement("div");
            text.classList.add("text");
            
            var title = document.createElement("p");
            title.innerHTML = `Title: ${articles[i]["title"]}`;

            var author = document.createElement("p");
            author.innerHTML = `Author: ${articles[i]["author"]}`;

            var publishedAt = document.createElement("p");
            publishedAt.innerHTML = `Published: ${articles[i]["publishedAt"].split("T")[0]}`;
            
            text.appendChild(title);
            text.appendChild(author);
            text.appendChild(publishedAt);

            con.appendChild(img);                
            con.appendChild(text);
            
            img.addEventListener("click", () => {
                
                var fullScreen = document.getElementById("myFullScreen");
                fullScreen.classList.add("block");
                fullScreen.children[1].innerHTML = `
                    <img src="${articles[i]["urlToImage"]}" alt="something">
                    <h1>${articles[i]["title"]}</h1> `
                fullScreen.children[2].innerHTML = `
                    <p>${articles[i]["content"].split("[+")[0]} <button><a href="${articles[i]["url"]}">Read More</a></button></p>
                    
                `
            })

            row.appendChild(con);

            if((i+1)%3 === 0){
                document.getElementById("topRated").appendChild(row);
                row = document.createElement("div");
                row.classList.add("row");
            }
        }
    })

var br = 2;
var numOfPages = 2;

var loadMore =  document.getElementById("loadMore");
loadMore.addEventListener("click", loadHandler);

function loadHandler(e){
    e.preventDefault();

    if(e.target.id == "loadMore"){
        if (br <= numOfPages) {
            br++;
            console.log("OK")
        }
    }

    
    var url = "https://newsapi.org/v2/everything?apiKey=c5513454f4d94b9fbca2b31ce9b4f1a6&pageSize=3&language=en&sortBy=popularity"
    url += `&page=${br}`;
    url += keyWord;
    fetch(url)
        .then((response) =>{
            return response.json();
        })
        .then((data) => {
            return JSON.parse(JSON.stringify(data));
        })
        .then(function(jsObjectData){
            var articles = jsObjectData["articles"];
            numOfPages = parseInt(jsObjectData["totalResults"]/3)+1;
    

            if (br > numOfPages) {
                document.getElementById("topRated").removeChild(loadMore);       
            };



            var row = document.createElement("div");
            row.classList.add("row");
            for(let i = 0; i < articles.length; i++){

                var con = document.createElement("div");
                con.classList.add("content","clicable","border")
                
                var img = document.createElement("img");
                img.setAttribute("src",`${articles[i]["urlToImage"]}`)
                img.setAttribute("alt","news");
                
                var text = document.createElement("div");
                text.classList.add("text");
                
                var title = document.createElement("p");
                title.innerHTML = `Title: ${articles[i]["title"]}`;

                var author = document.createElement("p");
                author.innerHTML = `Author: ${articles[i]["author"]}`;

                var publishedAt = document.createElement("p");
                publishedAt.innerHTML = `Published: ${articles[i]["publishedAt"].split("T")[0]}`;
                
                text.appendChild(title);
                text.appendChild(author);
                text.appendChild(publishedAt);

                con.appendChild(img);                
                con.appendChild(text);
                
                img.addEventListener("click", () => {
                    
                    var fullScreen = document.getElementById("myFullScreen");
                    fullScreen.classList.add("block");
                    fullScreen.children[1].innerHTML = `
                        <img src="${articles[i]["urlToImage"]}" alt="something">
                        <h1>${articles[i]["title"]}</h1> `
                    fullScreen.children[2].innerHTML = `
                        <p>${articles[i]["content"].split("[+")[0]} <button><a href="${articles[i]["url"]}">Read More</a></button></p>
                        
                    `
                })

                row.appendChild(con);
                
                if(articles.length < 3){
                    if((articles.length-i)===1){
                        document.getElementById("data").appendChild(row);
                        row = document.createElement("div");
                        row.classList.add("row");
                        continue;
                    }
                }

                if((i+1)%3 === 0){
                    document.getElementById("topRated").appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            }
        })
}

document.getElementById("close").addEventListener("click", ()=>{
    document.getElementById("myFullScreen").classList.add("none");
    document.getElementById("myFullScreen").classList.remove("block");
})
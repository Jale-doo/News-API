
var search = document.getElementById("search");
search.addEventListener("click", searchHandler);

var dataFromServer;

function searchHandler(e){
    e.preventDefault();

    var newsText = document.getElementById("filter").value;

    var sorted = document.getElementById("sort");
    sorted = sorted.options[sorted.selectedIndex].value;
    
    var sources = document.getElementById("sources").value;
    
    var fromDate = document.getElementById("from").value;
    var toDate = document.getElementById("to").value;
    
    var topHeadlines = document.getElementById("topHeadlines");
    if(topHeadlines.checked){
        var category = document.getElementById("category");
        category = category.options[category.selectedIndex].value;
        
        var selectedCountry = document.getElementById("country");
        selectedCountry = selectedCountry.options[selectedCountry.selectedIndex].value
    }

    if(topHeadlines.checked){
        var url = "https://newsapi.org/v2/top-headlines?apiKey=c5513454f4d94b9fbca2b31ce9b4f1a6"
        if(selectedCountry != ""){
            url += `&country=${selectedCountry}`;
        }
        if(category != ""){
            url += `&category=${category}`;
        }
        if(sources != ""){
            url += `&sources=${sources}`
        }
        if(newsText != ""){
            url += `&q=${newsText}`;
        }

    // Validacija 
        if(sources == "" && category == "" && selectedCountry == "" && newsText == ""){
            alert("Greska, nemoguca operacija")
            return
        }
        if(sources == "" && category == "" && selectedCountry == ""){
            alert("Greska, nemoguca operacija")
            return
        }
        if(sources != "" && (category != "" || selectedCountry != "")){
            alert("Greska, nemoguca operacija")
            return
        }
    }else{
        var url = "https://newsapi.org/v2/everything?apiKey=c5513454f4d94b9fbca2b31ce9b4f1a6"    
        url += `&sortBy=${sorted}`;
        if(fromDate != ""){
            url += `&from=${fromDate}`;
        }
        if(toDate != ""){
            url +=  `&to=${toDate}`;
        }
        if(sources != ""){
            url += `&sources=${sources}`
        }
        if(newsText != ""){
            url += `&q=${newsText}`;
        }

    // Validacija 
        if(newsText == "" && sources == ""){
            alert("Greska, nemoguca operacija");
            return
        }
    }
    
    
    console.log(url);

    
    fetch(url)
        .then((response) =>{
            return response.json();
        })
        .then((data) => {
            return JSON.parse(JSON.stringify(data));
        })
        .then(function(jsObjectData){
            var articles = jsObjectData["articles"];
            alert(articles);
            var row = document.createElement("div");
            row.classList.add("row");
            for(let i = 0; i < articles.length; i++){
                row.innerHTML += `
                <div  class="content clicable border">
                    <img src="${articles[i]["urlToImage"]}" alt="News">
                    <div class="text">
                        <p>Title: ${articles[i]["title"]}</p>
                    </div>
                </div>`;
                
                if(i%3 === 2){
                    document.getElementById("data").appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            }
        })

    
}

document.getElementById("topHeadlines").addEventListener("click", checkHandler);
function checkHandler(e){
    if(e.target.checked === true){
        document.getElementById("countryDiv").style.display = "block";
        document.getElementById("categoryDiv").style.display = "block";
        document.getElementById("sortDiv").style.display = "none";
        document.getElementById("fromTo").style.display = "none";
    }else{
        document.getElementById("countryDiv").style.display = "none";
        document.getElementById("categoryDiv").style.display = "none";
        document.getElementById("sortDiv").style.display = "block";
        document.getElementById("fromTo").style.display = "block";
        
    }
}
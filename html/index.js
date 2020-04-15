var current_page = 1;
var records_per_page = 9;
var numOfPages = 1;

var btn_next = document.getElementById("btn_next");
var btn_prev = document.getElementById("btn_prev");
var page_span = document.getElementById("page");

btn_next.addEventListener("click", searchHandler);
btn_prev.addEventListener("click", searchHandler);

var search = document.getElementById("search");
search.addEventListener("click", searchHandler);


function searchHandler(e){
    e.preventDefault();
    document.getElementById("pagination").classList.add("visible");

    if(e.target.id === "search"){
        current_page = 1;
    }
    if(e.target.id == "btn_next"){
        
        if (current_page < numOfPages) {
            current_page++;
        }
        
    }
    if(e.target.id == "btn_prev"){
        if (current_page > 1) {
            current_page--;
        }
    }

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
        var url = "https://newsapi.org/v2/top-headlines?apiKey=c5513454f4d94b9fbca2b31ce9b4f1a6&pageSize=9"
        url += `&page=${current_page}`;
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
        // if(sources == "" && category == "" && selectedCountry == ""){
        //     alert("Greska, nemoguca operacija")
        //     return
        // }
        if(sources != "" && (category != "" || selectedCountry != "")){
            alert("Greska, nemoguca operacija")
            return
        }
    }else{
        var url = "https://newsapi.org/v2/everything?apiKey=c5513454f4d94b9fbca2b31ce9b4f1a6&pageSize=9&language=en"
        url += `&page=${current_page}`;    
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

    document.getElementById("data").innerHTML = "";
    fetch(url)
        .then((response) =>{
            return response.json();
        })
        .then((data) => {
            return JSON.parse(JSON.stringify(data));
        })
        .then(function(jsObjectData){
            var articles = jsObjectData["articles"];
            numOfPages = parseInt(jsObjectData["totalResults"]/9)+1;
    

            // Validate page
            if (current_page < 1) page = 1;
            if (current_page > numOfPages) current_page = numOfPages;

            // Promijeni sadrzaj data
            page_span.innerHTML = current_page + "/" + numOfPages;

            if (current_page == 1) {
                btn_prev.classList.add("hidden");
                btn_prev.classList.remove("visible");
            } else {
                btn_prev.classList.add("visible");
                btn_prev.classList.remove("hidden");
            }

            if (current_page == numOfPages) {
                btn_next.classList.add("hidden");
                btn_next.classList.remove("visible");
            } else {
                btn_next.classList.add("visible");
                btn_next.classList.remove("hidden");
            }


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
                title.innerHTML = `${articles[i]["title"]}`;
                
                text.appendChild(title)
                con.appendChild(img);                
                con.appendChild(text);
                
                con.addEventListener("click", () => {
                    
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
                
                if(articles.length < 9){
                    if((articles.length-i)===1){
                        document.getElementById("data").appendChild(row);
                        row = document.createElement("div");
                        row.classList.add("row");
                        continue;
                    }
                }

                if((i+1)%3 === 0){
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
        document.getElementById("countryDiv").classList.add("block");
        document.getElementById("categoryDiv").classList.add("block");
        document.getElementById("sortDiv").classList.add("none");
        document.getElementById("fromTo").classList.add("none");

        document.getElementById("countryDiv").classList.remove("none");
        document.getElementById("categoryDiv").classList.remove("none");
        document.getElementById("sortDiv").classList.remove("block");
        document.getElementById("fromTo").classList.remove("block");
    }else{
        document.getElementById("countryDiv").classList.add("none");
        document.getElementById("categoryDiv").classList.add("none");
        document.getElementById("sortDiv").classList.add("block");
        document.getElementById("fromTo").classList.add("block");

        document.getElementById("countryDiv").classList.remove("block");
        document.getElementById("categoryDiv").classList.remove("block");
        document.getElementById("sortDiv").classList.remove("none");
        document.getElementById("fromTo").classList.remove("none");
        
    }
}

document.getElementById("close").addEventListener("click", ()=>{
    document.getElementById("myFullScreen").classList.add("none");
    document.getElementById("myFullScreen").classList.remove("block");
})


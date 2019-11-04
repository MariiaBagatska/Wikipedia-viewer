$(document).ready(
    function () {
        var searchName = ""; // variable for input data
        var url; // variable for api link
        // call the getArticle function with a button 
        $("#search").click(getArticle);
        // call the getArticle function with pressing Enterkey
        document.onkeypress = function(){pressEnter(event)};
  
        function pressEnter(event) {
            var keyEnter = event.which || event.keyCode;
            if (keyEnter == 13) {
                getArticle(searchName);
            }
        }// close pressEnterfunction   
 
        function getArticle(searchName) {
            document.getElementById("searchResult").innerHTML = "";  // to clear previous searches
            searchName = $("#searchName").val();
            var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchName + "&format=json&callback=?";
            // xmlhttp request with jquery
            $.ajax(
                {
                    type: "GET",
                    url: url,
                    dataType: "jsonp", //important 'p' at the end . why?
                    success: function(data) {
                        var titles = data[1];// for readable cleane code I create variables
                        var descriptions = data[2];
                        var links = data[3];
                        for (var i = 0; i< titles.length; i++) {
                            $("#searchResult").prepend("<li><a href=" + links[i] + " target = '_blank'>" + titles[i] + "</a><p>" + descriptions[i] + "</p></li>");
                        //createListElement(titles, descriptions, links);
                        }
                        //function createListElement (titles, descriptions, links){
                        // $("#searchResult").prepend("<li><a href=" + links[i] + "target = '_blank'>" + titles[i] + "</a><p>" + descriptions[i] + "</p></li>") 
                        // }// close createListElement function
                    },
                    error: function(errorMessage) {
                        alert("Error!") 
                    },
                });// close ajax request
        };// close getArticle function
    }
);
const api_key = "k_6304x538";

$("#home-logo").click(function(){
	window.location.href = "index.html";
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    $("#logo-box").css("display", "none");
	$("#navbar").css("height", "50px");
	$("#navbar").css("background-color", "#353839");
	$(".socials-grid").css("visibility", "hidden");
	$("#first-item").css("padding-left", "120px");

  } else {
    $("#logo-box").css("display", "block");
	$("#navbar").css("height", "100px");
	$("#navbar").css("background-color", "#35383999");
	$(".socials-grid").css("visibility", "visible");
	$("#first-item").css("padding-left", "2%");
  }
}

$(".poster2").click(function(){
	window.location.href = "MovieDescription.html?movie_id=" + $(this).attr("alt");
});

//index HomePage image loading

function loadImages()
{
	let top_movie_URL = "https://imdb-api.com/en/API/MostPopularMovies/" + api_key;
	$.get(top_movie_URL, function(data) {
		data = data["items"];
		for(let i = 1; i <= 20; i++)
		{
			let html_id = "#i"+i;
			let poster = data[i-1]["image"];
			$(html_id).attr("src", poster);
			$(html_id).attr("alt", data[i-1].id)
		}
	});
}

$(".poster").click(function(){
	window.location.href = "MovieDescription.html?movie_id=" + $(this).attr("alt");
});

function loading()
{
	$("#loading-flex").css("display", "none");
	$("#Title_Page").css("background-image", "url(Images/background2.jpg");
	$(".Flexboxes").css("display", "flex");
}

function loading_home()
{
	$("#loading-flex2").css("display", "none");
	$("#MovieDesBody").css("background-image", "url(Images/background4.jpg");
	$("#MovieDesBodyResult").css("display", "block");
}

function radio_check()
{
	var type = document.getElementsByName('result_type');
	var result_type = 'Text';
	for(let i = 0; i < type.length; i++)
	{
		if(type[i].checked)
		{
			result_type = type[i].value;
		}
	}
	return result_type;
}

function filmsearch()
{
	let expression = $("#search").val();
	expression = expression.toLowerCase();
	console.log(expression);
	let movie_search = encodeURIComponent(expression.trim());
	let movie_search_url = "https://imdb-api.com/en/API/SearchMovie/" + api_key + "/";
	$.get(movie_search_url + movie_search, function(data){
		data = data.results;
		if(data.length == 0)
		{
			alert("Enter a valid Movie name");
		}
		else
		{
			for(let i = 0; i < data.length && i < 4; i++)
			{
				let id = "#o" + (i+1);
				$(id).css("display", "block");
				$(id).val(data[i].id);
				$(id).html(data[i].title);
			}
		}
	});
}

function sendId(value)
{
	result_type = radio_check();
	let movie_id = value;
	if(result_type == 'Text')
	{
		let url = "MovieDescription.html?movie_id=" + encodeURIComponent(movie_id);
		document.location.href = url;
	}
	else if(result_type == 'Images')
	{
		let url = "Images.html?movie_id=" + encodeURIComponent(movie_id);
		document.location.href = url;
	}
}

// MovieDescription loading function

function loadMovie()
{
	var url = document.location.href;
	var movie_id = url.split('?')[1].split('=')[1];
	let movie_data_url = "https://imdb-api.com/en/API/Title/" + api_key + "/" + movie_id + "/FullActor,FullCast,Posters,Images,Trailer,Ratings,Wikipedia,";
	let poster_url = "https://imdb-api.com/en/API/SearchMovie/" + api_key + "/" + movie_id;
	$.get(movie_data_url, function(data){
		// Home
		$("#title-searched").html(data.title);
		$.get(poster_url, function(data2){
			$("#poster-searched").attr("src", data2.results[0].image);
		});
		$("#imdb").html(data.ratings.imDb);
		$("#rotten-t").html(data.ratings.rottenTomatoes);
		$("#meta").html(data.ratings.metacritic);
		$("#plot-searched").html(data.plot);
		$("#release-date").html(data.releaseDate);
		$("#genre").html(data.genres);
		$("#runtime").html(data.runtimeStr);
		$("#director").html(data.directorList[0].name);
		$("#ratings").html(data.contentRating);
		$("#company").html(data.companies);

		// Cast
		for(let i = 0; i < data.actorList.length && i < 12; i++)
		{
			let cast_id = "#c" + i;
			$(cast_id).attr("src", data.actorList[i].image);
			let cap_id = "#cap" + i;
			$(cap_id).html(data.actorList[i].name);
		}

		// Trailer
		$("#thumbnail").attr("src", data.trailer.thumbnailUrl);
		$("#video-link").attr("href", data.trailer.linkEmbed);

		// Similars
		for(let j = 0; j < data.similars.length && j < 5; j++)
		{
			let img_id = "#i" + (j+1);
			$(img_id).attr("src", data.similars[j].image);
			$(img_id).attr("alt", data.similars[j].id);
			$(img_id).css("display", "block");
		}
		//$("#").html();
	});
}

function loadStills()
{
	var url = document.location.href;
	var movie_id = url.split('?')[1].split('=')[1];
	let movie_data_url = "https://imdb-api.com/en/API/Images/" + api_key + "/" + movie_id + "/Full";
	$.get(movie_data_url, function(data){
		data = data.items;
		for(let i = 0; i < data.length && i < 20; i++)
		{
			let id = "#still" + (i+1);
			$(id).attr('src', data[i].image);
		}
	});
}
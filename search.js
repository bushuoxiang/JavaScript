var searchTpl = '<li class="search-result-item" data-id={%id%}>' +
	'<p><strong>{%songname%}</strong></p>' +
	'<p>{%singer%} - {%zhuanji%}</p>' +
	'<button id = "plist">添加至播放列表</button>'
	'</li>'

var searchButoton = document.getElementById('search-button')
var searchInput = document.getElementById('search')

var searchResultList = document.getElementById('search-result-list')

var addEventListener = function(){
	var d = document.getElementsByClassName('search-result-item')
	for(var i=0;i<d.length;i++){
		d[i].addEventListener('click',function(){
//			console.log(this.getAttribute('data-id'))
			play(parseInt(this.getAttribute('data-id')))
		})
	}
}

var fillSearchResult = function(arr) {
	var html = ''
	for(var i = 0; i < arr.length; i++) {
		html += searchTpl.replace('{%songname%}', arr[i].name)
			.replace('{%singer%}', arr[i].artists[0].name)
			.replace('{%zhuanji%}', arr[i].album.name)
			.replace('{%id%}', arr[i].id)
	}
	searchResultList.innerHTML = html
	addEventListener()
	showSearchResult()
	//等圆度添加到html之后再去添加监听器
}

searchButoton.addEventListener('click',function(){
	var keywods = searchInput.value
	search(keywods,function(e){
		console.log(e)
		fillSearchResult(e)
	})
})
 var searchResultWrap = document.getElementsByClassName('search-result-wrap')[0]
 var showSearchResult = function(){
	searchResultWrap.className = 'search-result-wrap active'
}

var hiddenSearchResult = function(){
	searchResultWrap.className = 'search-result-wrap'
}


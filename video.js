var video = document.getElementById('video')

// 整体容器
var wrap = document.getElementsByClassName('wrap')[0]
var currentElement = document.getElementById('current')
var durationElement = document.getElementById('duration')

//进度条展示的html
var percentElement = document.getElementById('percent')

//音量控制的标签 
var volumeControl = document.getElementById('volume-control')

//全屏获取按钮
var fullScreenButton = document.getElementById('fullScreen')
var secondsToMins = function(seconds) {
	seconds = parseInt(seconds)
	var min = parseInt(seconds / 60)
	min = min > 9 ? min : '0' + min
	var s = seconds % 60
	s = s > 9 ? s : '0' + s
	var mins = min + ':' + s
	return mins
}
//填充当前时间
currentElement.innerHTML = secondsToMins(video.currentTime)
video.addEventListener('canplay', function() {
	//填充总时间
	durationElement.innerHTML = secondsToMins(video.duration)
})
video.addEventListener('timeupdate', function() {
	//	console.log('timeupdate',video.currentTime)
	currentElement.innerHTML = secondsToMins(video.currentTime)
	var percent = getPercent()
	setPercent(percent)
	progressDanmu()
})
//视频播放百分比
var getPercent = function() {
	return video.currentTime / video.duration
}
var setPercent = function(percent) {
	percentElement.style.width = percent * 1000 + 'px'
}

//两种音量控制
volumeControl.addEventListener('change', function() {
	console.log(this.value)
	var v = parseInt(this.value) / 100
	console.log(v)
	//	video.volume = v
})
//进入全屏
fullScreenButton.addEventListener('click', function() {
	video.webkitRequestFullscreen()
})

var isPlaying = false
//video
video.addEventListener('click', function() {
	if(isPlaying) {
		video.pause()
		isPlaying = false
	} else {
		video.play()
		isPlaying = true
	}
})

var danmuList = [{
		time: 1000,
		content: '这个大爷真。。。'
	},
	{
		time: 2000,
		content: '明锐看很开心。。。'
	},
	{
		time: 2100,
		content: '1353513535。。。'
	},
	{
		time: 1500,
		content: 'asfasfasfas。。。'
	}
]

var orderDanmu = function() {
	danmuList.sort(function(a, b) {
		return a.time - b.time
	})
}
orderDanmu()

var sendDanmu = function(content) {
	var p = document.createElement('p')
	p.ckassName = 'danmu'
	p.style.top = Math.random() * 300 + 'px'
	p.innerHTML = content
	wrap.appendChild(p)
	setTimeout(function() {
		p.className = 'danmu active'
	}, 10)
	setTimeout(function(){
		wrap.remove(child[0])
	},6000)
}
var progressDanmu = function() {
	//对比当前时间和第一条弹幕的时间
	if(danmuList[0] && danmuList[0].time - video.currentTime * 1000 < 300)
		//发送弹幕
		sendDanmu(danmuList.shift().content)
}
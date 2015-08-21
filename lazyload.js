'use strict';

var ieEvent = !document.addEventListener
var scrollListeners = []

function onScroll (e) {
	for (var i = 0; i < scrollListeners.length; i++) {
		scrollListeners[i](getScrollTop())
	}
}
function getScrollTop () {
	return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
}
function getClientHeight () {
	if (document.compatMode == 'BackCompat') {
		return document.body.clientHeight
	} else {
		return document.documentElement.clientHeight
	}
}
function getOffsetTop (el) {
	return el.getBoundingClientRect().top + getScrollTop()
} 
if (ieEvent) {
    window.attachEvent('onscroll', onScroll)
} else {
    window.addEventListener('scroll', onScroll)
}
module.exports = Reve.directive('lazyload', {
	bind: function (src) {
		var that = this
		var top = getOffsetTop(this.$el)
		scrollListeners.push(function (scrollTop) {
			if (that._loaded) return
			if ( (scrollTop + getClientHeight()) > top ) {
				that.$el.src = src
				that._loaded = true
			}
		})
		onScroll()
	}
})
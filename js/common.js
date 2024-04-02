$(document).ready(function () {
	$('.skipNav a').on('click', function () {
		var aAttr = $(this).attr('href');
		$(aAttr).attr('tabindex', '0');
	});

	// 상단메뉴
	var $header = $('.header');
	var $gnb = $('.gnbWrap');
	var $gnbList = $('.gnbList');
	var $gnbSub = $('.gnb_cont');
	var $moBtn = $('.btnMoGnb');
	if (!$moBtn.is(':hidden')) {
		$('.gnbList>li').find('div').parent('li').addClass('opNav').children('a').attr('title', '하위메뉴 보기');
	}
	$gnbList.find('>li').on('mouseenter', function (event) {
		event.stopPropagation();
		if ($moBtn.is(':hidden')) {
			$('.header, .overlayBg').addClass('active');
			$gnbSub.hide();
			$(this).find('>div').css('display', 'flex');
			$gnbList.find('>li').removeClass('hover');
			$(this).addClass('hover');
		}
	});
	$('.headMain').on('mouseleave', function (event) {
		if ($moBtn.is(':hidden')) {
			$('.header, .overlayBg').removeClass('active');
			$gnbList.find('>li').removeClass('hover');
			$gnbSub.stop().hide();
			$('.opNav').removeClass('open').children('a').attr('title', '하위메뉴 보기');
			$('.opNav').find('>div').hide();
		}
	});
	$gnbList.find('>li>a').on('focus', function () {
		$(this).closest('li').mouseenter();
	});
	$moBtn.find('button').on('click', function () {
		$('body').css('overflow', 'hidden');
		$('.header, .overlayBg').addClass('active');
		$gnb.show("slide", {
			direction: "right"
		}, 600, "cubic-bezier(.57,.13,.73,.81)");
	});

	$gnb.find('.moGnbClose button').click(function () {
		$gnb.hide();
		$('body').removeAttr('style');
		$('.header, .overlayBg').removeClass('active');
		$('.opNav').find('>div').hide();
		$('.opNav').removeClass('open').find('>a').attr('title', '하위메뉴 보기');
	});
	$(document).on('click', '.opNav>a', function (event) {
		event.preventDefault();
		$gnbSub.height('auto');
		var target = $(this).closest('li').find('>div');
		if (target.is(':hidden')) {
			target.slideDown();
			$(this).attr('title', '하위메뉴 숨기기').closest('li').addClass('open');
		} else {
			target.hide();
			$(this).attr('title', '하위메뉴 보기').closest('li').removeClass('open');
			target.find('>div').hide();
			target.find('li.open').removeClass('open').find('>a').attr('title', '하위메뉴 보기');
		}
		return false;
	});

	$('.hdShare').click(function () {
		$(this).closest('div').addClass('active');
		$(this).siblings('.shareList').show();
	});
	$('.shareClose>button').on('click', function () {
		$('.hdShare').closest('div').removeClass('active');
		$('.hdShare').siblings('.shareList').fadeOut(200);
	});
	
	var $locBtn = $('.locBtn');
	$locBtn.on('click', function () {
		var $navBtn = $(this);
		var $navTarget = $navBtn.closest('li').find('div');
		if ($navTarget.is(':hidden')) {
			$locBtn.removeClass('active');
			$locBtn.closest('li').find('div').hide();
			$navBtn.addClass('active');
			$navTarget.slideDown();
		} else {
			$navBtn.removeClass('active');
			$navTarget.hide();
		}
		$(window).resize(function () {
			if ($('.btnMoGnb').is(':hidden')) {
				$locBtn.closest('li').find('div').removeAttr('style');
			}
		});
	});
	$('.locationTab').on('mouseleave', function () {
		$locBtn.removeClass('active');
		$locBtn.closest('li').find('div').removeAttr('style');
	});
	$('.btnPrint>button').click(function () {
		window.print();
	});

	// 상단 메뉴에서 포커스 벗어났을 시 처리
	$(document).find(':focusable').focus(function (e) {
		if ($gnbList.has(e.target).length === 0) {
			if ($moBtn.is(':hidden')) {
				$gnbList.find('>li').mouseleave();
			} else {
				$gnb.find('.moGnbClose button').click();
			}
		}
		if ($('.locationTab div').has(e.target).length === 0) {
			$('.locationTab').mouseleave();
		}
	});

	$(window).resize(function () {
		if ($moBtn.is(':hidden')) {
			$('body').removeAttr('style');
			$('.gnbList li.opNav').removeClass('opNav').children('a').removeAttr('title');
			$gnb.removeAttr('style');
			$gnb.find('div').removeAttr('style');
			$('.opNav>a').attr('title', '하위메뉴 보기').closest('li').removeClass('open');
			$('.header, .overlayBg').removeClass('active fix');
			$('.footNav ul ul').removeAttr('style');
		} else {
			$('.gnbList>li').find('div').parent('li').addClass('opNav').children('a').attr('title', '하위메뉴 보기');
		}
	});

	$('.btnTop').on({
		click: function () {
			$('html, body').animate({
				scrollTop: 0
			}, 400);
			return false;
		}
	});

});

// Tab Content
function initTabMenu(tabContainerID) {
	var tabContainer = document.getElementById(tabContainerID);
	var tabAnchor = tabContainer.getElementsByTagName("a");
	var i = 0;

	for (i = 0; i < tabAnchor.length; i++) {
		if (tabAnchor.item(i).className == "tab")
			var thismenu = tabAnchor.item(i);
		else
			continue;

		thismenu.container = tabContainer;
		thismenu.targetEl = document.getElementById(tabAnchor.item(i).href.split("#")[1]);
		thismenu.targetEl.style.display = "none";
		thismenu.imgEl = thismenu.getElementsByTagName("img").item(0);
		if (thismenu.imgEl) {
			thismenu.onfocus = function () {
				//this.onfocus();
			}
		}
		thismenu.onclick = tabMenuOver;

		if (!thismenu.container.first)
			thismenu.container.first = thismenu;
	}
	tabContainer.first.onclick();
}

function tabMenuOver() {
	var currentmenu = this.container.current;
	if (currentmenu != this) {
		if (currentmenu) {
			currentmenu.targetEl.style.display = "none";
			if (currentmenu.imgEl) {
				currentmenu.imgEl.src = currentmenu.imgEl.src.replace("_on.gif", ".gif");
				currentmenu.className = currentmenu.className.replace(" on", "");
			} else {
				currentmenu.className = currentmenu.className.replace(" on", "");
			}
		}

		this.targetEl.style.display = "block";
		if (this.imgEl) {
			this.imgEl.src = this.imgEl.src.replace(".gif", "_on.gif");
			this.className += " on";
		} else {
			this.className += " on";
		}
		this.container.current = this;
	}
	return false;
}

// 레이어 팝업 제어
var dialogOpen = false,
	lastFocus, dialog, okbutton, pagebackground;
var popId;

function showDialog(el, disView, pop) {
	lastFocus = el || document.activeElement;
	if (disView !== undefined) {
		if (pop !== undefined) {
			toggleDialog('show', disView, pop);
		} else {
			toggleDialog('show', disView, '');
		}
	} else {
		toggleDialog('show', '', '');
	}
}

function hideDialog(el, pop) {
	if (pop == undefined) {
		toggleDialog('hide', '', '');
	} else {
		toggleDialog('hide', '', pop);
	}
}

function toggleDialog(sh, disView, pop) {
	viewCode = disView;
	popId = pop;


	if (popId == '') {
		dialog = document.getElementById("layerPop");
	} else {
		dialog = document.getElementById(popId);
	}
	pagebackground = document.getElementById("container");
	var moBtn = $('.btnMoGnb');
	if (sh == "show") {
		dialogOpen = true;
		// show the dialog
		dialog.style.display = viewCode;
		// after displaying the dialog, focus an element inside it
		dialog.focus();
		// only hide the background *after* you've moved focus out of the content that will be "hidden"
		pagebackground.setAttribute("aria-hidden", "true");
	} else {
		dialogOpen = false;
		dialog.style.display = 'none';
		pagebackground.setAttribute("aria-hidden", "false");
		lastFocus.focus();
	}
}
document.addEventListener("focus", function (event) {
	if (dialogOpen && !dialog.contains(event.target)) {
		event.stopPropagation();
		dialog.focus();
	}
}, true);
document.addEventListener("keydown", function (event) {
	if (dialogOpen && event.keyCode == 27) {
		toggleDialog('hide');
	}
}, true);

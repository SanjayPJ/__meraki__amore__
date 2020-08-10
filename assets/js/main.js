/*
	Visualize by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

$(function () {
	// Vars.
	var $window = $(window),
		$body = $("body"),
		$wrapper = $("#wrapper");

	// Breakpoints.
	skel.breakpoints({
		xlarge: "(max-width: 1680px)",
		large: "(max-width: 1280px)",
		medium: "(max-width: 980px)",
		small: "(max-width: 736px)",
		xsmall: "(max-width: 480px)",
	});

	// Disable animations/transitions until everything's loaded.
	$body.addClass("is-loading");

	$window.on("load", function () {
		$body.removeClass("is-loading");
	});

	// Poptrox.
	$window.on("load", function () {
		$(".thumbnails").poptrox({
			onPopupClose: function () {
				$body.removeClass("is-covered");
			},
			onPopupOpen: function () {
				$body.addClass("is-covered");
			},
			baseZIndex: 10001,
			useBodyOverflow: false,
			usePopupEasyClose: true,
			overlayColor: "#000000",
			overlayOpacity: 0.75,
			popupLoaderText: "",
			fadeSpeed: 500,
			usePopupDefaultStyling: false,
			windowMargin: skel.breakpoint("small").active ? 5 : 50,
		});
	});
});

// MY CODE

$(document).ready(function () {
	$.get("https://www.instagram.com/__meraki__amore__/?__a=1", function (data) {
		const profile_pic_url = data.graphql.user.profile_pic_url;
		const images = data.graphql.user.edge_owner_to_timeline_media.edges;

		let posts = [];

		images.forEach((item) => {
			let post = {};
			post.thumbnail_src = item.node.thumbnail_src;
			post.url = "https://www.instagram.com/p/" + item.node.shortcode;
			post.caption = item.node.edge_media_to_caption.edges[0].node.text;

			posts.push(post);
		});

		const post_counts = posts.length / 3;

		$(".avatar img").attr("src", profile_pic_url);

		$item_container1 = $("<div>", { id: "first" });
		$item_container2 = $("<div>", { id: "second" });
		$item_container3 = $("<div>", { id: "third" });

		for (i = 0; i < 4; i++) {
			$item_container1.append(createItem(posts[i]));
			$item_container2.append(createItem(posts[5 + i]));
			$item_container3.append(createItem(posts[8 + i]));
		}

		$item_container1.appendTo(".thumbnails");
		$item_container2.appendTo(".thumbnails");
		$item_container3.appendTo(".thumbnails");
	});

	function createItem(post) {
		let $item_a = $("<a>", { href: post.url, target: "_blank" });
		let $item_img = $("<img>", { src: post.thumbnail_src });
		let $item_desc = $("<h3>", { text: post.caption });

		$item_a.append($item_img, $item_desc);

		return $item_a;
	}
});

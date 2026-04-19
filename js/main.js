(() => {
	function get_cookie(name){
		const cookie = decodeURIComponent(document.cookie).split(';').find((c) => c.split('=')[0] === name);

		if(cookie){
			return cookie.split('=')[1];
		}

		return null;
	}

	function set_cookie(name, value, expires){
		document.cookie = `${name}=${value}; expires=${expires}; path=/`;
	}

	function set_dark_mode(){
		const expires = Date.now() + (60 * 1000);

		set_cookie('dark', '1', expires);

		document.documentElement.style.setProperty('--text-color', 'var(--white)');
		document.documentElement.style.setProperty('--body-color', 'var(--black)');
	}

	function set_light_mode(){
		const expires = Date.now() + (60 * 1000);

		set_cookie('dark', '0', expires);

		document.documentElement.style.setProperty('--text-color', 'var(--black)');
		document.documentElement.style.setProperty('--body-color', 'var(--white)');
	}

	window.addEventListener('DOMContentLoaded', () => {
		let forwards = true;

		if(get_cookie('dark') === '0'){
			forwards = false;
		}

		const options = {
			duration: 200,
			fill: 'both'
		};
		const icon = document.querySelector('#bright-mode-icon');
		const knob = icon.parentNode;
		const animations = [
			knob.animate(
				[
					{
						transform: 'translateX(0px)'
					},
					{
						transform: 'translateX(30px)'
					}
				],
				options
			),
			icon.children[0].animate(
				[
					{
						transform: 'translate(50px, 50px) scale(0)'
					},
					{
						transform: 'translate(0px, 0px) scale(1)'
					}
				],
				options
			),
			icon.children[1].animate(
				[
					{
						r: 45
					},
					{
						r: 30
					}
				],
				options
			),
			icon.children[2].animate(
				[
					{
						cx: 60,
						cy: 40
					},
					{
						cx: 50,
						cy: 50
					}
				],
				options
			),
			icon.children[3].animate(
				[
					{
						r: 0,
						cx: 60,
						cy: 40
					},
					{
						r: 25,
						cx: 50,
						cy: 50
					}
				],
				options
			)
		];

		animations[0].addEventListener('finish', () => {
			if(forwards){
				set_dark_mode();
			}else{
				set_light_mode();
			}
		});

		animations.forEach((a) => a.pause());

		if(forwards){
			set_dark_mode();
		}else{
			set_light_mode();

			animations.forEach((a) => a.currentTime = a.effect.getTiming().duration);
		}

		document.querySelectorAll('div.switch').forEach((switch_element) => {
			switch_element.addEventListener('click', () => {
				const icon = switch_element.children[0].children[0];

				if(forwards){
					animations.forEach((a) => a.playbackRate = 1);
				}else{
					animations.forEach((a) => a.playbackRate = -1);
				}

				animations.forEach((a) => a.play());

				forwards = !forwards;
			});
		});
	});
})();


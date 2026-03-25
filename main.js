function updateOpacity() {
	const viewportCenter = window.innerHeight / 2;
	const divs = document.querySelectorAll('main div');

	divs.forEach(div => {
		const rect = div.getBoundingClientRect();
		const divCenter = rect.top + (rect.height / 2);
		const distance = Math.abs(viewportCenter - divCenter);
		const opacity = Math.max(Math.min(1.20 - (distance / viewportCenter), 1), 0);
		div.style.opacity = opacity;

		const shadowColor = div.classList.contains('game')
			? `rgb(255 215 0 / 0.2)`
			: `rgb(0 0 255 / 0.2)`;
		const shadowSize = 32 * opacity * opacity * opacity;
		div.style.boxShadow = `0px 0px ${shadowSize}px ${shadowSize}px ${shadowColor}`;
	});
}

window.addEventListener('scroll', updateOpacity);
window.addEventListener('resize', updateOpacity);
updateOpacity();
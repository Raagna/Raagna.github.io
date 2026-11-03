// Thumbing through the crate: pointing at a sleeve (or tabbing to it) drops the
// sleeves in front of it and floods the wall in its colour. Without this file
// the crate still works, with every sleeve a plain link to its project.

const shop = document.querySelector('.shop');
const crate = document.querySelector('.crate');
const items = [...document.querySelectorAll('.crate li')];

function show(index) {
	items.forEach((item, i) => item.classList.toggle('is-down', i < index));
	shop.dataset.wall = items[index].querySelector('.sleeve').dataset.sleeve;
}

function reset() {
	items.forEach((item) => item.classList.remove('is-down'));
	shop.dataset.wall = 'shop';
}

const canHover = window.matchMedia('(hover: hover)').matches;

items.forEach((item, index) => {
	const sleeve = item.querySelector('.sleeve');
	if (canHover) sleeve.addEventListener('pointerenter', () => show(index));
	sleeve.addEventListener('focus', () => show(index));
});

if (canHover) crate.addEventListener('pointerleave', reset);
crate.addEventListener('focusout', (event) => {
	if (!crate.contains(event.relatedTarget)) reset();
});

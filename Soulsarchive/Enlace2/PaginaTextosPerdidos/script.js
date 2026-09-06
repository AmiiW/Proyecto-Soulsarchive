// Floating characters system
(function(){
	const behind = document.getElementById('floating-behind');
	const front = document.getElementById('floating-front');
	const CHARSET = "!@#$%&*()[]{}<>/\\=+-_abcdefghijklmnopqrstuvwxyz0123456789";
	const COUNT = 60; // total chars
	const width = () => window.innerWidth;
	const height = () => window.innerHeight;

	function rand(min, max){ return Math.random()*(max-min)+min }

	class FloatChar{
		constructor(container){
			this.el = document.createElement('span');
			this.el.className = 'floating-char';
			this.el.textContent = CHARSET.charAt(Math.floor(Math.random()*CHARSET.length));
			this.depth = Math.random() < 0.45 ? 'behind' : 'front';
			this.vx = rand(-0.03,0.03);
			this.vy = rand(-0.02,0.02);
			this.x = rand(0, width());
			this.y = rand(0, height());
			this.scale = rand(0.6,1.3) * (this.depth==='behind'?0.7:1.2);
			this.opacity = rand(0.2,0.95);
			this.rotate = rand(-30,30);
			this.el.style.fontSize = Math.round(14*this.scale)+'px';
			this.el.style.opacity = this.opacity;
			this.container = container;
			container.appendChild(this.el);
			this.update(true);
		}
		update(first){
			this.x += this.vx * (this.depth==='behind'?0.6:1.6) * (first?1:1);
			this.y += this.vy * (this.depth==='behind'?0.6:1.6) * (first?1:1);
			if(this.x < -50) this.x = width()+50;
			if(this.x > width()+50) this.x = -50;
			if(this.y < -50) this.y = height()+50;
			if(this.y > height()+50) this.y = -50;
			this.el.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotate}deg)`;
		}
	}

	let floats = [];
	function populate(){
		[behind,front].forEach(c=>c.innerHTML='');
		floats = [];
		for(let i=0;i<COUNT;i++){
			const container = Math.random()<0.5 ? behind : front;
			floats.push(new FloatChar(container));
		}
	}

	let last = performance.now();
	function tick(now){
		last = now;
		floats.forEach(f=> f.update(false));
		requestAnimationFrame(tick);
	}

	window.addEventListener('resize', ()=>{
		floats.forEach(f=>{ f.x = rand(0,width()); f.y = rand(0,height()); f.update(true) });
	});

	populate();
	requestAnimationFrame(tick);

	const avatar = document.getElementById('avatar');
	if(avatar && (avatar.getAttribute('src')||'').includes('placeholder')){
		const cvs = document.createElement('canvas'); cvs.width=256; cvs.height=256;
		const ctx = cvs.getContext('2d');
		ctx.fillStyle='#222'; ctx.fillRect(0,0,256,256);
		ctx.fillStyle='#66ffcc'; ctx.fillRect(28,28,200,200);
		ctx.fillStyle='#0b0b0b'; ctx.font='bold 40px monospace'; ctx.textAlign='center'; ctx.textBaseline='middle';
		ctx.fillText('EN',128,128);
		avatar.src = cvs.toDataURL();
	}
})();

// Gallery and lightbox
(function(){
	const gallery = document.getElementById('gallery-grid');
	const lightbox = document.getElementById('lightbox');
	const lightboxImage = document.getElementById('lightbox-image');
	const closeButton = lightbox.querySelector('.lightbox-close');

	if(!gallery || !lightbox || !lightboxImage) return;

	function openLightbox(src, alt){
		lightboxImage.src = src;
		lightboxImage.alt = alt;
		lightbox.classList.add('open');
		lightbox.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
	}

	function closeLightbox(){
		lightbox.classList.remove('open');
		lightbox.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';
	}

	Array.from(gallery.querySelectorAll('.gallery-card')).forEach((card) => {
		card.addEventListener('click', () => {
			openLightbox(card.dataset.src, card.dataset.alt || 'Imagen ampliada');
		});
	});

	closeButton.addEventListener('click', closeLightbox);
	lightbox.addEventListener('click', (event) => {
		if(event.target === lightbox) closeLightbox();
	});
	document.addEventListener('keydown', (event) => {
		if(event.key === 'Escape') closeLightbox();
	});
})();

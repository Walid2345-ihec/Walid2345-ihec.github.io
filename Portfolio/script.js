// Map interactions and governorate details display
var map = document.querySelector('#map');
if (!map) { throw new Error('Map element (#map) not found'); }

var areas = map.querySelectorAll('.map--svg a');

// Governorates data provided by the user
const governorates = {
	tunis: { name: "Tunis", surface: "346 km²", longueur: "15 km", largeur: "20 km", habitants: "1,056,247", pourcentage: "8.8%", plat: "Couscous au poisson, Brik à l'œuf, Fricassé", celebre: "Mosquée Zitouna, Médina historique (UNESCO), Avenue Habib Bourguiba", color: "#FFD700" },
	ariana: { name: "Ariana", surface: "482 km²", longueur: "25 km", largeur: "22 km", habitants: "576,088", pourcentage: "4.8%", plat: "Mloukhiya, Kaftaji, Tajine malsouka", celebre: "La Soukra, Raoued, Zone industrielle moderne", color: "#FFB6C1" },
	ben_arous: { name: "Ben Arous", surface: "761 km²", longueur: "35 km", largeur: "28 km", habitants: "631,842", pourcentage: "5.3%", plat: "Tajine Merguez, Lablabi, Couscous bel allouch", celebre: "Hammam-Lif, Radès (stade olympique), Ezzahra", color: "#90EE90" },
	manouba: { name: "Manouba", surface: "1,137 km²", longueur: "40 km", largeur: "32 km", habitants: "379,518", pourcentage: "3.2%", plat: "Borghol, Makroudh, Assidat zgougou", celebre: "Dougga (site romain UNESCO), Université de la Manouba", color: "#FFD700" },
	nabeul: { name: "Nabeul", surface: "2,788 km²", longueur: "85 km", largeur: "45 km", habitants: "787,920", pourcentage: "6.6%", plat: "Poisson grillé, Harissa de Nabeul, Salade mechouia", celebre: "Cap Bon, Plages paradisiaques, Poterie artisanale, Agrumes", color: "#FFD700" },
	zaghouan: { name: "Zaghouan", surface: "2,768 km²", longueur: "70 km", largeur: "50 km", habitants: "176,945", pourcentage: "1.5%", plat: "Droo, Hlalem, Couscous aux fèves", celebre: "Temple des Eaux (aqueduc romain), Sources naturelles", color: "#C0C0C0" },
	bizerte: { name: "Bizerte", surface: "3,685 km²", longueur: "95 km", largeur: "65 km", habitants: "568,219", pourcentage: "4.7%", plat: "Poisson frit, Couscous au poulpe, Charmla", celebre: "Vieux Port, Parc national d'Ichkeul (UNESCO), Plages", color: "#0cbcd3" },
	beja: { name: "Béja", surface: "3,740 km²", longueur: "90 km", largeur: "55 km", habitants: "303,032", pourcentage: "2.5%", plat: "Chakchouka, Ommek houria, Couscous aux artichauts", celebre: "Agriculture céréalière, Forêts de chênes-lièges", color: "#FFD700" },
	jendouba: { name: "Jendouba", surface: "3,102 km²", longueur: "85 km", largeur: "48 km", habitants: "401,477", pourcentage: "3.3%", plat: "Frik, Hergma, Couscous aux petits pois", celebre: "Bulla Regia (site romain), Chemtou (marbre numide)", color: "#228B22" },
	kef: { name: "Le Kef", surface: "4,965 km²", longueur: "110 km", largeur: "70 km", habitants: "243,156", pourcentage: "2.0%", plat: "Chekhchoukha, Rechta, Berkoukes", celebre: "Kasbah historique, Table de Jugurtha, Médina", color: "#FF8C00" },
	siliana: { name: "Siliana", surface: "4,631 km²", longueur: "95 km", largeur: "65 km", habitants: "223,087", pourcentage: "1.9%", plat: "Mesfouf, Zgougou, Borghol", celebre: "Makthar (ruines romaines), Agriculture et élevage", color: "#C0C0C0" },
	sousse: { name: "Sousse", surface: "2,669 km²", longueur: "75 km", largeur: "42 km", habitants: "674,971", pourcentage: "5.6%", plat: "Poisson grillé, Pâtisseries orientales, Tajine", celebre: "Médina UNESCO, Ribat, Station balnéaire, Port El-Kantaoui", color: "#FFB6C1" },
	monastir: { name: "Monastir", surface: "1,019 km²", longueur: "45 km", largeur: "28 km", habitants: "548,828", pourcentage: "4.6%", plat: "Salade Mechouia, Mloukhiya, Poisson", celebre: "Ribat fortifié, Mausolée Bourguiba, Aéroport international", color: "#FFDAB9" },
	mahdia: { name: "Mahdia", surface: "2,966 km²", longueur: "80 km", largeur: "45 km", habitants: "410,812", pourcentage: "3.4%", plat: "Poisson frais, Couscous aux calamars, Hout mabkhoukh", celebre: "Port de pêche, Skifa Kahla, Plages dorées", color: "#FFA500" },
	sfax: { name: "Sfax", surface: "7,545 km²", longueur: "135 km", largeur: "75 km", habitants: "955,421", pourcentage: "8.0%", plat: "Couscous sfaxien, Droo, Gargoulette", celebre: "2ème ville économique, Médina, Îles Kerkennah, Industrie", color: "#FFD700" },
	kairouan: { name: "Kairouan", surface: "6,712 km²", longueur: "125 km", largeur: "68 km", habitants: "570,559", pourcentage: "4.8%", plat: "Makroudh, Couscous au oseban, Mloukhiya", celebre: "Grande Mosquée, 4ème ville sainte de l'Islam, Médina UNESCO", color: "#DA70D6" },
	kasserine: { name: "Kasserine", surface: "8,260 km²", longueur: "145 km", largeur: "85 km", habitants: "439,243", pourcentage: "3.7%", plat: "Berkoukech, Aïch, Couscous traditionnel", celebre: "Sbeitla (ruines romaines), Parc national Chambi", color: "#90EE90" },
	sidi_bouzid: { name: "Sidi Bouzid", surface: "7,405 km²", longueur: "130 km", largeur: "75 km", habitants: "429,912", pourcentage: "3.6%", plat: "Couscous traditionnel, Bsisa, Hlalem", celebre: "Berceau de la Révolution 2011, Agriculture", color: "#FFD700" },
	gafsa: { name: "Gafsa", surface: "8,990 km²", longueur: "155 km", largeur: "80 km", habitants: "337,331", pourcentage: "2.8%", plat: "Mermez, Chouchou, Tajine oasis", celebre: "Bassin minier de phosphate, Oasis, Thermes romains", color: "#9370DB" },
	tozeur: { name: "Tozeur", surface: "5,593 km²", longueur: "110 km", largeur: "65 km", habitants: "107,912", pourcentage: "0.9%", plat: "Dattes Deglet Nour, Tajine oasis, Pain berbère", celebre: "Oasis de palmeraies, Chott el-Djérid, Désert, Star Wars", color: "#FFD700" },
	kebili: { name: "Kébili", surface: "22,084 km²", longueur: "220 km", largeur: "145 km", habitants: "156,961", pourcentage: "1.3%", plat: "Dattes, Pain oasis, Couscous aux dattes", celebre: "Ksar Ghilane, Douz (porte du désert), Grand Erg Oriental", color: "#FFA500" },
	gabes: { name: "Gabès", surface: "7,166 km²", longueur: "130 km", largeur: "70 km", habitants: "374,300", pourcentage: "3.1%", plat: "Couscous aux légumes, Hout marka, Tajine poisson", celebre: "Oasis maritime unique, Marché aux épices, Industrie chimique", color: "#FFA500" },
	medenine: { name: "Médenine", surface: "8,588 km²", longueur: "145 km", largeur: "80 km", habitants: "479,520", pourcentage: "4.0%", plat: "Bsisa, Couscous berbère, Rougag", celebre: "Ksour (greniers fortifiés), Matmata, Architecture troglodyte", color: "#90EE90" },
	tataouine: { name: "Tataouine", surface: "38,889 km²", longueur: "280 km", largeur: "185 km", habitants: "149,453", pourcentage: "1.2%", plat: "Couscous berbère, Akolet, Rougag", celebre: "Chenini, Ksar Ouled Soltane, Décors Star Wars, Désert", color: "#90EE90" }
	};

	// default emojis to attach to each governorate entry (keeps database entries rich)
	const defaultIcons = {
		main: '📍',
		surface: '📐',
		population: '👥',
		concentration: '📊',
		dimensions: '📏',
		gastronomy: '🍽️',
		celebre: '🏆'
	};

	Object.keys(governorates).forEach(function(k){
		if (!governorates[k].icon) governorates[k].icon = defaultIcons.main;
		if (!governorates[k].icons) governorates[k].icons = defaultIcons;
	});

// Map id -> governorate key
const idToKey = {
	11: 'tunis', 12: 'ariana', 13: 'ben_arous', 14: 'manouba',
	21: 'nabeul', 22: 'zaghouan', 23: 'bizerte',
	31: 'beja', 32: 'jendouba', 33: 'kef', 34: 'siliana',
	41: 'kairouan', 42: 'kasserine', 43: 'sidi_bouzid',
	51: 'sousse', 52: 'monastir', 53: 'mahdia',
	61: 'sfax', 71: 'gafsa', 72: 'tozeur', 73: 'kebili',
	81: 'gabes', 82: 'medenine', 83: 'tataouine'
};

// Mapping from governorate key -> page file inside the Gouvernorats folder
const governorateToFile = {
	tunis: 'Gouvernorats/Tunis.html',
	ariana: 'Gouvernorats/Ariana.html',
	ben_arous: 'Gouvernorats/BenArous.html',
	manouba: 'Gouvernorats/Manouba.html',
	nabeul: 'Gouvernorats/Nabeul.html',
	zaghouan: 'Gouvernorats/Zaghouan.html',
	bizerte: 'Gouvernorats/Bizerte.html',
	beja: 'Gouvernorats/Béja.html',
	jendouba: 'Gouvernorats/Jendouba.html',
	kef: 'Gouvernorats/Kef.html',
	siliana: 'Gouvernorats/Siliana.html',
	kairouan: 'Gouvernorats/Kairouan.html',
	kasserine: 'Gouvernorats/Kasserine.html',
	sidi_bouzid: 'Gouvernorats/SidiBouzid.html',
	sousse: 'Gouvernorats/Sousse.html',
	monastir: 'Gouvernorats/Monastir.html',
	mahdia: 'Gouvernorats/Mahdia.html',
	sfax: 'Gouvernorats/Sfax.html',
	gafsa: 'Gouvernorats/Gafsa.html',
	tozeur: 'Gouvernorats/Tozeur.html',
	kebili: 'Gouvernorats/Kebili.html',
	gabes: 'Gouvernorats/Gabes.html',
	medenine: 'Gouvernorats/Medenine.html',
	tataouine: 'Gouvernorats/Tataouine.html'
};

// DOM refs for details
var detailsPanel = document.getElementById('detailsPanel');
var detailsContent = document.getElementById('detailsContent');
var govName = document.getElementById('govName');
var govIcon = document.getElementById('govIcon');

function clearActive() {
	map.querySelectorAll('.is-active').forEach(function(item){ item.classList.remove('is-active'); });
	// reset path fills to each governorate color (preserve the per-region colors)
	map.querySelectorAll('.map--svg a path').forEach(function(p){
		var parent = p.closest('a');
		if (!parent) return;
		var aid = parent.id.replace('area-','');
		var key = idToKey[Number(aid)];
		if (key && governorates[key] && governorates[key].color) {
			p.style.fill = governorates[key].color;
		} else {
			p.style.fill = '';
		}
	});
}

function showGovernorateById(id){
	if (!id) return;
	var key = idToKey[Number(id)];
	if (!key || !governorates[key]) return;
	var g = governorates[key];

	// populate details
	govName.textContent = g.name;
	govIcon.textContent = g.icon || g.name.charAt(0);

	var perc = parseFloat((g.pourcentage || '0').toString().replace('%','')) || 0;
	var icons = g.icons || {};

	detailsContent.innerHTML = `
		<div class="info-card">
			<div class="info-label">${icons.population || '👥'} Population</div>
			<div class="info-value">${g.habitants}</div>
		</div>
		<div class="info-card">
			<div class="info-label">${icons.surface || '📐'} Surface</div>
			<div class="info-value">${g.surface}</div>
		</div>
		<div class="info-card">
			<div class="info-label">${icons.dimensions || '📏'} Dimensions (L x l)</div>
			<div class="info-value">${g.longueur} × ${g.largeur}</div>
		</div>
		<div class="info-card">
			<div class="info-label">${icons.gastronomy || '🍽️'} Gastronomie</div>
			<div class="info-value">${g.plat}</div>
		</div>
		<div class="info-card">
			<div class="info-label">${icons.celebre || '🏆'} Célèbre pour</div>
			<div class="info-value">${g.celebre}</div>
		</div>
		<div class="info-card">
			<div class="info-label">${icons.concentration || '📊'} Part de la population</div>
			<div class="info-value">${g.pourcentage}</div>
			<div class="percentage-bar"><div class="percentage-fill" style="width:${Math.min(100,perc*10)}%;background:${g.color};">${g.pourcentage}</div></div>
		</div>
	`;

	// add a 'Voir détails' button that navigates to the gouvernorat page
	try{
		var page = governorateToFile[key] || ('Gouvernorats/' + g.name + '.html');
		var detailsLink = document.createElement('a');
		detailsLink.className = 'details-button';
		detailsLink.textContent = 'Voir détails';
		detailsLink.href = page;
		detailsLink.target = '_self';
		detailsLink.setAttribute('role','button');
		detailsLink.style.display = 'inline-block';
		detailsLink.style.marginTop = '8px';
		detailsLink.style.padding = '8px 12px';
		detailsLink.style.background = g.color || '#333';
		detailsLink.style.color = '#fff';
		detailsLink.style.borderRadius = '4px';
		detailsLink.style.textDecoration = 'none';
		detailsContent.appendChild(detailsLink);
	}catch(e){
		// ignore button if something fails
	}

	// highlight area
	clearActive();
	var areaEl = document.querySelector('#area-' + id);
	if (areaEl) areaEl.classList.add('is-active');

	// color the path for the area
	var path = areaEl && areaEl.querySelector('path');
	if (path) path.style.fill = g.color || '#FFD700';
}

// Apply the predefined colors to all gouvernorats on load
function colorAllGovernorates(){
	Object.keys(idToKey).forEach(function(aid){
		var key = idToKey[Number(aid)];
		var areaEl = document.querySelector('#area-' + aid);
		if (!areaEl) return;
		var path = areaEl.querySelector('path');
		if (!path) return;
		if (key && governorates[key] && governorates[key].color) path.style.fill = governorates[key].color;
	});
}

// wire events for areas: only click should show details (no hover)
areas.forEach(function(a){
	a.addEventListener('click', function(e){
		e.preventDefault();
		var id = this.id.replace('area-','');
		showGovernorateById(id);
	});
});

// Do not clear the clicked selection on mouseleave — keep selection visible until another click

// initialize: color all regions
colorAllGovernorates();

// Add text labels (governorate names) centered on each path's bounding box
// compute approximate centroid by sampling path points (safe helper)
function computeCentroid(pathEl, samples){
	samples = samples || 40;
	try{
		var len = pathEl.getTotalLength();
		if (!len || !isFinite(len)) return null;
	} catch(e){
		return null;
	}
	var sx = 0, sy = 0, count = 0;
	for (var i=0;i<samples;i++){
		var pt = pathEl.getPointAtLength((i/(samples-1))*len);
		sx += pt.x; sy += pt.y; count++;
	}
	return count?{x: sx/count, y: sy/count}:null;
}

function addLabels(){
	var svg = map.querySelector('svg');
	if (!svg) return;

	// remove existing labels
	svg.querySelectorAll('.gov-label').forEach(function(t){ t.remove(); });

	Object.keys(idToKey).forEach(function(aid){
		var key = idToKey[Number(aid)];
		var areaEl = document.querySelector('#area-' + aid);
		if (!areaEl) return;
		var path = areaEl.querySelector('path');
		if (!path) return;

		var bbox = null;
		try{ bbox = path.getBBox(); } catch(e){ bbox = null; }

		var x = null, y = null;
		// centralize specially for these regions using centroid sampling
		if (['jendouba','beja','medenine'].indexOf(key) !== -1){
			var c = computeCentroid(path, 80);
			if (c && isFinite(c.x) && isFinite(c.y)){
				x = c.x; y = c.y;
			}
		}
		// fallback to bbox center
		if (x === null || y === null){
			if (!bbox) return; // skip if no valid position
			x = bbox.x + bbox.width / 2;
			y = bbox.y + bbox.height / 2;
		}

		// create SVG text element
		var text = document.createElementNS('http://www.w3.org/2000/svg','text');
		text.setAttribute('x', x);
		text.setAttribute('y', y);
		text.setAttribute('class', 'gov-label');
		text.setAttribute('text-anchor', 'middle');
		text.setAttribute('pointer-events', 'none');

		// adapt font size to area size (clamped), fallback to 12 when bbox missing
		var fs = 12;
		if (bbox && isFinite(bbox.width) && isFinite(bbox.height)) fs = Math.max(6, Math.min(2, Math.round(Math.min(bbox.width, bbox.height)/6)));
		text.setAttribute('font-size', fs);
		text.textContent = (governorates[key] && governorates[key].name) ? governorates[key].name : key;

		svg.appendChild(text);
	});
}

// recompute labels on resize to keep them positioned
window.addEventListener('resize', function(){
	// small timeout to allow layout to settle
	setTimeout(function(){
		colorAllGovernorates();
		addLabels();
	}, 150);
});

// initial labels
addLabels();



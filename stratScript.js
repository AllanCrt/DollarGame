 function getRandomIntInclusive(min, max) {
 	min = Math.ceil(min);
 	max = Math.floor(max);
 	let resultat =  Math.floor(Math.random() * (max - min +1)) + min;
 	return resultat;
 }


function creation_graphe(taille) {

	//Le graphe complet avec tout les sommets et toutes les arretes

	let graphe_complet = 
	[[0,-1,1,3,4],[1,-1,0,2,3,4,5],[2,-1,1,4,5],
	[3,-1,0,1,4,6,7],[4,-1,0,1,2,3,5,6,7,8],[5,-1,1,2,4,7,8],
	[6,-1,3,4,7],[7,-1,3,4,5,6,8],[8,-1,4,5,7]];
	
	for (let i = 0; i < (9 - taille); i++) {
		//Recherche d'un sommet aléatoire à supprimer

		sommet_elimine = 4;
		while(sommet_elimine == 4){
			position_sommet_elimine = getRandomIntInclusive(0,graphe_complet.length-1);
			sommet_elimine = graphe_complet[position_sommet_elimine][0];
		}

		//Suppression des arrètes en lien avec le sommet éliminé


		for (let i = 0; i < graphe_complet.length; i++) {
			const index = graphe_complet[i].indexOf(sommet_elimine);
			if (index > -1) {
				graphe_complet[i].splice(index, 1);
			}
		}

		//Suppression du sommet

		graphe_complet.splice(position_sommet_elimine,1);

	}

	//Set up du poids des sommets pour que la somme fasse 0
	nombre_voisins = 0;
	for (let i = 0; i < graphe_complet.length; i++) {
		nombre_voisins += (graphe_complet[i].length - 2);
	}
	nombre_arretes = nombre_voisins / 2;
	poids_total = 0;
	for (let i = 0; i < graphe_complet.length; i++) {
		poids = getRandomIntInclusive(-graphe_complet.length,graphe_complet.length);
		if (i == (graphe_complet.length - 1)) {
			poids = (nombre_arretes - graphe_complet.length + 1) - poids_total;
		}
		poids_total = poids_total + poids;
		graphe_complet[i][1] = poids;
	}


	//Affichage graphe généré

	// for (let i = 0; i < graphe_complet.length; i++) {
	// 	console.log(graphe_complet[i]);
	// }

	return graphe_complet;
}

function gagner(){
	var gagner = true;
	for (let i = 0; i < grapheCourant.length; i++){
		if (grapheCourant[i][1] < 0){
			gagner = false;
		}
	}
	return gagner;
}

//Trouve le numero du sommet avec la plus grande valeur, si il y en a plusieurs, prend le premier par ordre des numeros de sommet
function max(){
	var max = -10000000;
	var maxsommet;
	for (let i = 0; i < grapheCourant.length; i++){
		if(grapheCourant[i][1] > max){
			max = grapheCourant[i][1];
			maxsommet = grapheCourant[i][0];
		}
	}
	return maxsommet;
}

function decremente(numsommet){
	grapheCourant[position(numsommet)][1] =  grapheCourant[position(numsommet)][1] - grapheCourant[position(numsommet)].length + 2;
}

function incremente(numsommet){	
	grapheCourant[position(numsommet)][1] += 1;
}

function position(numsommet){
	for (let i = 0; i < grapheCourant.length; i++){
		if (grapheCourant[i][0] == numsommet) {
			return i;
		}
	}
}

function click(numsommet){
	decremente(numsommet);
	for (let y = 2; y < grapheCourant[position(numsommet)].length; y++){
		incremente(grapheCourant[position(numsommet)][y]);
	}
}

//Applique la stratégie sur 100 coups sauf si le jeu est gagné au milieu des tentatives
function statStratPlusGrand(){
	var i = 0;
	grapheCourant = creation_graphe(6);
	while(!gagner() && i<100){
		click(max());
		i++;
	}
	if(gagner()){
		return true;
	}else{
		return false;
	}
}

//on test un certains nombre de fois la stratégie et compte le nombre de succes
function test100(){
	var c =0;
	for(let i = 0; i < 10000; i++){
		if(statStratPlusGrand()){
			c++;
		}
	}
	console.log(c);
}

//Fonction main pas besoin d'expliqué t'es pas con
function main(){
	var test = document.getElementById('test');
	test.onclick = function(){test100()};
}

main();
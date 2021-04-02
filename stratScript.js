 function getRandomIntInclusive(min, max) {
 	min = Math.ceil(min);
 	max = Math.floor(max);
 	let resultat =  Math.floor(Math.random() * (max - min +1)) + min;
 	return resultat;
 }


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generation_graphe(taille, degre){
	let graphe= new Array();

	//initialise le graphe
	for (let i=0;i<taille;i++){
		graphe[i] = [i,0];
	}

	//ajoute aleatoirement les arretes
	for(let i = 0;i<taille;i++){
		for(let j=i+1; j<taille;j++){
			let rand = Math.random();
			if(degre > rand){
				graphe[i].push(j);
				graphe[j].push(i);
			}
		}
	}

	//retire les sommets qui ne contiennent pas d'arretes
    let c=0;  
	for (let i=0;i<taille;i++){
		if(graphe[i-c].length == 2){
			graphe.splice(i-c, 1);
			c++;
		}
	}

	//verifie si le graphe est bien connexe, sinon rappelle la fonction pour en générer un nouveau
	if(!est_connexe(graphe)){
		return generation_graphe(taille,degre);
	}


	//Rempli aléatoirement les poids du graphe
	let nbr_betti = nombre_betti(graphe);
	let current_val = 0;
	for(let i=0;i<graphe.length-1;i++){
		let sign = Math.random();
		let value = getRandomInt(graphe.length);
		if(current_val < nbr_betti){
			current_val += value;
			graphe[i][1] = value;
		}else if(current_val > nbr_betti){
			current_val -= value;
			graphe[i][1] = -value;
		}else{
			if(sign > 0.5){
				current_val += value;
				graphe[i][1] = value;
			}else{
				current_val -= value;
				graphe[i][1] = -value;
			}
		}
	}
	graphe[graphe.length-1][1] = nbr_betti - current_val;

	return graphe;
}

function nombre_arrete(graphe){
	let c=0;
	for(let i=0; i<graphe.length;i++){
		c += (graphe[i].length-2);
	}
	return c/2;
}

function nombre_betti(graphe){
	return nombre_arrete(graphe)-graphe.length+1;
}

//Verification de la connexite avec l'algo 'composante'
function est_connexe(graphe){
	let comp = new Array();
	for(let i=0; i<graphe.length;i++){
		comp[graphe[i][0]] = graphe[i][0];
	}
	// console.log(JSON.stringify(comp));

	for(let i = 0;i<graphe.length;i++){
		for (let j = 2;j<graphe[i].length;j++){
			if(comp[graphe[i][0]] != comp[graphe[i][j]]){
				aux = comp[graphe[i][0]];
				for(let k=0;k<graphe.length;k++){
					if(comp[graphe[k][0]]==aux){
						comp[graphe[k][0]]=comp[graphe[i][j] ];
					}
				}
			}
		}
	}
	let val = comp[graphe[0][0]];
	for (let i = 1; i<graphe.length;i++){
		if(comp[graphe[i][0]] != val){
			return false;
		}
	}
	return true;
	
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
function strat1(){
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


function strat2(){
	var max = -100000;
	var maxsommet;
	var sommevoisinsmax = 0;
	for(let i = 0; i < grapheCourant.length; i++){
		// console.log('i = '+i);
		if(grapheCourant[i][1] == max){
			var sommevoisins = 0;
			for(let j = 2; j < grapheCourant[i].length; j++){
				// console.log('sommevoisins += '+grapheCourant[position(grapheCourant[i][j])][1]);
				sommevoisins += grapheCourant[position(grapheCourant[i][j])][1];
			}
			
			// console.log('somevoisins = '+sommevoisins);
			if(sommevoisins < sommevoisinsmax){
				max = grapheCourant[i][1];
				maxsommet = grapheCourant[i][0];
			}
		}else if(grapheCourant[i][1] > max){
			max = grapheCourant[i][1];
			maxsommet = grapheCourant[i][0];
			for(let j = 2; j < grapheCourant[i].length; j++){
				// console.log('j = '+j);
				// console.log('sommevoisinsmax += '+grapheCourant[position(grapheCourant[i][j])][1]);
				sommevoisinsmax += grapheCourant[position(grapheCourant[i][j])][1];
			}
			// console.log('somevoisinsmax = '+sommevoisinsmax);

		}
	}
	// console.log('maxsommet = '+maxsommet);
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
	grapheCourant = generation_graphe(15,0.25);
	// console.log(JSON.stringify(grapheCourant));
	// strat2();
	while(!gagner() && i<1000){
		click(strat2());
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
	test.onclick = function(){test100();};
}

main();

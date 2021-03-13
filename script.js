/*  
  GRAPHE COMPLET
	0---1---2
    |\ /|\ /|          
    |/ \|/ \|    
    3---4---5
    |\ /|\ /|          
    |/ \|/ \| 
    6---7---8
 
 Le graphe est représenté en array d'array comme ceci :
 [[sommet 0, poids du sommet 0, voisin 1, voisin 2,..., voisin n],
 ...,
 [sommet 8, poids du sommet 8, voisin 1, voisin 2,..., voisin n]];

 */


 //Fonction qui renvoie un entier aléatoire entre un min et un max
 function getRandomIntInclusive(min, max) {
 	min = Math.ceil(min);
 	max = Math.floor(max);
 	let resultat =  Math.floor(Math.random() * (max - min +1)) + min;
 	return resultat;
 }

//Fonction qui dessine une ligne 
function draw(x_abs,x_ord,y_abs,y_ord) {
    const canvas = document.querySelector('canvas');

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');


    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x_abs, x_ord);
    ctx.lineTo(y_abs, y_ord);
    ctx.stroke();
}

//Fonction de génération de graphe

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

	for (let i = 0; i < graphe_complet.length; i++) {
		console.log(graphe_complet[i]);
	}

	return graphe_complet;
}


//Fonction qui affiche le graphe (front)
function affichage_graphe(taille){
	graphe = creation_graphe(taille);

	//Affichage des sommets
	for (let i = 0; i < graphe.length; i++) {
			document.getElementById(rvaleur(graphe[i][0])).style.display = "contents";
			document.getElementById(rvaleur(graphe[i][0])).innerHTML = graphe[i][1];

		//Affichage des traits 
		for (let y = 2; y < graphe[i].length; y++) {
			if ((graphe[i][0] == 0 && graphe[i][y] == 1)||
				(graphe[i][0] == 1 && graphe[i][y] == 0)) {
				draw(40,50,220,50); //0_1
			}
			else if((graphe[i][0] == 3 && graphe[i][y] == 4)||
				(graphe[i][0] == 4 && graphe[i][y] == 3)) {
				draw(40,500,220,500); //3_4
			}
			else if((graphe[i][0] == 6 && graphe[i][y] == 7)||
				(graphe[i][0] == 7 && graphe[i][y] == 6)) {
				draw(40,950,220,950); //6_7
			}
			else if((graphe[i][0] == 1 && graphe[i][y] == 2)||
				(graphe[i][0] == 2 && graphe[i][y] == 1)) {
				draw(280,50,460,50); //1_2
			}
			else if((graphe[i][0] == 5 && graphe[i][y] == 4)||
				(graphe[i][0] == 4 && graphe[i][y] == 5)) {
				draw(280,500,460,500); //4_5
			}
			else if((graphe[i][0] == 7 && graphe[i][y] == 8)||
				(graphe[i][0] == 8 && graphe[i][y] == 7)) {
				draw(280,950,460,950); //7_8
			}
			else if((graphe[i][0] == 3 && graphe[i][y] == 0)||
				(graphe[i][0] == 0 && graphe[i][y] == 3)) {
				draw(10,100,10,450); //0_3
			}
			else if((graphe[i][0] == 3 && graphe[i][y] == 6)||
				(graphe[i][0] == 6 && graphe[i][y] == 3)) {
				draw(10,550,10,900); //3_6
			}
			else if((graphe[i][0] == 1 && graphe[i][y] == 4)||
				(graphe[i][0] == 4 && graphe[i][y] == 1)) {
				draw(250,100,250,450); //1_4
			}
			else if((graphe[i][0] == 7 && graphe[i][y] == 4)||
				(graphe[i][0] == 4 && graphe[i][y] == 7)) {
				draw(250,550,250,900); //4_7
			}
			else if((graphe[i][0] == 2 && graphe[i][y] == 5)||
				(graphe[i][0] == 5 && graphe[i][y] == 2)) {
				draw(490,100,490,450); //2_5
			}
			else if((graphe[i][0] == 5 && graphe[i][y] == 8)||
				(graphe[i][0] == 8 && graphe[i][y] == 5)) {
				draw(490,550,490,900); //5_8
			}
			else if((graphe[i][0] == 0 && graphe[i][y] == 4)||
				(graphe[i][0] == 4 && graphe[i][y] == 0)) {
				draw(40,100,220,450); //0_4
			}
			else if((graphe[i][0] == 1 && graphe[i][y] == 5)||
				(graphe[i][0] == 5 && graphe[i][y] == 1)) {
				draw(280,100,460,450); //1_5
			}
			else if((graphe[i][0] == 3 && graphe[i][y] == 7)||
				(graphe[i][0] == 7 && graphe[i][y] == 3)) {
				draw(40,550,220,900); //3_7
			}
			else if((graphe[i][0] == 8 && graphe[i][y] == 4)||
				(graphe[i][0] == 4 && graphe[i][y] == 8)) {
				draw(280,550,460,900); //4_8
			}
			else if((graphe[i][0] == 3 && graphe[i][y] == 1)||
				(graphe[i][0] == 1 && graphe[i][y] == 3)) {
				draw(220,100,40,450); //1_3
			}
			else if((graphe[i][0] == 2 && graphe[i][y] == 4)||
				(graphe[i][0] == 4 && graphe[i][y] == 2)) {
				draw(460,100,280,450); //2_4
			}
			else if((graphe[i][0] == 6 && graphe[i][y] == 4)||
				(graphe[i][0] == 4 && graphe[i][y] == 6)) {
				draw(220,550,40,900); //4_6
			}
			else if((graphe[i][0] == 5 && graphe[i][y] == 7)||
				(graphe[i][0] == 7 && graphe[i][y] == 5)) {
				draw(460,550,280,900); //5_7
			}
		}
	}
}

//Fonction qui decremente du nombre de voisins le sommet cliqué
function decremente(numsommet){
	valeur = rvaleur(numsommet);
	var v = document.getElementById(valeur).innerHTML;
	v = (v - graphe[position(numsommet)].length + 2);
	document.getElementById(valeur).innerHTML = v;
	graphe[position(numsommet)][1] =  graphe[position(numsommet)][1] - graphe[position(numsommet)].length + 2;
	console.log(graphe[position(numsommet)]);
}

//Fonction qui incremente de 1 les voisins du sommet cliqué
function incremente(numsommet){
	valeur = rvaleur(numsommet);
	var v = document.getElementById(valeur).innerHTML;
	v = v - (-1);
	document.getElementById(valeur).innerHTML = v;
	graphe[position(numsommet)][1] += 1;
	console.log(graphe[position(numsommet)]);

}

/*Fonction qui renvoie l'index du sommet dans l'array du graphe, par exemple
[[0][1][4][6][7]] --> ici le sommet 4 est en index 2*/
function position(numsommet){
	for (let i = 0; i < graphe.length; i++){
		if (graphe[i][0] == numsommet) {
			return i;
		}
	}
}

/*Fonction qui enlève 1millard de ligne de code et permet d'éviter enormement de redondance 
 dans les appels. Avec le numéro du sommet renvoie l'ID de la div du sommet (HTML) */
function rvaleur(numsommet){
	if (numsommet==0) {return "valeur_0";}
	else if (numsommet==1) {return "valeur_1";}
	else if (numsommet==2) {return "valeur_2";}
	else if (numsommet==3) {return "valeur_3";}
	else if (numsommet==4) {return "valeur_4";}
	else if (numsommet==5) {return "valeur_5";}
	else if (numsommet==6) {return "valeur_6";}
	else if (numsommet==7) {return "valeur_7";}
	else if (numsommet==8) {return "valeur_8";}
}

//Fonction qui s'éxecute lorsqu'un sommet est cliqué
function click(numsommet){ 
	decremente(numsommet);
	i = position(numsommet);
	for (let y = 2; y < graphe[i].length; y++){
		incremente(graphe[i][y]);
	}
	gagner();
}

//Fonction qui vérifie si la game est win si oui affiche bravo etc
function gagner(){ 
	var gagner = true;
	for (let i = 0; i < graphe.length; i++){
		if (graphe[i][1] < 0){
			gagner = false;
		}
	}
	if(gagner == true){
		alert("Bravo t'as gagné");	
		document.location.reload();
	}
}

//Fonction main pas besoin d'expliqué t'es pas con
function main(){
	affichage_graphe(5);

	var sommet_0 = document.getElementById('sommet_0');
	sommet_0.onclick = function(){click(0)};
	var sommet_1 = document.getElementById('sommet_1');
	sommet_1.onclick = function(){click(1)};
	var sommet_2 = document.getElementById('sommet_2');
	sommet_2.onclick = function(){click(2)};
	var sommet_3 = document.getElementById('sommet_3');
	sommet_3.onclick = function(){click(3)};
	var sommet_4 = document.getElementById('sommet_4');
	sommet_4.onclick = function(){click(4)};
	var sommet_5 = document.getElementById('sommet_5');
	sommet_5.onclick = function(){click(5)};
	var sommet_6 = document.getElementById('sommet_6');
	sommet_6.onclick = function(){click(6)};
	var sommet_7 = document.getElementById('sommet_7');
	sommet_7.onclick = function(){click(7)};
	var sommet_8 = document.getElementById('sommet_8');
	sommet_8.onclick = function(){click(8)};
}

main();



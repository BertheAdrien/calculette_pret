function erreurMontant(montant){
    var idMontant = document.getElementById("montant");
    console.log(montant)

    if(montant === "" || isNaN(montant)){
        idMontant.classList.add('invalid');
        return false;
    }
    else{
        idMontant.classList.remove('invalid');
        return true;
    }
}
function erreurTaux(taux){

    var idTaux = document.getElementById("taux");
    var taux = parseFloat(taux);
    if(taux === "" || isNaN(taux)){
        idTaux.classList.add('invalid');
        return false;
    }
    else if ((isNaN(taux) || taux < 0 || taux > 100)) {
        idTaux.classList.add('invalid');
        return false;
    }
    else return true;
} 
function erreurDuree(duree){

    var idDuree = document.getElementById("duree");

    if(duree === "" || isNaN(duree)){
        idDuree.classList.add('invalid');
        return false;
    }
    else if (duree <= 0 || duree.includes('.')) {
        idDuree.classList.add('invalid');
        return false;
    }
    else return true;
} 
function messageErreur(montantErreur, tauxErreur, dureeErreur){

    var errorMessage = ''
    var error = document.getElementById("error");
    var allValid
    if(montantErreur === false){
        errorMessage += 'montant, '
    }
    if(tauxErreur === false){
        errorMessage += 'taux, '
    }
    if(dureeErreur === false){
        errorMessage += 'duree, '
    }
    if (errorMessage) {
        error.innerHTML = '<p> veuillez remplir les champs : ' + errorMessage + ' avec des données valides !</p>';
        return allValid = false
    }
    else{
        return allValid = true
    }

}
function gestionErreurs(champsValue) {
    
    var montantErreur = erreurMontant(champsValue[0])
    var tauxErreur = erreurTaux(champsValue[1])
    var dureeErreur = erreurDuree(champsValue[2])

    var allValid = messageErreur(montantErreur, tauxErreur, dureeErreur)

    return allValid;
}

function calculPret(tabValue){
    var montant = tabValue[0];
    var taux = tabValue[1];
    var soldeInitial = tabValue[0];
    var amortissement = 0;
    var interet;
    var soldeRestant = soldeInitial;
    var duree = tabValue[2] * 12;
    var tbody = document.querySelector('tbody');
    var interetParMois = (taux/12)/100;
    var totalRestant = soldeInitial;
    var echeance =(montant*((interetParMois*((1+interetParMois)**duree))/(((1+interetParMois)**duree)-1))).toFixed(2);    tbody.innerHTML = "<tr></tr>";

    for(var i = 1; i <= duree ; i++){  

        soldeRestant=(soldeRestant-amortissement).toFixed(2);
        interet=(soldeRestant*interetParMois).toFixed(2);
        amortissement = (echeance-interet).toFixed(2);

        if (i === duree ) {
            totalRestant = "00.00";
        } else {
            totalRestant = (soldeRestant - amortissement).toFixed(2);
        }

        const row =`                 
        <tr>
            <td>${i}</td>
            <td>
                ${soldeRestant} €
            </td>
            <td>
                ${echeance} €
            </td>
            <td>
                ${interet} €
            </td>
            <td>
                ${amortissement} €
            </td>
            <td>
                ${totalRestant} €
            </td>
        </tr>`;

        tbody.insertAdjacentHTML("beforeend", row);

    }
}

function valeursForm(){
    var data = ['montant', 'taux', 'duree'];
    var champsValue = [];
    
    for(i = 0 ; i < 3; i++) {
        champsValue[i] = document.getElementById(data[i]).value.trim();
    }
    return champsValue;
}

var button = document.getElementById('button')

button.addEventListener('click', function(e) {
    e.preventDefault();

    var champsValue = valeursForm()
    var allValid = gestionErreurs(champsValue);

    if (allValid) {
        calculPret(champsValue);
        document.querySelector('.grandCarreTableau').style.display = 'block';
    }
});

var exportPDF = document.getElementById('export-pdf');
exportPDF.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.autoTable({
        html: '#tableauPret',
        theme: 'striped',
        styles: { 
            fontSize: 10 
        }
    });

    doc.save('tableau_pret.pdf');
});


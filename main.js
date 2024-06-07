function gestionErreurs() {

    var data = ['montant', 'taux', 'remboursement'];
    var allValid = true;
    var tabValue = []
    var messageElement = document.getElementById('error');
    messageElement.innerHTML = '';

    data.forEach(function(champs) {
        var champsValue = document.getElementById(champs).value.trim();
        var errorMessage = '';

        if (champsValue === "") {
            allValid = false;
            errorMessage = 'Veuillez remplir tous les champs !';
            document.getElementById(champs).classList.add('invalid');
        } else {
            document.getElementById(champs).classList.remove('invalid');
            
            if (champs === 'montant') {

                // Vérifier si 'montant' est au format 00,00 €
                
                var montantRegex = /^\d+(\,\d{1,2})?$/;
                if (!montantRegex.test(champsValue)) {
                    allValid = false;
                    errorMessage = 'Veuillez rentrer le prix en euros (00,00)';
                    document.getElementById(champs).classList.add('invalid');
                }
                else {
                    tabValue[0] = champsValue;
                }
            } else if (champs === 'taux') {

                var tauxValue = parseFloat(champsValue);
                if (isNaN(tauxValue) || tauxValue < 0 || tauxValue > 100) {
                    allValid = false;
                    errorMessage = 'Veuillez entrer un pourcentage valide (0-100)';
                    document.getElementById(champs).classList.add('invalid');
                }
                else {
                    tabValue[1] = champsValue;
                }
            } else if (champs === 'remboursement') {

                var remboursementValue = parseInt(champsValue, 10);
                if (isNaN(remboursementValue) || remboursementValue <= 0 || champsValue.includes('.')) {
                    allValid = false;
                    errorMessage = 'Veuillez entrer un nombre d\'années valide (nombre entier positif)';
                    document.getElementById(champs).classList.add('invalid');
                }
                else {
                    tabValue[2] = champsValue;
                }
            }
        }
        if (errorMessage) {
            messageElement.innerHTML = '<p>' + errorMessage + '</p>';
        }
    });
    tabValue[3] = allValid;
    
    return tabValue ;
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
    var echeance =(montant*((interetParMois*((1+interetParMois)**duree))/(((1+interetParMois)**duree)-1))).toFixed(2);
    let pdf;
    tbody.innerHTML = "<tr></tr>";

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
var button = document.getElementById('button')

button.addEventListener('click', function(e) {
    e.preventDefault();

    var tabValue = gestionErreurs();
    var allValid = tabValue[3];

    if (allValid) {
        calculPret(tabValue);
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


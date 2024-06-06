function gestionErreurs() {
    var data = ['montant', 'taux', 'remboursement'];
    var allValid = true;
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
            } else if (champs === 'taux') {

                var tauxValue = parseFloat(champsValue);
                if (isNaN(tauxValue) || tauxValue < 0 || tauxValue > 100) {
                    allValid = false;
                    errorMessage = 'Veuillez entrer un pourcentage valide (0-100)';
                    document.getElementById(champs).classList.add('invalid');
                }
            } else if (champs === 'remboursement') {

                var remboursementValue = parseInt(champsValue, 10);
                if (isNaN(remboursementValue) || remboursementValue <= 0 || champsValue.includes('.')) {
                    allValid = false;
                    errorMessage = 'Veuillez entrer un nombre d\'années valide (nombre entier positif)';
                    document.getElementById(champs).classList.add('invalid');
                }
            }
        }

        if (errorMessage) {
            messageElement.innerHTML = '<p>' + errorMessage + '</p>';
        }
    });

    return allValid;
}

document.getElementById('button').addEventListener('click', function(e) {
    e.preventDefault();

    var allValid = gestionErreurs();

    console.log(allValid);

    if (allValid) {
        document.querySelector('.grandCarreTableau').style.display = 'block';
    }
});



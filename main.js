document.querySelector('.grandCarreTableau').style.display = 'none';


document.getElementById('button').addEventListener('click', function(event) {

    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('je dans le bon la');
        
        
        var requiredFields = document.querySelectorAll('#form input:required');
        var allValid = true;
    
        requiredFields.forEach(function(field) {
            if (!field.checkValidity()) {
                field.classList.add('invalid');
                allValid = false;
            } else {
                field.classList.remove('invalid');
            }
            if (allValid) {
                document.querySelector('.grandCarreTableau').style.display = 'block';
            }
        });
});



//     if (allValid) {
//         var tableBody = document.querySelector('#tableResult tbody');
//         tableBody.innerHTML = ''; 

//         for (var i = 1; i <= 5; i++) {
//             tableBody.innerHTML += '<tr>' +
//                 '<td>' + i + '</td>' +
//                 '<td>1000 €</td>' +
//                 '<td>200 €</td>' +
//                 '<td>10 €</td>' +
//                 '<td>190 €</td>' +
//                 '<td>810 €</td>' +
//                 '</tr>';
//         }
//         document.getElementById('tableResult').style.display = 'table';
//     }
});


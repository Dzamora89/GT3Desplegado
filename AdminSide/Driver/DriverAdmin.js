if (document.cookie.match(/username=([^;]+)/)) {
    console.log(getCookieValue('username'))
    console.log(getCookieValue('token'))
    $.ajax({
        'url': 'http://localhost/gt3prostats/backend/api/login/checkToken.php',
        'data': {
            'username' : getCookieValue('username'),
            'token' : getCookieValue('token')
        },
        'type': 'post',
        'dataType': 'html',
        'beforeSend':  () => {
        }
    })
        .done( (response) => {
            console.log(response)
            if (parseInt(response) !== 1){
                window.location.href = "../login/login.html";
            }
        })
        .fail( function (code, status) {
        })
        .always( function (xhr, status) {
        });
} else {
    window.location.href = "../login/login.html";
}



// Obtiene el valor de la cookie
function getCookieValue(cookieName) {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        const [name, value] = cookies[i].split("=");

        if (name === cookieName) {
            return decodeURIComponent(value);
        }
    }

    return null;
}
//Cargar el NavBar
$.ajax({
    'url': '../Admin/Navbar.html',
    'type': 'post',
    'dataType': 'html',
    'beforeSend':  () => {
    }
})
    .done( (response) => {
        $('nav').html(response);
    })
    .fail( function (code, status) {
    })
    .always( function (xhr, status) {
    });
$(document).ready(fillTheTable())
function fillTheTable() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost/gt3prostats/backend/api/driver/getalldriver.php", requestOptions)
        .then(response => response.json())
        .then(data => data.forEach( (dato) => {
            $('#driverTable').append(`<tr>
                <td>${dato.driverID}</td>
                <td>${dato.driverFirstName}</td>
                <td>${dato.driverLastName}</td>
                <td>${dato.driverELO}</td>
                </tr>`)


        }  ))
        .catch(error => console.log('error', error));


}
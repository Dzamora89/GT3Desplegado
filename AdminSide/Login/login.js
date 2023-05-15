$.ajax({
    'url': '../admin/navbar.html',
    'type': 'post',
    'dataType': 'html',
    'beforeSend':  () => {
    }
})
    .done( (response) => {
        $('nav').prepend(response);
    })
    .fail( function (code, status) {
    })
    .always( function (xhr, status) {
    });

$(document).on('click','#login-btn', event => {
    $.ajax({
        'url': 'http://localhost/gt3prostats/backend/api/login/login.php',
        'data': {
            'username' : $('#username').val(),
            'password' : $('#password').val()
        },
        'type': 'post',
        'dataType': 'html',
        'beforeSend':  () => {
        }
    })
        .done( (response) => {
            console.log(response)
            if (parseInt(response) !== 0) {
                const expires = new Date((new Date()).getTime() + 24 * 60 * 60 * 1000).toGMTString();
                document.cookie = `token=${parseInt(response)}; expires=${expires}; path=/`;
                document.cookie = `username=${$('#username').val()}; expires=${expires}; path=/`;
                // Redirecciona a la página "adminhome"
                window.location.href = "../admin/adminHome.html";

            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de inicio de sesión',
                    text: 'Usuario y/o contraseña incorrectos',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar'
                })
            }
        })
        .fail( function (code, status) {
        })
        .always( function (xhr, status) {
        });
})
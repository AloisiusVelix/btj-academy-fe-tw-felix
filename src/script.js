// Navbar Open & Collapse
$(document).ready(function () {
    var navbar = $("#navbar");
    var toggleButton = $("#toggleButton");

    navbar.hide();

    toggleButton.click(function () {
        navbar.toggle();
    });

    $(window).resize(function () {
        if ($(window).width() > 768) {
            navbar.hide();
        }
    });
});

//JQuery Rotate Logo
let rotation = 0;
function rotateImage() {
    rotation += 360;
    $('#logo').css('transform', `rotate(${rotation}deg)`);
}

// JQuery Valdasi
$('#login-form').submit(function (event) {
    event.preventDefault();

    let errorUsername = '';
    let errorPassword = '';

    errorUsername = validateUsername();
    errorPassword = validatePass();

    $('#errorUsername').html(errorUsername);
    $('#errorPassword').html(errorPassword);

    if (errorPassword === '' && errorUsername === '') {
        login();
    }

    return errorUsername === '' && errorPassword === '';
});

// JQuery Login
function login() {
    let username = $('#username').val();
    let password = $('#pass').val();

    $.ajax({
        url: 'https://dummyjson.com/auth/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            password: password,
        }),
        statusCode: {
            200: function() {
                window.location.href = 'about.html';
            }
        },
        error: function (error) {
            console.error('Error:', error);
            alert("Username atau Password anda salah, silahkan coba lagi!");        
        }
    })
}

// JQuery Username Validation
function validateUsername() {
    let username = $('#username').val();
    let errorUsername = '';

    if (username.trim() === '') {
        errorUsername = 'Username are required!'
    }

    else {
        if (username.length < 6) {
            errorUsername = 'Username must be at least 6 characters long.';
        }
    
        else {
            errorUsername = '';
        }
    }

    $('#errorUsername').html(errorUsername);

    return errorUsername;
}

// JQuery Pass Validation
function validatePass() {
    let password = $('#pass').val();
    let errorPassword = '';

    if (password.trim() === '') {
        errorPassword = 'Password are required!'
    }

    else {
        var passError = [];

        if (password.length < 4) {
            passError.push('At least 4 characters long');
        }
        
        if (!/[a-z]/.test(password)) {
            passError.push('At least 1 lowercase letter');
        }

        if (!/[A-Z]/.test(password)) {
            passError.push('At least 1 uppercase letter');
        }

        // if (!/\d/.test(password)) {
        //     passError.push('At least 1 number');
        // }

        // if (!/[@$!%*?&]/.test(password)) {
        //     passError.push('At least 1 symbol');
        // }

        if (passError.length > 0) {
            errorPassword = 'Password must have: ' + passError.join(', ');
        }

        else {
            errorPassword === '';
        }
    }

    $('#errorPassword').html(errorPassword);

    return errorPassword;
}

// JQuery Capslock
$('#pass').on('keyup', function (e) {
    $('#capslock-allert').text(e.originalEvent.getModifierState('CapsLock') ? 'Caps lock is on!' : '');
});

// JQuery Show & Hide Password
$('#showPassword').change(function() {
    $('#pass').attr('type', $(this).prop('checked') ? 'text' : 'password');
});

// Animation isElementInViewport
var sections = $('.main-content');
var currentIndex = 0;
var lastIndex = 0;

$(window).on('scroll', function () {
    sections.each(function (index) {
        var isVisible = isElementInViewport($(this));
        if (isVisible) {
            $(this).addClass('visible');
            lastIndex = index;
        }
        else if (index + 1 <= currentIndex) {
            $(this).addClass('visible');
        }
        else {
            $(this).removeClass('visible');
        }
});
});

function isElementInViewport($element) {
    var rect = $element[0].getBoundingClientRect();
    if ($element.attr('id') === 'aboutme') {
        return (
            rect.top >= 0 - 200 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 200 &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    } else {
        // Jika bukan elemen dengan ID "aboutme", tidak perlu menambahkan offset
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 300 &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Update currentIndex when a new section comes into view
$(window).on('scroll', function () {
    sections.each(function (index) {
        if (isElementInViewport($(this))) {
            currentIndex = index;
        }
    });
});
/*
    ======================================
    
    DASHBOARD PAGE ==== > TOGGLE BOOKINGS TABS IN DASHBOARD PAGE

    ========================================
*/

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "table";
    evt.currentTarget.className += " active";
}


function Logout() {
    sessionStorage.clear();
    document.location.href = "../view/connect.php"

}
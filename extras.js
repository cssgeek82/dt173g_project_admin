// Function to show update-study and hide write-study
function showHidden() {
    var x = document.getElementById("updateStudy");
    x.style.display = "block";
    var y = document.getElementById("writeStudy");
    y.style.display = "none";
}
// Hide update-study and show write-study
document.getElementById('updateStudy').onclick=function(){
    document.getElementById('writeStudy').style.display='block';
    document.getElementById('updateStudy').style.display='none';
};

// Function to show update-work and hide write-work
function showWork() {
    var x = document.getElementById("updateWork");
    x.style.display = "block";
    var y = document.getElementById("writeWork");
    y.style.display = "none";
}
// Hide update-work and show write-work
document.getElementById('updateWork').onclick=function(){
    document.getElementById('writeWork').style.display='block';
    document.getElementById('updateWork').style.display='none';
};

// Function to show update-webb and hide write-webb
function showWebb() {
    var x = document.getElementById("updateWebb");
    x.style.display = "block";
    var y = document.getElementById("writeWebb");
    y.style.display = "none";
}
// Hide update-webb and show write-webb
document.getElementById('updateWebb').onclick=function(){
    document.getElementById('writeWebb').style.display='block';
    document.getElementById('updateWebb').style.display='none';
};

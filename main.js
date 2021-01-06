"use strict"; 

// Settings to API-url 
let onlineMode = true;  // false when run with locally, put true before upload
let apiedu;     // Webservice api url for studies
let apieduid;   // Api url with id for studies
let apiwork;    // Api url for workexperience 
let apiworkid;  // Api url with id for workexperience
let apiwebb;    // Api url for created webbpages
let apiwebbid;  // Api url with id for created webbpages
if (onlineMode)    
    apiedu= "https://www.cssgeek.se/webbservice/studies.php",
    apieduid= "https://www.cssgeek.se/webbservice/studies.php?id=", 
    apiwork= "https://www.cssgeek.se/webbservice/workexperience.php",
    apiworkid= "https://www.cssgeek.se/webbservice/workexperience.php?id=",
    apiwebb= "https://www.cssgeek.se/webbservice/createdwebb.php",
    apiwebbid= "https://www.cssgeek.se/webbservice/createdwebb.php?id=";    
else 
    apiedu= "http://localhost/dt173gprojekt/studies.php",
    apieduid= "http://localhost/dt173gprojekt/studies.php?id=", 
    apiwork= "http://localhost/dt173gprojekt/workexperience.php",
    apiworkid= "http://localhost/dt173gprojekt/workexperience.php?id=",
    apiwebb= "http://localhost/dt173gprojekt/createdwebb.php",
    apiwebbid= "http://localhost/dt173gprojekt/createdwebb.php?id="; 

// Body onload function
function loads() {
    getStudies();
    getWork(); 
    getWebb(); 
}

// Event handlers
document.getElementById('writeStudy').addEventListener('click', writeStudy);  
document.getElementById('writeWork').addEventListener('click', writeWork);
document.getElementById('writeWebb').addEventListener('click', writeWebb); 

document.getElementById('updateStudy').addEventListener('click', updateStudy); 
document.getElementById('updateWork').addEventListener('click', updateWork);
document.getElementById('updateWebb').addEventListener('click', updateWebb);




/* !!! Studies !!! */

// Function to read all courses/programs
function getStudies() {                                                            
    fetch(apiedu)
    .then((res) => res.json())
    .then((data) => {
        let showStudies = " "; 
        // Loop
        data.forEach(function(studies) {
            showStudies += ` 
                <tr>
                    <td>${studies.coursename}</td>
                    <td>${studies.university}</td>
                    <td>${studies.startdate} till ${studies.enddate}</td>
                    <td><button id="${studies.id}" class="upbtn" onClick="showHidden(); getStudy(${studies.id});">Uppdatera</button></td>
                    <td><button id="${studies.id}" class="delbtn" onClick="delStudy(${studies.id});">Radera</button></td>
                </tr>
            `; 
        })
        document.getElementById('showStudies').innerHTML = showStudies;        
    })
}

// Function for reading one course/program and show it in form
function getStudy(id) {
    fetch(apieduid +id)
    .then((res) => res.json())
    .then((data) => {
        document.getElementById("id").value= data.id; 
        document.getElementById("university").value= data.university; 
        document.getElementById("coursename").value= data.coursename; 
        document.getElementById("startdate").value= data.startdate; 
        document.getElementById("enddate").value= data.enddate;    
    })
    .catch(error => {
        document.getElementById("writetoscreen_study").innerHTML = "Error: ", error; 
    })
} 

//Function for updating a course/program
function updateStudy(id) {
    let studies = { 
        'id': document.getElementById("id").value, 
        'university': document.getElementById("university").value, 
        'coursename': document.getElementById("coursename").value, 
        'startdate': document.getElementById("startdate").value, 
        'enddate': document.getElementById("enddate").value 
    };   
    // Check if value is bigger than 2/1 before updating 
    if (studies.university.length >2 && studies.coursename.length > 2 && studies.startdate.length >1 && studies.enddate.length >1 ){
        fetch(apieduid +studies.id, {
            method: 'PUT', 
            body: JSON.stringify(studies),
        })
        .then(response => response.json())
        .then(data => {
            getStudies(); 
            document.getElementById("writetoscreen_study").innerHTML = "Uppdateringen lyckades!"; 
        })
        .catch(error => {
            document.getElementById("writetoscreen_study").innerHTML = "Error: ", error; 
        }) 
    }
    else {
        document.getElementById("writetoscreen_study").innerHTML = "Det behöver vara mer tecken i minst ett svarsfält. Prova uppdatera igen!"; 
    }

    // Clears data in form
        document.getElementById("university").value=""; 
        document.getElementById("coursename").value=""; 
        document.getElementById("startdate").value=""; 
        document.getElementById("enddate").value=""; 
}  

//Function for adding new course/program 
function writeStudy() {
    let studies = { 
        'university': document.getElementById("university").value, 
        'coursename': document.getElementById("coursename").value, 
        'startdate': document.getElementById("startdate").value, 
        'enddate': document.getElementById("enddate").value 
    };
    // Check if value is bigger than 2/1 before adding 
    if (studies.university.length >2 && studies.coursename.length > 2 && studies.startdate.length >1 && studies.enddate.length >1 ){
        fetch(apiedu, {
            method: "POST", 
            body: JSON.stringify(studies),
        })
        .then(response => response.json())
        .then(data => {
            getStudies(); 
            document.getElementById("writetoscreen_study").innerHTML = "Ny kurs/program är tillagd.";
        })
        .catch(error => {
            document.getElementById("writetoscreen_study").innerHTML = "Error: ", error;   
        })

        // Clears data in form
        document.getElementById("university").value=""; 
        document.getElementById("coursename").value=""; 
        document.getElementById("startdate").value=""; 
        document.getElementById("enddate").value=""; 
    }
    else {
        document.getElementById("writetoscreen_study").innerHTML = "Det behöver vara mer tecken i minst ett svarsfält.";
    }
}

// Function for deleting a course/program
function delStudy(id) {     
    var z = confirm("Är du säker på att du vill radera detta?");  // Confirm before deleting
    if (z == true) {
        fetch(apieduid +id, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => { 
            getStudies(); 
            document.getElementById("writetoscreen_study").innerHTML = "Webbplats är raderad!";
        })
        .catch(error => {
            document.getElementById("writetoscreen_study").innerHTML = "Error: ", error; 
        })
    }
} 



/* !!! Work experiences !!! */ 

// Function to read all works 
function getWork() {                                                            
    fetch(apiwork)
    .then((res) => res.json())
    .then((data) => {
        let showWork = " "; 
        // Loop
        data.forEach(function(workexperience) {
            showWork += ` 
                <tr>
                    <td>${workexperience.workplace}</td>
                    <td>${workexperience.title}</td>
                    <td>${workexperience.datestart} till ${workexperience.dateend}</td>
                    <td><button id="${workexperience.id}" class="upbtn" onClick="showWork(); getOnework(${workexperience.id})">Uppdatera</button></td>  
                    <td><button id="${workexperience.id}" class="delbtn" onClick="delWork(${workexperience.id})">Radera</button></td>
                </tr>
            `; 
        })
        document.getElementById('showWork').innerHTML = showWork;   
    })
}

// Function for reading one workexperience and show it in form
function getOnework(id) {
    fetch(apiworkid +id)
    .then((res) => res.json())
    .then((data) => {
        document.getElementById("id_w").value= data.id;
        document.getElementById("workplace").value= data.workplace; 
        document.getElementById("title").value= data.title; 
        document.getElementById("datestart").value= data.datestart; 
        document.getElementById("dateend").value= data.dateend;   
    })
    .catch(error => {
        document.getElementById("writetoscreen").innerHTML = "Error: ", error;  
    })
} 

//Function for updating a workexperience
function updateWork(id) {
    let workexperience = { 
        'id': document.getElementById("id_w").value, 
        'workplace': document.getElementById("workplace").value, 
        'title': document.getElementById("title").value, 
        'datestart': document.getElementById("datestart").value, 
        'dateend': document.getElementById("dateend").value 
    };   
    // Check if value is bigger than 2/1 before updating 
    if (workexperience.workplace.length >2 && workexperience.title.length > 2 && workexperience.datestart.length >1 && workexperience.dateend.length >1 ){
        fetch(apiworkid +workexperience.id, {
            method: 'PUT', 
            body: JSON.stringify(workexperience),
        })
        .then(response => response.json())
        .then(data => {
            getWork(); 
            document.getElementById("writetoscreen_work").innerHTML = "Uppdateringen lyckades!";
        })
        .catch(error => {
            document.getElementById("writetoscreen_work").innerHTML = "Error: ", error;   
        })     
    }
    else {
        document.getElementById("writetoscreen_work").innerHTML = "Det behöver vara mer tecken i minst ett svarsfält. Prova uppdatera igen!";
    }

    // Clears data in form
    document.getElementById("workplace").value=""; 
    document.getElementById("title").value=""; 
    document.getElementById("datestart").value=""; 
    document.getElementById("dateend").value="";
}  

//Function for adding new work
function writeWork() {
    let workexperience = { 
        'workplace': document.getElementById("workplace").value, 
        'title': document.getElementById("title").value, 
        'datestart': document.getElementById("datestart").value, 
        'dateend': document.getElementById("dateend").value 
    };
    // Check if value is bigger than 2/1 before adding 
    if (workexperience.workplace.length >2 && workexperience.title.length > 2 && workexperience.datestart.length >1 && workexperience.dateend.length >1 ){
        fetch(apiwork, {
            method: "POST", 
            body: JSON.stringify(workexperience),
        })
        .then(response => response.json())
        .then(data => {
            getWork(); 
            document.getElementById("writetoscreen_work").innerHTML = "Ny arbetserfarenhet är tillagd.";
        })
        .catch(error => {
            document.getElementById("writetoscreen_work").innerHTML = "Error: ", error;  
        })

        // Clears data in form
        document.getElementById("workplace").value=""; 
        document.getElementById("title").value=""; 
        document.getElementById("datestart").value=""; 
        document.getElementById("dateend").value="";   
    }
    else{
        document.getElementById("writetoscreen_work").innerHTML = "Det behöver vara mer tecken i minst ett svarsfält.";
    } 
}

// Function for deleting a workexperience
function delWork(id) {     
    var z = confirm("Är du säker på att du vill radera detta?");  // Confirm before deleting
    if (z == true) {                
        fetch(apiworkid +id, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => { 
            getWork(); 
            document.getElementById("writetoscreen_work").innerHTML = "Webbplats är raderad!";
        })
        .catch(error => {
            document.getElementById("writetoscreen_work").innerHTML = "Error: ", error; 
        })
    }    
}


/* !!! Created webb pages !!! */   

// Function to read all webbpages 
function getWebb() {                                                            
    fetch(apiwebb)
    .then((res) => res.json())
    .then((data) => {
        let showWebb = " "; 
        // Loop
        data.forEach(function(createdwebb) {
            showWebb += ` 
                <tr class="trwebb">
                    <td class="tdwebbone">${createdwebb.webbtitle}</td>
                    <td class="tdwebbtwo">${createdwebb.webburl}</td>
                    <td class="tdwebbthree">${createdwebb.webbdesc}</td> 
                    <td class="tdwebbfour">${createdwebb.webbpicurl}</td>
                    <td><button id="${createdwebb.id}" class="upbtn tdwebbfive" onClick="showWebb(); getOnewebb(${createdwebb.id})">Uppdatera</button></td>  
                    <td><button id="${createdwebb.id}" class="delbtn tdwebbsix" onClick="delWebb(${createdwebb.id})">Radera</button></td>
                </tr>
            `; 
        })
        document.getElementById('showWebb').innerHTML = showWebb;        
    })
}

// Function for reading one webbpage and show it in form
function getOnewebb(id) {
    fetch(apiwebbid +id)
    .then((res) => res.json())
    .then((data) => {
        document.getElementById("id_p").value= data.id;
        document.getElementById("webbtitle").value= data.webbtitle; 
        document.getElementById("webburl").value= data.webburl; 
        document.getElementById("webbdesc").value= data.webbdesc; 
        document.getElementById("webbpicurl").value= data.webbpicurl;   
    })
    
    .catch(error => {
        document.getElementById("writetoscreen_webb").innerHTML = "Error: ", error;  
    })
} 

//Function for updating a workexperience
function updateWebb(id) {
    let createdwebb = { 
        'id': document.getElementById("id_p").value, 
        'webbtitle': document.getElementById("webbtitle").value, 
        'webburl': document.getElementById("webburl").value, 
        'webbdesc': document.getElementById("webbdesc").value, 
        'webbpicurl': document.getElementById("webbpicurl").value 
    };   
    // Check if value is bigger than 2/10 before adding 
    if (createdwebb.webbtitle.length >2 && createdwebb.webburl.length > 2 && createdwebb.webbdesc.length >10 && createdwebb.webbpicurl.length >10 ){
        fetch(apiwebbid +createdwebb.id, {
            method: 'PUT', 
            body: JSON.stringify(createdwebb),
        })
        .then(response => response.json())   
        .then(data => {
            getWebb(); 
            document.getElementById("writetoscreen_webb").innerHTML = "Uppdateringen lyckades!";
        })
        .catch(error => {
            document.getElementById("writetoscreen_webb").innerHTML = "Error: ", error;  
        })
    }
    else {
        document.getElementById("writetoscreen_webb").innerHTML = "Det behöver vara mer tecken i minst ett svarsfält. Prova uppdatera igen!"; 
    }

    // Clears data in form
        document.getElementById("webbtitle").value=""; 
        document.getElementById("webburl").value=""; 
        document.getElementById("webbdesc").value=""; 
        document.getElementById("webbpicurl").value="";  
}  

//Function for adding new webbpages
function writeWebb() {
    let createdwebb = { 
        'webbtitle': document.getElementById("webbtitle").value, 
        'webburl': document.getElementById("webburl").value, 
        'webbdesc': document.getElementById("webbdesc").value, 
        'webbpicurl': document.getElementById("webbpicurl").value 
    };
    // Check if value is bigger than 2/10 before adding 
    if (createdwebb.webbtitle.length >2 && createdwebb.webburl.length > 2 && createdwebb.webbdesc.length >10 && createdwebb.webbpicurl.length >10 ){
        fetch(apiwebb, {
            method: "POST", 
            body: JSON.stringify(createdwebb),
        })
        .then(response => response.json())
        .then(data => {
            getWebb(); 
            document.getElementById("writetoscreen_webb").innerHTML = "Ny webbsida är tillagd.";
        })
        .catch(error => {
            document.getElementById("writetoscreen_webb").innerHTML = "Error: ", error; 
        })
        // Clears data in form
        document.getElementById("webbtitle").value=""; 
        document.getElementById("webburl").value=""; 
        document.getElementById("webbdesc").value="";   
        document.getElementById("webbpicurl").value="";         
    }
    else {
        document.getElementById("writetoscreen_webb").innerHTML = "Det behöver vara mer tecken i minst ett svarsfält.";
    } 
}

// Function for deleting a webbpage
function delWebb(id) {     
    var z = confirm("Är du säker på att du vill radera detta?");  // Confirm before deleting
    if (z == true) {                  
        fetch(apiwebbid +id, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => { 
            getWebb(); 
            document.getElementById("writetoscreen_webb").innerHTML = "Webbplats är raderad!";
        })
        .catch(error => {
            document.getElementById("writetoscreen_webb").innerHTML = "Error: ", error; 
        })
    }
}

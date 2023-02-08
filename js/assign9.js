var siteName = document.getElementById("siteNameInp");
var siteUrl = document.getElementById("siteUrlInp");
var sites = [];


if(localStorage.getItem("sites") != null){
    sites = JSON.parse( localStorage.getItem("sites"));
    displaySite();
}

function addSite(){
    var site ={
        name: siteName.value,
        url : siteUrl.value
    }

    document.getElementById("wrong1").classList.replace("d-block" , "d-none")
    document.getElementById("wrong2").classList.replace("d-block" , "d-none")

    if(siteName.value == "" && siteUrl.value !== ""){
        document.getElementById("wrong1").classList.replace("d-none" , "d-block");
    }
    else if(siteUrl.value == "" && siteName.value !== ""){
        document.getElementById("wrong2").classList.replace("d-none" , "d-block")
    }
    else if(siteName.value == "" && siteUrl.value == ""){
        document.getElementById("wrong1").classList.replace("d-none" , "d-block")
        document.getElementById("wrong2").classList.replace("d-none" , "d-block")
    }
    else{
        if(nameExist()){
            document.getElementById("wrong1").classList.replace("d-none" , "d-block")
            document.getElementById("wrong1").innerHTML = "This Name already exists"
        }
        else{
        document.getElementById("wrong1").classList.replace("d-block" , "d-none")
        document.getElementById("wrong2").classList.replace("d-block" , "d-none")
        sites.push(site);
        localStorage.setItem("sites", JSON.stringify(sites)); 
        }
    }

 
    displaySite();
    clearForm();
}


function nameExist(){
    var exist = false ;
    for(var i =0 ; i< sites.length ; i++){
        if(siteName.value == sites[i].name){
            exist = true;
        }
    }
    return exist;
}


function displaySite(){
    trs="";
    for(var i=0 ; i < sites.length ; i++){
        trs += `
        <tr>
            <td class="w-50 text-darl fw-bolder ps-3">
                <h5>${sites[i].name}</h5>
            </td>
            <td id="td2">
                <a href="${sites[i].url}" target="_blank" class=" border border-0 rounded-2 bg-primary px-3 py-2 text-white border border-none btn btn1">Visit</a>
            </td>
            <td>
                <button onclick="deleteSite(${i})" class=" border border-0 rounded-2 bg-danger px-3 py-2 text-white border border-none btn btn2">Delete</button>
            </td>
        </tr>
        `
       
    }
    document.getElementById('tbody').innerHTML= trs;
    
}

function clearForm(){
    siteName.value = "" ;
    siteUrl.value = ""
}

function deleteSite(index){
    sites.splice(index,1);
    localStorage.setItem("sites", JSON.stringify(sites)); 
    displaySite();
}


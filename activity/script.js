let addBtnContainer=document.querySelector(".add_sheet_container");
let sheetList= document.querySelector(".sheets_list");
let firstSheet=document.querySelector(".sheet");

// sheet 1 ka event listener
firstSheet.addEventListener("click" , handleActiveSheet);

addBtnContainer.addEventListener("click" , function(){
    let sheetsArr=document.querySelectorAll(".sheet");
    // getting last index of sheet !
    let lastSheetElem=sheetsArr[sheetsArr.length - 1];
    let idx=lastSheetElem.getAttribute("sheetIdx");
    idx=Number(idx);
    let NewSheet=document.createElement("div");
    NewSheet.setAttribute("class" , "sheet");
    NewSheet.setAttribute("sheetIdx" , idx+1);
    NewSheet.innerText=`Sheet ${idx+2}`;
    sheetList.appendChild(NewSheet); // page add

    // for active class -> sheet 2 se event listener
    NewSheet.addEventListener("click" , handleActiveSheet)
    
    
})


function handleActiveSheet(e){
    let MySheet=e.currentTarget;
    let sheetsArr=document.querySelectorAll(".sheet"); 
    
    // remove active_sheet class from all element
    sheetsArr.forEach(function(sheet){
        sheet.classList.remove("active_sheet");
    })
    // add the active sheet class to the clicked element
    if(!MySheet.classList[1]){
        MySheet.classList.add("active_sheet");
    }
}
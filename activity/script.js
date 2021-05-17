let addBtnContainer=document.querySelector(".add_sheet_container");
let sheetList= document.querySelector(".sheets_list");
let firstSheet=document.querySelector(".sheet");
let allCells=document.querySelectorAll(".grid .col");
let addressBox=document.querySelector(".address_box");
let leftBtn=document.querySelector(".left");
let centerBtn=document.querySelector(".center");
let rightBtn=document.querySelector(".right");
let sizeBtn= document.querySelector(".font_size");
let boldEle=document.querySelector(".bold");
let italicEle=document.querySelector(".italic");
let underlineEle=document.querySelector(".underline");
let color=document.querySelector(".color");
let bgColor=document.querySelector(".bg_color");
let fontFamily=document.querySelector(".font_family");
let allAlignBtns = document.querySelectorAll(".alignment_container>*");


// sheet 1 ka event listener -> create sheet and give them
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
// *************************



// address set on click of cell
for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("click" , function(){
        let rid=Number(allCells[i].getAttribute("rid"));
        let cid=Number(allCells[i].getAttribute("cid"));
        let rowAdd=rid+1;
        let colAdd=String.fromCharCode(cid+65);
        let address=colAdd+rowAdd;
        addressBox.value=address;
        
        // ------ Later After Setting the formatting-----
        // styling -> set 
        // object Styling set -> har set ka alag object hai
        let cellObject = sheetDB[rid][cid];
        // boldness
        if(cellObject.bold == true){
            boldEle.classList.add("active_btn");
        }else{
            boldEle.classList.remove("active_btn");

        }
        // italic 
        if(cellObject.italic == "normal"){
            italicEle.classList.remove("active_btn");
        }else{
            italicEle.classList.add("active_btn");

        }
        // underline 
        if(cellObject.underline == "none"){
            underlineEle.classList.remove("active_btn");
        }else{
            underlineEle.classList.add("active_btn");

        }

        // Alignment 
        // change for the BUI container for clicked cell
            // remove active from all buttons  
            for(let i=0;i < allAlignBtns.length;i++){
                allAlignBtns[i].classList.remove("active_btn");
            }

        if(cellObject.hAlign == "left"){
            // left change
            leftBtn.classList.add("active_btn");
        }else if(cellObject.hAlign == "right"){
            // right change 
            rightBtn.classList.add("active_btn")
        }else if(cellObject.hAlign == "center"){
            // center change 
            centerBtn.classList.add("active_btn");
        }

    })
}
// initial cell click emulate
allCells[0].click();


// ****************Formatting****************
leftBtn.addEventListener("click" , function(){
    let address=addressBox.value;
    let {cid , rid} = getRidCidFromAddress(address);
    console.log(cid , rid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="left";
    // *********
    for(let i=0;i < allAlignBtns.length; i++){
        allAlignBtns[i].classList.remove("active_btn");
    }
    leftBtn.classList.add("active_btn");
    // db-update -> 2D array of individual cell update
    let cellObject = sheetDB[rid][cid];
    cellObject.hAlign = "left";
    
})
rightBtn.addEventListener("click" , function(){
    let address=addressBox.value;
    let {cid , rid} = getRidCidFromAddress(address);
    console.log(cid , rid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign= "right";
    
    // *********
    for(let i=0;i < allAlignBtns.length; i++){
        allAlignBtns[i].classList.remove("active_btn");
    }
    rightBtn.classList.add("active_btn");
    // db-update -> 2D array of individual cell update
    let cellObject = sheetDB[rid][cid];
    cellObject.hAlign = "right";
})
centerBtn.addEventListener("click" , function(){
    let address=addressBox.value;
    let {cid , rid} = getRidCidFromAddress(address);
    console.log(cid , rid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign= "center";    
    
    // *********
    for(let i=0;i < allAlignBtns.length; i++){
        allAlignBtns[i].classList.remove("active_btn");
    }
    centerBtn.classList.add("active_btn");
    // db-update -> 2D array of individual cell update
    let cellObject = sheetDB[rid][cid];
    cellObject.hAlign = "center";
    console.log(sheetDB);
})
sizeBtn.addEventListener("change" , function(){
    let cSize=sizeBtn.value;
    let address=addressBox.value;
    let {rid , cid}=getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontSize=cSize;
})
fontFamily.addEventListener("change" , function(){
    let address=addressBox.value;
    let cFont = fontFamily.value;
    let {rid , cid}=getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontFamily = cFont;
})
// **********************

boldEle.addEventListener("click" , function(){
    let isActive = boldEle.classList.contains("active_btn");
    let address=addressBox.value;
    let {rid , cid}=getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid];
    if(isActive == false){
        // cell text bold 
        cell.style.fontWeight="bolder";
        boldEle.classList.add("active_btn");
        cellObject.bold = true;
    }else{
        cell.style.fontWeight="normal";
        boldEle.classList.remove("active_btn");
        cellObject.bold = false;
    }
})
italicEle.addEventListener("click" , function(){
    let isActive = italicEle.classList.contains("active_btn");
    let address=addressBox.value;
    let {rid , cid}=getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid];
    if(isActive == false){
        // cell text bold 
        cell.style.fontStyle="italic";
        italicEle.classList.add("active_btn");
        cellObject.italic = "italic";  // db update

    }else{
        cell.style.fontStyle="normal";
        italicEle.classList.remove("active_btn");
        cellObject.italic = "normal";  // db update
    }
})
underlineEle.addEventListener("click" , function(){
    let isActive = underlineEle.classList.contains("active_btn");
    let address=addressBox.value;
    let {rid , cid}=getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid];
    if(isActive == false){
        // cell text bold 
        cell.style.textDecoration="underline";
        underlineEle.classList.add("active_btn");
        cellObject.underline="underline";
    }else{
        cell.style.textDecoration="none";
        underlineEle.classList.remove("active_btn");
        cellObject.underline="none";
        
    }
})

// color.addEventListener("change")



// Helper function
function getRidCidFromAddress(address){
    let cellCodeAdr=address.charCodeAt(0);
    let cellRowAdr=address.slice(1);
    let cid = cellCodeAdr - 65;
    let rid = Number(cellRowAdr) - 1;
    return{cid , rid};
}


let addBtnContainer=document.querySelector(".add_sheet_container");
let sheetList= document.querySelector(".sheets_list");
let firstSheet=document.querySelector(".sheet");
let allCells=document.querySelectorAll(".grid .col");
let addressBox=document.querySelector(".address_box");
let leftBtn=document.querySelector(".left");
let centerBtn=document.querySelector(".center");
let rightBtn=document.querySelector(".right");
let sizeBtn= document.querySelector(".font_size");
let bold=document.querySelector(".bold");
let italic=document.querySelector(".italic");
let underline=document.querySelector(".underline");
let color=document.querySelector(".color");
let bgColor=document.querySelector(".bg_color");


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

// print the address into the address bar
for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("click" , function(){
        let rid=Number(allCells[i].getAttribute("rid"));
        let cid=Number(allCells[i].getAttribute("cid"));
        let rowAdd=rid+1;
        let colAdd=String.fromCharCode(cid+65);
        let address=colAdd+rowAdd;
        addressBox.value=address;
    })
}
allCells[0].click();

leftBtn.addEventListener("click" , function(){
    let address=addressBox.value;
    let {cid , rid} = getRidCidFromAddress(address);
    console.log(cid , rid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="left";
})

rightBtn.addEventListener("click" , function(){
    let address=addressBox.value;
    let {cid , rid} = getRidCidFromAddress(address);
    console.log(cid , rid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign= "right";
})

centerBtn.addEventListener("click" , function(){
    let address=addressBox.value;
    let {cid , rid} = getRidCidFromAddress(address);
    console.log(cid , rid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign= "center";    
})

sizeBtn.addEventListener("change" , function(){
    let fontSize=sizeBtn.value;
    let address=addressBox.value;
    let {rid , cid}=getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
})

bold.addEventListener("click" , function(){
    let address=addressBox.value;
    let {rid , cid}=getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontWeight="bolder";
})

// color.addEventListener("change")




function getRidCidFromAddress(address){
    let cellCodeAdr=address.charCodeAt(0);
    let cellRowAdr=address.slice(1);
    let cid = cellCodeAdr - 65;
    let rid = Number(cellRowAdr) - 1;
    return{cid , rid};
}


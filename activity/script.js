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
let sheetDB = workSheetDB[0]; // first 2D array
let formullaInput = document.querySelector(".formulla_box");

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

    // remove active sheet from all
    sheetsArr.forEach(function(sheet){
        sheet.classList.remove("active_sheet");
    })
    sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr[sheetsArr.length - 1].classList.add("active_sheet"); // adding in last 

    initCurrentSheetDb(); // creating the new database
    sheetDB = workSheetDB[idx + 1]; // sheetDB will point last idx 2D Array

    initUI(); // we came into new sheet then empty all the cells 

    // for active class -> sheet 2 se event listener
    NewSheet.addEventListener("click" , handleActiveSheet);
    
})

// jispe ham click kare uspe active class set ho jae
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
    // index of clicked sheet
    let sheetIdx = MySheet.getAttribute("sheetIdx");
    sheetDB = workSheetDB[sheetIdx
    ]; 
    setUI(sheetDB); // get data from sheet and set in UI

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
        console.log(cellObject.formulla);

        if(cellObject.formulla != ""){
            console.log(cellObject.formulla);
            formullaInput.value = cellObject.formulla;
        }else{
            formullaInput.value="";
        }

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
    cell.style.fontSize=cSize+6+"px";
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

// clear all the data -> do blank sheet
function initUI(){
    for(let i=0; i < allCells.length;i++){
        allCells[i].style.fontWeight = "normal";
        allCells[i].style.fontStyle = "normal";
        allCells[i].style.textDecoration = "none";
        allCells[i].style.fontFamily = "Arial";
        allCells[i].style.fontSize = "16px";
        allCells[i].style.textAlign = "left";
        allCells[i].innerText = "";
    }

}



// taking the values from database and pasting in the UI 
function setUI(sheetDB){
    // we will loop the 2D Array
    for(let i=0;i<sheetDB.length;i++){
        for(let j=0;j<sheetDB[i].length;j++){
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let {bold,italic,underline,fontFamily,fontSize,hAlign,value}=sheetDB[i][j];
            cell.style.fontWeight =bold==true?"bold":"normal";
            cell.style.textDecoration =italic =="normal" ? "normal":"italic";
            cell.innerText = value;
        }
    }
}







// ************* Formulla Logic ***********************
// value - > value
// formulla value -> manually value set 
// har cell pe jo bhi value ho usse save kar do database pe
for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("blur" , function handleCell(){
        let address=addressBox.value;
        let {rid , cid}=getRidCidFromAddress(address);
        let cellObject = sheetDB[rid][cid];
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        // case 3
            if(cellObject.formulla && cellObject.value != cell.innerText){
                removeFormulla(cellObject , address);
            }
            cellObject.value = cell.innerText;
            // implementing case 2 of logic formulla
            changeChildrens(cellObject); // jo depend karte hai unhe update kar do


    })
}


// formulla bar enter
// value -> formulla set 
// old formulla -> new formulla
formullaInput.addEventListener("keydown" , function(e){

    // steps to do
    //     1. get Current cell
    //     2. evalute(formulla); -> Evaluate the formulla 
    //     3. setUI(change); ->  Change In the UI
    //     4. setContentDB(value , formulla); -> set the content 
    if(e.key == "Enter" && formullaInput.value != ""){
        let Newformulla = formullaInput.value;
        // now set on UI
        let address = addressBox.value;
        let {rid , cid } = getRidCidFromAddress(address);
        // change the formulla
        let cellObject = sheetDB[rid][cid];
        let prevFormulla = cellObject.formulla;
        if(prevFormulla == Newformulla ){
            return;
        }
        if( prevFormulla != "" && prevFormulla != Newformulla){
            removeFormulla(cellObject , address);
        }
        let evaluatedValue = evaluateFormulla(Newformulla);
        //----
        setUIByFormulla(evaluatedValue , rid , cid);    
        setContentInDB(evaluatedValue , Newformulla , rid , cid , address );  //update value -> update formulla -> update the dependency in parent    
        
        changeChildrens(cellObject);
    }
        
})


function evaluateFormulla(formulla){
    // "( A1 + A2)"
    // split it ->  [(, A1, A2, )]
    // find the value of A1 and A2 from database
    // [(, 10, 20, )]
    // ( 10 + 20)
    let formullaTokens = formulla.split(" ");
    for(let i=0 ; i < formullaTokens.length ; i++){
        let firstCharOfToken = formullaTokens[i].charCodeAt(0);
        if(firstCharOfToken >= 65 && firstCharOfToken <= 90){
            let {rid , cid} = getRidCidFromAddress(formullaTokens[i]);
            let cellObject = sheetDB[rid][cid];
            let { value } = cellObject;
            // replace the value in the formulla
            formulla = formulla.replace(formullaTokens[i] , value);
        }
    }
    let ans = eval(formulla);
    return ans;
}





function setUIByFormulla(evaluatedValue , rid , cid){
    document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`).innerText = evaluatedValue;

}
function setContentInDB(value , formulla , rid , cid , address ){
    let cellObject = sheetDB[rid][cid]; // cell object where we have to change the value
    cellObject.value = value; // set the value in db
    cellObject.formulla = formulla; // set formulla in db

    // Now we have to find the parent rid and cid(by the help of formulla) so that we can update the parent's children array
    let formullaTokens = formulla.split(" ");
    for(let i=0 ; i < formullaTokens.length ; i++){
        let firstCharOfToken = formullaTokens[i].charCodeAt(0);
        if(firstCharOfToken >= 65 && firstCharOfToken <= 90){
            let parentRidCid = getRidCidFromAddress(formullaTokens[i]); // parent rid , Cid
            let cellObject = sheetDB[parentRidCid.rid][parentRidCid.cid];
            // update the parent's children array
            cellObject.children.push(address); // pushing the address of the children in parents children array 
        }
    }
}

function changeChildrens(cellObject){
    let childrens= cellObject.children;
    for(let i=0;i < childrens.length;i++){
        let chAddress = childrens[i];
        let chRidCidObj= getRidCidFromAddress(chAddress);
        let chObj = sheetDB[chRidCidObj.rid][chRidCidObj.cid];
        let formulla = chObj.formulla;
        let evaluatedValue = evaluateFormulla(formulla);
        setUIByFormulla(evaluatedValue , chRidCidObj.rid , chRidCidObj.cid);
        
        chObj.value = evaluatedValue; // set the value in db
        changeChildrens(chObj); // apne childrens ko bhi update karo 
    }
}

// remove overself from my parents children array
function removeFormulla(cellObject , address){
    let formulla = cellObject.formulla;
    let formullaTokens = formulla.split(" ");
    for(let i=0 ; i < formullaTokens.length ; i++){
        let firstCharOfToken = formullaTokens[i].charCodeAt(0);
        if(firstCharOfToken >= 65 && firstCharOfToken <= 90){
            let parentRidCid = getRidCidFromAddress(formullaTokens[i]); // parent rid , Cid
            let parentcellObject = sheetDB[parentRidCid.rid][parentRidCid.cid];
            
            let childrens=parentcellObject.children;
            let idx = childrens.indexOf(address);
            childrens.splice(idx , 1);
        }
    }
    cellObject.formulla = "";
}
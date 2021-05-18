let topRow=document.querySelector(".top_row");
let str="";
for(let i=0;i<26;i++){
    str += `<div class='col'> ${String.fromCharCode(65+i)}</div>`;
}
topRow.innerHTML=str;

let leftCol=document.querySelector(".left_col");
str=""
for(let i=0;i<100;i++){
        str += `<div class='left_col_box'>${i+1}</div>`;
}
leftCol.innerHTML=str;

//2D array
let grid=document.querySelector(".grid");
str="";
for(let i=0; i < 100 ; i++){
    str += `<div class="row">`;
    for(let j=0 ; j<26 ; j++){
        str += `<div class='col' rid="${i}"  cid="${j}" contenteditable="true"></div>`;
    }
    str += "</div>";
}
grid.innerHTML = str;


workSheetDB=[]; // all the sheets data with 2D array 
// create the data of a single sheet
function initCurrentSheetDb(){
    // creating 2D array with the properties of each cells 
     let sheetDB=[]; // stores all the cell styling data of each cell
    for(let i=0;i<100;i++){
        let row = []
        for(let j=0;j<26;j++){
            // object of the properties
            let cell = {
                bold : false,
                italic : "normal",
                underline : "none",
                fontFamily : "Arial",
                fontSize : "16px",
                hAlign : "left",
                value : ""
            };
            row.push(cell);
        }
        sheetDB.push(row);
    }
    workSheetDB.push(sheetDB); 
    console.log(workSheetDB);

}
initCurrentSheetDb();
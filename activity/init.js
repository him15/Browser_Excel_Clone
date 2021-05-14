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
        str += `<div class='col' rid=${i}  cid=${j} contenteditable="true"></div>`;
    }
    str += "</div>";
}
grid.innerHTML = str;
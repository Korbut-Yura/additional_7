module.exports = function solveSudoku(matrix) {
    let count = 0;
 
     for (let i = 0; i < matrix.length; i++) {
         for (let j =0; j < matrix[i].length; j++) {
             if (matrix[i][j] == 0 ) { 
                 let solution = findSolution(matrix, i, j);
                 if (solution.length == 1) {
                     matrix[i][j] = solution[0];
                     count += 1;
                 }
                 else{
                     let hidden = findHiddenSolution(matrix, i, j, solution);
                     if (hidden) {
                         matrix [i][j] = hidden;
                         count += 1;
                     }
                 }
             }
         }
     }
     if (count > 0) {
         return solveSudoku(matrix);
     }
     else {
         for (i = 0; i < matrix.length; i++) {
             let sum = 0;
             for (j = 0; j < matrix[i].length; j++) {
                 sum += matrix[i][j];
                 
             }
             if (sum == 45) {
                 continue
             }
             else {
                 matrix =  posibleVariant (matrix);
                 solveSudoku(matrix)
             }
         }
        return matrix;
     }
 }
 
 function findSolution(matrix, k, m) {
     let solution = [1,2,3,4,5,6,7,8,9];
 
     for (let j = 0; j < matrix[k].length; j++){
         if (matrix[k][j] != 0) {
             let position = solution.indexOf(matrix[k][j])
             solution.splice(position, 1);
         }  
     }
 
     for (let i = 0; i < matrix.length; i++) {
         if (matrix[i][m] != 0) {
             let position = solution.indexOf(matrix[i][m]);
             if (position != -1){
             solution.splice(position, 1);
             }
         }  
     }
 
     let startI = Math.floor(k/3)*3,
         endI = startI + 3,
         startJ = Math.floor(m/3)*3,
         endJ = startJ + 3;
  
     for (let I = startI; I < endI; I++) {
         for (let J = startJ; J < endJ; J++) {
             if (matrix[I][J] != 0) {
                 let position = solution.indexOf(matrix[I][J])
                 if (position != -1) {
                 solution.splice(position, 1);
                 }
             }
         }
     }
 return solution;    
 }
 
 function findHiddenSolution(matrix, i, j, solution) {
     let stash = ['','',''];
     
     for (let k = 0; k < matrix[i].length; k++) {
         if (matrix[i][k] == 0 && k != j){
         stash[0] += findSolution(matrix,i,k).join(''); 
         }
     }
 
     for (let m = 0; m < matrix.length; m++) {
         if (matrix[m][j] == 0 && m != i) {
          stash[1] += findSolution(matrix,m,j).join('');   
         }
     } 
 
     let startI = Math.floor(i/3)*3,
         endI = startI + 3,
         startJ = Math.floor(j/3)*3,
         endJ = startJ + 3;
  
     for (let I = startI; I < endI; I++) {
         for (let J = startJ; J < endJ; J++) {
             if (matrix[I][J] == 0) {
                 if (I == i && J == j) {
                     continue;
                 }
                 else {
                     stash[2] += findSolution(matrix,I,J).join('')
                 }
             }
         }
     }
 
     for (let s = 0; s < stash.length; s++) {
         for (let l = 0; l < solution.length; l++ ) {
             if (stash[s].indexOf(solution[l]) == -1) {
                 return solution[l];
             }
             else {
                 continue;
             }  
         }
     }
     return false;
 }
 
 function posibleVariant(matrix) {
     for (let i = 0; i < matrix.length; i++) {
         for (let j =0; j < matrix[i].length; j++) {
             if (matrix[i][j] == 0 ) { 
                 matrix[i][j] = findSolution(matrix, i, j)[0];
                 return matrix;
             }
         }
     }
 }
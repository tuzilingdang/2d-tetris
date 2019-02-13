let a = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12]
];

function rotateClockWise(mat) {
    if(!mat && mat.length == 0 && mat[0].length == 0)  return

    const n = mat[0].length;
    const m = mat.length;
    const max = n > m ? n : m

    for(let i = 0; i < m / 2; i ++) {
        for(let j = 0; j < n; j ++) {
            let temp = mat[i][j]
            mat[i][j] = mat[m-i -1][j]
            mat[m-i -1][j] = temp
        }
    }

    for(let i = 0; i < m; i ++ ) {
        for(let j = i + 1 ; j < max; j++ ) {
                let temp =  mat[i] && mat[i][j] ? mat[i][j] : null;
                if(mat[j] && mat[j][i]) mat[i][j] = mat[j][i] ;
                if(temp) mat[j][i] = temp;
        }
    }
    if(m > n) mat = mat.slice(0, n) 
    return mat
}

a = rotateClockWise(a)
console.log(a)
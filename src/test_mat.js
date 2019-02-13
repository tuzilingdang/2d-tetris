let a = [
    [1,1,1],
    [1,0,0]
];

function rotateClockWise(mat) {
    if (!mat && mat.length == 0 && mat[0].length == 0) return

    const n = mat[0].length;
    const m = mat.length;
    const max = n > m ? n : m

    for (let i = 0; i < m / 2; i++) {
        for (let j = 0; j < n; j++) {
            let temp = mat[i][j]
            mat[i][j] = mat[m - i - 1][j]
            mat[m - i - 1][j] = temp
        }
    }
    debugger
    for (let i = 0; i < max; i++) {
        if (i < m) {
            for (let j = i + 1; j < max; j++) {
                let temp = mat[i] && (mat[i][j]!= undefined) ? mat[i][j] : null;
                if (mat[j] && (mat[j][i]!=undefined)) mat[i][j] = mat[j][i];
                if (temp || temp == 0) {
                    if (!mat[j]) mat[j] = Array(n).fill(null)
                    mat[j][i] = temp
                }
            }
        }
        if (n > m) mat[i].splice(m, n - m)
        // debugger
    }
    if (m > n) mat = mat.slice(0, n)

    return mat
}

a = rotateClockWise(a)
console.log(a)
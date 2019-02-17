import {
    BLOCK_TYPE
} from './const'

class Block {
    constructor(type) {
        if (!type) return

        this.type = type;
        this.shape = deepClone(BLOCK_TYPE[type])

        switch (type) {
            case 'L':
            case 'J':
            case 'Z':
            case 'S':
            case 'T':
                this.pos = {
                    x: -1,
                    y: 4,
                    accRows: 0
                }
                break

            case 'I':
            case 'O':
                this.pos = {
                    x: -1,
                    y: 5,
                    accRows: 0
                }
                break

            default:
                break
        }
    }

    get shapeWidth() {
        return this.shape[0].length
    }
    get shapeHeight() {
        return this.shape.length
    }

    left(matrix) {
        if (this.pos.y - 1 < 0) return false
        this.pos.y--;

        for (let i = 0; i < this.shape.length; i++) {
            matrix[this.pos.x + i] && matrix[this.pos.x + i].splice(this.pos.y + this.shape[0].length, 1, 0)
        }

        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                matrix[this.pos.x + i] && matrix[this.pos.x + i].splice(this.pos.y + j, 1, this.shape[i][j])
            }
        }

        return true
    }
    right(matrix) {
        if (this.pos.y + 1 > matrix[0].length - this.shape[0].length) return false
        this.pos.y++;
        // if(this.pos.y > matrix[0].length - this.shape[0].length) return false

        for (let i = 0; i < this.shape.length; i++) {
            matrix[this.pos.x + i] && matrix[this.pos.x + i].splice(this.pos.y - 1, 1, 0)
        }

        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                matrix[this.pos.x + i] && matrix[this.pos.x + i].splice(this.pos.y + j, 1, this.shape[i][j])
            }
        }

        return true
    }

    rotate(matrix) {
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                matrix[this.pos.x + i] && matrix[this.pos.x + i].splice(this.pos.y + j, 1, 0)
            }
        }

        const rotateClockWise = (mat) => {
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
            for (let i = 0; i < max; i++) {
                if (i < m) {
                    for (let j = i + 1; j < max; j++) {
                        let temp = mat[i] && (mat[i][j] != undefined) ? mat[i][j] : null;
                        if (mat[j] && (mat[j][i] != undefined)) mat[i][j] = mat[j][i];
                        if (temp || temp == 0) {
                            if (!mat[j]) mat[j] = Array(n).fill(null)
                            mat[j][i] = temp
                        }
                    }
                }
                if (n > m) mat[i].splice(m, n - m)
            }
            if (m > n) mat = mat.slice(0, n)

            return mat
        }
        this.shape = rotateClockWise(this.shape)

        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                matrix[this.pos.x + i] && matrix[this.pos.x + i].splice(this.pos.y + j, 1, this.shape[i][j])
            }
        }
    }

    down(matrix, accRowsList, clearRows) {
        const shapeHeight = this.shape.length
        const shapeWidth = this.shape[0].length
        const shape = this.shape
        const posY = this.pos.y
        const matLength = matrix[0].length
        let shapeAcc = []
        let crashType = ''

        for (let j = 0; j < shapeWidth; j++) {
            const attatchBottom = (this.pos.x + this.shape.length) >= matrix.length
            const blockCrash = matrix[this.pos.x + this.shape.length] && matrix[this.pos.x + this.shape.length][this.pos.y + j] && this.shape[shapeHeight - 1][j]
            if (attatchBottom || blockCrash) {
                for (let i = 0; i < shapeHeight; i++) {
                    // 检测是否行满
                    if (this.pos.x + i > -1) {
                        let checkLine = matrix[this.pos.x + i] && matrix[this.pos.x + i].filter(value => {
                            return value == 1
                        })
                        if (checkLine.length == matLength) clearRows.push(this.pos.x + i)
                    }
                }
                crashType = blockCrash ? 'blockCrash' : 'attatchBottom'
            }
        }
        if (crashType) {
            for (let j = 0; j < shapeWidth; j++) {
                for (let i = 0; i < shapeHeight; i++) {
                    if (!shapeAcc[j] && shape[i][j]) shapeAcc[j] = shapeHeight - i
                }
                accRowsList[posY + j] = crashType == 'blockCrash' ? matrix.length - this.pos.x - shapeHeight + shapeAcc[j] : accRowsList[posY + j] + shapeAcc[j]
            }
            return false
        }

        this.pos.x++;
        if (this.pos.x - 1 >= 0) {
            for (let i = 0; i < this.shape[0].length; i++)
                matrix[this.pos.x - 1].splice(this.pos.y + i, 1, 0)
        }
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                const newVal = i == this.shape.length - 1 ? this.shape[i][j] || matrix[this.pos.x + i][this.pos.y + j] : this.shape[i][j]
                matrix[this.pos.x + i] && matrix[this.pos.x + i].splice(this.pos.y + j, 1, newVal)
            }
        }

        return true
    }

    fall(matrix, accRowsList, clearRows) {
        const shapeHeight = this.shape.length
        const shapeWidth = this.shape[0].length
        const shape = this.shape
        const prePosX = this.pos.x
        const posY = this.pos.y
        let matLength = matrix[0].length
        let sliceArr = accRowsList.slice(this.pos.y, this.pos.y + this.shape[0].length)
        let accMax = Math.max(...sliceArr)
        if (accMax > matrix.length) return false

        const getPosX = (bottomX, preVal) => {
            let posX = preVal
            for (let h = shapeHeight - 1; h >= 0; h--) {
                for (let k = 0; k < shapeWidth; k++) {
                    if (shape[h][k] && matrix[bottomX] && matrix[bottomX][posY + k]) {
                        posX = bottomX - h - 1;
                        break;
                    }
                }
                if (posX != preVal) break;
            }
            if (posX == preVal && bottomX <= matrix.length - 1) {
                return getPosX(++bottomX, posX)
            }
            return posX != preVal ? posX : bottomX - shapeHeight;
        }

        this.pos.x = getPosX(matrix.length - accMax - 1, this.pos.x)

        for (let i = 0; i < shapeHeight; i++) {
            for (let j = 0; j < shapeWidth; j++) {
                if (!(matrix[this.pos.x + i] && matrix[this.pos.x + i][posY + j])) {
                    matrix[this.pos.x + i] && matrix[this.pos.x + i].splice(posY + j, 1, shape[i][j])
                }
                matrix[prePosX + i] && matrix[prePosX + i].splice(posY + j, 1, 0)
                if (i == 0) {
                    accRowsList[posY + j] = shape[i][j] ? matrix.length - this.pos.x : matrix.length - this.pos.x - 1
                }
            }
            // 检测是否行满
            let checkLine = matrix[this.pos.x + i] && matrix[this.pos.x + i].filter(value => {
                return value == 1
            })
            if (checkLine.length == matLength) clearRows.push(this.pos.x + i)
        }

        return true
    }
}

export default Block

function deepClone(obj) {
    var out = [],
        i = 0,
        len = obj.length;
    for (; i < len; i++) {
        if (obj[i] instanceof Array) {
            out[i] = deepClone(obj[i]);
        } else out[i] = obj[i];
    }
    return out;
}
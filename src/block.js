import { BLOCK_TYPE } from './const'

class Block {
    constructor(type) {
        if (!type) return

        this.type = type;
        this.shape = BLOCK_TYPE[type]

        switch (type) {
        case 'L':
        case 'J':
        case 'Z':
        case 'S':
        case 'T':
            this.pos = { x: -1, y: 4, accRows: 0 }
            break
            
        case 'I':
        case 'O':
            this.pos = { x: -1, y: 5, accRows: 0 }
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

    // get shape() {
    //     return this._shape
    // }

    left(matrix) {
        if (this.pos.y - 1 < 0) return false
        this.pos.y--;
        // if(this.pos.y > matrix[0].length - this.shape[0].length) return false

        for (let i = 0; i < this.shape.length; i++) {
            matrix[this.pos.x + i].splice(this.pos.y + this.shape[0].length, 1, 0)
        }

        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                matrix[this.pos.x + i].splice(this.pos.y + j, 1, this.shape[i][j])
            }
        }

        return true
    }
    right(matrix) {
        if (this.pos.y + 1 > matrix[0].length - this.shape[0].length) return false
        this.pos.y++;
        // if(this.pos.y > matrix[0].length - this.shape[0].length) return false

        for (let i = 0; i < this.shape.length; i++) {
            matrix[this.pos.x + i].splice(this.pos.y - 1, 1, 0)
        }

        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                matrix[this.pos.x + i].splice(this.pos.y + j, 1, this.shape[i][j])
            }
        }

        return true
    }

    down(matrix) {
        // if(this.pos.x + 1 > matrix.length - this.shape.length - accRows) return false

        if (this.pos.x + 1 > matrix.length - this.shape.length) return false
        // if(matrix[this.pos.x + this.shape.length].includes(1)) return false
        for (let i = 0; i < this.shape[0].length; i++) {
            if (matrix[this.pos.x + this.shape.length][this.pos.y + i] == 1) return false
        }
        this.pos.x++;

        if (this.pos.x - 1 >= 0) {
            for (let i = 0; i < this.shape[0].length; i++)
                matrix[this.pos.x - 1].splice(this.pos.y + i, 1, 0)
        }

        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                matrix[this.pos.x + i].splice(this.pos.y + j, 1, this.shape[i][j])
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
        if(accMax > matrix.length) return false
        // let prePosX = this.pos.x

        // this.pos.x = matrix.length - this.shape.length - accMax
        // let bottomX = matrix.length - accMax

        // for(let k = 0; k < shapeWidth; k ++) {
        //     if(this.shape[shapeHeight - 1][k] && matrix[bottomX][k]) {
        //         this.pos.x = bottomX - shapeWidth;
        //         break;
        //     }
        // }
        
        const getPosX = (bottomX, preVal) => {
            let posX = preVal
            for(let h = shapeHeight - 1; h >= 0 ; h--) {
                for(let k = 0; k < shapeWidth; k ++) {
                    if(shape[h][k] && matrix[bottomX] && matrix[bottomX][posY + k]) {
                        posX = bottomX - h - 1;
                        break;
                    }
                }
                if (posX != preVal) break;
            }
            if(posX == preVal && bottomX  <= matrix.length -1 ) {
                return  getPosX(++bottomX, posX)    
            } 
            return posX != preVal ? posX : bottomX - shapeHeight;
        }

        // const getPosX = (bottomX, preVal) => {
        //     if(bottomX  <= matrix.length -1 ) 
        // }

        this.pos.x = getPosX(matrix.length - accMax - 1, this.pos.x)

        for(let i = 0; i < shapeHeight; i ++ ) {
            for(let j = 0;  j < shapeWidth; j++) {
                if(!(matrix[this.pos.x + i] && matrix[this.pos.x + i][posY + j])) {
                    matrix[this.pos.x + i].splice(posY + j, 1, shape[i][j])
                }
                matrix[prePosX + i].splice(posY + j, 1, 0)
                if(i == 0)  {
                    accRowsList[posY + j] = shape[i][j] ?  matrix.length - this.pos.x : matrix.length - this.pos.x - 1
                } 
            }
            // 检测是否行满
            let checkLine = matrix[this.pos.x + i].filter(value => { return value == 1})
            if(checkLine.length == matLength) clearRows.push(this.pos.x + i)
        }

        return true
    }

    rotate() {}

    get_d1_matrix(matrix) {
        matrix[2] = 1;
    }
}

export default Block
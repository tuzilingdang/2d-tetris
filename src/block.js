import { BLOCK_TYPE } from './const'

class Block {
    constructor(type) {
        if (!type) return

        this.type = type;
        this.shape = BLOCK_TYPE[type]

        switch (type) {
        case 'L':
        case 'I':
            this.pos = { x: -1, y: 4, accRows: 0 }
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

    fall(matrix, accRowsList) {
        const shapeHeight = this.shape.length
        const shapeWidth = this.shape[0].length
        const prePosX = this.pos.x
        const posY = this.pos.y
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
        
        const getPosX = (bottomX) => {
            let posX = 0
            for(let k = 0; k < shapeWidth; k ++) {
                if(this.shape[shapeHeight - 1][k] && matrix[bottomX] && matrix[bottomX][posY + k]) {
                    posX = bottomX - shapeHeight;
                    break;
                }
            }

            if(posX == 0 && bottomX  <= matrix.length -1 ) {
                getPosX(++bottomX)
            } 

            return bottomX - shapeHeight 
        }

        this.pos.x = getPosX(matrix.length - accMax - 1)

        for(let i = 0; i < shapeHeight; i ++ ) {
            for(let j = 0;  j < shapeWidth; j++) {
                matrix[this.pos.x + i].splice(posY + j, 1, this.shape[i][j])
                matrix[prePosX + i].splice(posY + j, 1, 0)
                if(i == 0)  {
                    accRowsList[posY + j] = this.shape[i][j] ?  matrix.length - this.pos.x : matrix.length - this.pos.x - 1
                } 
            }
        }

        return true

        // for (let i = 0; i < this.shape.length; i++) {
        //     for (let j = 0; j < this.shape[0].length; j++) {
        //         matrix[prePosX + i].splice(this.pos.y + j, 1, 0)

        //     }
        // }



        // for (let i = 0; i < this.shape.length; i++) {
        //     for (let j = 0; j < this.shape[0].length; j++) {
        //         matrix[this.pos.x + i].splice(this.pos.y + j, 1, this.shape[i][j])

        //         if(this.shape[i][j] && i == 0 ) {
        //             accRowsList[this.pos.y + j] += this.shape.length;
        //         } 
        //         if(this.shape[i][j] && i > 0 && !this.shape[i - 1][j]){
        //             accRowsList[this.pos.y + j] +=this.shape.length - i;
        //         } 
        //     }

        // }
    }

    rotate() {}

    get_d1_matrix(matrix) {
        matrix[2] = 1;
    }
}

export default Block
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
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                matrix[this.pos.x + i].splice(this.pos.y + j, 1, 0)
            }
        }

        let sliceArr = accRowsList.slice(this.pos.y, this.pos.y + this.shape[0].length)
        let accMax = Math.max(...sliceArr)

        this.pos.x = matrix.length - this.shape.length - accMax
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                matrix[this.pos.x + i].splice(this.pos.y + j, 1, this.shape[i][j])
                if ((this.shape[i][j] && i == 0) || (this.shape[i][j] && i > 0 && !this.shape[i - 1][j]))
                    accRowsList[this.pos.y + j] += this.shape.length - i
            }

        }
    }

    rotate() {}

    get_d1_matrix(matrix) {
        matrix[2] = 1;
    }
}

export default Block

import { BLOCK_TYPE } from './const'

class Block {
    constructor(type) {
        if (!type) return

        this.type = type;
        this.shape = BLOCK_TYPE[type]

        switch (type) {
            case 'L':
                this.pos = { x: -1, y: 4 }
                break
            default:
                break
        }
    }

    left() {

    }
    right() {}

    down(matrix) {
        this.pos.x ++;
        if(this.pos.x > matrix.length - this.shape.length) return false

        if(this.pos.x - 1 >= 0) {
            for(let i = 0; i< this.shape[0].length; i ++)
                matrix[this.pos.x - 1].splice(this.pos.y + i, 1 ,0)
        }
    
        for(let i = 0; i < this.shape.length; i++) {
            for(let j = 0; j < this.shape[i].length; j++) {
                matrix[this.pos.x + i].splice(this.pos.y + j, 1 ,this.shape[i][j])
            }
        }

        return true
    }

    fall() {}
    
    rotate() {}

    get_d1_matrix(matrix) {
        matrix[2] = 1;
    }
}

export default Block
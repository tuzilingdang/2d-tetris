
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
        if(this.pos.x >= matrix.length) return 
        for(let i = 0; i < this.shape.length; i++) {
            for(let j = 0; j < this.shape[i].length; j++) {
                matrix[this.pos.x + i][this.pos.y + j] = this.shape[i][j]
            }
        }

        return matrix;
    }
    fall() {}
    rotate() {}
}

export default Block
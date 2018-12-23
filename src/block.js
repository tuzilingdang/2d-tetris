
import { BLOCK_TYPE } from './const'

class Block {
    constructor(type) {
        if (!type) return

        this.type = type;
        this.shape = BLOCK_TYPE[type]

        switch (type) {
        case 'L':
            this.pos = { x: 4, y: -1 }
            break
        default:
            break
        }
    }

    left() {

    }
    right() {}
    down() {
        this.pos.y ++;

        for(let i = 0; i < this.shape.length; i++) {
            for(let j = 0; j < this.shape.length; j++) {
                
            }
        }
        this.matrix = 
    }
    fall() {}
    rotate() {}
}

export default Block
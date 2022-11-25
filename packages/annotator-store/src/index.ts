import {Core} from '@molar/annotator-core'
class Store {
    readonly root:Core
    constructor(root:Core){
        this.root = root
    }
}
export {Store}
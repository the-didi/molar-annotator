import {Store} from '@molar/annotator-store'
import {View} from '@molar/annotator-view'
import {EventEmitter} from 'events';
import {TextSelectionHandler} from './handler/textSelectionHandler'
import {HTML_NODE_ENUMS} from './enums/index'

class Core extends EventEmitter{
    // 1. dataContent
    readonly data:string;
    // 2. dataElement
    readonly element:HTMLElement
    // 3. dataRegExp
    readonly splitRegExp:RegExp|null|undefined
    // 4. textSelectionHandler
    readonly textSelectionHandler:TextSelectionHandler
    // 5. view
    readonly view:View;
    // 6. store
    readonly store:Store;
    constructor(data:string,element:HTMLElement,splitRegExp:RegExp|null|undefined = /\n/){
        super()
        this.data = data
        this.element = element
        this.splitRegExp = splitRegExp
        // init view
        this.view = new View(this)
        // init store
        this.store = new Store(this)
        // init textSelectionHandler
        this.textSelectionHandler = new TextSelectionHandler(this)
        // init labelSelectionHandler
    }
}
export {
    Core,
    HTML_NODE_ENUMS
}
import {Text} from '@molar/annotator-text'
import {HTML_NODE_ENUMS,MOLAR_LABEL_CLASS_NAME} from '@molar/annotator-core'
class Label{
    readonly text:Text
    readonly currentNode:HTMLElement
    constructor(text:Text){
        this.text = text        
        this.renderDomElement()
    }
    private renderDomElement(){
        const labelNode =document.createElement(HTML_NODE_ENUMS.DIV)
        labelNode.className = MOLAR_LABEL_CLASS_NAME.MOLAR_LABEL_INITED
        labelNode.innerText = "Positive"
        this.text.currentNode.appendChild(labelNode)
    }
}
export {Label}
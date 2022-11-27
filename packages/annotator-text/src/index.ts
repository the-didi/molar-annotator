import {HTML_NODE_ENUMS} from '@molar/annotator-core'
import {MOLAR_LABEL_CLASS_NAME} from '@molar/annotator-core'
import {Label} from '@molar/annotator-label'
class Text{
    readonly textContent:string;
    readonly parentNode:HTMLElement|null;
    readonly className: string
    public textLabel:Label;
    public childList: Text[];
    public currentNode : HTMLElement|null
    constructor(parentNode:HTMLElement,textContent:string,className:string){
        this.currentNode = document.createElement(HTML_NODE_ENUMS.DIV)
        this.childList = []
        this.textLabel = new Label(this)
        this.parentNode = parentNode;
        this.textContent = textContent
        this.className = className
        this.generateTextNode()        
    }
    private generateTextNode(){
        console.log("--generate current node--")
        this.currentNode.innerText = this.textContent
        this.currentNode.className = this.className
        if(this.parentNode!=null){
            this.parentNode.appendChild(this.currentNode)
        }
    }
    public addChildNodeToText(parentText:Text,childrenText:Text[]){
        parentText.currentNode.innerText = ""
        for(const item of childrenText){
            parentText.currentNode.appendChild(item.currentNode)
        }
        this.childList.push(...childrenText)
    }

}

function generateTextNode(textContent:string,isLabeled:boolean):Text{
    const text = new Text(null,textContent,isLabeled?MOLAR_LABEL_CLASS_NAME.MOLAR_TEXT_LABLED:MOLAR_LABEL_CLASS_NAME.MOLAR_TEXT_UNLABELED)
    return text
}

export {Text,generateTextNode}
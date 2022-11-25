import {HTML_NODE_ENUMS} from '@molar/annotator-core'

class Text{
    readonly textContent:string;
    readonly parentNode:HTMLElement;
    readonly needsBR: boolean
    readonly className: string
    readonly isLabeled: boolean
    public currentNode : HTMLElement|null
    constructor(parentNode:HTMLElement,textContent:string,needsBR:boolean = false,className:string,isLabeled:boolean){
        this.currentNode = null
        this.parentNode = parentNode;
        this.isLabeled = isLabeled
        this.textContent = textContent
        this.className = className
        this.needsBR = needsBR
        this.generateTextNode()
        // generator BR
        // const brNode = document.createElement(HTML_NODE_ENUMS.BR)
        // this.parentNode.appendChild(brNode)
    }
    private generateTextNode(){
        const divNode = document.createElement(HTML_NODE_ENUMS.DIV)
        const spanNode = document.createElement(HTML_NODE_ENUMS.SPAN)
        spanNode.className = this.className
        spanNode.innerText = this.textContent
        this.currentNode = divNode
        this.currentNode.style.display = "inline"
        this.currentNode.appendChild(spanNode)
        if(this.needsBR){
            console.log(this.needsBR)
            const brNode = document.createElement(HTML_NODE_ENUMS.BR)
            this.currentNode.appendChild(brNode)
        }
        this.parentNode.appendChild(divNode)
    }
    public addChildNodeToText(parentNode:HTMLElement,textContent:string,className:string){
        const textNode = document.createElement(HTML_NODE_ENUMS.SPAN)
        textNode.innerText = textContent
        textNode.className = className
        parentNode.appendChild(textNode)
    }
}

export {Text}
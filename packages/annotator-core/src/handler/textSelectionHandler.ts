import {Core} from '@molar/annotator-core'
import {generateTextNode} from '@molar/annotator-text'
import { EventEmitter } from 'events'
type SelectionInfo={
    startNode:Node|null,
    endNode: Node|null,
    startIndex: number,
    endIndex: number
}

class TextSelectionHandler extends EventEmitter{
    readonly root:Core
    constructor(root:Core){
        super()
        this.root = root
    }
    private getSelectionInfo():SelectionInfo|null{
        const selection = window.getSelection()
        let startElement = null
        let endElement = null
        try {
            startElement = selection!.anchorNode.parentNode
            endElement = selection!.focusNode.parentNode
        }catch(e){
            return null;
        }
        return {
            startNode: startElement,
            endNode: endElement,
            startIndex: selection!.anchorOffset,
            endIndex: selection!.focusOffset
        } as SelectionInfo
    }
    private RenderInlineText(lineNode:Node,startIndex:number,endIndex:number){
        if(endIndex!=-1){
            const currentText = this.root.view.findTextByNode(lineNode)
            let fontNode = generateTextNode(lineNode.textContent.substring(0,startIndex),false)
            let labelNode = generateTextNode(lineNode.textContent.substring(startIndex,endIndex),true)
            let afterNode = generateTextNode(lineNode.textContent.substring(endIndex),false)
            currentText.addChildNodeToText(currentText,[fontNode,labelNode,afterNode])
            this.root.view.renderLabel(labelNode)
        }else{
            console.log("inline render")
            const currentText = this.root.view.findTextByNode(lineNode)
            let fontNode = generateTextNode(lineNode.textContent.substring(0,startIndex),false)
            let labelNode = generateTextNode(lineNode.textContent.substring(startIndex),true)
            let afterNode = generateTextNode("",false)
            currentText.addChildNodeToText(currentText,[fontNode,labelNode,afterNode])
        }
    }   
    private RenderOfflineText(startLineNode:Node,endLineNode:Node,startIndex:number,endIndex:number){
        const startLineIndex = this.root.view.findTextIndex(startLineNode)
        const endLineIndex = this.root.view.findTextIndex(endLineNode)
        this.RenderInlineText(startLineNode,startIndex,-1)
        this.RenderInlineText(endLineNode,0,endIndex)
        for(let i=startLineIndex+1;i<endLineIndex;i++){
            this.root.view.reRenderLineForLabel(i)   
        }
    }
    private RenderText(selection:SelectionInfo){
        if(selection.startNode == selection.endNode){
            this.RenderInlineText(selection.startNode,selection.startIndex,selection.endIndex)
        }else{
            this.RenderOfflineText(selection.startNode,selection.endNode,selection.startIndex,selection.endIndex)
        }
    }
    public textSelection(event:Event){
        const selection = this.getSelectionInfo()
        this.RenderText(selection)
        if(selection){
            this.root.emit("textSelected",selection.startIndex,selection.endIndex)
        }
        window.getSelection()?.removeAllRanges()
    }
}
export {TextSelectionHandler}
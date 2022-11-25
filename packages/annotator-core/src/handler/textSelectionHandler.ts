import {Core} from '@molar/annotator-core'
import {Text} from '@molar/annotator-text'
import {TextNode} from '@molar/annotator-view'
import {HTML_NODE_ENUMS} from '@molar/annotator-core'
type SelectionInfo={
    startNode:Node|null,
    endNode: Node|null,
    startIndex: number,
    endIndex: number
}

class TextSelectionHandler {
    readonly root:Core
    constructor(root:Core){
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
        console.log(lineNode)
        const editSpan = this.root.view.textNodeList.find(e=>{
            return e.text.currentNode.children[0] ==lineNode
        })
        const spanText = editSpan.text.textContent
        const fontNode = {text:new Text(editSpan.text.currentNode,spanText.substring(0,startIndex),false,"",true),_molar_text_id:-1}
        const labelNode = {text:new Text(editSpan.text.currentNode,spanText.substring(startIndex,endIndex),false,"molar-annotator-text--labeled",true),_molar_text_id:-1}
        const afterNode = {text:new Text(editSpan.text.currentNode,spanText.substring(endIndex),!editSpan.text.isLabeled||endIndex!=spanText.length||spanText.substring(endIndex)=="","",true),_molar_text_id:-1} 
        this.root.view.UpdateTextNodeListIndex([fontNode,labelNode,afterNode],editSpan._molar_text_id)
    }   
    private RenderOfflineText(startLineNode:Node,endLineNode:Node,startIndex:number,endIndex:number){
        console.log("offline")
        // this.root.view.UpdateTextNodeListIndex()
    }
    private RenderText(selection:SelectionInfo){
        if(selection.startNode == selection.endNode){
            console.log("inline")
            this.RenderInlineText(selection.startNode,selection.startIndex,selection.endIndex)
        }else{
            console.log("offline")
            this.RenderOfflineText(selection.startNode,selection.endNode,selection.startIndex,selection.endIndex)
        }
    }
    public textSelection(event:Event){
        const selection = this.getSelectionInfo()
        this.RenderText(selection)
        
    }
}
export {TextSelectionHandler}
import {Core} from '@molar/annotator-core'
import {Text} from '@molar/annotator-text'

export type TextNode = {
    text: Text,
    _molar_text_id: number
}

class View {
    readonly root:Core
    readonly textNodeList:TextNode[]
    constructor(root:Core){
        this.root = root
        this.textNodeList = []
        this.generatorTextNode()
        this.registerViewEventHandler()
    }
    private generatorTextNode(){
        console.log("view generator")
        const parentNode = this.root.element
        const spanTextArr = this.root.data.split(this.root.splitRegExp)
        for(let i=0;i<spanTextArr.length;i++){
            const textNode = new Text(parentNode,spanTextArr[i],true,"",false)
            this.textNodeList.push({
                text: textNode,
                _molar_text_id: i
            })
        }
    }
    private registerViewEventHandler(){
        this.root.element.onmouseup = function(e){
            this.root.textSelectionHandler.textSelection(e)
        }.bind(this)
    }
    private renderViewByTextNodeList(textNodeList: TextNode[]){
        console.log(textNodeList)
        // remove all text
        for(let i=0;i<this.root.element.children.length;i++){
            this.root.element.removeChild(this.root.element.children[i])
        }
        for(const item of textNodeList){
            this.root.element.appendChild(item.text.currentNode)
        }
    }
    public UpdateTextNodeListIndex(insertArr:TextNode[],id:number){
        this.textNodeList.splice(id,1,...insertArr)
        for(let i=0;i<this.textNodeList.length;i++){
            this.textNodeList[i]._molar_text_id = i
        }
        this.renderViewByTextNodeList(this.textNodeList)
    }
    
}
export {View}
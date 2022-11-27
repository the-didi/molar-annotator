import {Core,MOLAR_LABEL_CLASS_NAME} from '@molar/annotator-core'
import {Text} from '@molar/annotator-text'
import {Label} from '@molar/annotator-label'

class View {
    readonly root:Core
    readonly textNodeList:Text[]
    readonly labelNodeList:Label[]
    constructor(root:Core){
        this.root = root
        this.textNodeList = []
        this.labelNodeList = []
        this.generatorTextNode()
        this.registerViewEventHandler()
    }
    private generatorTextNode(){
        console.log("view generator")
        const parentNode = this.root.element
        const nodeArr = this.root.data.split(this.root.splitRegExp)
        for(let i=0;i<nodeArr.length;i++){
            const text = new Text(parentNode,nodeArr[i],MOLAR_LABEL_CLASS_NAME.MOLAR_TEXT_INITED)
            this.textNodeList.push(text)
        }
    }
    private registerViewEventHandler(){
        this.root.element.onmouseup = function(e){
            if(window.getSelection()!.type ==="Range"){
                this.root.textSelectionHandler.textSelection(e)
            }else{
                console.log("building ~ ")
            }
        }.bind(this)
    }
    private renderViewByTextNodeList(textNodeList: Text[]){
        // remove all text
        for(let i=0;i<this.root.element.children.length;i++){
            this.root.element.removeChild(this.root.element.children[i])
        }
        for(const item of textNodeList){
            this.root.element.appendChild(item.currentNode)
        }
    }

    public findTextByNode(SelectedNode:Node):Text|null{
        let searchTextList = this.root.view.textNodeList
        function findNodeInTree(searchTextList:Text[],SelectedNode:Node):Text{
            let result
            for(let i=0;i<searchTextList.length;i++){       
                if(searchTextList[i].currentNode == SelectedNode){
                    return searchTextList[i]
                }
                if(searchTextList[i].childList.length!=0){
                    result = findNodeInTree(searchTextList[i].childList,SelectedNode)
                }
            }
            return result
        }
        return findNodeInTree(searchTextList,SelectedNode)
    }
    public findTextIndex(node:Node):number{
        let findNode:Text
        let searchTextList = this.root.view.textNodeList
        function findNodeInTree(searchTextList:Text[],SelectedNode:Node):Text{
            let result
            for(let i=0;i<searchTextList.length;i++){
                if(searchTextList[i].currentNode == SelectedNode){
                    return searchTextList[i]
                }
                if(searchTextList[i].childList.length!=0){
                    result = findNodeInTree(searchTextList[i].childList,SelectedNode)
                }
            }
            return result
        }
        findNode = findNodeInTree(searchTextList,node)
        console.log(findNode)
        if(findNode.parentNode!=null){
            return this.textNodeList.findIndex(e=>{
                return e == findNode
            })
        }else{
            return this.textNodeList.findIndex(e=>{
                return e.childList.find(e=>e==findNode)!=null
            })
        }
    }
    public reRenderLineForLabel(index:number){
        const line = this.textNodeList[index]
        const text = new Text(null,line.textContent,MOLAR_LABEL_CLASS_NAME.MOLAR_TEXT_LABLED)
        line.addChildNodeToText(line,[text])
    }
    public renderLabel(renderNode:Text){
        const label = new Label(renderNode)
        this.labelNodeList.push(label)
    }
}
export {View}
var HTML_NODE_ENUMS;
(function (HTML_NODE_ENUMS) {
    HTML_NODE_ENUMS["SPAN"] = "SPAN";
    HTML_NODE_ENUMS["BR"] = "br";
    HTML_NODE_ENUMS["DIV"] = "div";
})(HTML_NODE_ENUMS || (HTML_NODE_ENUMS = {}));

class Text {
    textContent;
    parentNode;
    needsBR;
    className;
    isLabeled;
    currentNode;
    constructor(parentNode, textContent, needsBR = false, className, isLabeled) {
        this.currentNode = null;
        this.parentNode = parentNode;
        this.isLabeled = isLabeled;
        this.textContent = textContent;
        this.className = className;
        this.needsBR = needsBR;
        this.generateTextNode();
        // generator BR
        // const brNode = document.createElement(HTML_NODE_ENUMS.BR)
        // this.parentNode.appendChild(brNode)
    }
    generateTextNode() {
        const divNode = document.createElement(HTML_NODE_ENUMS.DIV);
        const spanNode = document.createElement(HTML_NODE_ENUMS.SPAN);
        spanNode.className = this.className;
        spanNode.innerText = this.textContent;
        this.currentNode = divNode;
        this.currentNode.style.display = "inline";
        this.currentNode.appendChild(spanNode);
        if (this.needsBR) {
            console.log(this.needsBR);
            const brNode = document.createElement(HTML_NODE_ENUMS.BR);
            this.currentNode.appendChild(brNode);
        }
        this.parentNode.appendChild(divNode);
    }
    addChildNodeToText(parentNode, textContent, className) {
        const textNode = document.createElement(HTML_NODE_ENUMS.SPAN);
        textNode.innerText = textContent;
        textNode.className = className;
        parentNode.appendChild(textNode);
    }
}

class View {
    root;
    textNodeList;
    constructor(root) {
        this.root = root;
        this.textNodeList = [];
        this.generatorTextNode();
        this.registerViewEventHandler();
    }
    generatorTextNode() {
        console.log("view generator");
        const parentNode = this.root.element;
        const spanTextArr = this.root.data.split(this.root.splitRegExp);
        for (let i = 0; i < spanTextArr.length; i++) {
            const textNode = new Text(parentNode, spanTextArr[i], true, "", false);
            this.textNodeList.push({
                text: textNode,
                _molar_text_id: i
            });
        }
    }
    registerViewEventHandler() {
        this.root.element.onmouseup = function (e) {
            this.root.textSelectionHandler.textSelection(e);
        }.bind(this);
    }
    renderViewByTextNodeList(textNodeList) {
        console.log(textNodeList);
        // remove all text
        for (let i = 0; i < this.root.element.children.length; i++) {
            this.root.element.removeChild(this.root.element.children[i]);
        }
        for (const item of textNodeList) {
            this.root.element.appendChild(item.text.currentNode);
        }
    }
    UpdateTextNodeListIndex(insertArr, id) {
        this.textNodeList.splice(id, 1, ...insertArr);
        for (let i = 0; i < this.textNodeList.length; i++) {
            this.textNodeList[i]._molar_text_id = i;
        }
        this.renderViewByTextNodeList(this.textNodeList);
    }
}

export { View };
//# sourceMappingURL=annotator-view.esm-bundler.js.map

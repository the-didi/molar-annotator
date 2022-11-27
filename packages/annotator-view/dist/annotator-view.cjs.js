'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Text {
    constructor(parentNode, textContent, className) {
        this.currentNode = document.createElement(HTML_NODE_ENUMS.DIV);
        this.childList = [];
        this.parentNode = parentNode;
        this.textContent = textContent;
        this.className = className;
        this.generateTextNode();
    }
    generateTextNode() {
        console.log("--generate current node--");
        this.currentNode.innerText = this.textContent;
        this.currentNode.className = this.className;
        if (this.parentNode != null) {
            this.parentNode.appendChild(this.currentNode);
        }
    }
    addChildNodeToText(parentText, childrenText) {
        parentText.currentNode.innerText = "";
        for (const item of childrenText) {
            parentText.currentNode.appendChild(item.currentNode);
        }
        this.childList.push(...childrenText);
    }
}

var HTML_NODE_ENUMS;
(function (HTML_NODE_ENUMS) {
    HTML_NODE_ENUMS["SPAN"] = "SPAN";
    HTML_NODE_ENUMS["BR"] = "br";
    HTML_NODE_ENUMS["DIV"] = "div";
})(HTML_NODE_ENUMS || (HTML_NODE_ENUMS = {}));

var MOLAR_LABEL_CLASS_NAME;
(function (MOLAR_LABEL_CLASS_NAME) {
    MOLAR_LABEL_CLASS_NAME["MOLAR_TEXT_LABLED"] = "molar-annotator-text--labeled";
    MOLAR_LABEL_CLASS_NAME["MOLAR_TEXT_UNLABELED"] = "molar-annotator-text--unlabeled";
    MOLAR_LABEL_CLASS_NAME["MOLAR_TEXT_INITED"] = "molar-annotator-text--inited";
})(MOLAR_LABEL_CLASS_NAME || (MOLAR_LABEL_CLASS_NAME = {}));

class View {
    constructor(root) {
        this.root = root;
        this.textNodeList = [];
        this.generatorTextNode();
        this.registerViewEventHandler();
    }
    generatorTextNode() {
        console.log("view generator");
        const parentNode = this.root.element;
        const nodeArr = this.root.data.split(this.root.splitRegExp);
        for (let i = 0; i < nodeArr.length; i++) {
            const text = new Text(parentNode, nodeArr[i], MOLAR_LABEL_CLASS_NAME.MOLAR_TEXT_INITED);
            this.textNodeList.push(text);
        }
    }
    registerViewEventHandler() {
        this.root.element.onmouseup = function (e) {
            this.root.textSelectionHandler.textSelection(e);
        }.bind(this);
    }
    renderViewByTextNodeList(textNodeList) {
        // remove all text
        for (let i = 0; i < this.root.element.children.length; i++) {
            this.root.element.removeChild(this.root.element.children[i]);
        }
        for (const item of textNodeList) {
            this.root.element.appendChild(item.currentNode);
        }
    }
    findTextByNode(SelectedNode) {
        let searchTextList = this.root.view.textNodeList;
        function findNodeInTree(searchTextList, SelectedNode) {
            let result;
            for (let i = 0; i < searchTextList.length; i++) {
                if (searchTextList[i].currentNode == SelectedNode) {
                    return searchTextList[i];
                }
                if (searchTextList[i].childList.length != 0) {
                    result = findNodeInTree(searchTextList[i].childList, SelectedNode);
                }
            }
            return result;
        }
        return findNodeInTree(searchTextList, SelectedNode);
    }
    findTextIndex(node) {
        let findNode;
        let searchTextList = this.root.view.textNodeList;
        function findNodeInTree(searchTextList, SelectedNode) {
            let result;
            for (let i = 0; i < searchTextList.length; i++) {
                if (searchTextList[i].currentNode == SelectedNode) {
                    return searchTextList[i];
                }
                if (searchTextList[i].childList.length != 0) {
                    result = findNodeInTree(searchTextList[i].childList, SelectedNode);
                }
            }
            return result;
        }
        findNode = findNodeInTree(searchTextList, node);
        console.log(findNode);
        if (findNode.parentNode != null) {
            return this.textNodeList.findIndex(e => {
                return e == findNode;
            });
        }
        else {
            return this.textNodeList.findIndex(e => {
                return e.childList.find(e => e == findNode) != null;
            });
        }
    }
}

exports.View = View;
//# sourceMappingURL=annotator-view.cjs.js.map

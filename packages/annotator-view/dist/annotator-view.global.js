var MolarAnnotatorView = (function (exports) {
    'use strict';

    class Label {
        constructor(text) {
            this.text = text;
            this.renderDomElement();
        }
        renderDomElement() {
            const labelNode = document.createElement(HTML_NODE_ENUMS.DIV);
            labelNode.className = MOLAR_LABEL_CLASS_NAME.MOLAR_LABEL_INITED;
            labelNode.innerText = "Positive";
            this.text.currentNode.appendChild(labelNode);
        }
    }

    class Text {
        constructor(parentNode, textContent, className) {
            this.currentNode = document.createElement(HTML_NODE_ENUMS.DIV);
            this.childList = [];
            this.textLabel = new Label(this);
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
        MOLAR_LABEL_CLASS_NAME["MOLAR_LABEL_INITED"] = "molar-annotator-label--inited";
        MOLAR_LABEL_CLASS_NAME["MOLAR_LABEL_SELECTED"] = "molar-annotator-label-selected";
        MOLAR_LABEL_CLASS_NAME["MOLAR_LABEL_DESTORYED"] = "molar-annotator-label-destoryed";
    })(MOLAR_LABEL_CLASS_NAME || (MOLAR_LABEL_CLASS_NAME = {}));

    class View {
        constructor(root) {
            this.root = root;
            this.textNodeList = [];
            this.labelNodeList = [];
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
                if (window.getSelection().type === "Range") {
                    this.root.textSelectionHandler.textSelection(e);
                }
                else {
                    console.log("building ~ ");
                }
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
        reRenderLineForLabel(index) {
            const line = this.textNodeList[index];
            const text = new Text(null, line.textContent, MOLAR_LABEL_CLASS_NAME.MOLAR_TEXT_LABLED);
            line.addChildNodeToText(line, [text]);
        }
        renderLabel(renderNode) {
            const label = new Label(renderNode);
            this.labelNodeList.push(label);
        }
    }

    exports.View = View;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=annotator-view.global.js.map

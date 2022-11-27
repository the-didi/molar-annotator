var MolarAnnotatorText = (function (exports) {
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
    function generateTextNode(textContent, isLabeled) {
        const text = new Text(null, textContent, isLabeled ? MOLAR_LABEL_CLASS_NAME.MOLAR_TEXT_LABLED : MOLAR_LABEL_CLASS_NAME.MOLAR_TEXT_UNLABELED);
        return text;
    }

    exports.Text = Text;
    exports.generateTextNode = generateTextNode;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=annotator-text.global.js.map

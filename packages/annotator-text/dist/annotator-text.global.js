var MolarAnnotatorText = (function (exports) {
    'use strict';

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

    exports.Text = Text;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=annotator-text.global.js.map

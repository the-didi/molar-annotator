var MolarAnnotatorLabel = (function (exports) {
    'use strict';

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

    exports.Label = Label;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=annotator-label.global.js.map

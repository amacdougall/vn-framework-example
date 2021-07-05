/**
 * Basic visual novel framework.
 */
class VNSystem {

  constructor({rootContentUrl, rootElementSelector}) {
    this.rootContentUrl = rootContentUrl;
    this.rootElement = document.querySelector(rootElementSelector);
  }

  start() {
    this.advanceToNode(this.rootContentUrl);
  }

  advanceToNode(nodeUrl) {
    fetch(nodeUrl)
      .then(response => response.json())
      .then(data => this.handleNodeContent(data));
  }

  handleNodeContent(data) {
    while (data["directives"].length > 0) {
      let directive = data["directives"].shift();
      console.log("Processing directive: %o", directive);
      let command = Object.keys(directive)[0];
      if (typeof this[command] === "Function") {
        shouldContinue = this[command](directive);
        unless (shouldContinue) {
          break;
        }
      }
    }
  }

  choice(directive) {
    // display options as buttons; on click, execute the option behaviors, such
    // as destination or moveToNode, then return true (to continue the
    // directives of the current node) or false (if loading another node)

    // use advanceToNode to load a new node, of course
  }
}

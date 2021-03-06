/**
 *
 */
class EventGraph {
    /**
     *
     */
    constructor() {
        this.nodeList = {};
        this.nodesArray = [];
    }

    /**
     *
     * @param nodeId
     * @param nodeOptions
     */
    addNode(nodeId, nodeOptions = {}) {
        if (typeof nodeId === 'undefined' || nodeId === "" || typeof nodeId !== "string") {
            throw new SyntaxError("You haven't provided a string based unique name for your node e.g. 'node1'");
        }

        if (typeof this.nodeList[nodeId] !== 'undefined') {
            throw new SyntaxError("Node " + nodeId + " already exists please enter another node ID");
        }

        const {description: description = "", tag: tag = ""} = nodeOptions;

        this.nodeList[nodeId] = {
            description,
            tag
        };
    }

    /**
     * Delete a node from the graph
     * @param {string} nodeId - Unique string ID of the node to be deleted
     */
    deleteNode(nodeId) {
        if (typeof nodeId === 'undefined' || nodeId === "" || typeof nodeId !== "string") {
            throw new SyntaxError("You haven't provided a string based unique name for the node to be deleted e.g. 'node1'");
        }

        if (typeof this.nodeList[nodeId] === 'undefined') {
            throw new SyntaxError("Node " + nodeId + " is not present please check the name passed");
        }

        delete this.nodeList[nodeId];
    }


    /**
     * Connect a node with another node creating edges
     * @param sourceNodeId
     * @param targetNodeId
     * @param edgeLabel
     */
    addEdge(sourceNodeId, targetNodeId, edgeLabel) {

    }

    /**
     * Delete a node edges
     * @param sourceNodeId
     * @param targetNodeId
     * @param edgeLabel
     */
    deleteEdge(sourceNodeId, targetNodeId, edgeLabel) {

    }

    getEdgesOfNodes() {

    }

    /**
     * Find nodes in the graph
     * @param nodeId
     * @param showInConsole
     * @returns {Array}
     */
    findNodes(nodeId, showInConsole = false) {
        if (typeof nodeId === 'undefined') {
            throw new SyntaxError("You haven't provided the unique name or array of unique names for the node to be deleted e.g. 'node1' or ['node1', 'node2']");
        }

        let filteredNodesArray = [],
            nodes = nodeId instanceof Array ? nodeId : [nodeId];

        for (let name of nodes) {
            if (typeof this.nodeList[name] === 'undefined') {
                throw new SyntaxError("Node " + name + " is not present please check the name passed");
            }
            filteredNodesArray.push(this.nodeList[name]);
        }

        showInConsole ? console.log(filteredNodesArray) : false;
        return filteredNodesArray;
    }

    /**
     *
     * @param showInConsole
     * @returns {{}|*}
     */
    getAllNodes(showInConsole = false) {
        showInConsole ? console.log(this.nodeList) : false;
        return this.nodeList;
    }

}

let eventGraph = new EventGraph();

eventGraph.addNode("node 1", {
    description: "first node",
    tag: "movable"
});

eventGraph.addNode("node 2");

//graph.deleteNode("node 1");

eventGraph.getAllNodes(true);

eventGraph.findNodes("node 1", true);

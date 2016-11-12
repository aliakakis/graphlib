/**
 *
 */
class Graph {
    /**
     *
     */
    constructor() {
        this.nodesArray = [];
    }

    /**
     * Add a node to the graph
     * @param {{name: "", description: "", tag: ""}} node - Pass a literal JS object
     */
    addNode(node) {
        if (node === undefined) {
            throw new SyntaxError("You haven't provided a unique name for your node e.g. {name:'node1'}");
        }

        let nodes = node instanceof Array ? node : [node];

        for (let node of nodes) {
            if (node.name === undefined) {
                throw new SyntaxError("You haven't provided a unique name for your node e.g. {name:'node1'}");
            }
            this.nodesArray.push(node);
        }
    }

    /**
     * Delete a node from the graph
     * @param {string} nodeId - Unique string ID of the node to be deleted
     */
    deleteNode(nodeId) {
        if (nodeId === undefined) {
            throw new SyntaxError("You haven't provided the unique name for the node to be deleted e.g. 'node1'");
        }

        let nodes = nodeId instanceof Array ? nodeId : [nodeId];

        for (let name of nodes) {
            let isNodeFound;

            for (let node of this.nodesArray) {
                if (node.name === name) {
                    this.nodesArray.splice(this.nodesArray.indexOf(node), 1);
                    isNodeFound = true;
                }
            }
            isNodeFound ? console.log("Node " + name + " deleted") : console.log("Node " + name + " not found");
        }
    }


    /**
     * Connect a node with another node creating edges
     * @param {string} sourceNodeId - Source node ID
     * @param {array} targetNodeIds - Array of target nodes IDs
     */
    addEdge(sourceNodeId, targetNodeId, edgeLabel) {

    }

    /**
     * Delete a node edges
     * @param {string} sourceNodeId - Source node ID
     * @param {array} targetNodeIds - Array of target nodes IDs
     */
    deleteEdge(sourceNodeId, targetNodeId, edgeLabel) {

    }

    /**
     * Find nodes in the graph
     * @param {array} nodeIdsArray - Array of node IDs
     */
    findNodes(nodeId) {
        if (nodeId === undefined) {
            throw new SyntaxError("You haven't provided the unique name or array or unique names for the node to be deleted e.g. 'node1' or ['node1', 'node2']");
        }

        let filteredNodesArray = [];
        let nodes = nodeId instanceof Array ? nodeId : [nodeId];

        for (let name of nodes) {
            let isNodeFound;

            for (let node of this.nodesArray) {
                if (node.name === name) {
                    filteredNodesArray.push(node);
                    isNodeFound = true;
                }
            }
            isNodeFound ? console.log("Node " + name + " found") : console.log("Node " + name + " not found");
        }

        return filteredNodesArray;
    }

    /**
     *
     */
    getAllNodes() {
        return this.nodesArray;
    }

}

let graph = new Graph();

graph.addNode([
    {
        name: "a"
    },
    {
        name: "b"
    },
    {
        name: "c"
    },
    {
        name: "d"
    }
]);


//graph.deleteNode("b");

//graph.getAllNodes();

console.log(graph.findNodes(["b","c"]));
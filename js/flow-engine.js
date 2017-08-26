/**
 * Flow engine class
 */
class Flow {
    /**
     * Constructor
     * @param {object|string} objectToTest - The object to test either literal either JSON
     */
    constructor(objectToTest) {
        this.startRunRule = '';
        this.rulesList = {};

        /* Check if object is JSON */
        this.objectToTest = (function (objectToTest) {
            try {
                JSON.parse(objectToTest);
            }
            catch (error) {
                return objectToTest;
            }
            return JSON.parse(objectToTest);
        })(objectToTest);
    }

    /**
     * Add rule function
     * @param {string} id - Unique id of each rule
     * @param {function} ruleFunc - with obj parameter for accessing the passed object to test
     * @param {string|null} trueId - Rule to run if test passed
     * @param {string|null} falseId -Rule to run if test failed
     */
    addRule(id, ruleFunc, trueId, falseId) {
        /* Syntax error checks */
        if (arguments.length < 4) {
            throw new SyntaxError('You must pass all parameters necessary e.g. addRule(\'rule1\', function(obj){}, \'rule2\', \'rule3\')');
        }

        if (typeof this.rulesList[id] !== 'undefined') {
            throw new SyntaxError('Rule with id "' + id + '" already exists please enter another unique rule id');
        }

        /* Save first rule id in order for the run command to know where to start */
        if (Object.keys(this.rulesList).length === 0) {
            this.startRunRule = id;
        }

        /* Add rule to the rules list object */
        this.rulesList[id] = {
            rule: () => {
                /* Run the function and return the id for the next rule */
                let ruleResult = ruleFunc(this.objectToTest) ?
                    (console.log('Rule "' + id + '" passed'), trueId) :
                    (console.log('Rule "' + id + '" not passed'), falseId);

                if (ruleResult !== null) {
                    /* In case the next rule id is missing throw an error */
                    if (typeof this.rulesList[ruleResult] === 'undefined') {
                        throw new SyntaxError('Rule with id "' + id + '" is not in the rules list');
                    }
                    /* Go to next rule */
                    this.rulesList[ruleResult].rule();
                }
                else {
                    /* If null for trueId or falseId end execution */
                    console.log('END');
                }

            },
        };
    }

    /**
     * Add rules function
     * @param {object|string} rules - JSON or literal object with the rules to run
     */
    addRules(rules) {
        let parsedRules = {}; // Rules after checking if JSON

        /* Check if object is JSON */
        parsedRules = (function (rules) {
            try {
                JSON.parse(rules);
            }
            catch (error) {
                return Object.assign({}, parsedRules, rules);
            }
            return Object.assign({}, parsedRules, JSON.parse(rules));
        })(rules);

        /* We have to merge these since we are dealing with a rule set */
        Object.assign(this.rulesList, parsedRules);

        /* Syntax error checks */
        if (Object.keys(this.rulesList).length === 0) {
            throw new SyntaxError('You haven\'t provided an rules set.');
        }

        /* Replace rule function in order to have greater control */
        Object.keys(this.rulesList).forEach((ruleId) => {
            this.rulesList[ruleId].saveResult = this.rulesList[ruleId].rule(this.objectToTest);
            this.rulesList[ruleId].rule = () => {
                /* Run the function and return the id for the next rule */
                let ruleResult = this.rulesList[ruleId].saveResult ?
                    (console.log('Rule "' + ruleId + '" passed'), this.rulesList[ruleId].trueId) :
                    (console.log('Rule "' + ruleId + '" not passed'), this.rulesList[ruleId].falseId);

                if (ruleResult !== null) {
                    /* In case the next rule id is missing throw an error */
                    if (typeof this.rulesList[ruleResult] === 'undefined') {
                        throw new SyntaxError('Rule with id "' + ruleId + '" is not in the rules list');
                    }
                    /* Go to next rule */
                    this.rulesList[ruleResult].rule();
                }
                else {
                    /* If null for trueId or falseId end execution */
                    console.log('END');
                }
            }
        });
    }

    /**
     * Run flow engine rules set
     */
    run() {
        this.rulesList[Object.keys(this.rulesList)[0]].rule(); // Object.keys(this.rulesList)[0] -> get first key in object
    }
}

/* First example uses add one rule at a time */
let flow = new Flow({
    color: 'red'
});

flow.addRule('rule1', function(obj) {
    return !!obj;
}, 'rule2', 'rule3');

flow.addRule('rule2', function(obj) {
    return obj.color === 'red';
}, 'rule3', null);

flow.addRule('rule3', function(obj) {
    return obj.color === 'blue';
}, null, null);

flow.run();

/* Second example passes a JSON object or literal object */
let flowRuleSet = new Flow({
    color: 'red'
});

flowRuleSet.addRules({
    rule1: {
        rule: function(obj) {
            return !!obj;
        },
        trueId: 'rule2',
        falseId: 'rule3'
    },
    rule2: {
        rule: function(obj) {
            return obj.color === 'red';
        },
        trueId: 'rule3',
        falseId: null
    },
    rule3: {
        rule: function(obj) {
            return obj.color === 'blue';
        },
        trueId: null,
        falseId: null
    }
});

flowRuleSet.run();



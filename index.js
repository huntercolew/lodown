'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) { // check for array
        for(var i = 0; i < collection.length; i++) { // loop over array
            action(collection[i], i, collection); // perform given function
        }
    } else { // else
        for (var key in collection) { // loop over object
            action(collection[key], key, collection); // perform given function
        }
    }
}
module.exports.each = each;


/**
 * identity: takes a value and returns a value unchanged
 * 
 * @param {*} value
 * @return {*} value unchanged
 */
 
 function identity(value){ 
     return value; // return value unchanged 
 }
 module.exports.identity = identity;
 
 function typeOf(value){ // return type of value as a string
    if(value === null) return "null"; // count for null
    if(Array.isArray(value)) return "array";  // count for array
    return typeof value; // anything else use type of
}
module.exports.typeOf = typeOf;

/**
 * first: iterates through an array adding the first variable amount
 * of items to a new array
 * 
 * @param {Array} array: List of items to find the first values of
 * @param {Number} num: Number of items from beginning of array needed by user
 * @return {Array} array of items in array up to num
 */
 
function first(array, num){
    var resultArray = []; // holder value
    if(!Array.isArray(array)) return []; // empty array if array is not an array
    if(num == undefined || typeof num !== 'number') return array[0]; // if num is invalid give first element
    if(num < 0) return []; // if num is negative return empty
    if(num > array.length) return array; // if num is greater than limit, return whole array
    for(var i = 0; i <= num - 1; i++){ // loop over array
        resultArray.push(array[i]); // add elements up to target index
    }
    return resultArray; // return result
}
module.exports.first = first;

/**
 * last: iterates through an array adding the last variable amount
 * of items to a new array
 * 
 * @param {Array} array: List of items to find the last values of
 * @param {Number} number of items from end of array needed by user
 * @return {Array} array of items in array counting backwards up to num
 */
 
function last(array, num){
    var resultArray = []; // holder array
    if(!Array.isArray(array)) return []; // return empty if not an array
    if(num == undefined || typeof num !== 'number') return array[array.length - 1]; //return last if number invalid
    if(num < 0) return []; // return empty if num is negative
    if(num > array.length) return array; // return whole array if number is to big
    for(var i = array.length - num; i <= array.length - 1; i++){ // loop over array
        resultArray.push(array[i]); // add elements up to given number
    }
    return resultArray; // return result
}
module.exports.last = last;

/**
 * indexOf: iterates through an array finding the first index of a certain
 * variable
 * 
 * @param {Array} array: List of items to find the index of a value
 * @param {*} value: Data to compare against array and find first instance of
 * @return {Number} returns index of array if found, returns -1 else
 */
 
function indexOf(array, value){
    for(var i = 0; i < array.length; i++){
        if(array[i] == value) return i;
    }
    return -1;
}
module.exports.indexOf = indexOf;

/**
 * contains: method to check if an array has a certain value at least once
 * anywhere in the array
 * 
 * @param {Array} array: List of items to find a value within
 * @param {*} value: Value we are checking array for an instance of
 * @return {Boolean} true if found, false if not present
 */
 
function contains(array, value){
    var isValue = false;
    for(var i = 0; i < array.length; i++){
        if(array[i] === value) isValue = true;
    }
    return isValue ? true : false;
}
module.exports.contains = contains;

/**
 * unique: sorts through a given array cleaning up any duplicate
 * values
 * 
 * @param {Array} array: List of items to sort through
 * @return {Array} array of items without duplicates,
 * original array remains unchanged
 */
 
function unique(array){
    var result = [];
    for(var i = 0; i < array.length; i++){
        if(indexOf(array, array[i]) == i){
            result.push(array[indexOf(array, array[i])]);
        }
    }
    return result;
}
module.exports.unique = unique;

/**
 * filter: iterates through an array and adds to a list to return all
 * the values that passed a given test
 * 
 * @param {Array} array: List of items to filter
 * @param {Function} testFunc: test function to filter elements by
 * @return {Array} array of items that passed the test function
 */
 
function filter(array, testFunc){
    var result = [];
    function pushArray(element, index, collection){
        if(testFunc(element, index, collection)){
            result.push(element);
        }
    }
    each(array, pushArray);
    return result;
}
module.exports.filter = filter;

/**
 * reject: iterates through an array and adds to a list to return all
 * the values that failed a given test
 * 
 * @param {Array} array: List of items to filter 
 * @param {Function} testFunc: test function to filter elements by
 * @return {Array} array of items that failed the test function
 */
 
function reject(array, testFunc){
    function testFuncBundle(element, index, collection){
        return !testFunc(element, index, collection);
    }
    return filter(array, testFuncBundle);
}
module.exports.reject = reject;

/**
 * partition: method built to separate an array into an array of arrays
 * based on whether the element passed or failed a given test function.
 * passing elements are pushed to the first array.
 * 
 * @param {Array} array: List of items to test and partition
 * @param {Function} testFunc: test function to 
 * @return {Array} array of partitioned elements. original array unmodified
 */
 
function partition(array, testFunc){
    var result = [[], []];
    for(var i in array){
        if(testFunc(array[i], i, array)){
            result[0].push(array[i]);
        }else{
            result[1].push(array[i]);
        }
    }
    return result;
}
module.exports.partition = partition;

/**
 * map: function to test elements of a collection and add to an array
 * the the return of the test function
 * 
 * @param {Collection} collection: Collection of elements to test against
 * @param {Function} testFunc: test function to filter data of the given collection
 * @return {Array} array of elements returned by the test function
 */
 
function map(collection, testFunc){
    var result = [];
    for(var i in collection){
        result.push(testFunc(collection[i], i, collection));
    }
    return result;
}
module.exports.map = map;

/**
 * pluck: function that uses map function to find the value of a given property
 * for every element in an array of objects
 * 
 * @param {Array} objectArray: array of objects to search through
 * @param {String} property: name of property that each object should be searched for
 * @return {Array} array of values of the given property of each object
 */
 
function pluck(objectArray, property){
    var result = [];
    result = (map(objectArray, function(value, key, collection){return collection[key][property]}));
    return result;
}
module.exports.pluck = pluck;

/**
 * every: iterates through a collection to perform a test on every
 * element given a test function
 * 
 * @param {Collection} collection: array or object to iterate through using each
 * @param {Function} testFunc: test function to test each element in collection
 * @return {Boolean} returns true if every element passed if testFunc is a defined function
 * and returns true if every element is truthy otherwise
 */
 
function every(collection, testFunc){
    var passed = true;
    function funcBundle(element, index, collection){
        if(typeof testFunc == 'function'){
            if(!testFunc(element, index, collection)){
            passed = false;
            }
        }else if(!element){
            passed = false;
        }
    }
    each(collection, funcBundle);
    return passed;
}
module.exports.every = every;

/**
 * some: iterates through a collection to perform a test on every
 * element given a test function
 * 
 * @param {Collection} collection: array or object to iterate through using each
 * @param {Function} testFunc: test function to test each element in collection
 * @return {Boolean} returns true if at least one element passed if testFunc is a defined function
 * and returns true if at least one element is truthy otherwise
 */
 
function some(collection, testFunc){
    var passed = false;
    function funcBundle(element, index, collection){
        if(typeof someTestFunc == 'function'){
            if(testFunc(element, index, collection)){
            passed = true;
            }
        }else if(element){
            passed = true;
        }
    }
    each(collection, funcBundle);
    return passed;
}
module.exports.some = some;

/**
 * reduce: iterates through an array performing tests on its elements and
 * storing a persistent value between iterations
 * 
 * @param {Array} array: List of items to iterate through and test / perform actions
 * @param {Function} testFunc: test function initialized to previousResult
 * @return {*} value based on the action of the test function
 */
 
function reduce(array, testFunc, seed){
    var i = 0;
    if (typeof seed === 'undefined') {
        seed = array[0];
        i = 1;
    }
    var previousResult = seed;
    for (; i < array.length; i++) {
        previousResult = testFunc(previousResult, array[i], i);
    }
    return previousResult;
}
module.exports.reduce = reduce;

/**
 * extend: takes multiple objects and copies the properties of all objects
 * and copies them to the first object in the arguments
 * 
 * @param {Object} arguments: parameters should be at least to objects to perform a copy
 * from object 2 => i to object 1
 * @return {Object} returns the now-modified first object passed as an argument
 */
 
function extend(){
    for(var i in arguments){
        for(var key in arguments[i]){
            arguments[0][key] = arguments[i][key];
        }
    }
    return arguments[0];
}
module.exports.extend = extend;
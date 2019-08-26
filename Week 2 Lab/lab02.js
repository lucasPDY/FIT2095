class Queue {
    constructor() {
        this.q = [];
    }
// get the current number of elements in the queue
//Getter function
    get length() {
        return this.q.length
    };
//Get all the elements 
    get queue() {
        return this.q;
    }
// Boolean function: returns true if the queue is empty, false otherwise 
    isEmpty() {
        return 0 == this.q.length;
    };
//adds new element to the end of the quue
    enqueue(newItem) {
        this.q.push(newItem)
    };
//Boolean function: returns true if an item is found (first occurnace); false otherwise
    inQueue(item) {
        let i = 0;
        let isFound = false;
        while (i < this.q.length && !isFound) {
            if (this.q[i] === item) {
                isFound = true;
            } else
                i++;
        }
        return (isFound);
    }
// pop an item from the queue
    dequeue() {
        if (0 != this.q.length) {
            let c = this.q[0];
            this.q.splice(0, 1);
            return c
        }
    };
// removes all ites from the queue, same as getting a new list
    remove(){
        this.q = [];
    }

//  add a new function that adds a set of items into the queue
    addAll(numList){
        for (let i = 0; i < numList.length; i++){
            this.enqueue(numList[i]);
        }
    }

//add a function that pops (dequeues) N elements from the queue. 
//The function should reject the input if there is no enough element to be removed.    
    dequeueN(N){
        if (N > this.length){
            console.log("Can't dequeue, not enough elements");
        }
        else{
            for(let i = 0; i < N; i++){
                this.dequeue();
            }
        }
    }

    printIndex(){
        for (let i = 1; i <= this.length; i++){
            console.log(i.toString(), "->", this.q[i-1].toString());
        }
    }
};

let queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
console.log(queue.length);
console.log(queue.q);
queue.dequeue();
queue.enqueue(33);
console.log(queue.q);
console.log(queue.inQueue(33));
console.log(queue.inQueue(88));
console.log("\nLab Begins here");

// Test Remove
queue.remove(); 
console.log(queue.q);

// Test addAll
queue.enqueue(1);
queue.enqueue(10);
queue.addAll([1,2,3,4]);
console.log(queue.q);

// Test dequeue
// Error test
queue.dequeueN(10);
// Normal test
queue.dequeueN(2);
console.log(queue.q);

// Test print
queue.printIndex();

let obj = {
    name: 'Tom',
    age: 20,
    address: 'Melbourne',
    university: 'Monash'
}
const { address} = obj;
if (address === 'melbourne' && obj.name === 'Tom') {
console.log("Tom lives in Melbourne");
} else {
console.log('Something wrong with the name or address');
}console.log('Mission Accomplished');

console.log(address)
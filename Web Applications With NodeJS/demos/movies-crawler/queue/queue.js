class Queue{
    constructor(){
        this.head = null;
        this.tail = null;
    }

    enqueue(value){
        const newElement = {
            value: value,
            next: null,
        };

        if (this.head === null){
            this.head = newElement;
            this.tail = newElement;
            return;
        }

        this.tail.next = newElement;
        this.tail = newElement;
    }

    dequeue(){
        const elementToDequeue = this.head;
        this.head = elementToDequeue.next;
        return elementToDequeue.value;
    }

    enqueueMany(...elements){
        elements.forEach(e => {
            this.enqueue(e);
        });
    }

    isEmpty(){
        return this.head === null;
    }
}

const getQueue = () => {
    return new Queue();
};

module.exports = {
    getQueue
};
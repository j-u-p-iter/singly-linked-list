import { SinglyLinkedListNode } from './SinglyLinkedListNode';

type Callback<Result = void> = (current: SinglyLinkedListNode | null, index: number) => Result;

export class SinglyLinkedList {
  private length = 0;
  private head = null;
  private tail = null;

  private isIndexInvalid(index: number) {
    if (typeof index !== 'number' || index < 0 || index >= this.length) {
      return true;
    } 

    return false;
  }

  /**
   * Derives node from any value.
   *
   */
  private valueToNode(value: any) {
    let newNode;

    if (value instanceof SinglyLinkedListNode) {
      newNode = value;
    } else {
      newNode = new SinglyLinkedListNode(value);
    }

    return newNode;
  }

  constructor() {}

  /**
   * Add node at the end of 
   *   the list.
   *
   */
  public push(value: any) {
    const newNode = this.valueToNode(value);

    /**
     * When there is only one node,
     *   the head and the tail refer 
     *   to the same node.
     *   The next property for both nodes 
     *   equals to null.
     */
    if (this.isEmpty()) {
      this.head = this.tail = newNode;
      this.tail.setNext(null);
    } else {
      this.tail.setNext(newNode);
      /**
       * The tail is always stored
       *   as the next property of
       *   the previous node. So,
       *   redefining the tail, we 
       *   don't loose it.
       */
      this.tail = newNode;
    }

    this.length++;

    return this;
  }

  /**
   * Traverses the list
   *   from the very beginning
   *   till the very end.
   *
   */
  public forEach(callback: Callback) {
    if (typeof callback !== 'function') {
      throw new Error('.forEach(callback) method expects a callback.')
    }

    let current = this.head;
    let index = 0;

    while (current instanceof SinglyLinkedListNode) {
      callback(current, index);

      current = current.getNext();
      index++;
    }
  }

  /**
   * Removes the last node 
   *   from the list.
   *
   */
  public pop() {
    if (this.isEmpty()) { return; }

    if (this.length === 1) {
      const removedNode = this.head;

      this.clear();

      return removedNode;
    }

    let removedNode;

    this.forEach((current, index) => {
      if (index === this.length - 2) { 
        removedNode = current.getNext();

        current.setNext(null);
        this.tail = current;
      }
    });

    this.length--;

    return removedNode;
  }

  /**
   * Removes first node 
   *   from the list.
   *
   */
  public shift() {
    const currentHead = this.head;

    if (this.isEmpty()) {
      return;
    }

    if (this.length === 1) {
      this.clear();
    } else {
      this.head = this.head.getNext();

      this.length--;
    }

    return currentHead;
  } 

  /**
   * Adds new node to the 
   *   beginning of the list.
   *
   */
  public unshift(value) {
    if (this.isEmpty()) {
      return this.push(value);
    }

    const newNode = this.valueToNode(value);

    newNode.setNext(this.head);

    this.head = newNode;

    this.length++;

    return this;
  };

  /**
   * Finds the node by the index.
   *
   */
  public findAt(nodeIndex: number): SinglyLinkedListNode | null {
    if (this.isIndexInvalid(nodeIndex)) {
      return null;
    }

    const foundNode = this.find((_, index) => index === nodeIndex);

    return foundNode;
  };

  /**
   * Finds the node in the list according to the
   *   condition, provided in the callback.
   *
   */
  public find(callback: Callback<boolean>, startingNode: SinglyLinkedListNode = this.head): SinglyLinkedListNode | null {
    if (typeof callback !== 'function') {
      throw new Error('.find(callback) method expects a callback.')
    }

    if (!startingNode || !(startingNode instanceof SinglyLinkedListNode)) {
      throw new Error('.find(callback) expects to start from a starting node.')
    }

    let current = startingNode;
    let counter = 0;

    while(current instanceof SinglyLinkedListNode) {
      if (callback(current, counter)) {
        return current;
      }

      current = current.getNext();
      counter++;
    }

    return null;
  }

  /**
   * Filters out the list.
   *
   */
  public filter(callback: Callback<boolean>): SinglyLinkedList {
    if (typeof callback !== 'function') {
      throw new Error('.filter(callback) method expects a callback.')
    }

    const resultList = new SinglyLinkedList();

    this.forEach((node, index) => {
      if (callback(node, index)) {
        resultList.push(node.clone());
      }
    });

    return resultList;
  }

  /**
   * Inserts new node in the list according to 
   *   the provided index.
   *
   */
  public insertAt(nodeIndex: number, value: any) {
    if (nodeIndex < 0 || nodeIndex > this.length) {
      return false;
    }

    const newNode = this.valueToNode(value); 

    if (nodeIndex === 0) {
      return Boolean(this.unshift(newNode));
    }

    if (nodeIndex === this.length) {
      return Boolean(this.push(newNode));
    }

    const parentNode = this.findAt(nodeIndex - 1);

    const currentNodeAtIndex = parentNode.getNext();

    parentNode.setNext(newNode);
    newNode.setNext(currentNodeAtIndex);

    this.length++;

    return true;
  }

  /**
   * Removes node from the list at the
   *   provided position
   *
   */
  public removeAt(nodeIndex: number): boolean {
    if (this.isIndexInvalid(nodeIndex)) {
      return false;
    }

    if (nodeIndex === 0) {
      return Boolean(this.shift());
    }

    if (nodeIndex === this.length - 1) {
      return Boolean(this.pop());
    }

    const parentNode = this.findAt(nodeIndex - 1);
    const nextNode = parentNode.getNext().getNext(); 

    parentNode.setNext(nextNode);

    this.length--;

    return true;
  }

  /**
   * Sets the new value for the node 
   *   at some index.
   *
   */
  public setAt(nodeIndex, value): boolean {
    const node = this.findAt(nodeIndex);

    if (!node) {
      return false; 
    }

    node.setValue(value);

    return true;
  } 

  /**
   * Clears the list.
   *
   */
  public clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Reverses singly linked list.
   *
   */
  public reverse() {
    let previousNode = null;
    let nextNode = null;
    let currentNode = this.head;

    while(currentNode instanceof SinglyLinkedListNode) {
      if (previousNode === null) {
        this.tail = currentNode;
      }

      nextNode = currentNode.getNext();

      currentNode.setNext(previousNode);

      previousNode = currentNode;

      currentNode = nextNode;

      if (currentNode === null) {
        this.head = previousNode;
      }
    }

    return this;
  }

  public isEmpty() {
    return this.head === null;
  }

  public getLength() {
    return this.length;
  }

  public getHead() {
    return this.head;
  }

  public getTail() {
    return this.tail;
  }

  /**
   * Represents singly linked list
   *   as array of nodes.
   *
   */
  public toArray() {
    const resultArray = [];

    this.forEach((currentNode) => {
      resultArray.push(currentNode);
    });

    return resultArray;
  }

  /**
   * Represents singly linked list 
   *   as array of nodes values.
   *
   * Very convenient to use for 
   *   debugging purposes.
   *
   */
  public print() {
    const resultArray = [];

    this.forEach((currentNode) => {
      resultArray.push(currentNode.getValue());
    });

    return resultArray;
  }

  /**
   * Creates the singly linked list
   *   from array of values.
   *
   */
  static fromArray(array): SinglyLinkedList {
    if (!Array.isArray(array)) {
      throw new Error('fromArray(array) method expects an array');
    }

    const singlyLinkedList = new SinglyLinkedList();

    array.forEach((value) => {
      singlyLinkedList.push(value);
    });

    return singlyLinkedList;
  }
};

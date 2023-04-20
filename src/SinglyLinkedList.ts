import { SinglyLinkedListNode } from './SinglyLinkedListNode';

export class SinglyLinkedList {
  private length = 0;
  private head = null;
  private tail = null;

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
   * Add node to the end of the list
   *
   */
  public push(value: any) {
    const newNode = this.valueToNode(value);

    /**
     * When there is only one node,
     *   the head and the tail refer 
     *   to the same node.
     *   The next property for both nodes is null.
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
  public forEach(callback: (current: SinglyLinkedListNode | null, index: number) => void) {
    if (typeof callback !== 'function') {
      throw new Error('.forEach(callback) method expects callback.')
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

    return newNode;
  };

  /**
   * Clears the list.
   *
   */
  public clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
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

};

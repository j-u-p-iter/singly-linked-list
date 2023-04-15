import { SinglyLinkedListNode } from './SinglyLinkedListNode';

export class SinglyLinkedList {
  private length = 0;
  private head = null;
  private tail = null;

  constructor() {}

  /**
   * Add node to the end of the list
   *
   */
  public push(value) {
    let newNode;

    if (value instanceof SinglyLinkedListNode) {
      newNode = value;
    } else {
      newNode = new SinglyLinkedListNode(value);
    }


    /**
     * When there is only one node,
     *   the head and the tail refer 
     *   to the same node.
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
  public forEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('.forEach(callback) method expects callback.')
    }

    let current = this.head;
    let index = 0;

    while (current instanceof SinglyLinkedListNode) {
      callback(current, index);
      index++;
      current = current.getNext();
    }
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

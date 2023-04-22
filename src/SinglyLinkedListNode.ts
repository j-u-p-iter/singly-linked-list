export class SinglyLinkedListNode {
  private value: any;

  private next = null;

  constructor(value, next = null) {
    this.setValue(value);

    this.setNext(next);
  }

  public setNext(next: SinglyLinkedListNode | null) {
    if (next !== null && !(next instanceof SinglyLinkedListNode)) {
      throw new Error(
        'setNext expects a SinglyLinkedListNode or a null'
      );
    }

    this.next = next;

    return this;
  }

  public getNext() {
    return this.next;
  }

  public getValue() {
    return this.value;
  }

  public setValue(value) {
    this.value = value;

    return this;
  }

  /**
   * Checks if there is 
   *   a next node.
   *
   */
  public hasNext() {
    return this.next instanceof SinglyLinkedListNode;
  }

  /**
   * Clones the node
   * 
   * It's very important to clone the object, using this way,
   *   since otherwise you won't be able to check if 
   *   the object is the instance of the SinglyLinkedListNode class like
   *   "node instanceof SinglyLinkedListNode"
   */
  public clone() {
    const props = { ...this };

    const clone = Reflect.construct(this.constructor, []);

    Object.keys(props).forEach((prop) => {
      clone[prop] = props[prop];
    });

    clone.setNext(null);

    return clone;
  }
};

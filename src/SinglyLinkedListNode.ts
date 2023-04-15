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

  public hasNext() {
    return this.next instanceof SinglyLinkedListNode;
  }
};

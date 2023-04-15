import { SinglyLinkedList } from '../SinglyLinkedList';
import { SinglyLinkedListNode } from '../SinglyLinkedListNode';

describe('SinglyLinkedList', () => {
  it('is empty by default', () => {
    const singlyLinkedList = new SinglyLinkedList();

    expect(singlyLinkedList.getHead()).toBe(null);
    expect(singlyLinkedList.getTail()).toBe(null);
    expect(singlyLinkedList.getLength()).toBe(0);
    expect(singlyLinkedList.isEmpty()).toBe(true);
  });

  describe('push', () => {
    describe('when there is one item', () => {
      it('head and tail points to the same node', () => {
        const singlyLinkedList = new SinglyLinkedList();

        singlyLinkedList.push('10');

        const head = singlyLinkedList.getHead();
        const tail = singlyLinkedList.getTail();

        expect(head).toEqual(new SinglyLinkedListNode('10'));
        expect(tail).toEqual(new SinglyLinkedListNode('10'));
        expect(head.getNext()).toEqual(null);
        expect(tail.getNext()).toBe(null);
        expect(singlyLinkedList.getLength()).toEqual(1);
      });
    });

    describe('when there is more than one item', () => {
      it('replace the tail with the newly added node', () => {
        const singlyLinkedList = new SinglyLinkedList();

        singlyLinkedList.push('12');
        singlyLinkedList.push(new SinglyLinkedListNode('25'));

        const head = singlyLinkedList.getHead();
        const tail = singlyLinkedList.getTail();

        expect(head).toEqual(new SinglyLinkedListNode('12', tail));
        expect(tail).toEqual(new SinglyLinkedListNode('25'));
        expect(head.getNext()).toEqual(tail);
        expect(tail.getNext()).toBe(null);
        expect(singlyLinkedList.getLength()).toEqual(2);
      });
    });
  });

  describe('forEach', () => {
    it('traverses list from the very beginning till the very end', () => {
      const singlyLinkedList = new SinglyLinkedList();

      const nodes = [
        new SinglyLinkedListNode('10'),
        new SinglyLinkedListNode('12'),
        new SinglyLinkedListNode('15'),
      ];

      singlyLinkedList.push(nodes[0]).push(nodes[1]).push(nodes[2]);

      const callback = jest.fn(() => {});
      singlyLinkedList.forEach(callback)

      expect(callback).toHaveBeenCalledTimes(3);

      expect((callback.mock.calls[0] as any)[0]).toEqual(nodes[0])
      expect((callback.mock.calls[0] as any)[1]).toEqual(0)

      expect((callback.mock.calls[1] as any)[0]).toEqual(nodes[1])
      expect((callback.mock.calls[1] as any)[1]).toEqual(1)

      expect((callback.mock.calls[2] as any)[0]).toEqual(nodes[2])
      expect((callback.mock.calls[2] as any)[1]).toEqual(2)
    });
  });
});

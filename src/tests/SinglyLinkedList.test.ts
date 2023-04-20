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
    describe('when the list is empty', () => {
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

    describe('when there is more than one node', () => {
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

      nodes.forEach((node) => singlyLinkedList.push(node));

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

  describe('pop', () => {
    it('removes last node from the list', () => {
      const singlyLinkedList = new SinglyLinkedList();

      const nodes = [
        new SinglyLinkedListNode('10'),
        new SinglyLinkedListNode('12'),
        new SinglyLinkedListNode('15'),
      ];

      nodes.forEach((node) => singlyLinkedList.push(node));

      expect(singlyLinkedList.getLength()).toBe(3);
      expect(singlyLinkedList.getTail()).toEqual(nodes[2]);

      singlyLinkedList.pop();
      
      expect(singlyLinkedList.getLength()).toBe(2);
      expect(singlyLinkedList.getTail()).toEqual(nodes[1]);
    });

    it('returns removed node', () => {
      const singlyLinkedList = new SinglyLinkedList();

      const nodes = [
        new SinglyLinkedListNode('10'),
        new SinglyLinkedListNode('12'),
        new SinglyLinkedListNode('15'),
      ];

      nodes.forEach((node) => singlyLinkedList.push(node));

      const removedNode = singlyLinkedList.pop();
      
      expect(removedNode).toEqual(nodes[2]);
    });

    describe('when there is one node in the list', () => {
      it('clears the list', () => {
        const singlyLinkedList = new SinglyLinkedList();

        singlyLinkedList.push(new SinglyLinkedListNode('10'));

        const removedNode = singlyLinkedList.pop();
        
        expect(removedNode).toEqual(new SinglyLinkedListNode('10'));
        expect(singlyLinkedList.getHead()).toBe(null);
        expect(singlyLinkedList.getTail()).toBe(null);
        expect(singlyLinkedList.getLength()).toBe(0);
      });
    });

    describe('when the list is empty', () => {
      it('returns undefined', () => {
        const singlyLinkedList = new SinglyLinkedList();

        expect(singlyLinkedList.pop()).not.toBeDefined();
        expect(singlyLinkedList.getLength()).toBe(0);
      });
    })
  });

  describe('shift', () => {
    it('removes first node from the list', () => {
      const singlyLinkedList = new SinglyLinkedList();

      const nodes = [
        new SinglyLinkedListNode('10'),
        new SinglyLinkedListNode('12'),
        new SinglyLinkedListNode('15'),
      ];

      nodes.forEach((node) => singlyLinkedList.push(node));

      expect(singlyLinkedList.getLength()).toBe(3);
      expect(singlyLinkedList.getTail()).toEqual(nodes[2]);

      singlyLinkedList.shift();
      
      expect(singlyLinkedList.getLength()).toBe(2);
      expect(singlyLinkedList.getHead()).toEqual(nodes[1]);
    });

    it('returns the removed node', () => {
      const singlyLinkedList = new SinglyLinkedList();

      const nodes = [
        new SinglyLinkedListNode('10'),
        new SinglyLinkedListNode('12'),
        new SinglyLinkedListNode('15'),
      ];

      nodes.forEach((node) => singlyLinkedList.push(node));

      const removedNode = singlyLinkedList.shift();

      expect(removedNode).toEqual(nodes[0]);
    });

    describe('when there is one node in the list', () => {
      it('clears the list', () => {
        const singlyLinkedList = new SinglyLinkedList();

        singlyLinkedList.push(new SinglyLinkedListNode('10'));

        const removedNode = singlyLinkedList.shift();
        
        expect(removedNode).toEqual(new SinglyLinkedListNode('10'));
        expect(singlyLinkedList.getHead()).toBe(null);
        expect(singlyLinkedList.getTail()).toBe(null);
        expect(singlyLinkedList.getLength()).toBe(0);
      });
    });

    describe('when the list is empty', () => {
      it('returns undefined', () => {
        const singlyLinkedList = new SinglyLinkedList();

        expect(singlyLinkedList.shift()).not.toBeDefined();
        expect(singlyLinkedList.getLength()).toBe(0);
      });
    })
  });

  describe('unshift', () => {
    describe('when the list is empty', () => {
      it('head and tail points to the same node', () => {
        const singlyLinkedList = new SinglyLinkedList();

        singlyLinkedList.unshift('10');

        const head = singlyLinkedList.getHead();
        const tail = singlyLinkedList.getTail();

        expect(head).toEqual(new SinglyLinkedListNode('10'));
        expect(tail).toEqual(new SinglyLinkedListNode('10'));
        expect(head.getNext()).toEqual(null);
        expect(tail.getNext()).toBe(null);
        expect(singlyLinkedList.getLength()).toEqual(1);
      });
    });

    describe('when there is more than one node', () => {
      it('replace the head with the newly added node shifting the current head to the right', () => {
        const singlyLinkedList = new SinglyLinkedList();

        singlyLinkedList.unshift('12');
        singlyLinkedList.unshift(new SinglyLinkedListNode('25'));

        const head = singlyLinkedList.getHead();
        const tail = singlyLinkedList.getTail();

        expect(head).toEqual(new SinglyLinkedListNode('25', tail));
        expect(tail).toEqual(new SinglyLinkedListNode('12'));
        expect(head.getNext()).toEqual(tail);
        expect(tail.getNext()).toBe(null);
        expect(singlyLinkedList.getLength()).toEqual(2);
      });
    });
  });
});

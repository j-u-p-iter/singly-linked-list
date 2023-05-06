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

  describe('fromArray', () => {
    it('creates singly linked list from array of values', () => {
      const singlyLinkedList = SinglyLinkedList.fromArray(['10', '15', '20']);

      const head = singlyLinkedList.getHead();
      const tail = singlyLinkedList.getTail();

      expect(head.getValue()).toBe('10');
      expect(head.getNext().getValue()).toBe('15');
      expect(tail.getValue()).toBe('20');
      expect(head.getNext().getNext()).toEqual(tail);
      expect(tail.getNext()).toBe(null);
      expect(singlyLinkedList.getLength()).toEqual(3);
    });
  });

  describe('push method', () => {
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

    describe('returns new linked list', () => {
      it('replace the tail with the newly added node', () => {
        const singlyLinkedList = new SinglyLinkedList();

        const result = singlyLinkedList.push('12');

        expect(result).toEqual(singlyLinkedList);
      });
    });
  });

  describe('forEach method', () => {
    it('traverses list from the very beginning till the very end', () => {
      const singlyLinkedList = SinglyLinkedList.fromArray(['10', '12', '15']);

      const callback = jest.fn(() => {});
      singlyLinkedList.forEach(callback)

      expect(callback).toHaveBeenCalledTimes(3);

      expect((callback.mock.calls[0] as any)[0]).toEqual(
        new SinglyLinkedListNode(
          '10', 
          new SinglyLinkedListNode(
            '12',
            new SinglyLinkedListNode('15')
          )
        )
      )
      expect((callback.mock.calls[0] as any)[1]).toEqual(0)

      expect((callback.mock.calls[1] as any)[0]).toEqual(new SinglyLinkedListNode('12', new SinglyLinkedListNode('15')))
      expect((callback.mock.calls[1] as any)[1]).toEqual(1)

      expect((callback.mock.calls[2] as any)[0]).toEqual(new SinglyLinkedListNode('15'))
      expect((callback.mock.calls[2] as any)[1]).toEqual(2)
    });
  });

  describe('pop method', () => {
    it('removes last node from the list', () => {
      const singlyLinkedList = SinglyLinkedList.fromArray(['10', '12', '15']);

      expect(singlyLinkedList.getLength()).toBe(3);
      expect(singlyLinkedList.getTail().getValue()).toEqual('15');

      singlyLinkedList.pop();
      
      expect(singlyLinkedList.getLength()).toBe(2);
      expect(singlyLinkedList.getTail().getValue()).toEqual('12');
    });

    it('returns removed node', () => {
      const singlyLinkedList = SinglyLinkedList.fromArray(['10', '12', '15']);

      const removedNode = singlyLinkedList.pop();
      
      expect(removedNode.getValue()).toEqual('15');
    });

    describe('when there is one node in the list', () => {
      it('clears the list', () => {
        const singlyLinkedList = SinglyLinkedList.fromArray(['10']);

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

  describe('shift method', () => {
    it('removes first node from the list', () => {
      const singlyLinkedList = SinglyLinkedList.fromArray(['10', '12', '15']);

      expect(singlyLinkedList.getLength()).toBe(3);
      expect(singlyLinkedList.getHead().getValue()).toEqual('10');

      singlyLinkedList.shift();
      
      expect(singlyLinkedList.getLength()).toBe(2);
      expect(singlyLinkedList.getHead().getValue()).toEqual('12');
    });

    it('returns the removed node', () => {
      const singlyLinkedList = SinglyLinkedList.fromArray(['10', '12', '15']);

      const removedNode = singlyLinkedList.shift();

      expect(removedNode.getValue()).toEqual('10');
    });

    describe('when there is one node in the list', () => {
      it('clears the list', () => {
        const singlyLinkedList = SinglyLinkedList.fromArray(['10']);

        const removedNode = singlyLinkedList.shift();
        
        expect(removedNode.getValue()).toEqual('10');
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

  describe('unshift method', () => {
    it('returns new linked list', () => {
      const singlyLinkedList = new SinglyLinkedList();

      const result = singlyLinkedList.unshift('12');

      expect(result).toEqual(singlyLinkedList);
    });

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

  describe('findAt method', () => {
    describe('when the list is empty', () => {
      it('returns null', () => {
        const singlyLinkedList = new SinglyLinkedList();

        const node = singlyLinkedList.findAt(2);

        expect(node).toEqual(null);
      })
    });

    describe('when the index is negative', () => {
      it('returns null', () => {
        const singlyLinkedList = new SinglyLinkedList();

        singlyLinkedList.push(new SinglyLinkedListNode('10'));

        const node = singlyLinkedList.findAt(-1);

        expect(node).toEqual(null);
      })
    });

    describe('when the index is higher than list length or equal list length', () => {
      it('returns null', () => {
        const singlyLinkedList = SinglyLinkedList.fromArray(['10', '12', '15']);

        const node = singlyLinkedList.findAt(3);

        expect(node).toEqual(null);
      });
    });

    describe('when the index is valid and the list is not empty', () => {
      it('returns correct node', () => {
        const singlyLinkedList = SinglyLinkedList.fromArray(['10', '12', '15']);

        const node = singlyLinkedList.findAt(1);

        expect(node.getValue()).toEqual('12');
      });
    });
  });

  describe('setAt method', () => {
    describe('when the list is empty', () => {
      it('returns false', () => {
        const singlyLinkedList = new SinglyLinkedList();

        const result = singlyLinkedList.setAt(0, 2);

        expect(result).toEqual(false);
        expect(singlyLinkedList.getLength()).toBe(0);
      });
    });

    describe('when the index is negative', () => {
      it('returns false', () => {
        const singlyLinkedList = new SinglyLinkedList();

        singlyLinkedList.push(new SinglyLinkedListNode('10'));

        const result = singlyLinkedList.setAt(-1, '5');

        expect(result).toEqual(false);
        expect(singlyLinkedList.getLength()).toBe(1);
      });
    });

    describe('when the index is valid and the list is not empty', () => {
      it('returns correct node', () => {
        const singlyLinkedList = SinglyLinkedList.fromArray(['10', '12', '15']);

        singlyLinkedList.setAt(1, '5');

        expect(singlyLinkedList.findAt(1)).toEqual(new SinglyLinkedListNode('5', new SinglyLinkedListNode('15')));
        expect(singlyLinkedList.getLength()).toBe(3);
      });
    });
  });

  describe('find method', () => {
    describe('if the searching node is in the list', () => {
      it('returns searching node', () => {
        const singlyLinkedList = SinglyLinkedList.fromArray(['10', '12', '15']);

        let foundNode = singlyLinkedList.find((node) => {
          return node.getValue() === '12';
        });

        expect(foundNode.getValue()).toEqual('12');

        foundNode = singlyLinkedList.find((_, index) => {
          return index === 2;
        });

        expect(foundNode).toEqual(new SinglyLinkedListNode('15'));
      });
    });

    describe('if the searching node is not in the list', () => {
      it('returns null', () => {
        const singlyLinkedList = new SinglyLinkedList();

        const nodes = [
          new SinglyLinkedListNode('10'),
          new SinglyLinkedListNode('12'),
          new SinglyLinkedListNode('15'),
        ];

        nodes.forEach((node) => singlyLinkedList.push(node));

        const foundNode = singlyLinkedList.find((node) => {
          return node === new SinglyLinkedListNode('18'); 
        });

        expect(foundNode).toEqual(null);
      });
    });
  });

  describe('filter method', () => {
    describe('filters out the list according to the condition', () => {
      it('returns searching node', () => {
        const singlyLinkedList = new SinglyLinkedList();

        const nodes = [
          new SinglyLinkedListNode('10'),
          new SinglyLinkedListNode('12'),
          new SinglyLinkedListNode('15'),
        ];

        nodes.forEach((node) => singlyLinkedList.push(node));

        expect(singlyLinkedList.getLength()).toBe(3);
        const resultList = singlyLinkedList.filter((node, index) => {
          return node.getValue() === '12' || index === 2;
        });

        expect(resultList.getLength()).toBe(2);
        expect(resultList.getHead()).toEqual(new SinglyLinkedListNode('12', new SinglyLinkedListNode('15')));
        expect(resultList.getTail()).toEqual(new SinglyLinkedListNode('15'));
      });
    });
  });

  describe('insertAt method', () => {
    describe('if the index is negative', () => {
      it('returns false and does not insert node', () => {
        const singlyLinkedList = new SinglyLinkedList();

        const result = singlyLinkedList.insertAt(-5, 10);

        expect(result).toBe(false);
        expect(singlyLinkedList.getLength()).toBe(0);
      });
    });

    describe('if the index is higher than the length of the list', () => {
      it('returns false and does not insert node', () => {
        const singlyLinkedList = new SinglyLinkedList();

        const nodes = [
          new SinglyLinkedListNode('10'),
          new SinglyLinkedListNode('12'),
          new SinglyLinkedListNode('15'),
        ];

        nodes.forEach((node) => singlyLinkedList.push(node));

        const result = singlyLinkedList.insertAt(20, 10);

        expect(result).toBe(false);
        expect(singlyLinkedList.getLength()).toBe(3);
      });
    });

    describe('if the index equals to 0', () => {
      it('inserts node in the beginning of the list', () => {
        const singlyLinkedList = new SinglyLinkedList();

        const nodes = [
          new SinglyLinkedListNode('10'),
          new SinglyLinkedListNode('12'),
          new SinglyLinkedListNode('15'),
        ];

        nodes.forEach((node) => singlyLinkedList.push(node));

        const result = singlyLinkedList.insertAt(0, new SinglyLinkedListNode('5'));

        expect(singlyLinkedList.getLength()).toBe(4);
        expect(singlyLinkedList.getHead().getValue()).toEqual('5');
        expect(result).toBe(true);
      });
    });

    describe('if the index equals to the length of the list', () => {
      it('inserts node at the end of the list', () => {
        const singlyLinkedList = new SinglyLinkedList();

        const nodes = [
          new SinglyLinkedListNode('10'),
          new SinglyLinkedListNode('12'),
          new SinglyLinkedListNode('15'),
        ];

        nodes.forEach((node) => singlyLinkedList.push(node));

        const result = singlyLinkedList.insertAt(3, new SinglyLinkedListNode('5'));

        expect(singlyLinkedList.getLength()).toBe(4);
        expect(singlyLinkedList.getTail().getValue()).toEqual('5');
        expect(result).toBe(true);
      });
    });

    describe('if the index is valid', () => {
      it('inserts node at correct index', () => {
        const singlyLinkedList = new SinglyLinkedList();

        const nodes = [
          new SinglyLinkedListNode('10'),
          new SinglyLinkedListNode('12'),
          new SinglyLinkedListNode('15'),
        ];

        nodes.forEach((node) => singlyLinkedList.push(node));

        const result = singlyLinkedList.insertAt(1, new SinglyLinkedListNode('5'));

        expect(singlyLinkedList.getLength()).toBe(4);
        expect(singlyLinkedList.findAt(0).getValue()).toEqual('10');
        expect(singlyLinkedList.findAt(1).getValue()).toEqual('5');
        expect(singlyLinkedList.findAt(2).getValue()).toEqual('12');
        expect(result).toBe(true);
      });
    });
  });

  describe('removeAt method', () => {
    describe('if the index is negative', () => {
      it('returns false', () => {
        const singlyLinkedList = new SinglyLinkedList();

        const result = singlyLinkedList.removeAt(-5);

        expect(result).toBe(false);
        expect(singlyLinkedList.getLength()).toBe(0);
      });
    });

    describe('if the index is higher than the length of the list', () => {
      it('returns false', () => {
        const singlyLinkedList = new SinglyLinkedList();

        const nodes = [
          new SinglyLinkedListNode('10'),
          new SinglyLinkedListNode('12'),
          new SinglyLinkedListNode('15'),
        ];

        nodes.forEach((node) => singlyLinkedList.push(node));

        const result = singlyLinkedList.removeAt(20);

        expect(result).toBe(false);
        expect(singlyLinkedList.getLength()).toBe(3);
      });
    });

    describe('if the index equals to 0', () => {
      it('removes node from the beginning of the list', () => {
        const singlyLinkedList = new SinglyLinkedList();

        const nodes = [
          new SinglyLinkedListNode('10'),
          new SinglyLinkedListNode('12'),
          new SinglyLinkedListNode('15'),
        ];

        nodes.forEach((node) => singlyLinkedList.push(node));

        const result = singlyLinkedList.removeAt(0);

        expect(singlyLinkedList.getLength()).toBe(2);
        expect(singlyLinkedList.getHead().getValue()).toEqual('12');
        expect(result).toBe(true);
      });
    });

    describe('if the index equals to the length of the list - 1', () => {
      it('removes the last node of the list', () => {
        const singlyLinkedList = new SinglyLinkedList();

        const nodes = [
          new SinglyLinkedListNode('10'),
          new SinglyLinkedListNode('12'),
          new SinglyLinkedListNode('15'),
        ];

        nodes.forEach((node) => singlyLinkedList.push(node));

        const result = singlyLinkedList.removeAt(2);

        expect(singlyLinkedList.getLength()).toBe(2);
        expect(singlyLinkedList.getTail().getValue()).toEqual('12');
        expect(result).toBe(true);
      });
    });

    describe('if the index is valid', () => {
      it('removes node with correct index', () => {
        const singlyLinkedList = new SinglyLinkedList();

        const nodes = [
          new SinglyLinkedListNode('10'),
          new SinglyLinkedListNode('12'),
          new SinglyLinkedListNode('15'),
        ];

        nodes.forEach((node) => singlyLinkedList.push(node));

        const result = singlyLinkedList.removeAt(1);

        expect(singlyLinkedList.getLength()).toBe(2);
        expect(singlyLinkedList.findAt(0).getValue()).toEqual('10');
        expect(singlyLinkedList.findAt(1).getValue()).toEqual('15');
        expect(result).toBe(true);
      });
    });
  });

  describe('reverse method', () => {
    it('reverves list nodes', () => {
      const singlyLinkedList = new SinglyLinkedList();

      const nodes = [
        new SinglyLinkedListNode('10'),
        new SinglyLinkedListNode('12'),
        new SinglyLinkedListNode('15'),
      ];

      nodes.forEach((node) => singlyLinkedList.push(node));

      const resultList = singlyLinkedList.reverse();

      const head = resultList.getHead();
      const tail = resultList.getTail();

      expect(head.getValue()).toBe('15');
      expect(tail.getValue()).toBe('10');
      expect(head.getNext().getValue()).toBe('12');
      expect(tail.getNext()).toBe(null);
      expect(resultList.getLength()).toBe(3);
    });
  });

  describe('toArray method', () => {
    it('converts singly linked list to an array', () => {
      const singlyLinkedList = new SinglyLinkedList();

      const nodes = [
        new SinglyLinkedListNode('10'),
        new SinglyLinkedListNode('12'),
        new SinglyLinkedListNode('15'),
      ];

      nodes.forEach((node) => singlyLinkedList.push(node));

      const resultArray = singlyLinkedList.toArray();

      expect(resultArray).toEqual([
        new SinglyLinkedListNode('10', new SinglyLinkedListNode('12', new SinglyLinkedListNode('15', null))),
        new SinglyLinkedListNode('12', new SinglyLinkedListNode('15', null)),
        new SinglyLinkedListNode('15', null),
      ]);
    });
  });

  describe('print', () => {
    it('represents singly linked list as array of nodes values', () => {
      const singlyLinkedList = new SinglyLinkedList();

      const nodes = [
        new SinglyLinkedListNode('10'),
        new SinglyLinkedListNode('12'),
        new SinglyLinkedListNode('15'),
      ];

      nodes.forEach((node) => singlyLinkedList.push(node));

      const printedResult = singlyLinkedList.print();

      expect(printedResult).toEqual(['10', '12', '15']);
    });
  });
});

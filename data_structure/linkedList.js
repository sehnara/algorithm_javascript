class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // 1. 첫번째 삽입
  insertFirst(data) {
    this.head = new Node(data, this.head);
    this.size = this.size + 1;
  }

  // 2. 마지막 삽입
  insertLast(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      current = this.head;

      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size += this.size + 1;
  }
  // 3. 중간 삽입
  insertAt(data, index) {
    // 1. index의 값부터 확인
    if (index > 0 && index > this.size) {
      return;
    }

    if (index === 0) {
      this.head = new Node(data, this.head);
      this.size += 1;
      return;
    }

    const node = new Node(data);
    let current, previous;

    current = this.head;
    let count = 0;
    while (count < index) {
      previous = current;
      count++;
      current = current.next;
    }
    previous.next = node;
    node.next = current;
    this.size += 1;
  }

  getAt(index) {
    let count = 0;
    let current = this.head;
    while (current) {
      if (count === index) {
        console.log(current);
        return null;
      }
      count++;
      current = current.next;
    }
    console.log("없습니다.");
    return null;
  }

  removeAt(index) {
    if (index > 0 && index > this.size) {
      return;
    }
    let count = 0;
    let current = this.head;
    let previous = current;

    if (index === 0) {
      this.head = current.next;
    } else {
      while (count < index) {
        count++;
        previous = current;
        current = current.next;
      }

      previous.next = current.next;
    }
    this.size--;
  }

  clearList() {
    // 이렇게 지워도 데이터는 남아있는 거 아니야?
    this.head = null;
    this.size = 0;
  }

  printListData() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}

const a = new LinkedList();
a.insertFirst(100);
console.log(a);

// Solution: 1

type NumArray = number[];

const filterEvenNumbers = (array: NumArray) => {
  let eventArray = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 == 0) {
      eventArray.push(array[i]);
    }
  }
  return eventArray;
};

const numbers = [1, 2, 3, 4, 5, 6];

filterEvenNumbers(numbers);

// Solution: 2

const reverseString = (str: String): string => {
  const arr = str.split("");
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr.join("");
};
const str = "typescript";
reverseString(str);

// Solution: 3

type StringOrNumber = string | number;
const checkType = (value: StringOrNumber): "String" | "Number" => {
  return typeof value === "string" ? "String" : "Number";
};
const val = "Hello";
checkType(val);

// Solution 4

const getProperty = <T, S extends keyof T>(obj: T, key: S): T[S] => {
  return obj[key];
};
const user = { id: 1, name: "John Doe", age: 21 };
getProperty(user, "name");

// Solution 5

interface Book {
  title: string;
  author: string;
  publishedYear: number;
}
const toggleReadStatus = (bookObj: Book) => {
  return {
    ...bookObj,
    isRead: true,
  };
};

const myBook = {
  title: "TypeScript Guide",
  author: "Jane Doe",
  publishedYear: 2024,
};
toggleReadStatus(myBook);

// Solution 6

class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Student extends Person {
  grade: string;
  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}
const student = new Student("Alice", 20, "A");
student.getDetails();

// Problem 7:

type Arr1 = number[];
type Arr2 = number[];

const getIntersection = (arr1: Arr1, arr2: Arr2): number[] => {
  const set2 = new Set(arr2);
  let result: number[] = [];
  for (const item of arr1) {
    if (set2.has(item)) {
      result.push(item);
    }
    set2.delete(item);
  }
  return result;
};
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];

console.log(getIntersection(array1, array2));

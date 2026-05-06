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

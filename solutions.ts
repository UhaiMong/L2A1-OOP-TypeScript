// Solution 1:

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

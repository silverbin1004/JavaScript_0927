// 1. 전역 스코프와 함수 스코프에 대한 이해
// - 출력 결과는 무엇인가요? 그리고 그 이유를 설명하세요.
// -> 답 : undefined 20
// -> 이유 : 자바스크립트의 호이스팅으로 인해 변수가 선언은 되었지만 할당은 되지 않았기 때문이다.

var x = 10;

function example() {
  console.log(x);
  var x = 20;
  console.log(x);
}

example();


// 2. IIFE(즉시 실행 함수) 동작 이해
// 콘솔에 출력되는 값은 무엇이며, 외부에서 a에 접근할 수 없는 이유를 설명하세요.
// -> 출력 : 5, 함수 스코프이기 때문에 외부에서 내부에 선언된 변수로 접근할 수 없다.

(function() {
  var a = 5;
  console.log(a);
})();

// console.log(a);  에러 발생

// 3. this 바인딩 규칙 1: 전역 컨텍스트
// 위 코드에서 this가 가리키는 값은 무엇인가요? (브라우저 환경 기준)
// -> window

function showThis() {
  console.log(this);
}

showThis();

// 4. this 바인딩 규칙 2: 메서드 호출
// this는 무엇을 가리키며, 출력 결과는 무엇인가요?
// -> car객체 / 출력 결과 : Toyota

const car = {
  brand: 'Toyota',
  displayBrand() {
    console.log(this.brand);
  }
};

car.displayBrand();

// 5. call()을 사용한 명시적 바인딩
// call() 메서드를 사용했을 때 this가 가리키는 값과 출력 결과는 무엇인가요?
// -> person / 출력 : Hello, Gyejin

const person = { name: 'Gyejin' };

function sayHello() {
  console.log(`Hello, ${this.name}`);
}

sayHello.call(person);

// 6. bind() 메서드를 활용한 바인딩
// bind() 메서드를 사용한 후 함수 boundGreet()를 호출했을 때의 출력 결과는 무엇인가요?
// -> 출력 : Hello, Gyejin

function greet() {
  console.log(`Hello, ${this.name}`);
}

const person2 = { name: 'Gyejin' };
const boundGreet = greet.bind(person2);

boundGreet();

// 7. 프로토타입 상속
// 프로토타입을 통해 상속된 메서드 speak()가 어떤 객체에서 호출되며, 출력 결과는 무엇인가요?
// -> Animal /  출력 : Dog makes a sound.

function Animal(type) {
  this.type = type;
}

Animal.prototype.speak = function() {
  console.log(`${this.type} makes a sound.`);
};

const dog = new Animal('Dog');

dog.speak();

// 8. 위 코드를 실행하면 출력 순서는 어떻게 되고, 그 이유는 무엇인가요?
// -> Start End Timeout / setTimeout 함수는 태스크 큐에 들어가기 때문에 Start와 End 가 차례로 출력된 다음 1초 뒤 Timeout이 출력된다.

console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 1000);

console.log('End');

// 9. 마이크로태스크 큐와 태스크 큐의 차이
// 위 코드에서 출력 순서와 그 이유를 설명하세요.
// -> Start End Promise Timeout /  스택 큐에 있던 Start와 End가 먼저 출력되고, 마이크로태스크 큐가 태스크 큐보다 우선순위가 높기 때문에 Promise가 먼저, 그 다음으로 Timeout이 출력된다

console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');

// 10. Strict 모드에서의 오류 탐지
// 위 코드에서 발생하는 오류와 그 이유를 설명하세요.
// -> 엄격 모드로 설정되어 있으면 전역변수를 허용하지 않는다.
"use strict";

x = 5;

console.log(x);

// 11. 클로저를 이용한 상태 유지
// 클로저를 사용했을 때, count 변수의 상태는 어떻게 유지되며, 출력 결과는 무엇인가요?
// -> 출력 : 1 2 / 클로저는 함수가 자신의 렉시컬 스코프를 기억하기 때문에 count가 계속 기억된다.
function createCounter() {
  let count = 0;

  return function() {
    count++;
    console.log(count);
  };
}

const counter = createCounter();

counter();
counter();

// 12. 화살표 함수에서의 this 바인딩
// 화살표 함수 greet()에서 this가 가리키는 것은 무엇이며, 출력 결과는 무엇인가요?
// -> 출력 : undifined / 전역 변수

const person3 = {
  name: 'Gyejin',
  greet: () => {
    console.log(this.name);
  }
};

person3.greet();

// 13. setTimeout과 this 바인딩 문제 해결
// 위 코드에서 this.name이 제대로 출력되지 않는 이유는 무엇이며, 이를 해결하는 방법을 설명하세요.
// -> 
const user = {
  name: 'Gyejin',
  greet() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
};

user.greet();

// 14. Promise의 기본 이해
// 위 Promise의 실행 흐름과 최종 출력 결과를 설명하세요.
// -> 출력 : Success / Promise가 실행되고 함수의 작업이 성공했을 때 resolve가 호출되고 then은 작업이 성공했을 때 실행된다.
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success');
  }, 1000);
});

promise.then((result) => {
  console.log(result);
});

// 15. async/await를 이용한 비동기 함수 제어
// async/await를 사용한 비동기 함수의 실행 흐름과 출력 결과를 설명하세요.
// -> 출력 : Fetched Data / 

async function fetchData() {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve('Fetched Data');
    }, 1000);
  });

  console.log(data);
}

fetchData();

// 16. 호이스팅이 발생하는 경우
// 위 코드에서 a의 값은 무엇으로 출력되며, 그 이유는 무엇인가요?
// -> 출력 : undifined / 자바스크립의 호이스팅으로 인해 변수가 선언되었지만 값은 할당되지 않은 상태이다.
console.log(a);

var a = 10;

// 17. let과 const에서의 호이스팅 차이
// let으로 선언된 변수가 호이스팅되지 않는 것처럼 보이는 이유는 무엇인가요?
// -> 초기화되기 전까지 TDZ에 머물러 있기 때문에 호이스팅이 발생하지 않는 것처럼 보인다.
console.log(b);

let b = 10;

// 18. 생성자 함수에서 this의 역할
// 생성자 함수에서 this가 가리키는 객체는 무엇이며, 출력 결과는 무엇인가요?
// -> myCar / 출력 : Tesla

function Car(model) {
  this.model = model;
}

const myCar = new Car('Tesla');

console.log(myCar.model);

// 19. 이벤트 루프의 동작 원리
// 이벤트 루프가 setTimeout을 처리하는 방식에 대해 설명하고, 출력 순서를 예측하세요.
// -> 출력 : Start End Timeout / 스택 큐가 먼저 실행되고(Start End) 태스크 큐(Timeout)가 실행된다.
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

console.log('End');

// 20. 프로미스 체인의 동작 이해
// 프로미스 체인이 어떻게 동작하는지 설명하고, 최종 출력 결과를 예측하세요.
// -> 출력 : First Promise Second Promise / 함수가 성공하면 resolve가 호출되고 then이 실행되면서 First Promise가 먼저 출력되고 그 다음 Second Promise가 출력된다.
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('First Promise');
  }, 1000);
})
  .then((result) => {
    console.log(result);
    return 'Second Promise';
  })
  .then((result) => {
    console.log(result);
  });

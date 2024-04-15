function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise`);
      } else {
        reject(`Rejected promise`);
      }
    }, delay);
  });
  promise.then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  });
  promise.catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}

const promiseForm = document.querySelector('.form');
let position = 1;

promiseForm.addEventListener('submit', ev => {
  ev.preventDefault();
  let delay = ev.target.elements.delay.value;
  let step = ev.target.elements.step.value;
  let amount = ev.target.elements.amount.value;

  for (position; position <= amount; position++) {
    createPromise();
    delay += step;
  }
});

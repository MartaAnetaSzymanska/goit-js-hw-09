function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
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

promiseForm.addEventListener('submit', ev => {
  ev.preventDefault();
  let delay = ev.target.elements.delay.value;
  let step = ev.target.elements.step.value;
  let amount = ev.target.elements.amount.value;

  for (let i = 1; i <= amount; i++) {
    let currentDelay = delay;
    createPromise(i, currentDelay);
    currentDelay += step;
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}
const promiseForm = document.querySelector('.form');
let timerId;

promiseForm.addEventListener('submit', ev => {
  let delay = ev.target.elements.delay.value;
  let step = ev.target.elements.step.value;
  let amount = ev.target.elements.amount.value;

  for (let position = 1; position <= amount; position++) {
    timerId = setTimeout(createPromise(position, delay));
    delay += step;
  }
});

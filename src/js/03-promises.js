import Notiflix from 'notiflix';

//Dom_elem
const JsForm = document.querySelector('form');
JsForm.addEventListener('submit', onSubmit);

//Fn_CreateNewPromise
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
//Fn_Click_Action
function onSubmit(event) {
  event.preventDefault();
  const { delay, stepDelay, amount } = valueElements(event);
  let targetDelay = delay;

  event.currentTarget.reset();

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, targetDelay)
      .then(succesPromise)
      .catch(unSuccesPromise);

    targetDelay += stepDelay;
  }
}
//Fn_Elem_value
function valueElements(event) {
  let delay = Number(event.target.elements.delay.value);
  const stepDelay = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);

  return { delay, stepDelay, amount };
}

//Result_ok_or_no
function succesPromise(position, delay) {
  return Notiflix.Notify.success(
    `✅ Fulfilled promise ${position.position} in ${position.delay} ms`
  );
}

function unSuccesPromise(position, delay) {
  return Notiflix.Notify.failure(
    `❌ Rejected promise ${position.position} in ${position.delay} ms`
  );
}

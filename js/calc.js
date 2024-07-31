export const calc = () => {
  const x = document.querySelector('#x');
  const y = document.querySelector('#y');
  const result = document.querySelector('.calc__result');
  const btnCalc = document.querySelector('.calc__btn-wrapper');


  const calcResult = (event) => {
    const target = event.target;
    let calcFix = 0;
    if (target.textContent === '+') {
      calcFix = Number(x.value) + Number(y.value);
    } else if (target.textContent === '-') {
      calcFix = x.value - y.value;
    } else if (target.textContent === 'х') {
      calcFix = x.value * y.value;
    } else {
      calcFix = x.value / y.value;
    };
    result.textContent = calcFix.toFixed(2);
  };

  btnCalc.addEventListener('click', calcResult);
};
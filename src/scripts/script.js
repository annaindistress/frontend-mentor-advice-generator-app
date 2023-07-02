const adviceContainer = document.querySelector('.advice');
const title = adviceContainer.querySelector('.advice__title');
const text = adviceContainer.querySelector('.advice__text');
const button = adviceContainer.querySelector('.advice__button');

const getJSON = () =>
  fetch('https://api.adviceslip.com/advice').then(response => {
    if (!response.ok)
      throw new Error(`Something went wrong (${response.status})`);
    return response.json();
  });

const getAdvice = async function () {
  let currentAdvice = {};
  try {
    const { slip: advice } = await getJSON();
    currentAdvice = advice;
  } catch (error) {
    currentAdvice = { advice: error };
  } finally {
    renderAdvice(currentAdvice);
  }
};

const renderAdvice = function (item) {
  if (item.id) {
    title.textContent = `Advice #${item.id}`;
  } else {
    title.textContent = '';
  }
  text.textContent = item.advice;
};

button.addEventListener('click', getAdvice);

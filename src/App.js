import { Fragment, useEffect, useState } from 'react';

// import brain from 'brain.js';
import brain from 'brain.js/src/index';
import { initialTrainingData } from './helpers/trainingData';

const net = new brain.NeuralNetwork({
  // hiddenLayers: [4, 5, 6],
});

const initState = {
  trainingData: initialTrainingData,
  randomColor: getRandom(),
  guessColor: '',
};

function App() {
  const [state, setState] = useState(initState);

  function handleState(data) {
    setState((prevState) => ({
      ...prevState,
      ...data,
    }));
  }

  useEffect(() => {
    net.train(state.trainingData);
    const color = getRandom();
    const guess = net.run(color)[0];

    handleState({ randomColor: color, guessColor: guess });
  }, [state.trainingData]);

  function chooseColor(value) {
    const temp = [...state.trainingData];
    temp.push({
      input: state.randomColor,
      output: [value],
    });

    handleState({ trainingData: temp });
  }

  function onWhiteButtonClick() {
    chooseColor(1);
  }
  function onBlackButtonClick() {
    chooseColor(0);
  }
  function onPrintButtonClick() {
    console.log(JSON.stringify(state.trainingData));
  }

  // console.log(state.trainingData);

  return (
    <Fragment>
      <div
        className="color"
        style={{
          backgroundColor: `rgba(${state.randomColor.r * 255}, ${
            state.randomColor.g * 255
          }, ${state.randomColor.b * 255})`,
        }}>
        <div className="white">White Text</div>
        <div>Black Text</div>
        <div style={{ color: state.guessColor > 0.5 ? `#FFF` : `#000` }}>
          Guess Text
        </div>
      </div>

      <button onClick={onWhiteButtonClick}>White</button>
      <button onClick={onBlackButtonClick}>Black</button>
      <button onClick={onPrintButtonClick}>Print</button>
    </Fragment>
  );
}

export default App;

function getRandom() {
  const color = {
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
  };

  return color;
}

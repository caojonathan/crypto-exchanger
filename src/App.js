import './App.css';
import React, {useState, useEffect} from 'react';
import Select from 'react-select';

const cryptoOptions = [
  { value: 'BTC', label: 'BTC' },
  { value: 'ETH', label: 'ETH' },
  { value: 'ADA', label: 'ADA' },
  { value: 'DOGE', label: 'DOGE'},
];

const fiatOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'CAD', label: 'CAD' },
];

function App() {
  const [amount, setAmount] = useState(1);
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0]);
  const [selectedFiat, setSelectedFiat] = useState(fiatOptions[0]);

  const [selectedCryptoData, setSelectedCryptoData] = useState({});

  const[isInitialCrypto, setIsInitialCrypto] = useState(true);

  useEffect(() => {
    fetch('https://coinlib.io/api/v1/coin?key=327b62b12af4dc20&pref=' + selectedFiat.value +
    '&symbol=' + selectedCrypto.value)
    .then(response => response.json())
    .then(data => setSelectedCryptoData(data))
  }, [selectedCrypto, selectedFiat])

  const calcResult = () => {
    if(isInitialCrypto){
      return amount*selectedCryptoData.price;
    }
    else{
      return amount*(1/selectedCryptoData.price);
    }
  };

  const onChangeCrypto = (crypto) => {
    setSelectedCrypto(crypto);
  };
  const onChangeFiat = (fiat) => {
    setSelectedFiat(fiat);
  };

  return (
    <div className='root'>
      <div className = 'container'>
          <img src={require("./swap.png")} onClick={() => setIsInitialCrypto(!isInitialCrypto)} />
          <div className='selectContainer'>
            <Select
            className="basic-single"
            classNamePrefix="select"
            isSearchable
            defaultValue={isInitialCrypto ? cryptoOptions[0] : fiatOptions[0]}
            onChange={isInitialCrypto ? (e) => onChangeCrypto(e) : (e) => onChangeFiat(e)}
            options={isInitialCrypto ? cryptoOptions : fiatOptions}
            value={isInitialCrypto ? selectedCrypto : selectedFiat}
            />
            <Select
              className="basic-single"
              classNamePrefix="select"
              isSearchable
              defaultValue={!isInitialCrypto ? cryptoOptions[0] : fiatOptions[0]}
              onChange={!isInitialCrypto ? (e) => onChangeCrypto(e) : (e) => onChangeFiat(e)}
              options={!isInitialCrypto ? cryptoOptions : fiatOptions}
              value={!isInitialCrypto ? selectedCrypto : selectedFiat}
            />
          </div>
          

          <form className='inputContainer'>
            <label>Enter your amount: 
              <input
                className='input'
                type="text" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
          </form>

          <div className='result'>
            {calcResult()}
          </div>
      </div>
      
      
    </div>
  );
}

export default App;

import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/image-link-form/ImageLinkForm';
import Rank from './components/rank/Rank';
import ParticlesBg from 'particles-bg';
import './App.css';
import { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');

  const onInputChange = e => {
    console.log(e.target.value);
  };

  return (
    <div className='App'>
      <ParticlesBg type='cobweb' bg={true} color='#f5f5f5' num={200} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} />
      {/* <FaceRecognition /> */}
    </div>
  );
};

export default App;

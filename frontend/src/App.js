import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/image-link-form/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/face-recognition/FaceRecognition';
import ParticlesBg from 'particles-bg';
import './App.css';
import { useState } from 'react';

// EXAMPLE IMAGE URL: 'https://samples.clarifai.com/metro-north.jpg';

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const onInputChange = e => {
    setInput(e.target.value);
  };

  const onSubmit = () => {
    setImageUrl(input);

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: input,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Key ' + PAT,
      },
      body: raw,
    };

    fetch(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log(
          'result ->',
          result.outputs[0].data.regions[0].region_info.bounding_box
        );
      })
      .catch(error => console.log('error', error));
  };

  return (
    <div className='App'>
      <ParticlesBg type='cobweb' bg={true} color='#f5f5f5' num={200} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onSubmit} />
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
};

export default App;

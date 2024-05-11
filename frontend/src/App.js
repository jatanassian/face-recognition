import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/image-link-form/ImageLinkForm';
import Rank from './components/rank/Rank';
import SignIn from './components/sign-in/SignIn';
import FaceRecognition from './components/face-recognition/FaceRecognition';
import ParticlesBg from 'particles-bg';
import './App.css';
import { useState } from 'react';

// EXAMPLE IMAGE URL: 'https://samples.clarifai.com/metro-north.jpg';

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('sign-in');

  const calculateFaceLocation = data => {
    const faceArea = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(faceArea);

    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      left: faceArea.left_col * width,
      top: faceArea.top_row * height,
      right: width - faceArea.right_col * width,
      bottom: height - faceArea.bottom_row * height,
    };
  };

  const displayFaceBox = box => {
    setBox(box);
  };

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
      .then(result => displayFaceBox(calculateFaceLocation(result)))
      .catch(error => console.log('error', error));
  };

  const onRouteChange = route => {
    setRoute(route);
  };

  return (
    <div className='App'>
      <ParticlesBg type='cobweb' bg={true} color='#f5f5f5' num={200} />
      <Navigation onRouteChange={onRouteChange} />
      {route === 'sign-in' ? (
        <SignIn onRouteChange={onRouteChange} />
      ) : (
        <>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </>
      )}
    </div>
  );
};

export default App;

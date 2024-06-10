import { useState } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/image-link-form/ImageLinkForm';
import Rank from './components/rank/Rank';
import SignIn from './components/sign-in/SignIn';
import Register from './components/register/Register';
import FaceRecognition from './components/face-recognition/FaceRecognition';
import ParticlesBg from 'particles-bg';
import './App.css';

// EXAMPLE IMAGE URL: 'https://samples.clarifai.com/metro-north.jpg';

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('sign-in');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  });

  const calculateFaceLocation = data => {
    const faceArea = data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      left: faceArea.left_col * width,
      top: faceArea.top_row * height,
      right: width - faceArea.right_col * width,
      bottom: height - faceArea.bottom_row * height
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
        app_id: APP_ID
      },
      inputs: [
        {
          data: {
            image: {
              url: input
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Key ' + PAT
      },
      body: raw
    };

    fetch(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        if (result) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: user.id })
          })
            .then(res => res.json())
            .then(count => setUser({ ...user, entries: count }));
        }
        displayFaceBox(calculateFaceLocation(result));
      })
      .catch(error => console.log('error', error));
  };

  const onRouteChange = route => {
    if (route === 'sign-out') {
      setUser({
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      });
      setIsSignedIn(false);
      setBox({});
      setInput('');
      setImageUrl('');
      setRoute('sign-in');
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className='App'>
      <ParticlesBg type='cobweb' bg={true} color='#f5f5f5' num={200} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === 'home' ? (
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onSubmit} />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </>
      ) : route === 'sign-in' ? (
        <SignIn onRouteChange={onRouteChange} setUser={setUser} />
      ) : (
        <Register onRouteChange={onRouteChange} setUser={setUser} />
      )}
    </div>
  );
};

export default App;

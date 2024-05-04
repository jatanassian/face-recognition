import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Navigation />
      <Logo />
      {/* <ImageLinkForm />
		<FaceRecognition /> */}
    </div>
  );
};

export default App;

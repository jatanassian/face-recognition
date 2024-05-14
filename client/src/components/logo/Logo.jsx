import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt
        tiltMaxAngleX={55}
        tiltMaxAngleY={55}
        className='tilt br2 shadow-2'
        style={{ height: 150, width: 150 }}
      >
        <div className='pa3'>
          <img src={brain} alt='logo' style={{ paddingTop: '5px' }} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;

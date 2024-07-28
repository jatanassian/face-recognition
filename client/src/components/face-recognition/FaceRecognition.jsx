import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box: boxes }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='input-image' src={imageUrl} alt='' width='500px' height='auto' />
        {boxes.map((box, i) => {
          return (
            <div
              key={i}
              className='bounding-box'
              style={{
                top: box.top,
                right: box.right,
                bottom: box.bottom,
                left: box.left
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;

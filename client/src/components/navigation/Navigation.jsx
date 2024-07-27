const Navigation = ({ onRouteChange, isSignedIn }) => {
  return isSignedIn ? (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        className='f3 link dim black underline pa3 pointer'
        onClick={() => onRouteChange('sign-out')}
      >
        Sign Out
      </p>
    </nav>
  ) : (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        className='f3 link dim black underline pa3 pointer'
        onClick={() => onRouteChange('sign-in')}
      >
        Sign In
      </p>
      <p
        className='f3 link dim black underline pa3 pointer'
        onClick={() => onRouteChange('register')}
      >
        Register
      </p>
    </nav>
  );
};

export default Navigation;

import { useState } from 'react';

const SignIn = ({ onRouteChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = e => {
    setEmail(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  const signUserIn = () => {
    fetch('http://localhost:3000/sign-in', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data === 'Success') {
          onRouteChange('home');
        }
      });
  };

  return (
    <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
      <main className='pa4 black-80'>
        <div className='measure'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f1 fw6 ph0 mh0'>Sign In</legend>

            {/* Email input */}
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                Email
              </label>
              <input
                id='email-address'
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='email'
                name='email-address'
                autoComplete='off'
                onChange={onEmailChange}
              />
            </div>

            {/* Password input */}
            <div className='mv3'>
              <label className='db fw6 lh-copy f6' htmlFor='password'>
                Password
              </label>
              <input
                id='password'
                className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='password'
                name='password'
                autoComplete='off'
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>

          {/* Submit button */}
          <div>
            <input
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
              type='submit'
              value='Sign in'
              onClick={signUserIn}
            />
          </div>

          {/* Register redirect */}
          <div className='lh-copy mt3'>
            <p
              className='f6 link dim black db pointer'
              onClick={() => onRouteChange('register')}
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default SignIn;

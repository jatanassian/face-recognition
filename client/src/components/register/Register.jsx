import { useState } from 'react';

const Register = ({ onRouteChange, setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onNameChange = e => {
    setName(e.target.value);
  };

  const onEmailChange = e => {
    setEmail(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  const registerUser = () => {
    fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          setUser(user);
          onRouteChange('home');
        }
      });
  };
  return (
    <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
      <main className='pa4 black-80'>
        <div className='measure'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f1 fw6 ph0 mh0'>Register</legend>

            {/* Name input */}
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='name'>
                Name
              </label>
              <input
                id='name'
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='text'
                name='name'
                onChange={onNameChange}
              />
            </div>

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
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>

          {/* Submit button */}
          <div>
            <input
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
              type='submit'
              value='Register'
              onClick={registerUser}
            />
          </div>
        </div>
      </main>
    </article>
  );
};

export default Register;

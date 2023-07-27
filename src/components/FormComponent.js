import React, { useState } from 'react';
import './FormComponent.css'; // Import the CSS file for styling
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.13.0/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const values = {
  ZOOM_MEETING_SDK_KEY : "sPWY_Qn6QVyB41ZsGjHH9Q",
  ZOOM_MEETING_SDK_SECRET : "eSDVyi8a7FpM5cMJvst1suZ1kowqsEaj",
  meetingNumber: 84197224444,
  role : 0,
  signature : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiJzUFdZX1FuNlFWeUI0MVpzR2pISDlRIiwibW4iOjg0MTk3MjI0NDQ0LCJyb2xlIjowLCJpYXQiOjE2OTA0NTI2NTksImV4cCI6MTY5MDQ1OTg1OSwiYXBwS2V5Ijoic1BXWV9RbjZRVnlCNDFac0dqSEg5USIsInRva2VuRXhwIjoxNjkwNDU5ODU5fQ.0K4VK5MKQgS2RJqCT2FOdLllkQZEX6eYKrxk5QoxIXs"
}

const FormComponent = () => {
  var sdkKey = values.ZOOM_MEETING_SDK_KEY
  var meetingNumber = values.meetingNumber;
  var passWord = values.password;
  var registrantToken = ''
  var zakToken = ''
  var leaveUrl = 'http://localhost:3000'

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [userEmailError, setUserEmailError] = useState('');

  const validateUserName = () => {
    if (userName.length <= 3 || !/^[a-zA-Z]+$/.test(userName)) {
      setUserNameError('User name must be greater than 3 characters and contain only alphabets.');
      return false;
    }
    setUserNameError('');
    return true;
  };

  const validateUserEmail = () => {
    if (!userEmail.includes('@gmail.com')) {
      setUserEmailError('Please enter a valid Gmail address.');
      return false;
    }
    setUserEmailError('');
    return true;
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const getSignature = () => {
    startMeeting(values.signature);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isUserNameValid = validateUserName();
    const isUserEmailValid = validateUserEmail();

    if (isUserNameValid && isUserEmailValid) {
      getSignature();
    }
  };
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>User Name</label>
          <input
            type="text"
            className={`input-field ${userNameError ? 'input-error' : ''}`}
            value={userName}
            onChange={handleUserNameChange}
          />
          {userNameError && <span className="error-message">{userNameError}</span>}
        </div>
        <div className="input-container">
          <label>User Email</label>
          <input
            type="text"
            className={`input-field ${userEmailError ? 'input-error' : ''}`}
            value={userEmail}
            onChange={handleUserEmailChange}
          />
          {userEmailError && <span className="error-message">{userEmailError}</span>}
        </div>
        <button type="submit">Join Meeting</button>
      </form>
    </div>
  );
};

export default FormComponent;

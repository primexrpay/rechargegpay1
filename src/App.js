import './assets/css/App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Getoffer from './components/Getoffer';
import { useEffect, useState } from 'react';
import ChromePage from './components/ChromePage';
import LoginPage from './components/LoginPage';
import AdminPanel from './components/AdminPanel';

function App() {
  
  const [show, setshow] = useState(true)

  useEffect(() => {
    // Fetch the pixel ID from the backend
    fetch('https://recharge.myrecharge.info/api/auth/getdata')
      .then(response => response.json())
      .then(data => {
        if (data.gpr_fbpxl) {
          // Inject the pixel ID into the Facebook Pixel script
          const pixelScript = document.getElementById('facebook-pixel-script');
          pixelScript.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${data.gpr_fbpxl}');
            fbq('track', 'PageView');
          `;
        }
      })
      .catch(error => console.error('Error fetching Pixel ID:', error));
  }, []);
  

  useEffect(() => {
    function isInstagramBrowser() {
      var ua = navigator.userAgent || navigator.vendor || window.opera;
      return (ua.indexOf('Instagram') > -1) || (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1);
    }
    function redirectToChrome() {
      var androidUrl = "intent://"+window.location.href+"/#Intent;scheme=https;package=com.android.chrome;end;";
      var fallbackUrl = window.location.href;

      if (/android/i.test(navigator.userAgent)) {
        window.location.href = androidUrl;
      } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        alert('To complete your payment, please open this link in Safari or Chrome.');
      } else {
        window.location.href = fallbackUrl;
      }
    }

    if (isInstagramBrowser()) {
      setshow(false)
      redirectToChrome();
    } else {
      setshow(true)
    }

  }, []);

  return (
    <>
      {show && <Header />}
      <Routes>
        <Route path="/" element={show ? <Home /> : <ChromePage />} />
        <Route path="/recharge" element={<Getoffer />} />
        <Route path="lgn" element={<LoginPage />} />
        <Route path="/dashboard" element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default App;

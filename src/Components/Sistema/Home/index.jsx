import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// import AppFooter from './Menu/AppFooter';
import AppMenu from './Menu/AppMenu';
import AppTopbar from './Menu/AppTopbar';
import { CSSTransition } from 'react-transition-group';
import './styles.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Home({isLogged}) {

/*   const navigate = useNavigate();

  useEffect(()=> {

    if(isLogged == false){

      navigate('/')
  
    }

  }, [isLogged])

console.log(isLogged)  */


  
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  return (
    <div>
      <AppTopbar />
      <div className='layout-sidebar'>
        <AppMenu />
      </div>

      <div className='layout-main-container'>
        <div className='layout-main'>
          <Outlet />
        </div>
        {/* <AppFooter /> */}
      </div>
      <CSSTransition
        classNames='layout-mask'
        timeout={{ enter: 200, exit: 200 }}
        in={mobileMenuActive}
        unmountOnExit
      >
        <div className='layout-mask p-component-overlay'></div>
      </CSSTransition>
    </div>
  );
}

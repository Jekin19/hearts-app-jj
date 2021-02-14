import React from 'react';
import { Form, Navbar } from 'react-bootstrap';
import { isMobile, isBrowser, isMobileSafari } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { onNewGame } from '../redux/actions';
import Rules from './Rules';
import Scores from './Scores';
import useScreenOrientation from '../common/screen-orientation-hook';
interface HeartsNavBarProps {
  children?: React.ReactNode;
}

function NavBar() {
  const screenOrientation = useScreenOrientation();
  const dispatch = useDispatch();
  const HeartsNavBar = ({ children }: HeartsNavBarProps) => {
    if (!isMobile) {
      return (
        <Navbar bg='dark' variant='dark' className='p-2 pl-3'>
          {children}
        </Navbar>
      );
    }

    // Portait mode but not in browser
    if (!isBrowser && !isMobileSafari && screenOrientation?.includes('portrait')) {
      return (
        <Navbar bg='dark' variant='dark' className='pt-4 pr-3 pb-0 pl-3'>
          {children}
        </Navbar>
      );
    }
    return (
      <Navbar bg='dark' variant='dark' className='pr-3 pb-0 pl-3 pt-0'>
        {children}
      </Navbar>
    );
  };

  return (
    <>
      <HeartsNavBar>
        <Navbar.Brand href='#home' className='mr-2'>
          <img src='./heart.ico' width='30' height='30' alt=''></img>
        </Navbar.Brand>
        <Form inline className='mr-auto'>
          <a href='#newGame' onClick={() => dispatch(onNewGame())} className='text-light nav-link'>
            New Game
          </a>
        </Form>
        <Form inline>
          <Scores />
          <Rules />
        </Form>
      </HeartsNavBar>
    </>
  );
}

export default NavBar;

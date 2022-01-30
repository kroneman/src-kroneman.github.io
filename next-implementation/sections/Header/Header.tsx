import React, {useState} from 'react';

// Components
import SocialList from "../SocialList";
import Drawer, { DrawerIcon } from '../../components/Drawer'
import Navigation from '../Navigation';

// Styles
import styles from './Header.module.scss';

// Constants
const title = 'Lennart Kroneman';

type HeaderProps = {
  isDrawerOpen: boolean;
}

const Header = (props: HeaderProps) => {
  const {isDrawerOpen = true} = props;
  const [drawerOpen, setDrawerOpen] = useState<boolean>(isDrawerOpen);
  const onDrawerIconClick = () => {
    setDrawerOpen(!drawerOpen)
  };

  const onNavigate = () => {
    setDrawerOpen(false);
  }

  return (
    <header className={`${styles.header} px-4`}>
      <div className="flex items-center">
        <div className="basis-full md:basis-6/12 lg:basis-10/12 xl:basis-6/12 flex-grow">
          <div
            className="flex items-center justify-center md:justify-start relative">
            <DrawerIcon onClick={onDrawerIconClick} isActive={drawerOpen} />

            <h1 className={`grow shrink-0 p-0 m-0 py-4 md:pl-5 lg:pl-0 ${styles.header_title}`}>
              {/*<div className="flex items-center">*/}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/" className={`${styles.header_title_link}`}>
                  {title}

              {/*</div>*/}
              </a>
            </h1>

            <Drawer isOpen={drawerOpen} >
              <Navigation onNavigate={onNavigate} />
              <div className="block md:hidden flex content-center py-4 md:py-0 relative">
                <span className="mobile-line"/>
                <SocialList className="pt-5"/>
              </div>
            </Drawer>
          </div>
        </div>

        <div className="xl:basis-6/12 hidden md:flex flex-grow justify-end">
          <SocialList/>
        </div>
      </div>
    </header>
  );
}


export default Header;

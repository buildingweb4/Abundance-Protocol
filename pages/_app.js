import '../styles/index.css';
import { useCallback, useState, useEffect } from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { AccountContext } from '../context.js'
import { CollapseIcon, DropdownIcon, Logo, LeftCorner, RightCorner, Space } from './assets'
import { useRouter } from 'next/router'
import 'easymde/dist/easymde.min.css'
import { FaPen } from 'react-icons/fa';
import { button } from './assets/button';
import useStore from './utils/store'

function App({ Component, pageProps }) {
  const router = useRouter()
  const store = useStore()
  const [linkTarget, setLinkTarget] = useState('Vision')
  const [account, setAccount] = useState(null)
  const [accountText, setAccountText] = useState(null)
  const [navMenu, setNavMenu] = useState('Home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [menuHover, setMenuHover] = useState( {in: Date.now(), out: Date.now() } )
  
  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  const setDeviceSize = useCallback(() => {
      store.setIsMobile(window.innerWidth <= 768)
  }, [store.setIsMobile])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', setDeviceSize)
    }
  }, [setDeviceSize])

  useEffect(() => {
    let menuLink = targetLink()
    setLinkTarget(menuLink)
    setNavMenu(button[menuLink].menu)
  }, [])

  useEffect( () => {
    if (menuHover.in > menuHover.out) {
      let subNavBox = document.getElementsByClassName("sub-nav-box")
      subNavBox[0].style.justifyContent = "left";  
    } else {
      if (typeof linkTarget !== 'object') {
        setNavMenu(button[linkTarget].menu)
      }
    }
  }, [menuHover, linkTarget])

  const NavItem = (props) => {
    let btnHover = menuHover.in > menuHover.out
    let btn = button[props.buttonName]
    let Icon = btn.icon
    let menuVar = "pop-menu"
    let contentVar = "bg-blue"
    let textVar = ""
    let accountState = !btn.account || (account && btn.account)


    if (button[linkTarget].link === btn.link && btn.working && accountState) {
      menuVar = "red-menu"
      contentVar = "bg-red"
      textVar = "bg-red"
    }
    if (!accountState) {
      menuVar = "grey-menu"
      contentVar = "bg-inactive"
      textVar = "bg-inactive"
    }
    if (!btn.working) {
      menuVar = "grey-menu"
      contentVar = "bg-grey"
      textVar = "bg-grey"
    }

    let topBox = `sub-cat-top-box flex-row ${menuVar}`
    let iconClass = `sub-cat-icon ${contentVar} size-30`
    let titleClass = `sub-cat-title nav-frame-title ${textVar} full-w`
    let textClass = `sub-cat-desc nav-frame-desc ${textVar} full-w`
    if (typeof Icon == 'undefined') { Icon = FaPen }
    let attributes = {}
    if (!btn.link) {
      attributes = {target: '_blank', rel: 'noopener noreferrer', href: btn.url}
    }
    const isEnlarge = btnHover || mobileMenuOpen
    return (
      <Link href={(btn.link && btn.working) ? btn.link : {}}>
        <a className={topBox} style={{width: isEnlarge ? '333px' : 'min-content', padding: isEnlarge ? '10px' : '3px 5px 2px 10px', margin: isEnlarge ? '10px' : '5px 10px', borderRadius: '15px'}} {...attributes} onClick={() => {
          setLinkTarget(props.buttonName)
          }}>
          <div className="sub-cat-box" style={{margin: isEnlarge ? '8px 0 8px 8px' : '0 10px 0 0', minWidth: isEnlarge ? '50px' : '15px'}}>
            <Icon className={iconClass} iconsize={isEnlarge ? '30' : '15'} style={{height: isEnlarge ? '30px' : '15px', width: isEnlarge ? '30px' : '15px'}} />
          </div>
          <div className="sub-cat-text flex-col" style={{width: isEnlarge ? 'auto' : 'min-content', minWidth: isEnlarge ? '260px' : '50px', pointerEvents: 'none'}}>
            <span className={titleClass} style={{fontSize: isEnlarge ?  '19px' : '15px', fontWeight: isEnlarge ? '800' : '600', paddingRight: '10px', pointerEvents: 'none', width: isEnlarge ? '100%' : 'max-content'}}>{props.buttonName}</span>
            <span className={textClass} style={{fontSize: isEnlarge ? '15px' : '0', opacity: isEnlarge ? '1' : '0', paddingRight: '10px', pointerEvents: 'none'}}>{btn.description}</span>
          </div>
        </a>
      </Link>
    );
  }

  const ConnectButton = () => {
    return (
      <div onClick={!account ? connect : disconnect}>
        <div className="size-button flex-col flex-middle">
          <div className="flex-col flex-middle">
            <div className="font-12 mar-t-6 min-width" style={{fontWeight: '700', fontSize: '15px', margin: '0', padding: '0'}}>{!account ? "connect" : accountText}</div>
          </div>
        </div>
      </div>
    );
  }

  const HomeButton = () => {
    return (
      <Link href="/">
        <a className={navMenu === "Home" ? "nav-home-button-active" : "nav-home-button"} onMouseEnter={() => {
          setNavMenu('Home')
          setMenuHover({ ...menuHover, in: Date.now() })
        }} onMouseLeave={() => {
          setMenuHover({ ...menuHover, out: Date.now() })
        }}>
          <div className="grid-col centered">
            <div className={`logo-wrapper`}>
              <Logo height={store.isMobile ? '25px' : '45px'} width={store.isMobile ? '25px' : '45px'}/>
            </div>
            <div style={{ padding: '15px 15px' }}>
              <h2 className={`nav-title${store.isMobile ? ' mid-frame-font' : ''}`}>Abundance Protocol</h2>
              <p className={`nav-subtitle${store.isMobile ? ' small-font' : ''}`}>Building Web 4</p>
            </div>
          </div>
        </a>
      </Link>
    )
  }
  
  const MobileNavMenu = ({children}) => {
    return (
      <div className="grid-row centered"
      >
       {children}
      </div>
    )
  }

  const TopNav = (props) => {
    let btn = button[props.buttonName]
    const TopIcon = btn.icon
    let menuState = "nav-link"
    let accountState = !btn.account || (account && btn.account)
    if (navMenu === btn.menu && accountState) {
      menuState = "active-nav-link"
    } else if (!accountState) {
      menuState = "inactive-nav-link"
    }

    return (
      <a onMouseEnter={() => {
        setNavMenu(btn.menu)
        setMenuHover({ ...menuHover, in: Date.now() })
      }}
      onMouseLeave={() => !mobileMenuOpen && setMenuHover({ ...menuHover, out: Date.now() }) } 
      >
        <div className={menuState}>
          <div className="size-87 flex-col flex-middle">
            <div className="flex-col flex-middle">
              <TopIcon className="size-25" />
              <div className="font-15 mar-t-6">
                {props.buttonName}
              </div>
            </div>
          </div>
        </div>
      </a>
    )
  }

  const SubCat = () => {
    try {
      let subButtons = button['nav-menu'][navMenu]
      if (typeof subButtons == 'undefined') {
        subButtons = button['nav-menu']['Home']
      }
      return (
        subButtons.map((btn, index) => (
          <NavItem buttonName={btn} key={index} /> ))
      )
    } catch (err) {
      console.log('error:', err)
      return null;
    }
  }

  function targetLink() {
    let search = router.asPath
    for (let key in button) {
      if (button[key].link === search) {
        return key
      }
    }
    return "Vision"
  }
  
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "f7b15f0b1a2d49e2b9f0e9b666842ff1"
          },
        },
      },
    })
    return web3Modal
  }

  async function connect() {
    try {
      const web3Modal = await getWeb3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const accounts = await provider.listAccounts()
      setAccount(accounts[0])
      let accText = accounts[0]
      setAccountText(accText.slice(0, 5) + '...' + accText.slice(38, 42))
    } catch (err) {
      console.log('error:', err)
    }
  }

  async function disconnect() {
    setAccountText(null)
    setAccount(null)
    setTimeout(() => {
      router.push('/')
    }, 100)
  }

  return (
    <div>
      <nav className="nav-bar">
        <div className="flex-row top-nav-wrap">
          <Space />
          <div className="nav-head">
            <HomeButton />
            <Space />
            {!store.isMobile && (
              <>
                {button['top-menu'].map((btn, index) => (
                  <TopNav buttonName={btn} key={index} /> ))}
                <ConnectButton />
              </>
              )}
          </div>
          <Space />
        </div>
        <div className="flex-row" style={{width: '100%', alignItems: 'flex-start' }}>
          <div className="nav-shadow" style={{width: '100%', height: '1px', backgroundColor: ''}}>
            <div className="flex-row flex-right"><RightCorner /></div>
          </div>
          <div className="nav-shadow" style={{height: mobileMenuOpen ? '100%' : 'min-content', width: 'min-content', backgroundColor: '#1D3244dd', borderRadius: '0 0 30px 30px', justifyContent: 'center'}}>
            {mobileMenuOpen ? (
              <div className="grid-row">
                <div className="sub-nav-mobile">
                  <MobileNavMenu>
                    <ConnectButton />
                    {button['top-menu'].map((btn, index) => (
                      <TopNav buttonName={btn} key={index} /> ))}
                  </MobileNavMenu>
                  <div className="grid-row" style={{padding: '16px', margin: '0', justifyContent: 'start', alignItems: 'start'}}>
                    <div className="sub-nav-box" style={{width: '100%', height: '100%', backgroundColor: '#dddddde6', borderRadius: '20px', margin: '0 10px 10px 10px'}} onMouseEnter={() => {
                      setMenuHover({ ...menuHover, in: Date.now() })
                      }} onMouseLeave={() => {
                      setMenuHover({ ...menuHover, out: Date.now() })}}>
                      <SubCat />
                    </div>
                  </div>
                </div>
                <div className="grid-col centered"style={{justifyContent: 'center'}} onClick={() => setMobileMenuOpen(false)}>
                  <CollapseIcon color="#eee" />
                </div>
              </div>
            ) : (
              <div className="flex-row flex-middle" style={{width: '100%', margin: '0', height:  '48px', justifyContent: 'center'}}>
                {store.isMobile
                  ?  <div className="sub-nav-box grid-col centered" style={{cursor: 'pointer', width: 'calc(100vw - 48px)', justifyContent: 'center' }}
                        onClick={() => setMobileMenuOpen(true)}>
                        <DropdownIcon color="#eee" />
                    </div>
                  : <div className="sub-nav-box flex-row flex-wr" style={{width: 'max-content', maxWidth: '1060px', backgroundColor: '#dddddde6', borderRadius: '20px', margin: '0 10px 10px 10px'}} onMouseEnter={() => {
                      setMenuHover({ ...menuHover, in: Date.now() })
                      }} onMouseLeave={() => {
                      setMenuHover({ ...menuHover, out: Date.now() })}}>
                        <SubCat />
                    </div>
                  }
              </div>
            )} 
          </div>
          <div className="nav-shadow" style={{height: '1px', backgroundColor: '', width: '100%'}}>
            <div className={store.isMobile ? "flex-row" : "flex-row flex-left"}><LeftCorner /></div>
          </div>
        </div>
      </nav>
      <div className="container">
        <AccountContext.Provider value={account}>
          <Component {...pageProps} connect={connect} />
        </AccountContext.Provider>
      </div>
    </div>
  )
}

export default App 



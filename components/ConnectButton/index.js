import React, { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { BiWalletAlt as WalletIcon } from 'react-icons/bi';
import { shortenAddress } from '../../utils/utils';
import { Button, Text } from "../Foundation";
import { buttonVariants } from '../Foundation/Button';
import DropdownMenu from '../DropdownMenu';

const ConnectButton = ({
    isMobile=false, 
    account=null,
    onConnect = () => {}, 
    onDisconnect = () => {}
}) => {
  const [balance, setBalance] = useState('0');

  async function connect() {
    
      try {

        onConnect();

      } catch (err) {
        console.error('error:', err)
      }
    }
  
  function disconnect () {
      onDisconnect();
  }

  const updateBalance = useCallback(async () => {
    if (account) {
      try {
        const provider = new ethers.providers.getDefaultProvider()
        let _balance = await provider.getBalance(account)
        _balance = Number(_balance)

        if (_balance > 0) {
          _balance = `${_balance / (10**18)}`  // TODO: need fix if invalid logic
          const decimals = _balance.split('.')[1].slice(0, 6)
          _balance = _balance.split('.')[0] + '.' + decimals
        }
        setBalance(_balance)
        
      } catch (err) {
        console.error(err);
      }
    }
  }, [account, setBalance])

  useEffect(() => {
    updateBalance()
    return () => {}
  }, [updateBalance])
   
    const AccountMenuButton = () => {
      return (
        <DropdownMenu 
            options={[
              {element: shortenAddress(account), action: null},  // copy action
              {element: "Balance: $" + balance, action: null}, 
              {element: "Disconnect", action: () => disconnect()}
            ]}
          >
            <Button variant={isMobile ? buttonVariants.icon : buttonVariants.default}>
              {isMobile ? <WalletIcon /> : <Text>{account ? shortenAddress(account) : "Connect"}</Text>}
            </Button>
          </DropdownMenu>
      )
    }

    const MobileConnect = () => {
      if (account) {
        return (
          <AccountMenuButton />
        )
      }

      return (
        <Button onClick={connect} variant={buttonVariants.icon}>
            <WalletIcon />
        </Button>
        
      )
    }
    
    return isMobile ? (
        <MobileConnect />
    ) : (account ? (
        <AccountMenuButton />
      ) : (
        <Button onClick={onConnect} variant={buttonVariants.default}>
          <Text>Connect</Text>
        </Button>
      )
    );
  }

export default ConnectButton;
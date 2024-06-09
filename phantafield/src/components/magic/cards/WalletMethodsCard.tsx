import React, { useState } from 'react';
import Disconnect from '../wallet-methods/Disconnect';
import GetIdToken from '../wallet-methods/GetIdToken';
import GetMetadata from '../wallet-methods/GetMetadata';
import Divider from '@/components/ui/Divider';
import { LoginProps } from '@/utils/types';
import Card from '@/components/ui/Card';
import CardHeader from '@/components/ui/CardHeader';
import { LoginMethod } from '@/utils/common';


const WalletMethods = ({ token, setToken }: LoginProps) => {
  const [loginMethod, setLoginMethod] = useState<LoginMethod | null>(
    localStorage.getItem('loginMethod') as LoginMethod,
  );
  return (
    <Card>
      <CardHeader id="methods">User Methods</CardHeader>
	  
      <GetIdToken />
      <Divider />
      <GetMetadata />
      <Divider />
      <Disconnect token={token} setToken={setToken} />
    </Card>
  );
};

export default WalletMethods;

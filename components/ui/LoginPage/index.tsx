'use client';

import React, { type FormEventHandler, useState } from 'react';
import { useSupabase } from '@/components/supabase/provider';
import Brand from '@/components/ui/Brand';
import LabelError from '@/components/ui/LabelError/LabelError';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label/Label';
import { GithubProvider, GoogleProvider } from '../AuthProviderButtons';

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export default () => {
  const { supabase } = useSupabase();
  const [isGoogleAuthLoad, setGoogleAuthLoad] = useState<boolean>(false);
  const [isGithubAuthLoad, setGithubAuthLoad] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoad, setLoad] = useState(false);

  const handleGoogleLogin = async () => {
    setGoogleAuthLoad(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getURL(),
      },
    });
  };

  const handleGithubLogin = async () => {
    setGithubAuthLoad(true);
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: getURL(),
      },
    });
  };

  const formValidator = () => {
    setEmailError('');
    if (email.length < 2) setEmailError('Please enter a correct Email');
    if (password.length < 2) setPasswordError('Please enter a correct Password');
    else return true;
  };

  const handleSubmit: FormEventHandler = async e => {
    e.preventDefault();
    if (formValidator()) {
      setLoad(true);
      // Hit Auth API Call
      // profileService
      //   .update(userSession?.id as string, {
      //     full_name: fullName,
      //     username,
      //     about,
      //     headline,
      //     website_url: websiteUrl,
      //   })
      //   .then(() => {
      //     setLoad(false);
      //   });
    }
  };

  return (
    <section>
      <div className="h-screen px-4 w-full flex items-center justify-center">
        <div className='text-center max-w-xl'>
          <form onSubmit={handleSubmit} className="mt-4">
            <div>
              <Label>Email</Label>
              <Input
                value={email}
                onChange={e => {
                  setEmail((e.target as HTMLInputElement).value);
                }}
                className="w-full mt-2"
              />
              <LabelError className="mt">{emailError}</LabelError>
            </div>
            <div>
              <Label>Password</Label>
              <Input
                value={password}
                onChange={e => {
                  setPassword((e.target as HTMLInputElement).value);
                }}
                className="w-full mt-2"
              />
              <LabelError className="mt">{passwordError}</LabelError>
            </div>
          </form>
        </div>
        <div className="d-flex my-3">
          <div className="flex-grow-1">
            <hr/>
          </div>
          <div className="text-muted text-center pt-1 px-3">
            or
          </div>
          <div className="flex-grow-1">
            <hr/>
          </div>
        </div>
        <div className="text-center max-w-xl">
          <div className="space-y-3">
            <Brand w="180" h="50" className="mx-auto" />
            <h1 className="text-slate-50 text-2xl font-semibold">Log in to your account</h1>
            <p className="text-slate-300 whitespace-pre-wrap">
              We use GitHub, and Google provider to keep it simple and easy for our users to login. Let's explore together, the legit way!
            </p>
          </div>
          <GithubProvider isLoad={isGithubAuthLoad} onClick={handleGithubLogin} />
          <GoogleProvider isLoad={isGoogleAuthLoad} onClick={handleGoogleLogin} />
        </div>
      </div>
    </section>
  );
};

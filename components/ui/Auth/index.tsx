'use client';

import React, { type FormEventHandler, useState } from 'react';
import LabelError from '@/components/ui/LabelError/LabelError';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label/Label';
import { Tabs, TabsLink } from '@/components/ui/TabsLink';
import { useSupabase } from '@/components/supabase/provider';
import { useCallback, useEffect } from 'react';
import AvatarMenu from '../AvatarMenu';
import axios from 'axios';
import { usermaven } from '@/utils/usermaven';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Brand from '@/components/ui/Brand';
import { GithubProvider, GoogleProvider } from '../AuthProviderButtons';
import ProfileService from '@/utils/supabase/services/profile';
import { createBrowserClient } from '@/utils/supabase/browser';
import { useRouter } from 'next/navigation';

// TODO - Email trigger to send emails .. Need to reuse same email mechanism for sending emails in MailBox Feature
import sendWelcomeEmail from '@/utils/sendWelcomeEmail';

export default function Auth({ onLogout }: { onLogout?: () => void }) {
  const { supabase, session, user } = useSupabase();
  const [isGoogleAuthLoad, setGoogleAuthLoad] = useState<boolean>(false);
  const [isGithubAuthLoad, setGithubAuthLoad] = useState<boolean>(false);
  const [isModalActive, setModalActive] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<string | undefined>('#signIn');
  const [isLoad, setLoad] = useState(false);

  const router = useRouter();

  const profile = new ProfileService(createBrowserClient());

  const handleGoogleLogin = async () => {
    setGoogleAuthLoad(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error != null) {
      console.log({ error });
    }
    setGoogleAuthLoad(false);
    setModalActive(false);
  };

  const handleGitHubLogin = async () => {
    setGithubAuthLoad(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
    if (error != null) {
      console.log({ error });
    }
    setGithubAuthLoad(false);
    setModalActive(false);
  };

  const HandleSignInNotification = useCallback(() => {
    const eventListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN' && session?.user) {
        profile.getById(session?.user.id as string).then(async user => {
          if (!user?.updated_at) {
            const DISCORD_USER_WEBHOOK = process.env.DISCORD_USER_WEBHOOK as string;
            const content = `**${user?.full_name}** [open the profile](https://opencollab.exchange/@${user?.username})`;
            if (DISCORD_USER_WEBHOOK) await axios.post(DISCORD_USER_WEBHOOK, { content });
            
            await axios.post('/api/login', { firstName: user?.full_name as string, personalEMail: session.user.email as string });
            await usermaven.id({
              id: user?.id,
              email: session?.user?.email,
              created_at: Date.now().toLocaleString(),
              first_name: user?.full_name,
            });
            await profile.update(user?.id as string, {
              updated_at: new Date().toISOString(),
            });
          }
        });
        eventListener.data.subscription.unsubscribe();
      }
    });
  }, []);

  useEffect(() => {
    HandleSignInNotification();
  }, []);

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

  const renderTabs = () => (
    <Tabs className="sticky z-10 ">
      <TabsLink 
        type={'componentChange'} 
        hash={'#signIn'} 
        key={'s1'} 
        variant='nonlink'
        handleTabChange={setActiveTab}>
        Sign In
      </TabsLink>
      <TabsLink 
        type={'componentChange'} 
        hash={'#signUp'} 
        key={'s2'} 
        variant='nonlink'
        handleTabChange={setActiveTab}>
        Sign Up
      </TabsLink>
    </Tabs>
  );

  // this `session` is from the root loader - server-side
  // therefore, it can safely be used to conditionally render
  // SSR pages without issues with hydration
  return Boolean(session) ? (
    <div className="hidden md:block">
      <AvatarMenu session={session} onLogout={onLogout} />
    </div>
  ) : (
    <div className="flex items-center">
      <Button variant="shiny" onClick={() => setModalActive(true)}>
        Sign In
      </Button>
      <Modal variant="custom" isActive={isModalActive} onCancel={() => setModalActive(false)} className="max-w-md">
        <Brand w={130} h={40} className="mx-auto" />
        {renderTabs()}
        {activeTab === '#signIn' ? (
        <div className='text-center max-w-xl mt-2' id="signIn">
          <form onSubmit={handleSubmit} className="mt-4">
            <div className='text-start'>
              <Label>Email</Label>
              <Input
                value={email}
                onChange={e => {
                  setEmail((e.target as HTMLInputElement).value);
                }}
                className="w-full mt-2 bg-white"
              />
              <LabelError className="mt">{emailError}</LabelError>
            </div>
            <div className='text-start mt-2'>
              <Label>Password</Label>
              <Input
                value={password}
                onChange={e => {
                  setPassword((e.target as HTMLInputElement).value);
                }}
                className="w-full mt-2 bg-white"
              />
              <LabelError className="mt">{passwordError}</LabelError>
            </div>
            <Button isLoad={isLoad} className="mt-4 flex justify-center w-full ring-offset-2 ring-orange-500 focus:ring-2 hover:bg-orange-400">
              {isLoad ? 'Updating' : 'save'}
            </Button>
          </form>
        </div>
        ): (
        <div className='text-center max-w-xl mt-2' id="signUp">
          <form onSubmit={handleSubmit} className="mt-4">
            <div className='text-start'>
              <Label>Email</Label>
              <Input
                value={email}
                onChange={e => {
                  setEmail((e.target as HTMLInputElement).value);
                }}
                className="w-full mt-2 bg-white"
              />
              <LabelError className="mt">{emailError}</LabelError>
            </div>
            <div className='text-start mt-2'>
              <Label>Password</Label>
              <Input
                value={password}
                onChange={e => {
                  setPassword((e.target as HTMLInputElement).value);
                }}
                className="w-full mt-2 bg-white"
              />
              <LabelError className="mt">{passwordError}</LabelError>
            </div>
            <div className='text-start mt-2'>
              <Label>Confirm Password</Label>
              <Input
                value={password}
                onChange={e => {
                  setPassword((e.target as HTMLInputElement).value);
                }}
                className="w-full mt-2 bg-white"
              />
              <LabelError className="mt">{passwordError}</LabelError>
            </div>
            <Button isLoad={isLoad} className="mt-4 flex justify-center w-full ring-offset-2 ring-orange-500 focus:ring-2 hover:bg-orange-400">
              {isLoad ? 'Updating' : 'save'}
            </Button>
          </form>
        </div>
        )}

      </Modal>
    </div>
  );

  const socialLogin = () => (
    <>
      {/** Border */}
      <div className="flex mt-4">
        <div className="flex-1">
          <hr/>
        </div>
        <div className="text-muted justify-center pt-1 px-3">
          or
        </div>
        <div className="flex-1">
          <hr/>
        </div>
      </div>
      {/** ------ */}

      {/** Social Logins */}
      <div className="text-center">
        <GithubProvider isLoad={isGithubAuthLoad} onClick={handleGitHubLogin} className="w-full justify-center mt-4" />
        <GoogleProvider isLoad={isGoogleAuthLoad} onClick={handleGoogleLogin} className="w-full justify-center mt-2" />
      </div>
    </>
  );
}
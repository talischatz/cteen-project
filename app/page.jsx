'use client';

import LoginForm from '@/components/login/LoginForm';
import PasswordRecoveryForm from '@/components/password-recovery/PasswordRecoveryForm';
import PasswordResetForm from '@/components/password-reset/PasswordResetForm';
import RegisterForm from '@/components/register/RegisterForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { useState } from 'react';

export default function SessionPage() {
  const [viewMode, setViewMode] = useState('login');
  const [recoveryEmail, setRecoveryEmail] = useState(null);
  const [showBanner, setShowBanner] = useState(false)

  return (
    <div className="full-container flex items-start md:items-center justify-center">
      <div className="max-w-full md:max-w-4xl h-full md:h-[700px] flex flex-col md:flex-row w-full mt-6 md:mt-0 relative justify-between items-center gap-10 md:gap-4">
        <div className="w-[100px] md:max-w-[400px] md:w-full h-[200px] md:h-full relative flex">
          <Image
            src={require('@/public/cteen_logo_sinfondo.png')}
            alt="cteen-logo"
          />
        </div>
        <Tabs
          defaultValue="login"
          className="flex flex-col flex-grow h-full items-center justify-start max-w-sm w-full md:max-w-[550px] p-2"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="signup">Registrarse</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            {viewMode === 'recovery' && (
              <PasswordRecoveryForm
                setShowBanner={setShowBanner}
                onValidEmail={(email) => {
                  setRecoveryEmail(email);
                  setViewMode('reset');
                }}
              />
            )}
            {viewMode === 'reset' && (
              <PasswordResetForm
                email={recoveryEmail}
                showBanner={showBanner}
                setShowBanner={setShowBanner}
                onPasswordReset={() => {
                  setViewMode('login');
                }}
              />
            )}
            {viewMode === 'login' && (
              <LoginForm onRequestRecovery={() => setViewMode('recovery')} />
            )}
          </TabsContent>
          <TabsContent value="signup">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

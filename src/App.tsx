import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '@/components/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Account from '@/pages/Account'
import ConfirmEmailChange from '@/pages/ConfirmEmailChange'
import ForgotPassword from '@/pages/ForgotPassword'
import Index from '@/pages/Index'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import Panel from '@/pages/Panel'
import ResetPassword from '@/pages/ResetPassword'
import VerifyEmail from '@/pages/VerifyEmail'

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/esqueci-senha" element={<ForgotPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/resetar-senha" element={<ResetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verificar-email" element={<VerifyEmail />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/confirmar-alteracao-email" element={<ConfirmEmailChange />} />
          <Route path="/confirm-email-change" element={<ConfirmEmailChange />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/painel" element={<Panel />} />
            <Route path="/conta" element={<Account />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App

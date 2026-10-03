import { loginWithEmail, signUpWithEmail, logout, getCurrentUser, syncUserData, loginWithGoogle, resetPasswordForEmail, updatePassword } from '../services/supabase.js';
import { store } from '../store.js';

export function initAuth() {
  const loginBtn = document.getElementById('loginBtn');
  const authModal = document.getElementById('authModal');
  const authForm = document.getElementById('authForm');
  const authToggleBtn = document.getElementById('authToggleBtn');
  const authToggleText = document.getElementById('authToggleText');
  const authModalTitle = document.getElementById('authModalTitle');
  const authModalSubtitle = document.getElementById('authModalSubtitle');
  const authSubmitBtn = document.getElementById('authSubmitBtn');
  const authGoogleBtn = document.getElementById('authGoogleBtn');
  const authError = document.getElementById('authError');
  const authForgotBtn = document.getElementById('authForgotBtn');
  const authPasswordGroup = document.getElementById('authPassword').closest('.form-group');

  if (!loginBtn || !authModal || !authForm) return;

  let isLoginMode = true;
  let isResetMode = false;
  let isUpdatePasswordMode = false;
  let lastSubmitTime = 0;

  // Check for password recovery hash
  if (window.location.hash.includes('type=recovery')) {
    isUpdatePasswordMode = true;
    authModal.classList.add('active');
    authModalTitle.textContent = 'Reset Password';
    authModalSubtitle.textContent = 'Enter your new password';
    document.getElementById('authEmail').closest('.form-group').style.display = 'none';
    document.getElementById('authEmail').required = false;
    authForgotBtn.style.display = 'none';
    authToggleBtn.closest('.auth-toggle').style.display = 'none';
    if(authGoogleBtn) authGoogleBtn.style.display = 'none';
    authSubmitBtn.textContent = 'Update Password';
  }

  // Initialize UI based on auth state
  getCurrentUser().then(user => {
    if (user) {
      updateLoginBtnState(true, user.email);
    }
  });

  loginBtn.addEventListener('click', async () => {
    const user = await getCurrentUser();
    if (user) {
      // Logout
      await logout();
      updateLoginBtnState(false);
    } else {
      // Show modal
      authModal.classList.add('active');
    }
  });

  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
      authModal.classList.remove('active');
      authError.style.display = 'none';
    }
  });

  authToggleBtn.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    isResetMode = false;
    authPasswordGroup.style.display = 'block';
    document.getElementById('authPassword').required = true;
    if(authGoogleBtn) authGoogleBtn.style.display = 'block';
    authError.style.display = 'none';
    if (isLoginMode) {
      authModalTitle.textContent = 'Welcome Back';
      authModalSubtitle.textContent = 'Login to save your streak and progress';
      authSubmitBtn.textContent = 'Login';
      authToggleText.textContent = "Don't have an account?";
      authToggleBtn.textContent = 'Sign Up';
      authForgotBtn.style.display = 'block';
    } else {
      authModalTitle.textContent = 'Create Account';
      authModalSubtitle.textContent = 'Join LearnSalesforce today';
      authSubmitBtn.textContent = 'Sign Up';
      authToggleText.textContent = 'Already have an account?';
      authToggleBtn.textContent = 'Login';
      authForgotBtn.style.display = 'none';
    }
  });

  if (authForgotBtn) {
    authForgotBtn.addEventListener('click', () => {
      isResetMode = true;
      authModalTitle.textContent = 'Reset Password';
      authModalSubtitle.textContent = 'Enter your email to receive a reset link';
      authSubmitBtn.textContent = 'Send Reset Link';
      authPasswordGroup.style.display = 'none';
      document.getElementById('authPassword').required = false;
      if(authGoogleBtn) authGoogleBtn.style.display = 'none';
      authForgotBtn.style.display = 'none';
      authError.style.display = 'none';
    });
  }

  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Rate Limiting: Prevent more than 1 request per 3 seconds
    const now = Date.now();
    if (now - lastSubmitTime < 3000) {
      authError.style.color = 'var(--danger-color)';
      authError.textContent = 'Please wait a moment before trying again.';
      authError.style.display = 'block';
      return;
    }
    lastSubmitTime = now;

    authError.style.display = 'none';
    authError.style.color = 'var(--danger-color)'; // Reset to default error color
    authSubmitBtn.disabled = true;
    authSubmitBtn.textContent = 'Please wait...';

    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;

    let result;
    if (isUpdatePasswordMode) {
      result = await updatePassword(password);
    } else if (isResetMode) {
      result = await resetPasswordForEmail(email);
    } else if (isLoginMode) {
      result = await loginWithEmail(email, password);
    } else {
      result = await signUpWithEmail(email, password);
    }

    authSubmitBtn.disabled = false;
    
    if (isUpdatePasswordMode) authSubmitBtn.textContent = 'Update Password';
    else if (isResetMode) authSubmitBtn.textContent = 'Send Reset Link';
    else authSubmitBtn.textContent = isLoginMode ? 'Login' : 'Sign Up';

    if (result.error) {
      authError.textContent = result.error.message;
      authError.style.display = 'block';
    } else {
      if (isUpdatePasswordMode) {
        authError.style.color = '#22c55e';
        authError.textContent = 'Password updated successfully! You are logged in.';
        authError.style.display = 'block';
        setTimeout(() => {
          authModal.classList.remove('active');
          window.location.hash = '#/'; // Clear recovery hash
        }, 2000);
        updateLoginBtnState(true, email || 'User');
        await syncUserData(store.state);
        return;
      }

      if (isResetMode) {
        authError.style.color = '#22c55e';
        authError.textContent = 'Success! Check your email for a password reset link.';
        authError.style.display = 'block';
        return;
      }

      // If sign up and no session, email confirmation is required
      if (!isLoginMode && result.data && !result.data.session) {
        authError.style.color = '#22c55e'; // Success color
        authError.textContent = 'Success! Please check your email for a confirmation link to complete registration.';
        authError.style.display = 'block';
        return; // Don't close modal or pretend we are logged in
      }

      // Success and logged in
      authModal.classList.remove('active');
      updateLoginBtnState(true, email);
      
      // Sync local data to Supabase since they just logged in
      await syncUserData(store.state);
    }
  });

  if (authGoogleBtn) {
    authGoogleBtn.addEventListener('click', async () => {
      authError.style.display = 'none';
      authGoogleBtn.disabled = true;
      authGoogleBtn.textContent = 'Please wait...';
      const result = await loginWithGoogle();
      
      authGoogleBtn.disabled = false;
      authGoogleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px;">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      `;

      if (result.error) {
        authError.textContent = result.error.message;
        authError.style.display = 'block';
      }
      // Success is handled by OAuth redirect in Supabase
    });
  }

  // Sync data whenever store updates, if logged in
  store.subscribe(async () => {
    const user = await getCurrentUser();
    if (user) {
      await syncUserData(store.state);
    }
  });
}

function updateLoginBtnState(isLoggedIn, email = '') {
  const loginBtn = document.getElementById('loginBtn');
  if (isLoggedIn) {
    // Show truncated email and logout option
    const displayEmail = email.split('@')[0];
    loginBtn.textContent = `Logout (${displayEmail})`;
  } else {
    loginBtn.textContent = 'Login / Signup';
  }
}

import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Link,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';

const SignInDialog = ({ open, onClose, onLoginSuccess }) => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const toggleForm = () => {
    setIsCreatingAccount((prev) => !prev);
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    // Add your sign-in logic here
    onLoginSuccess();
    onClose();
  };

  const handleCreateAccount = (event) => {
    event.preventDefault();
    // Add your account creation logic here
    onLoginSuccess();
    onClose();
  };

  // Reset form fields when dialog closes
  useEffect(() => {
    if (!open) {
      setEmail('');
      setPassword('');
      setName('');
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ bgcolor: '#2A2C2E', color: '#F4CE47' }}>
        {isCreatingAccount ? 'Create an Account' : 'Sign In'}
      </DialogTitle>
      <DialogContent sx={{ bgcolor: '#2A2C2E' }}>
        <Box component="form" onSubmit={isCreatingAccount ? handleCreateAccount : handleSignIn} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {isCreatingAccount && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'white' } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'white' },
                      '&:hover fieldset': { borderColor: 'white' },
                      '&.Mui-focused fieldset': { borderColor: '#F4CE47' },
                    },
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: '#F4CE47' },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: '#F4CE47' },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Link href="#" sx={{ color: '#F4CE47', textDecoration: 'none' }} onClick={toggleForm}>
                {isCreatingAccount ? 'Already have an account? Sign in' : 'Create an Account'}
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: '#F4CE47',
                  color: '#2A2C2E',
                  '&:hover': { backgroundColor: '#e4bf40' },
                }}
              >
                {isCreatingAccount ? 'Create Account' : 'Sign In'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;

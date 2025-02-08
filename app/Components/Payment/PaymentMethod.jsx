import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { TextField, Button, Box, Grid, Typography, Modal, CircularProgress } from '@mui/material';
import validator from 'validator';

const PaymentMethod = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focused, setFocused] = useState('');
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!/^[A-Za-z\s]+$/.test(cardName)) {
      newErrors.cardName = 'Cardholder name must contain only alphabets';
    }
    if (
      !validator.isLength(expiry, { min: 5, max: 5 }) ||
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) ||
      !isFutureDate(expiry)
    ) {
      newErrors.expiry = 'Invalid or past expiry date (MM/YY)';
    }
    if (!/^\d{3}$/.test(cvc)) {
      newErrors.cvc = 'CVC must be 3 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFutureDate = (expiry) => {
    const [month, year] = expiry.split('/').map(Number);
    const now = new Date();
    const expiryDate = new Date(`20${year}`, month - 1);
    return expiryDate > now;
  };

  const handleExpiryChange = (value) => {
    if (/^[0-9]{1,2}$/.test(value) && value.length === 2) {
      setExpiry(value + '/');
    } else if (/^[0-9]{2}\/[0-9]{1,2}$/.test(value)) {
      setExpiry(value);
    } else if (value.length <= 5) {
      setExpiry(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      // Simulate a form submission process with a timeout
      setTimeout(() => {
        setLoading(false);
        setShowModal(true);

        // Hide modal and redirect after 3 seconds
        setTimeout(() => {
          setShowModal(false);
          window.location.href = '/'; // Redirect to front page
        }, 3000);
      }, 2000);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
        Enter Card Details
      </Typography>

      {/* React Credit Cards Display */}
      <Cards
        number={cardNumber}
        name={cardName}
        expiry={expiry.replace('/', '')}
        cvc={cvc}
        focused={focused}
      />

      {/* Cardholder Name */}
      <TextField
        label="Cardholder Name"
        value={cardName}
        onChange={(e) => {
          const value = e.target.value;
          if (/^[A-Za-z\s]*$/.test(value)) {  // Allow only alphabets and spaces
            setCardName(value);
          }
        }}
        fullWidth
        sx={textFieldStyle}
        onFocus={() => setFocused('name')}
        error={!!errors.cardName}
        helperText={errors.cardName || ''}
      />

      {/* Card Number */}
      <TextField
        label="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
        fullWidth
        sx={textFieldStyle}
        onFocus={() => setFocused('number')}
        error={!!errors.cardNumber}
        helperText={errors.cardNumber || ''}
      />

      {/* Expiry Date and CVC */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="MM/YY"
            value={expiry}
            onChange={(e) => handleExpiryChange(e.target.value)}
            fullWidth
            sx={textFieldStyle}
            onFocus={() => setFocused('expiry')}
            error={!!errors.expiry}
            helperText={errors.expiry || ''}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
            fullWidth
            sx={textFieldStyle}
            onFocus={() => setFocused('cvc')}
            error={!!errors.cvc}
            helperText={errors.cvc || ''}
          />
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ marginTop: 3, bgcolor: 'white', color: 'black', '&:hover': { bgcolor: 'grey.300' } }}
      >
        {loading ? <CircularProgress size={24} /> : 'Submit Payment'}
      </Button>

      {/* Modal for order completion */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" textAlign="center">
            Order Completed!
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

// Styling for TextFields
const textFieldStyle = {
  marginBottom: 2,
  marginTop: 2,
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiFormHelperText-root': {
    color: 'white',
  },
};

export default PaymentMethod;

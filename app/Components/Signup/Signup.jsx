import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase/config";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const Signup = ({ onClose, redirectToCheckout }) => {
  const auth = getAuth(app);
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSignup, setIsSignup] = useState(true);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
      onClose();
      if (redirectToCheckout) {
        router.push("/payment");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox!");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAuth = async () => {
    setError("");
    setMessage("");

    if (!email || !password || (isSignup && !fullName)) {
      setError("All fields are required.");
      return;
    }

    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: fullName });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
      if (redirectToCheckout) {
        router.push("/payment");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Paper elevation={5} sx={{ padding: 4, borderRadius: 3, width: 350, textAlign: "center" }}>
      <Typography variant="h5" fontWeight="bold" color="primary">
        {isSignup ? "Create an Account" : "Welcome Back!"}
      </Typography>

      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        {isSignup && (
          <TextField
            label="Full Name"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        )}
        <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <Typography color="error" fontSize={14}>{error}</Typography>}
        {message && <Typography color="green" fontSize={14}>{message}</Typography>}

        <Button variant="contained" sx={{ mt: 1 }} onClick={handleAuth}>
          {isSignup ? "Sign Up" : "Login"}
        </Button>

        {!isSignup && (
          <Button variant="text" sx={{ textTransform: "none", color: "blue" }} onClick={handleForgotPassword}>
            Forgot Password?
          </Button>
        )}

        <Button variant="contained" sx={{ mt: 1, color: "white", borderColor: "#DB4437" }} onClick={handleGoogleLogin}>
          Sign in with Google
        </Button>

        <Typography variant="body2" mt={2}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}  
          <Button variant="text" sx={{ textTransform: "none", color: "blue" }} onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login here" : "Create an account"}
          </Button>
        </Typography>
      </Box>
    </Paper>
  );
};

export default Signup;

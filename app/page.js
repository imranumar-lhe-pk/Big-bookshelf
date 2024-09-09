import { Box } from "@mui/material";
import NavBar from "./Components/LandingPage/NavBar";
import Cards from "./Components/LandingPage/Cards";
import Bestsellers from "./Components/LandingPage/Bestsellers";
import Banner from "./Components/LandingPage/Banner";
import Aurthor from "./Components/LandingPage/Author";
import Button from "./Components/LandingPage/Buttons";
import Footer from "./Components/LandingPage/Footer";

export default function Home() {
  return (
<Box>
  <NavBar />
  <Cards />
  <Bestsellers />
  <Banner />
  <Aurthor />
  <Button />
  <Footer />
</Box>
  );
}

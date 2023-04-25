import { Grid, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Grid container sx={{ bgcolor: 'rgb(32,118,210)', color: 'white', p: 4, mt:8 }}>
      <Grid item xs={12} md={2}>
        <Typography sx={{pb:2}} variant="h6">ABOUT</Typography>
        <Typography variant="body1">Contact Us</Typography>
        <Typography variant="body1">About Us</Typography>
        <Typography variant="body1">Careers</Typography>
        <Typography variant="body1">Flipkart Stories</Typography>
        <Typography variant="body1">Press</Typography>
        <Typography variant="body1">Flipkart Wholesale</Typography>
        <Typography variant="body1">Corporate Information</Typography>
      </Grid>
      <Grid item xs={12} md={2}>
        <Typography sx={{pb:2}} variant="h6">HELP</Typography>
        <Typography variant="body1">Payments</Typography>
        <Typography variant="body1">Shipping</Typography>
        <Typography variant="body1">Cancellation &amp; Returns</Typography>
        <Typography variant="body1">FAQ</Typography>
        <Typography variant="body1">Report Infringement</Typography>
      </Grid>
      <Grid item xs={12} md={2}>
        <Typography sx={{pb:2}} variant="h6">CONSUMER POLICY</Typography>
        <Typography variant="body1">Return Policy</Typography>
        <Typography variant="body1">Terms Of Use</Typography>
        <Typography variant="body1">Security</Typography>
        <Typography variant="body1">Privacy</Typography>
        <Typography variant="body1">Sitemap</Typography>
        <Typography variant="body1">Grievance Redressal</Typography>
        <Typography variant="body1">EPR Compliance</Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography sx={{pb:2}} variant="h6">Mail Us:</Typography>
        <Typography variant="body1">Flipkart Internet Private Limited,</Typography>
        <Typography variant="body1">Buildings Alyssa, Begonia &amp;</Typography>
        <Typography variant="body1">Clove Embassy Tech Village,</Typography>
        <Typography variant="body1">Outer Ring Road, Devarabeesanahalli Village,</Typography>
        <Typography variant="body1">Bengaluru, 560103,</Typography>
        <Typography variant="body1">Karnataka, India</Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography sx={{pb:2}} variant="h6">Registered Office Address:</Typography>
        <Typography variant="body1">Flipkart Internet Private Limited,</Typography>
        <Typography variant="body1">Buildings Alyssa, Begonia &amp;</Typography>
        <Typography variant="body1">Clove Embassy Tech Village,</Typography>
        <Typography variant="body1">Outer Ring Road, Devarabeesanahalli Village,</Typography>
        <Typography variant="body1">Bengaluru, 560103,</Typography>
        <Typography variant="body1">Karnataka, India</Typography>
        <Typography variant="body1">CIN : U51109KA2012PTC066107</Typography>
        <Typography variant="body1">Telephone: 044-45614700</Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
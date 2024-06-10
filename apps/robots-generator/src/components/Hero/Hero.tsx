import { CenterFocusStrong } from '@mui/icons-material';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button';
import React from 'react'
import Typography from '@mui/material/Typography';
import Image from 'next/image'


const Hero = () => {
  return (
      <Box component="section" sx={{ 
        textAlign:"center",
        height:"600px", 
        backgroundColor: "#f7f9fa",
        backgroundImage: "url(./bg-shape-7.svg)",
        backgroundSize:"cover",
        background:"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(255, 255, 255, 0.55)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E",
        paddingTop:"100px"
      }}>


    <Box sx={{
        height:"150px",
        width:"150px",
        margin:"auto",
        p:"10px 10px"
      }}>
      <Image
          src="/robot.svg"
          width={4}
          height={4}
          alt="Picture of AI Robot"
      />
      </Box>
     
      <Box sx={{
        zIndex:"50",
        height:300,
      }}
      >
     
      <Typography variant="h1" gutterBottom sx={{ 
        py:"8px",
        }}>
          Protect your <Box component="div" sx={{ display: 'inline', color:"#1120E1" }}>website</Box> against AI Bots
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb:4, zIndex:10}}>
            Get Started
          </Button>
      </Box>
      </Box>   
  )
}

export default Hero;
import React from 'react'
import { Grid, Typography } from '@material-ui/core'


function AboutContent() {
  return (
    <Grid item direction="column" justify="center" alignItems="flex-start" xs={12} sm={8} spacing={8}>
      <Typography variant="h2" style={{ paddingBottom: '2rem' }}>ABOUT US</Typography>
      <Typography variant="body1" >
        Rouhani Meter is a project that aims to monitor the accomplishment of promises made by Iranian President Hassan Rouhani.
        It is inspired by Morsi Meter,which was created by a group of young Egyptians to observe the actions taken by then Egyptian
        president, Mohamed Morsi,towards the promises that he had made. Rouhani Meter is an independent project by ASL19, which
        initially benefited from the support of the University of Toronto.
        </Typography>
      <br />

      <Typography variant="body1">
        Rouhani Meter uses accessible and reliable information to report on the accomplishment of promises with accuracy and impartiality.
        We have listed clear and achievable promises made by President Rouhani and have organized them in four categories: Foreign Policy,
        Economy, Domestic Policy, and Socio-cultural Matters.
      </Typography>

      <br />
      <Typography variant="body1">
        We are eager to hear your comments and suggestions about how we can increase the quality and effectiveness of this project. If you
        have any suggestions or concerns please message us through the Community Watch section, at the bottom of the main page, or through
        Rouhani Meter’s Facebook, Twitter, Instagram and Telegram accounts.
      </Typography>
    </Grid >
  )
}

export default AboutContent;
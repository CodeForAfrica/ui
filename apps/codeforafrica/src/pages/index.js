import { RichTypography } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Head from "next/head";
import React from "react";

import NewsletterSubscription from "@/codeforafrica/components/NewsletterSubscription";

function Index() {
  return (
    <Box>
      <Head>
        <title>Code for Africa</title>
      </Head>

      <RichTypography variant="h1" component="h1">
        Empowering <span>Africa</span>
      </RichTypography>

      <Box sx={{ flexGrow: 1, bgcolor: "common.black" }}>
        <NewsletterSubscription>
          {`
          <!-- Begin Mailchimp Signup Form -->
          <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">
          <style type="text/css">
            #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
            /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
               We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
          </style>
          <div id="mc_embed_signup">
          <form action="https://twitter.us6.list-manage.com/subscribe/post?u=65e5825507b3cec760f272e79&amp;id=c2ff751541" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
              <div id="mc_embed_signup_scroll">
            <label for="mce-EMAIL">Subscribe</label>
            <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" required>
           <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
              <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_65e5825507b3cec760f272e79_c2ff751541" tabindex="-1" value=""></div>
              <div class="clear"><input type="submit" value  id="mc-embedded-subscribe" class="button"></div>
              </div>
          </form>
          </div>
          <!--End mc_embed_signup-->
          `}
        </NewsletterSubscription>
      </Box>
    </Box>
  );
}

export default Index;

export default function getFallbackData() {
  const menus = {
    logo: {
      alt: "ClimateMappedAfrica",
      src: "https://climatemapped-africa.dev.codeforafrica.org/media/Colour_IBMPlex.png",
      height: 262.77,
      width: 877.7,
    },
    drawerLogo: {
      alt: "ClimateMappedAfrica",
      src: "https://climatemapped-africa.dev.codeforafrica.org/media/Colour_IBMPlex.png",
      height: 262.77,
      width: 877.7,
    },
    explorePagePath: "explore",
    locations: [],
    menus: [
      {
        label: "Explore",
        url: "/explore",
        href: "/explore",
      },
      {
        label: "About",
        url: "/data",
        href: "/about",
      },
      {
        label: "Temperature Forecasting",
        url: "https://temperatureforecasterpy-jbrpheew5e5u3fmom3wsq4.streamlit.app/",
        href: "https://temperatureforecasterpy-jbrpheew5e5u3fmom3wsq4.streamlit.app/",
      },
    ],
    socialLinks: [],
    tutorialEnabled: false,
  };

  const footer = {
    title: "ClimateMappedAfrica",
    connect: {
      title: "Stay in Touch",
      links: [
        {
          platform: "Facebook",
          url: "https://www.facebook.com",
        },
        {
          platform: "Twitter",
          url: "https://x.com",
        },
        {
          platform: "Github",
          url: "https://github.com",
        },
        {
          platform: "Instagram",
          url: "https://instagram.com",
        },
      ],
    },
    description: [
      {
        children: [
          {
            text: "ClimateMapped.AFRICA is a data-driven project aiming to shed light on the impact of climate change across the African continent, allowing users to see temperature trends and anomalies at both local and regional scales. The platform’s data highlights the cyclical impact of climate change on communities and landscapes.",
            children: null,
          },
        ],
      },
      {
        children: [
          {
            text: "",
            children: null,
          },
        ],
      },
      {
        children: [
          {
            text: "This site is a DataLab project by ",
            children: null,
          },
          {
            newTab: true,
            type: "link",
            url: "https://medium.com/code-for-africa?source=logo-lo_97638efa0bec---90668e7fcbdb",
            children: [
              {
                text: "Code for Africa",
                children: null,
              },
            ],
            href: "https://medium.com/code-for-africa?source=logo-lo_97638efa0bec---90668e7fcbdb",
          },
          {
            text: ". All content is released under a Creative Commons 4.0 Attribution license. You are free to reuse it to help empower your own communication.",
            children: null,
          },
        ],
      },
    ],
    logo: {
      alt: "ClimateMappedAfrica",
      src: "http://localhost:3000/media/Asset 2@144x.png",
      height: 225,
      width: 501,
    },
    links: {
      title: "Resources",
      links: [
        {
          label: "About",
          url: "/",
          href: "/about",
        },
        {
          label: "Privacy Policy",
          url: "/",
          href: "/",
        },
      ],
    },
    newsletter: {
      title: "Subscribe to the Newsletters",
      embedCode:
        '<!-- Begin Mailchimp Signup Form -->\n\n<div id="mc_embed_signup">\n  <form action="https://twitter.us6.list-manage.com/subscribe/post?u=65e5825507b3cec760f272e79&amp;id=c2ff751541" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>\n      <div id="mc_embed_signup_scroll">\n    <label for="MERGE1">Name</label>\n    <input type="text" name="MERGE1" id="MERGE1" size="25" value="" placeholder="Your name">\n    <label for="mce-EMAIL">Email</label>\n    <input type="email" value="" placeholder="example@email.com" name="EMAIL" class="email" id="mce-EMAIL" required>\n   <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->\n      <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_65e5825507b3cec760f272e79_c2ff751541" tabindex="-1" value=""></div>\n      <div class="clear"><input type="submit" value="Sign up"  id="mc-embedded-subscribe" class="button"></div>\n      </div>\n  </form>\n</div>\n\n<!--End mc_embed_signup-->',
    },
  };

  return {
    menus,
    footer,
  };
}

/* eslint-disable import/prefer-default-export */

const menu = [
  {
    label: "Our work",
    href: "/our-work",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Stories",
    href: "/stories",
  },
  {
    label: "Opportunity",
    href: "/opportunity",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const navbar = {
  menu,
};
const footer = {
  socialMedia: [
    {
      url: "https://twitter.com/Code4Africa",
      image: {
        alt: "Twitter",
        url: "/icons/Type=twitter, Size=32, Color=White.svg",
      },
    },
    {
      url: "https://cfa.slack.com",
      image: {
        alt: "Slack",
        url: "/icons/Type=slack, Size=32, Color=White.svg",
      },
    },
    {
      url: "https://ke.linkedin.com/company/code-for-africa",
      image: {
        alt: "LinkedIn",
        url: "/icons/Type=linkedin, Size=32, Color=White.svg",
      },
    },
    {
      url: "https://www.facebook.com/CodeForAfrica/",
      image: {
        alt: "Facebook",
        url: "/icons/Type=facebook, Size=32, Color=White.svg",
      },
    },
    {
      url: "https://www.instagram.com/code4africa__/",
      image: {
        alt: "Instagram",
        url: "/icons/Type=instagram, Size=32, Color=White.svg",
      },
    },
    {
      url: "https://github.com/CodeForAfrica",
      image: {
        alt: "Github",
        url: "/icons/Type=github, Size=32, Color=White.svg",
      },
    },
  ],
  additionalLinks: {
    secondary: [
      { name: "Imprint", href: "www.imprint.com" },
      { name: "Privacy policy", href: "www.policy.com" },
    ],
  },
  description:
    "This site is a project of Code for Africa, the continent's largest network of civic technology and data journalism labs. All content is released under a Creative Commons 4 Attribution Licence. Reuse it to help empower your own community.",
  menu,
  subscription: {
    embedCode: `
          <!-- Begin Mailchimp Signup Form -->
          <div id="mc_embed_signup">
            <form action="https://twitter.us6.list-manage.com/subscribe/post?u=65e5825507b3cec760f272e79&amp;id=c2ff751541" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                <div id="mc_embed_signup_scroll">
              <label for="MERGE1">Name</label>
              <input type="text" name="MERGE1" id="MERGE1" size="25" value="">
              <label for="mce-EMAIL">Email</label>
              <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" required>
             <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_65e5825507b3cec760f272e79_c2ff751541" tabindex="-1" value=""></div>
                <div class="clear"><input type="submit" value="Sign up"  id="mc-embedded-subscribe" class="button"></div>
                </div>
            </form>
          </div>
          <!--End mc_embed_signup-->
    `,
  },
};

const articles = [
  {
    title: "Battle for gender equality in African media continues",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
    content: `
      <p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat. </p>

      <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus 
      mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales 
      dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p> 

      <div style="background: #F6F5F5; padding: 50px; font-weight: 400; font-size: 14px; line-height: 23px;color: #5D5353;">Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat. 
      Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus mus 
      mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales dapibus 
      eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</div>

      <div style="padding: 40px 0px;">
        <img src="/image 12.png" alt="article-image" style="width: 100%;height: auto;"/>
        <h6 style="font-weight: 400; font-size: 12px; line-height: 14px; text-align: center; color: #1020E1;">The #GMMP2020 team of enumerators from DRC displaying their certificates of participation. (Picture by DRC <b/>team © Global Media Monitoring Project)</h6>
      </div>
      
      
      <p>Dictumst fames bibendum venenatis mattis imperdiet viverra auctor suspendisse quam, tristique facilisi mauris ligula sociis phasellus faucibus litora tellus, netus consequat natoque velit scelerisque laoreet diam condimentum. Enim feugiat rhoncus diam ante mi nullam penatibus eros facilisis, arcu sociosqu ridiculus egestas ullamcorper ligula suspendisse potenti. Maecenas
      fringilla est facilisis potenti dictumst, quis pellentesque nascetur tempor, suspendisse etiam convallis nulla. Faucibus rutrum dui placerat commodo ligula in inceptos nullam rhoncus, vestibulum felis laoreet praesent per dictumst sociis molestie, euismod egestas tempor eleifend aptent posuere ad libero. </p>

      <p>Purus fames sociosqu dictum ultricies cum quis, accumsan tincidunt massa iaculis fringilla, ante mi porttitor turpis odio. Eros ridiculus ullamcorper senectus ad a natoque congue torquent tempus parturient himenaeos, habitant sodales lectus hac bibendum lobortis conubia tellus class suspendisse urna, feugiat phasellus eleifend nullam venenatis faucibus erat mattis posuere 
      nibh. Quisque at volutpat nostra sed proin, aptent primis hac posuere eget, lobortis penatibus ligula nec. Nostra potenti sociosqu interdum cursus inceptos turpis lacus cubilia, metus malesuada neque scelerisque pellentesque consequat facilisis placerat varius, curae fusce curabitur facilisi habitasse ut accumsan. Montes vehicula suscipit vel quis rhoncus tristique ac hac, magnis 
      pharetra porttitor aptent convallis libero mauris, luctus dictum quam dis ligula condimentum cum. Egestas est cras venenatis sem suscipit vestibulum cursus habitasse mattis, leo posuere ornare ullamcorper montes condimentum potenti cum, curae dui interdum at pharetra massa a quisque.<p>
      
      `,
    date: "Jan 6, 2022",
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885664/codeforafrica/unsplash_L6hr1BptcNc_of23p3.png",
    },
    coverImage: { src: "/header-image.png" },
    author: "Brenda Nyokabi",
    profession: " Technologist Code for Africa",
    href: "/stories/article-1",
    tags: ["Africa", "Media", "Equality"],
  },
  {
    title:
      "Article title goes in hereArticle title goes in hereArticle title goes in here",
    date: "Jan 6, 2022",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
    content: `<p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p> 
      <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus 
      mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales 
      dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p> `,
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_1_g6nf2l.jpg",
    },
    coverImage: { src: "/header-image.png" },
    author: "Gertrude Nyenyeshi",
    profession: " Technologist Code for Africa",
    href: "/stories/article-2",
    tags: ["Kenya", "Water scarcity"],
  },
  {
    title: "Article title goes in here",
    date: "Jan 6, 2022",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
    content: `<p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p> 
      <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus 
      mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales 
      dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p> `,
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885140/codeforafrica/unsplash_L85a1k-XqH8_jyvr9m.jpg",
    },
    coverImage: { src: "/header-image.png" },
    author: "Isaiah Ngaruiya",
    profession: " Technologist Code for Africa",
    href: "/stories/article-3",
  },
  {
    title:
      "Article title goes in hereArticle title goes in hereArticle title goes in here",
    date: "Jan 6, 2022",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
    content: `<p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p> 
      <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus 
      mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales 
      dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p> `,
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_2_dkg9uz.jpg",
    },
    coverImage: { src: "/header-image.png" },
    href: "/stories/article-4",
    author: "Clemence Kyara",
    profession: " CTO Code for Africa",
    tags: ["Kenya", "Water scarcity"],
  },
  {
    title: "Article title goes in here",
    date: "Jan 6, 2022",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
    content: `<p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p> 
      <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus 
      mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales 
      dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p> `,
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_1_g6nf2l.jpg",
    },
    coverImage: { src: "/header-image.png" },
    href: "/stories/article-5",
    author: "Clemence Kyara",
    profession: " CTO Code for Africa",
    tags: ["Kenya"],
  },
  {
    title: "Article title goes in here",
    date: "Jan 6, 2022",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
    content: `<p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p> 
      <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus 
      mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales 
      dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p> `,
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885140/codeforafrica/unsplash_L85a1k-XqH8_jyvr9m.jpg",
    },
    coverImage: { src: "/header-image.png" },
    href: "/stories/article-6",
    author: "Isaiah Ngaruiya",
    profession: " Technologist Code for Africa",
    tags: ["Water scarcity"],
  },
  {
    title: "Article title goes in here",
    date: "Jan 6, 2022",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
    content: `<p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p> 
      <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus 
      mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales 
      dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p> `,
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_2_dkg9uz.jpg",
    },
    coverImage: { src: "/header-image.png" },
    href: "/stories/article-7",
    author: "Gertrude Nyenyeshi",
    profession: " Technologist Code for Africa",
  },
  {
    title: "Article title goes in here",
    date: "Jan 6, 2022",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
    content: `<p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p> 
      <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus 
      mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales 
      dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p> `,
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_1_g6nf2l.jpg",
    },
    coverImage: { src: "/header-image.png" },
    href: "/stories/article-8",
    author: "Brenda Nyokabi",
    profession: " Technologist Code for Africa",
  },
  {
    title: "Article title goes in here",
    date: "Jan 6, 2022",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
    content: `<p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p> 
      <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus 
      mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales 
      dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p> `,
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885140/codeforafrica/unsplash_L85a1k-XqH8_jyvr9m.jpg",
    },
    coverImage: { src: "/header-image.png" },
    href: "/stories/article-9",
    author: "Gertrude Nyenyeshi",
    profession: " Technologist Code for Africa",
  },
  {
    title: "Article title goes in here",
    date: "Jan 6, 2022",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
    content: `<p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p> 
      <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus 
      mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales 
      dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p> `,
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_2_dkg9uz.jpg",
    },
    coverImage: { src: "/header-image.png" },
    href: "/stories/article-10",
    author: "Clemence Kyara",
    profession: " CTO Code for Africa",
  },
  {
    title: "Article title goes in here",
    date: "Jan 6, 2022",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
    content: `<p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p> 
      <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus 
      mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales 
      dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p> `,
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_1_g6nf2l.jpg",
    },
    coverImage: { src: "/header-image.png" },
    href: "/stories/article-11",
    author: "Isaiah Ngaruiya",
    profession: " Technologist Code for Africa",
  },
  {
    title: "Article title goes in here",
    date: "Jan 6, 2022",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
    content: `<p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p> 
      <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus 
      mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales 
      dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p> `,
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885140/codeforafrica/unsplash_L85a1k-XqH8_jyvr9m.jpg",
    },
    coverImage: { src: "/header-image.png" },
    href: "/stories/article-12",
    author: "Brenda Nyokabi",
    profession: " Technologist Code for Africa",
  },
  {
    title: "Article title goes in here",
    date: "Jan 6, 2022",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
    content: `<p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p> 
      <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus 
      mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales 
      dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p> `,
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_2_dkg9uz.jpg",
    },
    coverImage: { src: "/header-image.png" },
    href: "/stories/article-13",
    tags: ["Decision-making", "Empowerment citizens"],
    author: "Gertrude Nyenyeshi",
    profession: " Technologist Code for Africa",
  },
];

const projects = [
  {
    slug: "african-drone",
    name: "africanDRONE",
    tagLine: "Drones for good",
    title:
      'Empowering citizens through <span class="highlight">drone technology</span>',
    subtitle:
      "AfricanDRONE brings together communities of drone operators, enthusiasts, journalists, activists, and entrepreneurs in Africa who use drones for good.",
    description:
      "This award-winning initiative works to give citizens a new perspective on their lives. Using drone technology, africanDRONE empowers local pilots through a self-help network that offers seed funding, skills development, resource sharing, advocacy, and networking opportunities for members. The goal is to support the evolution of a vibrant and diverse drone ecosystem across Africa.",
    icon: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431239/codeforafrica/icons/Type_africanDRONE_exwdyu.svg",
    },
    category: "Projects",
  },
  {
    slug: "wana-data",
    name: "WanaData",
    tagLine: "Women in Africa",
    title:
      'Uplifting <span class="highlight">women in Africa</span> with a focus on data-driven projects',
    subtitle:
      "The WanaData community drives collaborative work and supports members in achieving their professional goals. ",
    description:
      "<p>WanaData is a Pan-African network of female data scientists, journalists and technologists working to change the digital landscape by producing and promoting data-driven projects while applying digital technologies in storytelling. It has grown from an initial 6 members in Nigeria to more than 400 women across the continent.</p><p>WanaData members have collaborated on cross-border reporting projects that incorporate data visualisation, artificial intelligence, audience engagement strategies, social videos, drone journalism and other innovative approaches, to enhance news content on the continent.",
    icon: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431239/codeforafrica/icons/Type_WanaData_neqwtm.svg",
    },
    category: "Projects",
  },
  {
    slug: "pesa-check",
    name: "PesaCheck",
    tagLine: "Africa fact-checking",
    title:
      'Africa’s largest <span class="highlight">indigenous fact-checking</span> organisation',
    subtitle:
      "PesaCheck, a pioneering verification initiative, debunks misleading claims with full-time fact-checkers in 15 African countries.",
    description:
      "<p>PesaCheck is a pioneering verification initiative that is kickstarting fact-checking across Africa. Initially focused on verifying the financial and other statistical numbers quoted by public figures in Kenya, Tanzania and Uganda, PesaCheck is now Africa’s largest with full-time fact-checkers in 15 countries in both east and west Africa, as well as across the Sahel.</p><p>PesaCheck fact-checks in two international languages (English and French), as well as major African languages such as Kiswahili and Amharic. Our network helps track political promises by politicians (through our Wajibisha/PromiseTracker toolkit), helps unpack budget and census data (through our PesaYetu and TaxClock platforms), and builds machine learning/artificial intelligence tools (such as DebunkBot) to help automate verification.</p>",
    icon: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431239/codeforafrica/icons/Type_PesaCheck_rmswvg.svg",
    },
    category: "Projects",
  },
  {
    slug: "open-africa",
    name: "openAFRICA",
    tagLine: "Volunteer open data",
    title:
      'Empowering citizens through <span class="highlight">drone technology</span>',
    subtitle:
      "AfricanDRONE brings together communities of drone operators, enthusiasts, journalists, activists, and entrepreneurs in Africa who use drones for good.",
    description:
      "This award-winning initiative works to give citizens a new perspective on their lives. Using drone technology, africanDRONE empowers local pilots through a self-help network that offers seed funding, skills development, resource sharing, advocacy, and networking opportunities for members. The goal is to support the evolution of a vibrant and diverse drone ecosystem across Africa.",
    icon: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431239/codeforafrica/icons/Type_openAFRICA_cczpuq.svg",
    },
    category: "Projects",
  },
  {
    slug: "civic-signal",
    name: "CivicSignal",
    tagLine: "Africa media ecosystem",
    title:
      'Empowering citizens through <span class="highlight">drone technology</span>',
    subtitle:
      "AfricanDRONE brings together communities of drone operators, enthusiasts, journalists, activists, and entrepreneurs in Africa who use drones for good.",
    description:
      "This award-winning initiative works to give citizens a new perspective on their lives. Using drone technology, africanDRONE empowers local pilots through a self-help network that offers seed funding, skills development, resource sharing, advocacy, and networking opportunities for members. The goal is to support the evolution of a vibrant and diverse drone ecosystem across Africa.",
    icon: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431239/codeforafrica/icons/Type_CivicSignal_ayzj31.svg",
    },
    category: "Projects",
  },
  {
    slug: "source-africa",
    name: "sourceAfrica",
    tagLine: "Actionable documents",
    title:
      'Empowering citizens through <span class="highlight">drone technology</span>',
    subtitle:
      "AfricanDRONE brings together communities of drone operators, enthusiasts, journalists, activists, and entrepreneurs in Africa who use drones for good.",
    description:
      "This award-winning initiative works to give citizens a new perspective on their lives. Using drone technology, africanDRONE empowers local pilots through a self-help network that offers seed funding, skills development, resource sharing, advocacy, and networking opportunities for members. The goal is to support the evolution of a vibrant and diverse drone ecosystem across Africa.",
    icon: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431402/codeforafrica/icons/Type_SourceAfrica_m7yvmt.svg",
    },
    category: "Projects",
  },
];

const DEFAULT_REVALIDATE = 3 * 60; // 3 minutes

function getHomePageStaticProps() {
  return {
    props: {
      title: "Code for Africa",
      sections: [
        {
          slug: "projects",
          projects: projects.map(({ slug, name, tagLine, icon, category }) => ({
            name,
            tagLine,
            icon,
            category,
            href: `/projects/${slug}`,
          })),
        },
        {
          slug: "news-stories",
          title: "News and stories",
          articles: articles.slice(0, 4),
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getStoriesPageStaticProps() {
  return {
    props: {
      title: "Stories | Code for Africa",
      sections: [
        {
          slug: "articles",
          title: "Articles",
          articles,
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getStoryPageStaticProps(params) {
  const article = articles.find(
    ({ href }) =>
      href.localeCompare(params?.slug, undefined, {
        sensitivity: "accent",
      }) === 0
  );
  if (article) {
    return {
      props: {
        title: `${article.title} | Stories | Code for Africa`,
        article,
        sections: [
          {
            slug: "related-stories",
            title: "News and Stories",
            articles: articles.slice(0, 3),
          },
        ],
        footer,
      },
      revalidate: DEFAULT_REVALIDATE,
    };
  }

  return { notFound: true };
}

export async function getPageStaticProps(params) {
  switch (params?.slug) {
    case "/": {
      return getHomePageStaticProps(params);
    }
    case "/stories": {
      return getStoriesPageStaticProps(params);
    }
    default:
      if (params?.slug?.startsWith("/stories/")) {
        return getStoryPageStaticProps(params);
      }
      return { notFound: true };
  }
}

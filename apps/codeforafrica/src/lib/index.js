import fuse from "./api.fuse";
import {
  getPartners,
  getCmsProjects,
  getHero,
  getMeetOurTeam,
  getTeam,
  getOurImpact,
  getOurMission,
  getOurPartners,
} from "./api.netlify-cms";

import equalsIgnoreCase from "@/codeforafrica/utils/equalsIgnoreCase";

export const partners = getPartners([
  "id",
  "slug",
  "name",
  "content",
  "href",
  "logo",
]);

export const projects = getCmsProjects([
  "tag",
  "name",
  "slug",
  "tagLine",
  "icon",
  "title",
  "subtitle",
  "content",
  "thumbnail",
  "href",
  "externalHref",
  "badges",
  "partners",
  "donors",
  "links",
]);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const menu = [
  {
    label: "Our work",
    href: "/projects",
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
    label: "Opportunities",
    href: "/opportunities",
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
      { name: "Imprint", href: "/imprint" },
      { name: "Privacy policy", href: "/privacy" },
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

const meetOurTeam = getMeetOurTeam();

export const ourMission = {
  title: "Our Mission",
  subtitle:
    "Code for Africa is the continent’s largest network of civic technology and data journalism labs, with teams in 20 countries.",
  description:
    "We build digital democracy solutions that give citizens unfettered access to actionable information that empowers them to make informed decisions, and which strengthens civic engagement for improved public governance and accountability. This includes building infrastructure like the continent’s largest open data portals at openAFRICA and sourceAFRICA, as well as incubating initiatives as diverse as the africanDRONE network, the PesaCheck fact-checking initiative and the sensors.AFRICA air quality sensor network.",
  action: {
    href: "/imprint",
    label: "Read about our company legal structure",
  },
};

export const team = getTeam();

const guidingPrinciples = [
  {
    icon: {
      src: "/icons/About icon.png",
    },
    title: "We show what's possible",
    content:
      "CfA seeks to be a catalyst by lowering the political risk of experimentation through creating successful proofs of concept for liberating civic data, for building enabling technologies and for pioneering sustainable revenue models. The organisation also endeavours to lower the financial costs for technology experimentation by creating and managing ‘shared’ backbone civic technology, and availing resources for rapid innovation.",
  },
  {
    icon: {
      src: "/icons/About icon2.png",
    },
    title: "We empower citizens",
    content:
      "Empowering citizens is central to CfA’s theory of change. Strong democracies rely on engaged citizens who have actionable information and easy-to-use channels for making their will known. CfA works primarily with citizen organisations and civic watchdogs, including the media and also support government and social enterprises in developing their capacity to respond meaningfully to citizens and to collaborate effectively with them.",
  },
  {
    icon: {
      src: "/icons/About icon3.png",
    },
    title: "We are action-oriented",
    content:
      "African societies are asymmetric: the balance of power rests with governments and corporate institutions, at the expense of citizens who are treated as passive recipients of consultation or services. CfA seeks to change this by focusing on actionable data and action-orientated tools that give agency to citizens.",
  },
  {
    icon: {
      src: "/icons/About icon4.png",
    },
    title: "We operate in public",
    content:
      "CfA promotes openness in our operations and in the work of our partners. All digital tools utilised are open source, and the organisation’s information is open data. CfA actively encourages documentation, sharing and collaboration, in addition to reuse of our own tools, programmes and processes, as well as those of partners.",
  },
  {
    icon: {
      src: "/icons/About icon5.png",
    },
    title: "We help build ecosystems",
    content:
      "CfA actively marshals resources to support the growth of a pan-African ecosystem of civic technologists. Whenever possible, this means reusing existing tools, standards and platforms, encouraging integration and extension. CfA operates as a pan-African federation of organisations who are active members of a global community, leveraging each other’s knowledge and resources.",
  },
  {
    icon: {
      src: "/icons/About icon6.png",
    },
    title: "Partnering for excellence",
    content:
      "Collaboration is at the heart of what CfA does. To build digital democracies the organisation partners with parties aligned with CfA’s values and works as a catalyst that kickstarts new initiatives and strengthens the local ecosystem by investing in and working through these partnerships.",
  },
];

const articles = [
  {
    title: "Battle for gender equality in African media continues",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
    content: `
      <p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p>
      <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p>
      <blockquote>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat. Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</blockquote>
      <figure class="kg-card kg-image-card kg-card-hascaption">
        <img src="https://longform.codeforafrica.org/content/images/2022/07/image-12.png" class="kg-image" alt loading="lazy" width="888" height="443" srcset="https://longform.codeforafrica.org/content/images/size/w600/2022/07/image-12.png 600w, https://longform.codeforafrica.org/content/images/2022/07/image-12.png 888w" sizes="(min-width: 720px) 720px">
        <figcaption>The #GMMP2020 team of enumerators from DRC displaying their certificates of participation. (Picture by DRC team © Global Media Monitoring Project)</figcaption>
      </figure>
      <p>Dictumst fames bibendum venenatis mattis imperdiet viverra auctor suspendisse quam, tristique facilisi mauris ligula sociis phasellus faucibus litora tellus, netus consequat natoque velit scelerisque laoreet diam condimentum. Enim feugiat rhoncus diam ante mi nullam penatibus eros facilisis, arcu sociosqu ridiculus egestas ullamcorper ligula suspendisse potenti. Maecenas fringilla est facilisis potenti dictumst, quis pellentesque nascetur tempor, suspendisse etiam convallis nulla. Faucibus rutrum dui placerat commodo ligula in inceptos nullam rhoncus, vestibulum felis laoreet praesent per dictumst sociis molestie, euismod egestas tempor eleifend aptent posuere ad libero.</p>
      <p>Purus fames sociosqu dictum ultricies cum quis, accumsan tincidunt massa iaculis fringilla, ante mi porttitor turpis odio. Eros ridiculus ullamcorper senectus ad a natoque congue torquent tempus parturient himenaeos, habitant sodales lectus hac bibendum lobortis conubia tellus class suspendisse urna, feugiat phasellus eleifend nullam venenatis faucibus erat mattis posuere nibh. Quisque at volutpat nostra sed proin, aptent primis hac posuere eget, lobortis penatibus ligula nec. Nostra potenti sociosqu interdum cursus inceptos turpis lacus cubilia, metus malesuada neque scelerisque pellentesque consequat facilisis placerat varius, curae fusce curabitur facilisi habitasse ut accumsan. Montes vehicula suscipit vel quis rhoncus tristique ac hac, magnis pharetra porttitor aptent convallis libero mauris, luctus dictum quam dis ligula condimentum cum. Egestas est cras venenatis sem suscipit vestibulum cursus habitasse mattis, leo posuere ornare ullamcorper montes condimentum potenti cum, curae dui interdum at pharetra massa a quisque.</p>
      <hr>
      <p><a href="https://twitter.com/Code4Africa" rel="noopener ugc nofollow">Code for Africa</a> (CfA) is the continent’s largest network of civic technology and data journalism labs, with teams in 21 countries. CfA builds digital democracy solutions that give citizens unfettered access to actionable information that empowers them to make informed decisions, and that strengthens civic engagement for improved public governance and accountability. This includes building infrastructure like the continent’s largest open data portals at <a href="https://openafrica.net/" rel="noopener ugc nofollow">openAFRICA</a> and <a href="https://sourceafrica.net/" rel="noopener ugc nofollow">sourceAFRICA</a>. CfA incubates initiatives as diverse as the <a href="https://africandrone.org/" rel="noopener ugc nofollow">africanDRONE</a> network, the <a href="https://pesacheck.org/" rel="noopener ugc nofollow">PesaCheck</a> fact-checking initiative, the <a href="https://sensors.africa/" rel="noopener ugc nofollow">sensors.AFRICA</a> air quality sensor network and the research and analysis programme <a href="https://civicsignal.africa/#/home" rel="noopener ugc nofollow">CivicSignal</a>.</p><p>CfA also manages the <a href="https://investigate.africa/" rel="noopener ugc nofollow">African Network of Centres for Investigative Reporting</a> (ANCIR), which gives the continent’s best muckraking newsrooms the latest possible <a href="https://data.investigate.africa/" rel="noopener ugc nofollow">forensic data tools</a>,<a href="https://getoutline.org/en/home" rel="noopener ugc nofollow"> digital security</a> and <a href="https://afrileaks.org/" rel="noopener ugc nofollow">whistleblower encryption</a> to help improve their ability to tackle crooked politicians, organised crime and predatory big business. CfA also runs one of Africa’s largest <a href="https://courses.academy.africa/" rel="noopener ugc nofollow">skills development</a> initiatives for digital journalists, and seed funds cross-border collaboration.</p>
      `,
    date: "Jan 6, 2022",
    thumbnail: {
      src: "/images/stories-1.png",
    },
    coverImage: { src: "/images/stories-1.png" },
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
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
    coverImage: { src: "/images/stories-1.png" },
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
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
    coverImage: { src: "/images/stories-1.png" },
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
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
    coverImage: { src: "/images/stories-1.png" },
    href: "/stories/article-4",
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
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
    coverImage: { src: "/images/stories-1.png" },
    href: "/stories/article-5",
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
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
    coverImage: { src: "/images/stories-1.png" },
    href: "/stories/article-6",
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
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
    coverImage: { src: "/images/stories-1.png" },
    href: "/stories/article-7",
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
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
    coverImage: { src: "/images/stories-1.png" },
    href: "/stories/article-8",
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
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
    coverImage: { src: "/images/stories-1.png" },
    href: "/stories/article-9",
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
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
    coverImage: { src: "/images/stories-1.png" },
    href: "/stories/article-10",
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
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
    coverImage: { src: "/images/stories-1.png" },
    href: "/stories/article-11",
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
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
    coverImage: { src: "/images/stories-1.png" },
    href: "/stories/article-12",
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
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
    coverImage: { src: "/images/stories-1.png" },
    href: "/stories/article-13",
    tags: ["Decision-making", "Empowerment citizens"],
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
  },
];

export const opportunities = [
  {
    title: "Security Evangelist: Secure our defences against digital threats",
    summary: "Position in: Kenya, Sudan",
    content: `
      <p><em>Do you want to help human rights defenders in Africa fight back against online attacks?&nbsp;</em></p>
      <p>Code for Africa (CfA) has an <strong>immediate vacancy</strong> for a full-time Security Evangelist anywhere in Africa to join our civic technology lab to help build digital tools that strengthen our democracies and empower citizens.</p>
      <p>Candidates must have demonstrable experience in creating momentum and driving product adoption through direct user engagement and awareness-building, good understanding of modern cyber-attack techniques and technical knowledge of existing (open source) tools to prevent or mitigate such attacks. Candidates should be fluent in English and candidates who are fluent in at least one local language from their country of residence will have an advantage.</p>
      <p>CfA is a non-profit advocate for open source software and open data, and the successful candidate will help champion these principles by adopting best practices and helping document all our technologies to help others reuse them. In keeping with CfA’s values, you will regularly interact with the wider civic tech community, as well as CfA’s grantees and partners, to share insights and offer guidance on how to improve their online security and defences.</p>
      <p>The successful candidates will work as part of a multinational and multilingual team using digital collaboration tools to create content for a global audience and international media partners.</p>
      <p><strong>Required</strong>: <em>minimum requirements include</em>:</p>
      <ul><li>A minimum of 3 years work experience, with 1+ years in a similar role.</li><li>Bachelor’s degree in Computer Science or equivalent Engineering discipline.</li><li>A technical understanding of security controls, including but not limited to; data protection, user access management, and general application security.</li><li>A passion for helping vulnerable or at-risk users in the media or other civic watchdogs, specifically women in journalism and politics&nbsp;</li><li>An ability to translate complex technical ideas to simple, easy to understand language for non-technical users</li><li>Experience developing user-facing content and comfortable presenting to different types of audiences, large and small.</li><li>Amazing verbal and written communication skills, with English as your primary work language</li><li>French and/or Arabic are highly desirable additional languages, alongside major indigenous African languages such as KiSwahili or Hausa</li></ul>
      <p><strong>Preferred</strong>:<em> candidates who are able to demonstrate the following will have an advantage</em>:</p>
      <ul><li>Knowledge of modern software development and deployment tools (e.g. Python, Docker, etc.), and public cloud provider technologies (e.g. AWS, GCP, Azure, etc.).</li><li>A technical understanding of <a href="https://en.wikipedia.org/wiki/Content_delivery_network">CDNs</a>, <a href="https://en.wikipedia.org/wiki/Denial-of-service_attack">DDoS</a>, <a href="https://en.wikipedia.org/wiki/Web_cache">web caching</a>, <a href="https://en.wikipedia.org/wiki/Domain_Name_System">DNS</a> and related technologies will be a major advantage.</li><li>Strategic thinking and great problem-solving skills.</li><li>Evidence of experience at successfully building and maintaining a wide array of relationships with both internal colleagues and external partners</li><li>Demonstrated experience of working effectively as part of a geographically distributed multicultural team will be an advantage</li></ul>
      <p><strong>Language and Location Requirements:</strong></p>
      <ul><li>Location: CfA has labs located in Kenya, Nigeria, Senegal, South Africa, Tanzania and Uganda. However the role can be performed remotely, and applicants across Africa will therefore be considered.</li><li>Languages: English</li><li>Preferred but not required: Arabic, French, KiSwahili or any other major language spoken in Africa.</li></ul>
      <p><strong>About the Role</strong>:</p>
      <p>The successful candidate will join CfA’s technology team. The team is distributed across east/west Africa, and benchmarks itself on similar civic technology initiatives elsewhere in the world that build digital democracy solutions.</p>
      <p>The Security Evangelist will play a key role in shaping internal technology decisions and mitigating third-party risks. The successful candidate will ensure that CfA deploys new infrastructure, projects and technologies in a safe and secure manner. The candidate will lead the selection and deployment of world-class open-source cyber security tools, and contribute to recruitment and talent management of information security technologists.&nbsp;</p>
      <p>The Security Evangelist will also have important external-facing responsibilities. The candidate will be a cybersecurity advocate, drive a diverse cybersecurity community and garner awareness, oversee events, contribute to engagement&nbsp; and offer insight to stakeholders.</p>
      <p>The Tech Lab spearheads CfA’s design, development and maintenance of all digital services for the organisation, and its external human rights defending partner organisations. The team is responsible for digital infrastructure for teams and organisations, through managing and deploying tools/services such as password managers (like <a href="https://bitwarden.com/">BitWarden</a>), digital security (like <a href="https://projectshield.withgoogle.com/">ProjectShield</a>) and VPNs (such as <a href="https://getoutline.org/en-GB/">Outline</a>). The Tech Lab develops and maintains our public-facing web platforms (like <a href="https://africanspending.org/library/index.html">AfricanSpending</a>, <a href="https://afrileaks.org/">Afrileaks</a>, <a href="https://granoproject.org/">Grano</a>, and <a href="https://pesayetu.pesacheck.org">PesaYetu</a>), tools/widgets (such as&nbsp; <a href="https://biscuitindex.codeforkenya.org/">BiscuitIndex</a>, <a href="https://hurumap.org/">HURUmap</a> and <a href="https://taxclock.pesacheck.org/">TaxClock</a>) and bots (such as <a href="https://twitter.com/debunkbotafrica?lang=en">DebunkBot</a>). The team also manages CfA’s machine learning&nbsp; and natural language processing analysis tools (such as <a href="https://civicsignal.africa/#/home">CivicSignal</a>). CfA’s github is available <a href="https://github.com/CodeForAfrica/">here</a>.</p>
      <p><strong>Responsibilities:</strong> <em>Your core responsibilities will include</em>:</p>
      <ul><li>Establish a security standard that all technologies and solutions at CfA, managed by your fellow technologists, must be held against to ensure the online safety of both internal and external users.</li><li>Build a dynamic pan-African digital security community for the media and other civic watchdogs, based on peer-learning and peer-support.</li><li>Manage a virtual ‘hotline’ and support service for African newsrooms and/or journalists who need urgent help on digital security and investigative technology issues.</li><li>Develop and deliver a range of technical and non-technical presentations / webinars / classes to help impact digital security skills and investigative technology awareness.</li><li>Manage an onboarding and support service for newsrooms and/or journalists who adopt any CfA-endorsed technologies or digital solutions.</li><li>Identify events, organisations, and other approaches to build awareness of CfA security projects, tools, and technologies and to drive partner activation.</li><li>Develop metrics to measure success in raising awareness and activating partnerships, for progress tracking by the core CfA team and partners.</li><li>Provide ongoing support to regional CfA teams in their own outreach efforts.</li></ul>
      <p><strong>What We Offer:</strong></p>
      <ul><li>A competitive salary, subject to experience, with opportunities for performance-based growth, both in terms of career path and public stature.</li><li>A dynamic workplace, with a transnational team, occasional international travel, and generous vacation benefits.</li><li>Ongoing opportunities to learn new cutting-edge skills and techniques/technologies to future-proof yourself in a rapidly evolving industry.</li><li>A chance to shine on a global stage, writing for international audiences and interacting with colleagues around the world.</li></ul>
      <p><strong>How to apply</strong>:</p>
      <p>Please fill in <a href="https://docs.google.com/forms/d/1JyRTdQ6pHie5LkU0eXz1v7ddVXDn5sX1TMm8fZpUCAc/viewform?edit_requested=true">this form:</a> by <strong>15 July 2022</strong></p>
      <hr class="wp-block-separator">
      <p><strong>About Us</strong>:</p>
      <p><a href="https://twitter.com/Code4Africa">Code for Africa</a> (CfA) is the continent’s largest network of indigenous African <strong>civic technology</strong> and investigative<strong> data journalism</strong> laboratories, with over 70 staff in 19 countries, who build <strong>digital democracy</strong> solutions that are intended to give citizens unfettered access to <strong>actionable information</strong> that empowers them to make <strong>informed decisions</strong> and that strengthen <strong>civic engagement</strong> for improved public governance and accountability.</p>
      <p>This includes building infrastructure such as the continent’s largest open data portal, <a href="http://open.africa/">open.AFRICA</a>, and largest open source civic software portal, <a href="https://commons.africa/">commons.AFRICA</a>, as well as the largest repository of investigative document-based evidence, <a href="https://sourceafrica.net/">source.AFRICA</a>, as well as incubating initiatives as diverse as the <a href="https://africandrone.org/">africanDRONE</a> network that gives citizens their own ‘eyes in the sky’, the <a href="https://pesacheck.org/">PesaCheck</a> fact-checking initiative in 12 African countries, and the <a href="https://sensors.africa/">sensors.AFRICA</a> remote-sensing citizen science initiative to combat air/water pollution.</p>
      <p>CfA also incubates the <a href="https://investigate.africa/">African Network of Centres for Investigative Reporting</a> (ANCIR), as an association of the continent’s best investigative newsrooms, ranging from large traditional mainstream media to smaller specialist units. ANCIR member newsrooms investigate crooked politicians, organised crime and big business. The iLAB is ANCIR’s in-house digital forensic unit, with teams in east, south and west Africa. ANCIR uses its resources to strengthen newsrooms’ own internal capacity, by providing access to the world’s best <a href="https://afrileaks.org/">whistleblower encryption</a> and investigative <a href="https://data.investigate.africa/">semantic analysis</a> technologies, as well as <a href="https://courses.academy.africa/">skills development</a>, and seed grants for cross-border collaboration.</p>
      <hr class="wp-block-separator">
      <p><em>At CfA, we don’t just accept differences – we celebrate it, we support it, and we thrive on it for the benefit of our employees, our products and our community. CfA is proud to be an equal opportunity workplace and is an affirmative action employer. If you have a disability or special need that requires accommodation, please let us know.&nbsp;</em></p>
      <p><strong><em>To all recruitment agencies</em></strong><strong><em>: CfA does not accept agency resumes. Please do not forward resumes to our employment application line, CfA employees or any other CfA contact. CfA is not responsible for any fees related to unsolicited resumes</em></strong><em>.</em></p>
      <hr class="wp-block-separator">
    `,
    date: "Jan 27, 2022",
    image: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1655896423/codeforafrica/images/opportunities/image_15_sbjzki.jpg",
    },
    coverImage: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1655902308/codeforafrica/images/opportunities/unsplash_L85a1k-XqH8_izohae.jpg",
    },
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
    href: "/opportunities/1",
    tags: ["Full-time", "Kenya", "Sudan"],
  },
  {
    title:
      "DEPUTY INVESTIGATIVE MANAGER: Support the fight against disinformation and transnational organised crime",
    summary: "Position in: South Africa, Nigeria",
    content: `
      <p>Do you want to help expose the puppet-masters behind disinformation networks and toxic content?
      <p>Code for Africa (CfA) has an immediate vacancy for an Investigative Data Analyst with extensive forensic research and/or investigative data analytics experience based in Mali, Sudan.
      <p>The successful candidates will work as part of CfA’s internal iLAB team of forensic data scientists and OSINT researchers, who use digital collaboration tools to create evidence-based dossiers and other actionable content for a global audience and for international watchdog media partners.
      <p>The iLAB works in support of the African Network of Centres for Investigative Reporting (ANCIR), which is a CfA initiative that brings together the continent’s best muckraking newsrooms to investigate crooked politicians, organised crime and big business. The iLAB spearheads investigations that individual ANCIR newsrooms are unable to tackle on their own. This includes forensic analysis of suspected digital disinformation campaigns or toxic content aimed at misleading citizens or triggering social discord or polarisation using hate speech or radicalisation or other techniques.
    `,
    date: "Jan 27, 2022",
    image: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1655896419/codeforafrica/images/opportunities/image_16_z2am26.jpg",
    },
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
    href: "/opportunities/2",
    tags: ["Contract", "South Africa", "Nigeria"],
  },
  {
    title:
      "DEPUTY INVESTIGATIVE MANAGER: Support the fight against disinformation and transnational organised crime",
    summary: "Position in: Tanzania",
    content: `
      <p>Do you want to help expose the puppet-masters behind disinformation networks and toxic content?
      <p>Code for Africa (CfA) has an immediate vacancy for an Investigative Data Analyst with extensive forensic research and/or investigative data analytics experience based in Mali, Sudan.
      <p>The successful candidates will work as part of CfA’s internal iLAB team of forensic data scientists and OSINT researchers, who use digital collaboration tools to create evidence-based dossiers and other actionable content for a global audience and for international watchdog media partners.
      <p>The iLAB works in support of the African Network of Centres for Investigative Reporting (ANCIR), which is a CfA initiative that brings together the continent’s best muckraking newsrooms to investigate crooked politicians, organised crime and big business. The iLAB spearheads investigations that individual ANCIR newsrooms are unable to tackle on their own. This includes forensic analysis of suspected digital disinformation campaigns or toxic content aimed at misleading citizens or triggering social discord or polarisation using hate speech or radicalisation or other techniques.
    `,
    date: "Jan 27, 2022",
    image: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1655896423/codeforafrica/images/opportunities/image_15_sbjzki.jpg",
    },
    coverImage: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1655902308/codeforafrica/images/opportunities/unsplash_L85a1k-XqH8_izohae.jpg",
    },
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
    href: "/opportunities/3",
    tags: ["Full-time", "Tanzania"],
  },
  {
    title:
      "DEPUTY INVESTIGATIVE MANAGER: Support the fight against disinformation and transnational organised crime",
    summary: "Positions in: Remote (Africa)",
    content: `
      <p>Do you want to help expose the puppet-masters behind disinformation networks and toxic content?
      <p>Code for Africa (CfA) has an immediate vacancy for an Investigative Data Analyst with extensive forensic research and/or investigative data analytics experience based in Mali, Sudan.
      <p>The successful candidates will work as part of CfA’s internal iLAB team of forensic data scientists and OSINT researchers, who use digital collaboration tools to create evidence-based dossiers and other actionable content for a global audience and for international watchdog media partners.
      <p>The iLAB works in support of the African Network of Centres for Investigative Reporting (ANCIR), which is a CfA initiative that brings together the continent’s best muckraking newsrooms to investigate crooked politicians, organised crime and big business. The iLAB spearheads investigations that individual ANCIR newsrooms are unable to tackle on their own. This includes forensic analysis of suspected digital disinformation campaigns or toxic content aimed at misleading citizens or triggering social discord or polarisation using hate speech or radicalisation or other techniques.
    `,
    date: "Jan 27, 2022",
    image: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1655896419/codeforafrica/images/opportunities/image_16_z2am26.jpg",
    },
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
    href: "/opportunities/4",
    tags: ["Full-time", "Remote", "Misinformation"],
  },
  {
    title:
      "DEPUTY INVESTIGATIVE MANAGER: Support the fight against disinformation and transnational organised crime",
    summary: "Position in: Tanzania",
    content: `
      <p>Do you want to help expose the puppet-masters behind disinformation networks and toxic content?
      <p>Code for Africa (CfA) has an immediate vacancy for an Investigative Data Analyst with extensive forensic research and/or investigative data analytics experience based in Mali, Sudan.
      <p>The successful candidates will work as part of CfA’s internal iLAB team of forensic data scientists and OSINT researchers, who use digital collaboration tools to create evidence-based dossiers and other actionable content for a global audience and for international watchdog media partners.
      <p>The iLAB works in support of the African Network of Centres for Investigative Reporting (ANCIR), which is a CfA initiative that brings together the continent’s best muckraking newsrooms to investigate crooked politicians, organised crime and big business. The iLAB spearheads investigations that individual ANCIR newsrooms are unable to tackle on their own. This includes forensic analysis of suspected digital disinformation campaigns or toxic content aimed at misleading citizens or triggering social discord or polarisation using hate speech or radicalisation or other techniques.
    `,
    date: "Jan 27, 2022",
    image: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1655896423/codeforafrica/images/opportunities/image_15_sbjzki.jpg",
    },
    coverImage: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1655902308/codeforafrica/images/opportunities/unsplash_L85a1k-XqH8_izohae.jpg",
    },
    author: {
      name: "Justin Arenstein",
      profession: "CEO of Code for Africa",
    },
    href: "/opportunities/5",
    tags: ["Full-time", "Tanzania"],
  },
];

const imprint = `
  <h4>Chapter heading</h4>
  <p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p>
  <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p>
  <hr/>
  <h4>Chapter heading</h4>
  <p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p>
  <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p>
  <hr/>
  <h4>Chapter heading</h4>
  <p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p>
  <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p>
  <hr/>
  <h4>Chapter heading</h4>
  <p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p>
  <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p>
  <hr/>
`;

const DEFAULT_REVALIDATE = 3 * 60; // 3 minutes

const ALL_TAG = "All";

function getProjectTags(options = { includeAll: true }) {
  const tags = Array.from(
    new Set(projects?.flatMap((a) => a.tag || []))
  ).sort();
  if (options?.includeAll) {
    return [ALL_TAG, ...tags];
  }
  return tags;
}

function getHomePageStaticProps() {
  return {
    props: {
      title: "Code for Africa",
      sections: [
        {
          ...getHero(),
          slug: "hero",
        },
        {
          slug: "projects",
          projects,
          tags: getProjectTags({ includeAll: false }),
        },
        { ...meetOurTeam, slug: "meet-our-team" },
        {
          slug: "news-stories",
          title: "News and stories",
          articles: articles.slice(0, 4),
        },
        {
          slug: "our-partners",
          partners: getOurPartners(),
        },
        {
          slug: "our-impact",
          impact: getOurImpact(),
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function paginateResults(items, page, pageSize) {
  // We need to initialize to null for serialization.
  let count = null;
  let results = [];
  let pageNumber = null;
  let pageSizeNumber = null;
  if (items?.length) {
    // Need to ensure page, pageSize are numbers and not strings
    pageNumber = Number.parseInt(page, 10) || 1;
    pageSizeNumber = Number.parseInt(pageSize, 10) || 6;
    count = Math.ceil(items.length / pageSizeNumber);
    results = items.slice(
      (pageNumber - 1) * pageSizeNumber,
      pageNumber * pageSizeNumber
    );
  }
  return {
    pagination: {
      count,
      page: pageNumber,
      pageSize: pageSizeNumber,
    },
    results,
  };
}

export function getProjects(options) {
  const { tag: originalTag, page, "page-size": pageSize, q } = options || {};
  const tag = originalTag || ALL_TAG;

  let found = projects.filter(
    (p) => equalsIgnoreCase(tag, ALL_TAG) || equalsIgnoreCase(tag, p.tag)
  );
  if (found.length && q) {
    found = fuse
      .projects(found)
      .search(q)
      .map((p) => p.item);
  }

  return paginateResults(found, page, pageSize);
}

function getProjectsPageStaticProps() {
  return {
    props: {
      title: "Our Work | Code for Africa",
      sections: [
        {
          slug: "hero",
          title: "Our Work",
          subtitle:
            "We launch data-driven initiatives to achieve impactful results",
        },
        {
          slug: "projects",
          tags: getProjectTags(),
          projects: getProjects(),
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

export function getOpportunities(options) {
  const { tag: originalTag, page, "page-size": pageSize, q } = options || {};
  const tag = originalTag || ALL_TAG;
  let found = opportunities.filter(
    (o) =>
      equalsIgnoreCase(tag, ALL_TAG) ||
      o.tags?.some((t) => equalsIgnoreCase(tag, t))
  );
  if (found.length && q) {
    found = fuse
      .opportunities(found)
      .search(q)
      .map((p) => p.item);
  }

  return paginateResults(found, page, pageSize);
}

function getOpportunitiesTags(options = { includeAll: true }) {
  const tags = Array.from(
    new Set(opportunities?.flatMap((o) => o.tags || []))
  ).sort();

  if (options?.includeAll) {
    return [ALL_TAG, ...tags];
  }
  return tags;
}

function getOpportunitiesPageStaticProps() {
  return {
    props: {
      title: "Opportunities | Code for Africa",
      sections: [
        {
          slug: "hero",
          title: "Opportunities",
          subtitle: "Come build digital democracies with Code for Africa",
        },
        {
          slug: "opportunities",
          opportunities: getOpportunities(),
          tags: getOpportunitiesTags(),
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getOpportunityPageStaticProps(params) {
  const opportunity = opportunities.find(({ href }) =>
    equalsIgnoreCase(href, params?.slug)
  );
  if (opportunity) {
    return {
      props: {
        title: `${opportunity.title} | Opportunities | Code for Africa`,
        opportunity,
        footer,
        navbar,
      },
      revalidate: DEFAULT_REVALIDATE,
    };
  }

  return { notFound: true };
}

function getImprintPageStaticProps() {
  return {
    props: {
      title: "Imprint | Code for Africa",
      content: imprint,
      sections: [
        {
          slug: "hero",
          title: "Imprint",
          subtitle: "Code for Africa organisation structure",
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getPartnerPageStaticProps(params) {
  const partner = partners.find(({ slug }) =>
    equalsIgnoreCase(`/about/partners/${slug}`, params?.slug)
  );
  if (partner) {
    const startIndex = getRandomInt(projects.length - 3);
    return {
      props: {
        title: `${partner.name} | Partners | About | Code for Africa`,
        partner: { ...partner, image: partner.logo, title: "Partner" },
        sections: [
          {
            slug: "related-projects",
            title: "Projects",
            projects: projects.slice(startIndex, startIndex + 3),
          },
        ],
        footer,
        navbar,
      },
      revalidate: DEFAULT_REVALIDATE,
    };
  }

  return { notFound: true };
}

function getPrivacyPageStaticProps() {
  return {
    props: {
      title: "Privacy | Code for Africa",
      content: imprint,
      sections: [
        {
          slug: "hero",
          title: "Privacy",
          subtitle: "Code for Africa privacy policy",
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getProjectPageStaticProps(params) {
  const project = projects.find(({ href }) =>
    equalsIgnoreCase(href, params?.slug)
  );
  if (project) {
    return {
      props: {
        title: `${project.name} | Projects | Code for Africa`,
        project,
        sections: [
          {
            slug: "team",
            title: "Team",
            team: team.slice(0, 3),
          },
          {
            slug: "related-stories",
            title: "Related stories",
            articles: articles.slice(0, 3),
          },
          {
            slug: "related-projects",
            title: "Explore other projects",
            projects: projects.slice(0, 3),
          },
        ],
        footer,
        navbar,
      },
      revalidate: DEFAULT_REVALIDATE,
    };
  }

  return { notFound: true };
}

function getStoriesTags(options = { includeAll: true }) {
  const tags = Array.from(
    new Set(articles?.flatMap((s) => s.tags || []))
  ).sort();

  if (options?.includeAll) {
    return [ALL_TAG, ...tags];
  }
  return tags;
}

export function getStories(options) {
  const {
    tag: originalTag,
    page,
    "page-size": pageSize = 10,
    q,
  } = options || {};
  const tag = originalTag || ALL_TAG;

  let found = articles.filter(
    (s) =>
      equalsIgnoreCase(tag, ALL_TAG) ||
      s.tags?.some((t) => equalsIgnoreCase(tag, t))
  );
  if (found.length && q) {
    found = fuse
      .stories(found)
      .search(q)
      .map((p) => p.item);
  }

  return paginateResults(found, page, pageSize);
}

function getStoriesPageStaticProps() {
  return {
    props: {
      title: "Stories | Code for Africa",
      sections: [
        {
          slug: "articles",
          title: "Articles",
          articles: getStories(),
          tags: getStoriesTags(),
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getStoryPageStaticProps(params) {
  const article = articles.find(({ href }) =>
    equalsIgnoreCase(href, params?.slug)
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
        navbar,
      },
      revalidate: DEFAULT_REVALIDATE,
    };
  }

  return { notFound: true };
}

function getMembersFieldTags(options = { includeAll: true }) {
  let countries = Array.from(
    new Set(team?.flatMap((m) => m.country || []))
  ).sort();
  let teams = Array.from(new Set(team?.flatMap((m) => m.team || []))).sort();
  if (options?.includeAll) {
    countries = [ALL_TAG, ...countries];
    teams = [ALL_TAG, ...teams];
  }
  return [
    { field: "Country", tags: countries },
    { field: "Team", tags: teams },
  ];
}

export function getMembers(options) {
  const {
    field,
    page,
    "page-size": pageSize = 18,
    q,
    tag: originalTag,
  } = options || {};
  const tag = originalTag || ALL_TAG;

  let found = team.filter(
    (m) =>
      equalsIgnoreCase(tag, ALL_TAG) ||
      (field && equalsIgnoreCase(tag, m[field]))
  );
  if (found.length && q) {
    found = fuse
      .members(found)
      .search(q)
      .map((p) => p.item);
  }

  return paginateResults(found, page, pageSize);
}

function getAboutMembersPageStaticProps() {
  return {
    props: {
      unit: "members",
      title: "Members | About | Code for Africa",
      crumbs: [{ href: "/about", label: "About us" }, { label: "Members" }],
      sections: [
        {
          ...getHero("about"),
          slug: "hero",
        },
        {
          slug: "our-team",
          title: "Our team",
          tags: getMembersFieldTags(),
          team: getMembers(),
          pathname: "/about/members",
        },
        {
          slug: "get-in-touch",
          title: "Are you looking to start a new project?",
          subtitle: "We'd love to hear more.",
          action: {
            href: "/contact",
            label: "Get in touch",
          },
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getAboutPageStaticProps() {
  return {
    props: {
      title: "About | Code for Africa",
      sections: [
        {
          ...getHero("about"),
          slug: "hero",
        },
        {
          ...getOurMission(),
          slug: "our-mission",
        },
        {
          slug: "guiding-principles",
          title: "Guiding Principles",
          principles: guidingPrinciples,
        },

        {
          slug: "our-team",
          title: "Our team",
          tags: getMembersFieldTags(),
          team: getMembers(),
        },
        {
          slug: "our-partners",
          partners: getOurPartners("about"),
        },
        {
          slug: "our-impact",
          impact: getOurImpact("about"),
        },
        {
          slug: "get-in-touch",
          title: "Are you looking to start a new project?",
          subtitle: "We'd love to hear more.",
          action: {
            href: "/contact",
            label: "Get in touch",
          },
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getAboutPartnersPageStaticProps() {
  return {
    props: {
      unit: "partners",
      title: "Partners | About | Code for Africa",
      crumbs: [{ href: "/about", label: "About us" }, { label: "Partners" }],
      sections: [
        {
          ...getHero("about"),
          slug: "hero",
        },
        {
          slug: "our-partners",
          title: "Our partners",
          partners,
        },
        {
          slug: "get-in-touch",
          title: "Are you looking to start a new project?",
          subtitle: "We'd love to hear more.",
          action: {
            href: "/contact",
            label: "Get in touch",
          },
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getTeamMemberPageStaticProps(params) {
  const member = team.find(({ href }) => equalsIgnoreCase(href, params?.slug));
  if (member) {
    const startIndex = getRandomInt(projects.length - 3);
    return {
      props: {
        title: `${member.name} | Members | About | Code for Africa`,
        member,
        sections: [
          {
            slug: "related-projects",
            title: "Projects",
            projects: projects.slice(startIndex, startIndex + 3),
          },
        ],
        footer,
        navbar,
      },
      revalidate: DEFAULT_REVALIDATE,
    };
  }

  return { notFound: true };
}

function getContactPageStaticProps() {
  return {
    props: {
      title: "Contact | Code for Africa",
      sections: [
        {
          slug: "hero",
          title: "Contact",
          subtitle: "Let’s start something together!",
        },
        {
          slug: "join-our-slack",
          title: "We are on Slack!",
          subtitle: "Join us",
          action: {
            label: "Join our Slack",
            href: "https://docs.google.com/forms/d/e/1FAIpQLSdkfLU2yi2S1_7D27Z0I1TumkWy5brlam809Od9cc6CnXGA-A/viewform",
          },
        },
        {
          slug: "office-addresses",
          title: "Our Offices",
          addresses: [
            {
              title: "Nairobi",
              address:
                "Address Line 1<br />Address Line 2<br />Zipcode, City<br />Country",
              map: {
                center: { lat: -1.2983425, lng: 36.7907414 },
                position: { lat: -1.2983425, lng: 36.7907414 },
              },
            },
            {
              title: "Lagos",
              address:
                "Address Line 1<br />Address Line 2<br />Zipcode, City<br />Country",
              map: {
                center: { lat: 9.058377, lng: 7.5020761 },
                position: { lat: 9.058377, lng: 7.5020761 },
              },
            },
            {
              title: "Abuja",
              address:
                "Address Line 1<br />Address Line 2<br />Zipcode, City<br />Country",
              map: {
                center: { lat: 9.058377, lng: 7.5020761 },
                position: { lat: 9.058377, lng: 7.5020761 },
              },
            },
            {
              title: "Dar es Salaam",
              address:
                "Address Line 1<br />Address Line 2<br />Zipcode, City<br />Country",
              map: {
                center: { lat: -6.7788438, lng: 39.2526559 },
                position: { lat: -6.7788438, lng: 39.2526559 },
              },
            },
            {
              title: "Cape Town",
              address:
                "Address Line 1<br />Address Line 2<br />Zipcode, City<br />Country",
              map: {
                center: { lat: -33.9225301, lng: 18.2775593 },
                position: { lat: -33.9225301, lng: 18.2775593 },
                zoom: 10,
              },
            },
          ],
          map: {
            apiKey: process.env.GOOGLE_MAPS_API_KEY ?? null,
            icon: "/icons/Type=map-pin, Size=64, Color=Primary.svg",
            zoom: 20,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
          },
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

export async function getPageStaticProps(params) {
  switch (params?.slug) {
    case "/": {
      return getHomePageStaticProps(params);
    }
    case "/about": {
      return getAboutPageStaticProps(params);
    }
    case "/about/members": {
      return getAboutMembersPageStaticProps(params);
    }
    case "/about/partners": {
      return getAboutPartnersPageStaticProps(params);
    }
    case "/contact": {
      return getContactPageStaticProps(params);
    }
    case "/imprint": {
      return getImprintPageStaticProps(params);
    }
    case "/opportunities": {
      return getOpportunitiesPageStaticProps(params);
    }
    case "/privacy": {
      return getPrivacyPageStaticProps(params);
    }
    case "/projects": {
      return getProjectsPageStaticProps(params);
    }
    case "/stories": {
      return getStoriesPageStaticProps(params);
    }
    default:
      if (params?.slug?.startsWith("/about/members/")) {
        return getTeamMemberPageStaticProps(params);
      }
      if (params?.slug?.startsWith("/about/partners/")) {
        return getPartnerPageStaticProps(params);
      }
      if (params?.slug?.startsWith("/opportunities/")) {
        return getOpportunityPageStaticProps(params);
      }
      if (params?.slug?.startsWith("/projects/")) {
        return getProjectPageStaticProps(params);
      }
      if (params?.slug?.startsWith("/stories/")) {
        return getStoryPageStaticProps(params);
      }
      return { notFound: true };
  }
}

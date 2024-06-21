export interface Robot {
  name: string;
  userAgent: string;
  about: string;
  website: string;
  type: string;
  allow: boolean;
  rules?: BotRule;
}

export interface BotRule {
  allowedPaths: string[];
  disallowedPaths: string[];
}

export interface BotType {
  name: string;
  description: string;
  shouldBlock: boolean;
  blockReason: string;
}

export const botTypes: BotType[] = [
  {
    name: "AI Web Crawlers",
    description: "Collects data from websites to train AI models",
    shouldBlock: true,
    blockReason:
      "AI Web Crawlers are automated programs, that systematically browse the internet, indexing content for search engines and retrieving data from web pages. The information they gather can be used to train different models. You might want to block them if you're concerned about attribution or how your creative work could be used in the resulting AI model",
  },
  {
    name: "Search Engine Crawlers",
    description: "Indexes web content for search engines",
    shouldBlock: false,
    blockReason:
      "Search engine crawlers are used to index web content for search engines. Blocking them could prevent your website from being discovered by users.",
  },
];

export const robots: Robot[] = [
  {
    name: "ChatGPT-User",
    userAgent: "ChatGPT-User",
    about:
      "ChatGPT-User is dispatched by OpenAI's ChatGPT in response to user prompts. Its answers will usually contain a summary of the content on the website, along with a reference link.",
    website: "https://openai.com/bot",
    type: "AI Web Crawlers",
    allow: true,
  },
  {
    name: "Amazonbot",
    userAgent: "Amazonbot",
    about:
      "Amazonbot is a web crawler used by Amazon to index search results that allow the Alexa AI Assistant to answer user questions. Alexa's answers normally contain references to the website.",
    website: "https://developer.amazon.com/support/amazonbot",
    type: "AI Web Crawlers",
    allow: true,
  },
  {
    name: "Applebot",
    userAgent: "Applebot",
    about:
      "Applebot is a web crawler used by Apple to index search results that allow the Siri AI Assistant to answer user questions. Siri's answers normally contain references to the website.",
    website: "http://apple.com/go/applebot",
    type: "AI Web Crawlers",
    allow: true,
  },
  {
    name: "PerplexityBot",
    userAgent: "PerplexityBot",
    about:
      "PerplexityBot is a web crawler used by Perplexity to index search results that allow their AI Assistant to answer user questions. The assistant's answers normally contain references to the website as inline sources.",
    website: "https://docs.perplexity.ai/docs/perplexitybot",
    type: "AI Web Crawlers",
    allow: true,
  },
  {
    name: "Bytespider",
    userAgent: "Bytespider",
    about:
      "Bytespider is a web crawler operated by ByteDance, the Chinese owner of TikTok. It's allegedly used to download training data for its LLMs (Large Language Model) including those powering ChatGPT competitor Doubao.",
    website: "",
    type: "AI Web Crawlers",
    allow: true,
  },
  {
    name: "CCBot",
    userAgent: "CCBot",
    about:
      "CCBot is a web crawler used by Common Crawl to maintainin an open source repository of web crawl data that is available for anyone to use. This repository has been used to train many LLMs (Large Language Models), including OpenAI's GPTs.",
    website: "https://commoncrawl.org/faq",
    type: "AI Web Crawlers",
    allow: true,
  },
  {
    name: "ClaudeBot",
    userAgent: "ClaudeBot",
    about:
      "ClaudeBot is a web crawler operated by Anthropic to download training data for its LLMs (Large Language Models) that power AI products like Claude.",
    website:
      "https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler",
    type: "AI Web Crawlers",
    allow: true,
  },
  {
    name: "Diffbot",
    userAgent: "Diffbot",
    about:
      "Diffbot is an intelligent web crawler used to understand, aggregate, and ultimately sell structured website data for real-time monitoring and training other AI models.",
    website: "",
    type: "AI Web Crawlers",
    allow: true,
  },
  {
    name: "FacebookBot",
    userAgent: "FacebookBot",
    about: "https://developers.facebook.com/docs/sharing/bot/",
    website: "https://meta.com",
    type: "AI Web Crawlers",
    allow: true,
  },
  {
    name: "Google-Extended",
    userAgent: "Google-Extended",
    about:
      "Google-Extended is a web crawler used by Google to download AI training content for its AI products like the Gemini assistant and its Vertex AI generative APIs.",
    website: "http://google.com/bot.html",
    type: "AI Web Crawlers",
    allow: true,
  },
  {
    name: "GPTBot",
    userAgent: "GPTBot",
    about:
      "GPTBot is a web crawler operated by OpenAI to download training data for its LLMs (Large Language Models) that power AI products like ChatGPT.",
    website: "https://openai.com/gptbot",
    type: "AI Web Crawlers",
    allow: true,
  },
  {
    name: "Applebot-Extended",
    userAgent: "Applebot-Extended",
    about:
      "Apple-Extended is used to train Apple's foundation LLM models powering generative AI features across Apple products, including Apple Intelligence, Services, and Developer Tools.",
    website: "http://apple.com/go/applebot",
    type: "AI Web Crawlers",
    allow: true,
  },
  {
    name: "omgili",
    userAgent: "omgili",
    about:
      "Omgili is a web crawler used by Webz.io to maintain a repository of web crawl data that it sells to other companies, including those using it to train AI models.",
    website: "",
    type: "AI Web Crawlers",
    allow: true,
  },
  {
    name: "anthropic-ai",
    userAgent: "anthropic-ai",
    about:
      "anthropic-ai is a unconfirmed agent possibly used by Anthropic to download training data for its LLMs (Large Language Models) that power AI products like Claude.",
    website: "",
    type: "AI Web Crawlers",
    allow: true,
  },
  {
    name: "Claude-Web",
    userAgent: "Claude-Web",
    about:
      "Claude-Web is an AI-related agent operated by Anthropic. It's currently unclear exactly what it's used for, since there's no official documentation.",
    website: "",
    type: "AI Web Crawlers",
    allow: true,
  },
  {
    name: "cohere-ai",
    userAgent: "cohere-ai",
    about:
      "cohere-ai is an unconfirmed agent possibly dispatched by Cohere's AI chat products in response to user prompts when it needs to retrieve content on the internet.",
    website: "",
    type: "AI Web Crawlers",
    allow: true,
  },
  {
    name: "YouBot",
    userAgent: "YouBot",
    about:
      "YouBot is a web crawler used by You.com to index search results that allow their AI Assistant to answer user questions. The assistant's answers normally contain references to the website as inline sources.",
    website: "https://about.you.com/youbot/",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "360Spider",
    userAgent: "360Spider",
    about: "360Spider is a search engine crawler operated by Qihoo 360.",
    website: "http://so.com/help/help_3_2.html",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "AlexandriaOrgBot",
    userAgent: "AlexandriaOrgBot",
    about:
      "AlexandriaOrgBot is a search engine crawler operated by Alexandria.org.",
    website: "https://alexandria.org/bot.html",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "Atom Feed Robot",
    userAgent: "Atom Feed Robot",
    about: "Atom Feed Robot is a search engine crawler operated by RSSMicro.",
    website: "",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "Baiduspider",
    userAgent: "Baiduspider",
    about: "Baiduspider is a search engine crawler operated by Baidu.",
    website: "http://baidu.com/search/spider.html",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "bingbot",
    userAgent: "bingbot",
    about: "bingbot is a search engine crawler operated by Microsoft.",
    website: "http://bing.com/bingbot.htm",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "coccocbot-web",
    userAgent: "coccocbot-web",
    about: "coccocbot-web is a search engine crawler operated by Cốc Cốc.",
    website: "http://help.coccoc.com/searchengine",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "Daum",
    userAgent: "Daum",
    about: "Daum is a search engine crawler operated by Daum.",
    website: "",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "DuckDuckBot",
    userAgent: "DuckDuckBot",
    about: "DuckDuckBot is a search engine crawler operated by DuckDuckGo.",
    website: "https://duckduckgo.com/duckduckbot",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "DuckDuckGo-Favicons-Bot",
    userAgent: "DuckDuckGo-Favicons-Bot",
    about:
      "DuckDuckGo-Favicons-Bot is a search engine crawler operated by DuckDuckGo.",
    website: "",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "Feedfetcher-Google",
    userAgent: "Feedfetcher-Google",
    about: "Feedfetcher-Google is a search engine crawler operated by Google.",
    website: "http://google.com/bot.html",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "Google Favicon",
    userAgent: "Google Favicon",
    about: "Google Favicon is a search engine crawler operated by Google.",
    website: "http://google.com/bot.html",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "Googlebot",
    userAgent: "Googlebot",
    about: "Googlebot is a search engine crawler operated by Google.",
    website: "http://google.com/bot.html",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "Googlebot-Image",
    userAgent: "Googlebot-Image",
    about: "Googlebot-Image is a search engine crawler operated by Google.",
    website: "http://google.com/bot.html",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "Googlebot-Mobile",
    userAgent: "Googlebot-Mobile",
    allow: true,
    about: "Googlebot-Mobile is a search engine crawler operated by Google.",
    website: "http://google.com/bot.html",
    type: "Search Engine Crawlers",
  },
  {
    name: "Googlebot-News",
    userAgent: "Googlebot-News",
    about: "Googlebot-News is a search engine crawler operated by Google.",
    website: "http://google.com/bot.html",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "Googlebot-Video",
    userAgent: "Googlebot-Video",
    about: "Googlebot-Video is a search engine crawler operated by Google.",
    website: "http://google.com/bot.html",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "GoogleOther",
    userAgent: "GoogleOther",
    about: "GoogleOther is a search engine crawler operated by Google.",
    website: "http://google.com/bot.html",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "HaoSouSpider",
    userAgent: "HaoSouSpider",
    about: "HaoSouSpider is a search engine crawler operated by Qihoo 360.",
    website: "http://so.com/help/help_3_2.html",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "MojeekBot",
    userAgent: "MojeekBot",
    about: "MojeekBot is a search engine crawler operated by Mojeek.",
    website: "http://www.mojeek.com/bot.html",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "msnbot",
    userAgent: "msnbot",
    about: "msnbot is a search engine crawler operated by Microsoft.",
    website: "http://search.msn.com/msnbot.htm",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "msnbot-media",
    userAgent: "msnbot-media",
    about: "msnbot-media is a search engine crawler operated by Microsoft.",
    website: "http://search.msn.com/msnbot.htm",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "PetalBot",
    userAgent: "PetalBot",
    about: "PetalBot is a search engine crawler operated by Huawei.",
    website: "https://webmaster.petalsearch.com/site/petalbot",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "Qwantify",
    userAgent: "Qwantify",
    about: "Qwantify is a search engine crawler operated by Qwant.",
    website: "https://help.qwant.com/bot/",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "SeekportBot",
    userAgent: "SeekportBot",
    about: "SeekportBot is a search engine crawler operated by Seekport.",
    website: "https://bot.seekport.com/",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "SemanticScholarBot",
    userAgent: "SemanticScholarBot",
    about: "SemanticScholarBot is a search engine crawler operated by AI2.",
    website: "https://semanticscholar.org/crawler",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "SeznamBot",
    userAgent: "SeznamBot",
    about: "SeznamBot is a search engine crawler operated by Seznam.",
    website: "http://napoveda.seznam.cz/seznambot-intro/",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "Sogou web spider",
    userAgent: "Sogou web spider",
    about: "Sogou web spider is a search engine crawler operated by Sogou.",
    website: "https://sogou.com/docs/help/webmasters.htm",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "teoma",
    userAgent: "teoma",
    about: "teoma is a search engine crawler operated by Ask.",
    website: "",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "TinEye",
    userAgent: "TinEye",
    about: "TinEye is a search engine crawler operated by TinEye.",
    website: "http://www.tineye.com/crawler.html",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "TinEye-bot",
    userAgent: "TinEye-bot",
    about: "TinEye-bot is a search engine crawler operated by TinEye.",
    website: "http://www.tineye.com/crawler.html",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "yacybot",
    userAgent: "yacybot",
    about: "yacybot is a search engine crawler operated by YaCy.",
    website: "http://yacy.net/bot.html",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "Yahoo! Slurp",
    userAgent: "Yahoo! Slurp",
    about: "Yahoo! Slurp is a search engine crawler operated by Yahoo.",
    website: "http://help.yahoo.com/help/us/ysearch/slurp",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "Yandex",
    userAgent: "Yandex",
    about: "Yandex is a search engine crawler operated by Yandex.",
    website: "http://yandex.com/bots",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "YandexBot",
    userAgent: "YandexBot",
    about: "YandexBot is a search engine crawler operated by Yandex.",
    website: "http://yandex.com/bots",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "YandexImages",
    userAgent: "YandexImages",
    about: "YandexImages is a search engine crawler operated by Yandex.",
    website: "http://yandex.com/bots",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "YandexRenderResourcesBot",
    userAgent: "YandexRenderResourcesBot",
    about:
      "YandexRenderResourcesBot is a search engine crawler operated by Yandex.",
    website: "http://yandex.com/bots",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "Yeti",
    userAgent: "Yeti",
    about: "Yeti is a search engine crawler operated by Naver.",
    website: "https://naver.me/spd",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "YisouSpider",
    userAgent: "YisouSpider",
    about: "YisouSpider is a search engine crawler operated by Yisou.",
    website: "",
    type: "Search Engine Crawlers",
    allow: true,
  },
  {
    name: "ZumBot",
    userAgent: "ZumBot",
    about: "ZumBot is a search engine crawler operated by ZUM Internet.",
    website: "",
    type: "Search Engine Crawlers",
    allow: true,
  },
];

export const getBotType = (name: string): BotType => {
  return (
    botTypes.find((type) => type.name === name) || {
      name: "Unknown",
      description: "Unknown",
      shouldBlock: false,
      blockReason: "Unknown",
    }
  );
};

export const groupAndSortRobots = (): { [key: string]: Robot[] } => {
  const grouped = robots.reduce(
    (acc, robot) => {
      const type = robot.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(robot);
      return acc;
    },
    {} as { [key: string]: Robot[] },
  );

  Object.keys(grouped).forEach((type) => {
    grouped[type].sort((a, b) => a.name.localeCompare(b.name));
  });

  return grouped;
};

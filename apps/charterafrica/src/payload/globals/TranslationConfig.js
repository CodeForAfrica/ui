import { configFields } from "../../utils/translationConfigs";

const TranslationConfig = {
  slug: "translation-config",
  label: {
    en: "Translation and Configurations",
    fr: "Configurations de traduction",
    pt: "Configurações de tradução",
  },
  access: {
    read: () => true,
  },
  fields: configFields(),
};

export default TranslationConfig;

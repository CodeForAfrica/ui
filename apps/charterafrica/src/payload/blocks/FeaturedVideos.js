import youtubePlaylistSelect from "../fields/youtubeSelect/youtubePlaylistSelect";

const slug = "featured-videos";
const FeaturedVideos = {
  slug,
  labels: {
    singular: {
      en: "Featured Video",
      fr: "Vidéo en vedette",
      pt: "Vídeo em destaque",
    },
    plural: {
      en: "Featured Videos",
      fr: "vidéos liées",
      pt: "Vídeos em Destaque",
    },
  },
  fields: [youtubePlaylistSelect(slug)],
};

export default FeaturedVideos;

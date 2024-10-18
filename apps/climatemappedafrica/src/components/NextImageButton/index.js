import { ImageButton, Link } from "@commons-ui/next";
import Image from "next/image";

function NextImageButton(props) {
  const { alt, height, href, priority, src, width, ...other } = props;

  if (!src) {
    return null;
  }
  return (
    <ImageButton href={href} component={href ? Link : undefined} {...other}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
      />
    </ImageButton>
  );
}

export default NextImageButton;

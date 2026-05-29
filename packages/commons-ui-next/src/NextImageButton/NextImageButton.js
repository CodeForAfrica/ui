import { ImageButton } from "@commons-ui/core";
import Image from "next/image";

import Link from "@/commons-ui/next/Link";

function NextImageButton(props) {
  const { alt, fill, height, href, priority, src, style, width, ...other } =
    props;

  if (!src) {
    return null;
  }
  return (
    <ImageButton href={href} component={href ? Link : undefined} {...other}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        priority={priority}
        style={style}
      />
    </ImageButton>
  );
}

export default NextImageButton;

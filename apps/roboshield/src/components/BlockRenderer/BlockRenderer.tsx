import Content from "../Content";

interface BlockRendererProps {
  blocks: any[];
}

interface ComponentMap {
  content: React.ComponentType<any>;
}
interface Block {
  slug: keyof ComponentMap;
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  const components: ComponentMap = {
    content: Content,
  };

  return (
    <>
      {blocks?.map((block, index) => {
        const Component = components[block.slug];

        if (Component) {
          return <Component key={index} {...block} />;
        }

        return null;
      })}
    </>
  );
}

import { createRender } from "@commons-ui/testing-library";
import React from "react";

import SingleDocumentation from "./SingleDocumentation";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Documentation title",
  excerpt: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia.`,
  embedHTML: `
    <div class="DC-embed DC-embed-document DV-container">
    <div style="position:relative;padding-bottom:129.42857142857142%;height:0;overflow:hidden;max-width:100%;"> <iframe
            src="//dc.sourceafrica.net/documents/118055-228743121-Hiding-in-Plain-Sight-Trade.html?embed=true&amp;responsive=false&amp;sidebar=false"
            title="228743121 Hiding in Plain Sight Trade Misinvoicing and the Impact of Revenue Loss in Ghana Kenya Mozambique Tanzania and Uganda 2002 2011 (Hosted by sourceAFRICA)"
            sandbox="allow-scripts allow-same-origin allow-popups" frameborder="0"
            style="position:absolute;top:0;left:0;width:100%;height:100%;border:1px solid #aaa;border-bottom:0;box-sizing:border-box;"></iframe>
    </div>
</div>
    `,
};

describe("<SingleDocumentation />", () => {
  it("renders unchanged", () => {
    const { container } = render(<SingleDocumentation {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});

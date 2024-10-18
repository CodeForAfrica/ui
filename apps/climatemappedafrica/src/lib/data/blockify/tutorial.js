async function tutorial() {
  // TODO: Move this to Payload CMS
  return {
    blockType: "tutorial",
    id: "tutorial",
    items: [
      {
        title: "SELECT LOCATION",
        description:
          "Select the County or Municipality you want to explore, by clicking on the search field and the dropdown menu.<br><br>Once you have made your selection, explore the visualisations, change location or pin to compare it to a second location.",
        selector: "#location-search",
        image:
          "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/04/PesaYetu-Tutorial-1.png",
        imageProps: {
          src: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/04/PesaYetu-Tutorial-1.png",
          width: 694,
          height: 572,
          type: "png",
          blurDataURL:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGOoqW09f/7Shw8fzp07x8AuoC4qqdXf311YWMTAL6YVE5ve2tpcV18PAHqlETRE6fa/AAAAAElFTkSuQmCC",
          placeholder: "blur",
        },
      },
      {
        description:
          "Explore the map to confirm or change your selection. You can also pin your location if you want to compare two places. <br><br>Once a location is confirmed, click on the “Rich Data” button (on the left hand-side) to display the data visualisations.",
        title: "EXPLORE THE MAP",
        selector: "#none",
        image:
          "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/04/PesaYetu-Tutorial-2.png",
        imageProps: {
          src: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/04/PesaYetu-Tutorial-2.png",
          width: 751,
          height: 589,
          type: "png",
          blurDataURL:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGP49u3rxEnTDxw4sn//fobCggJeYVU+YaWCvByGzMxMPmElWwfPgvw8AH1vD9GRbZHGAAAAAElFTkSuQmCC",
          placeholder: "blur",
        },
      },
      {
        title: "BROWSE THE CHARTS",
        description:
          "Continue to open the Rich Data dashboard, using the button on the left.<br><br>Browse the charts by scrolling the data dashboard. You can share and download the data using the buttons on the side of each chart.",
        selector: "#rich-data",
        image:
          "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/04/PesaYetu-Tutorial-3a.png",
        imageProps: {
          src: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/04/PesaYetu-Tutorial-3a.png",
          width: 670,
          height: 439,
          type: "png",
          blurDataURL:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVR4nAEnANj/ANbW1s3NyVtbWrKyswDOztFdY38JCxe5ubcA3t7ffIKf4uPq////vgcX8ZIA2dgAAAAASUVORK5CYII=",
          placeholder: "blur",
        },
      },
      {
        title: "PIN AND COMPARE",
        description:
          "There are two ways to pin and compare a second location: <br><br>1) From the data dashboard: look for the “pin” icon and select a second location from the dropdown menu. <br><br>2) From the map: pin your selected location by clicking on the ”pin” icon, then select a second location, which will appear in a different colour.",
        selector: "#pin",
        image:
          "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/04/PesaYetu-Tutorial-4.png",
        imageProps: {
          src: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2022/04/PesaYetu-Tutorial-4.png",
          width: 675,
          height: 491,
          type: "png",
          blurDataURL:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVR4nAEnANj/APj491lWYA8QI+zs6wC/wMHXzMmLi5uztLYAu7u7w8XF39/eu7u7x7oYwYnBuWcAAAAASUVORK5CYII=",
          placeholder: "blur",
        },
      },
    ],
    lazyblock: {
      slug: "lazyblock/tutorial",
    },
    align: "",
    anchor: "",
    blockId: "Z1npKaH",
    blockUniqueClass: "lazyblock-tutorial-Z1npKaH",
    ghostkitSpacings: "",
    ghostkitSR: "",
  };
}

export default tutorial;

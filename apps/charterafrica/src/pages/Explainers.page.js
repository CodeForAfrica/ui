import Explainers from "../components/Explainers";

function Explainer() {
  const p = {
    explainers: [
      {
        id: Math.random(),
        title: "Event title going on two or even three lines",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing elit tempus nibh cursus, urna porta sagittis non eget taciti nunc sed felis dui, praesent ullamcorper facilisi euismod ut in platea laoreet integer. Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipiscing elit tempus nibh cursus, urna porta sagittis non eget taciti nunc sed felis dui, praesent ullamcorper facilisi euismod ut in platea laoreet integer. Lorem ipsum dolor sit amet consectetur ",
        image: {
          src: "https://user-images.githubusercontent.com/39160236/214778112-7aefbe8f-11f2-423f-b6c9-a284feaf9b33.png",
          alt: "koech",
        },
      },
    ],
  };
  return <Explainers {...p} />;
}

export default Explainer;

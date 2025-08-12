import { createRender } from "@commons-ui/testing-library";
import React from "react";

import CourseList from "./CourseList";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Test Course List",
  description: [
    {
      type: "paragraph",
      children: [{ text: "This is a test description for the course list." }],
    },
  ],
  courses: [
    {
      id: "course-1",
      image: {
        src: "/images/course1.jpg",
        alt: "Course 1 Image",
      },
      title: "Course 1 Title",
      description: [
        {
          type: "paragraph",
          children: [{ text: "Description for Course 1." }],
        },
      ],
      link: {
        href: "/course-1",
        label: "Learn More",
      },
    },
    {
      id: "course-2",
      image: {
        src: "/images/course2.jpg",
        alt: "Course 2 Image",
      },
      title: "Course 2 Title",
      description: [
        {
          type: "paragraph",
          children: [{ text: "Description for Course 2." }],
        },
      ],
      link: {
        href: "/course-2",
        label: "Learn More",
      },
    },
    {
      id: "course-3",
      image: {
        src: "/images/course3.jpg",
        alt: "Course 3 Image",
      },
      title: "Course 3 Title",
      description: [
        {
          type: "paragraph",
          children: [{ text: "Description for Course 3." }],
        },
      ],
      link: {
        href: "/course-3",
        label: "Learn More",
      },
    },
  ],
};

describe("<CourseList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<CourseList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});

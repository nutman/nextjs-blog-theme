export const getGlobalData = () => {
  const name = process.env.NEXT_PUBLIC_BLOG_NAME
    ? decodeURI(process.env.NEXT_PUBLIC_BLOG_NAME)
    : 'Jay Doe';
  const blogTitle = process.env.NEXT_PUBLIC_BLOG_TITLE
    ? decodeURI(process.env.NEXT_PUBLIC_BLOG_TITLE)
    : 'Next.js Blog Theme';
  const blogDescription = process.env.NEXT_PUBLIC_BLOG_DESCRIPTION
    ? decodeURI(process.env.NEXT_PUBLIC_BLOG_DESCRIPTION)
    : 'Next.js Blog Theme';
  const footerText = process.env.BLOG_FOOTER_TEXT
    ? decodeURI(process.env.BLOG_FOOTER_TEXT)
    : 'All rights reserved.';

  const description = [
    "Throughout his career, Volodymyr has been dedicated to designing APIs with Node.js and MongoDB or MySQL database architectures, emphasizing modularity and scalability. He has a strong ability to design systems from scratch, manage planning processes, and drive team performance improvements. One of his significant achievements was increasing team performance by 30% by implementing Agile and Scrum practices and enhancing code quality by 15% through the use of automated tools.",
    "As a self-learner, Volodymyr is always eager to acquire new skills and knowledge. This drive has led him to explore and integrate AI technologies into the development process, significantly speeding up the creation of new applications. His keen interest in system design and application architecture motivates him to continually find innovative ways to deliver functionality effectively.",
    "He is passionate about optimizing workflows and processes to achieve the best possible outcomes. His experience in full-stack development includes both front-end and back-end technologies, allowing him to approach problems with a comprehensive perspective. He has a track record of delivering high-quality software that meets user needs and exceeds expectations.",
    "Volodymyr's technical skills encompass a wide range of technologies, including JavaScript, TypeScript, CSS, HTML, Angular, NgRx, React, Redux, RxJs, Lodash, Bootstrap, Moment.js, Node.js, Nest.js, Express.js, Chart.js, JEST, Jasmine, Karma, Mocha, Chai, Sinon, Cypress, Socket.IO, GraphQL, MongoDB, MySQL, PostgreSQL, MariaDB, Redis, Nginx, AWS, Lambda, S3, EC2, Firebase, Heroku, Docker, Git, RabbitMQ, Digital Ocean, REST, SonarQube, SonarCloud, Microservice Architecture, PWA, XSS, SSL, Figma, Zeplin, Balsamiq, Unit Testing, and AI.",
    "Volodymyr's goal is to continue leveraging his skills and experience to build efficient, scalable, and user-friendly applications. He is always in search of new challenges and opportunities to grow, both personally and professionally. By staying abreast of industry trends and continually honing his expertise, he strives to remain at the forefront of software engineering and contribute to the success of the projects he works on."
  ];

  return {
    name,
    blogTitle,
    blogDescription,
    footerText,
    description
  };
};

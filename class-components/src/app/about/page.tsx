import Link from 'next/link';

export default function About() {
  return (
    <div className="flex centered column">
      <Link href="/" className="close" scroll={false}>
        <span className="close-icon"></span>
      </Link>

      <h3>author: Kanstantsin Piatkevich</h3>
      <h4>phone: +37529 7778687</h4>
      <a href="https://rs.school/courses/reactjs">Join the next React Course</a>
    </div>
  );
}
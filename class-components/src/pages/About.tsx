import {useNavigate} from "react-router";

export const About = () => {
  const navigate = useNavigate();

  return (
    <div className={'flex centered column'}>
      <div className="close" onClick={()=>navigate(-1)}></div>
      <h3>author: Kanstantsin Piatkevich</h3>
      <h4> phone: +37529 7778687</h4>
      <a href='https://rs.school/courses/reactjs'>Join the next React Course</a>
    </div>
  );
};

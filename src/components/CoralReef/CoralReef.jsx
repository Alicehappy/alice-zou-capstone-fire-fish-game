import "./CoralReef.scss";

function CoralReef({className}) {
  return (
    <>
    <div className="coral-container">
      <div className="coral-new"></div>
    </div>
    <div className={`${className} coral-reef`}>
      <div className="coral coral--1"></div>
      <div className="coral coral--2"></div>
      <div className="coral coral--3"></div>
      <div className="coral coral--4"></div>
      <div className="coral coral--5"></div>
    </div>
    </>
    
  );
}

export default CoralReef;

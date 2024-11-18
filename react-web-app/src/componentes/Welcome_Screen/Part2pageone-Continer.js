import "./Part2pageone-Continer.css";

const Conterninerpart2 = (props) => {
  return (
    <div className="conteneriner1">
      <img src={props.img} alt={props.title} />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};

export default Conterninerpart2;

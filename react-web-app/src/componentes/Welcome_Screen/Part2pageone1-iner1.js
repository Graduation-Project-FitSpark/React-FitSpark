import "./Part2pageone1-iner1.css";
import Conterninerpart2 from "./Part2pageone-Continer";

const Part2pageone1iner1 = () => {
  const imginer = [
    {
      img: "https://w4s5h3f6.rocketcdn.me/synapse/fitspot/wp-content/uploads/sites/14/2023/05/fitspot-gallery-img-1.jpg",
      title: "Weight Lifting",
      description: "Ornare risus etiam arcu tortor. Eicula",
    },
    {
      img: "https://w4s5h3f6.rocketcdn.me/synapse/fitspot/wp-content/uploads/sites/14/2023/05/fitspot-gallery-img-3.jpg",
      title: "Crossfit Training",
      description: "Ornare risus etiam arcu tortor. Eicula",
    },
    {
      img: "https://w4s5h3f6.rocketcdn.me/synapse/fitspot/wp-content/uploads/sites/14/2023/05/fitspot-gallery-img-2.jpg",
      title: "Fitness Training",
      description: "Ornare risus etiam arcu tortor. Eicula",
    },
  ];

  return (
    <div className="container-grid">
      {imginer.map((item, index) => (
        <Conterninerpart2
          key={index}
          img={item.img}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default Part2pageone1iner1;

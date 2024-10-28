type ListTextProps = {
  title: string;
  details: string[];
};

const LIstText: React.FC<ListTextProps> = ({ title, details }) => {
  return (
    <>
      <section className="mb-1">
        <h2 className="font-semibold">{title}</h2>
        <ul className="list-disc list-inside">
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default LIstText;

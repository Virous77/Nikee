import "./Shimmer.scss";

const Shimmer = ({
  shimmerCount,
  stylesClass,
  parent,
}: {
  shimmerCount: number[];
  stylesClass: string;
  parent?: string;
}) => {
  return (
    <div className={parent}>
      {shimmerCount.map((data) => (
        <div className={stylesClass} key={data}></div>
      ))}
    </div>
  );
};

export default Shimmer;

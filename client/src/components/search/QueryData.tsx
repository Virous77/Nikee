import { useMemo } from "react";
import { useSearchContext } from "../../store/searchContext";
import styles from "./search.module.scss";
import { TbSquareRotated } from "react-icons/tb";

const QueryData = () => {
  const { data } = useSearchContext();

  const typeName = useMemo(() => {
    const currentType = data?.map((product) => product.category);
    return currentType;
  }, [data]);

  const countItems = useMemo(() => {
    const data = typeName?.reduce((countMap, item) => {
      if (countMap[item]) {
        countMap[item]++;
      } else {
        countMap[item] = 1;
      }

      return countMap;
    }, {} as any);

    return data;
  }, [typeName]);

  const result: [{ string: number }] = useMemo(() => {
    const data =
      countItems &&
      Object.entries(countItems)?.map(([item, count]) => ({
        [item]: count,
      }));

    return data;
  }, [countItems]);

  return (
    <div className={styles["main-result"]}>
      <h2>Search Results</h2>

      {result && result.length > 0 && (
        <div className={styles["data-list"]}>
          {result.map((type, idx) => (
            <p key={idx}>
              <TbSquareRotated /> {Object.keys(type)} : {Object.values(type)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueryData;

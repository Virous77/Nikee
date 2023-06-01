import React, { useMemo } from "react";
import styles from "./Dashboard.module.scss";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError, Order } from "../../interfaces/interface";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { month } from "../../utils/data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options: any = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Sell",
    },
  },
};

const SellGraph = () => {
  const { handleSetNotification } = useGlobalContext();

  const { data: orders } = useQuery(
    ["order-admin"],
    async () => {
      const data: Order[] = await getData(`/orders`);
      return data;
    },
    {
      onError: (response: AppError) => {
        handleSetNotification({
          message: response.data.message,
          status: "error",
        });
      },
      retry: false,
    }
  );

  const today = new Date();
  const thirtyDaysAgo = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 30
  );

  const lastThirtyDaysData = orders?.filter(
    (item) => new Date(item.createdAt) >= thirtyDaysAgo
  );

  const makeData = lastThirtyDaysData?.map((order) => {
    const data = { amount: order.amount, date: order.createdAt };
    return data;
  });

  const date = useMemo(() => {
    const data: string[] | undefined = makeData?.map((subs) => {
      const makeDate = new Date(subs.date);
      const day = makeDate.getDate();
      const currentMonth = makeDate.getMonth();
      return `${day} ${month[currentMonth]}`;
    });

    return data;
  }, [makeData]);

  const uniqueDate = [...new Set(date)];

  const priceByDate = useMemo(() => {
    const data =
      lastThirtyDaysData &&
      lastThirtyDaysData.reduce((acc, curr) => {
        const date = `${new Date(curr.createdAt).getDate()} ${new Date(
          curr.createdAt
        ).getMonth()}`;

        const amount = curr.amount;

        if (acc.has(date)) {
          acc.set(date, acc.get(date) + amount);
        } else {
          acc.set(date, amount);
        }

        return acc;
      }, new Map());

    return (
      data &&
      Array.from(data, ([date, price]) => ({
        [date]: price,
      })).flatMap((price) => Object.values(price))
    );
  }, [orders]);

  const data = {
    labels: uniqueDate,
    datasets: [
      {
        label: "Last 30 days sell",
        data: priceByDate,
        backgroundColor: "black",
      },
    ],
  };

  return (
    <React.Fragment>
      {date && date?.length > 0 && (
        <main className={styles["daily-chart"]}>
          <Bar options={options} data={data} />
        </main>
      )}
    </React.Fragment>
  );
};

export default SellGraph;

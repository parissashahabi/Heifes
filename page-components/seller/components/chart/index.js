import React from "react";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Chart(props) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Chart.js Bar Chart",
            },
        },
    };

    const data = {
        labels: props.labels,
        datasets: [
            {
                label: "فروش روزانه",
                data: props.data,
                backgroundColor: "rgba(238, 93, 108, 0.6)",
            },
        ],
    };
    return (
        <>
            <div style={{ width: "700px", margin: "1rem auto" }}>
                <Bar options={options} data={data} />
            </div>
        </>
    );
}

export default Chart;